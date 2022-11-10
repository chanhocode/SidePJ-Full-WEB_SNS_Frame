const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 이미지 저장을 위한 폴더 생성
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
/*
  클라이언트(PostForm.js)에서 이미지를 encType="multipart/form-data"로 데이터가 전송이 되므로
  이미지 데이터를 전달 받기 위해 multer를 사용한다.
    - multer를 미들웨어를 사용하지 않은 이유: 게시글 마다 텍스트만 있거나, 이미지만 있거나 둘다 있는 형태
    로 나누어 지므로 라우터에 적용
*/
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'sns-by-chanho-s3',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 파일 크기 설정 _ 20MB
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    // 해시태그 생성
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
        // create를 사용하면 중복으로 데이터 베이스에 등록이 되기 떄문에 findOrCreate를 이용
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    // 정보를 완성해서 프론트로 전달
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
}); // end 게시글 작성

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  // POST /post/id/comment
  try {
    // 댓글을 작성하려는 포스트 존재 유무 확인
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    // 댓글 받아오기
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
}); // end 댓글작성

// 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    // 게시글 존재 유무 확인
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    // 시퀄라이즈 관계 메서드 사용 post.addLikers: 추가
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});// end 좋아요
// 시퀄라이즈 관계메서드 add~ 추가, remove~ 삭제, get~ 정보 가져오기, set~ 수정
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    // 시퀄라이즈 관계 메서드 사용 post.removeLikers: 삭제
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});// end 좋아요 기능

/* 게시글 삭제
  AddComment:: 시퀄라이즈 CRUD 메서드
    - findOne,findAll: 레코드 조회
    - create: 생성
    - destory: 삭제
    - update: 수정
*/
  router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    // 시퀄라이즈 destory메서드를 사용하여 게시글 삭제
    await Post.destroy({
      where: {
        // 조회한 게시글의 아이디와 삭제하고자 하는 유저의 id를 조회
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
}); // end 게시글 삭제

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

router.get('/:postId', async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  // POST /post/1/retweet
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
