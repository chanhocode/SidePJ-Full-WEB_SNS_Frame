const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const requestIp = require('request-ip');

const bcrypt = require('bcrypt');
const passport = require('passport');

const { Op } = require('sequelize');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // 파일.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //파일
      done(null, basename + '_' + new Date().getTime + ext); // 파일1234214.png (중복 방지)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.get('/:userId/check', isLoggedIn, async (req, res, next) => {
  // GET /userId/check
  try {
    const IP = await User.findOne({
      where: { id: req.user.id },
      attributes: ['connectIP'],
    });
    if (IP.dataValues.connectIP !== requestIp.getClientIp(req)) {
      req.logout(() => {
        res.redirect('/');
      });
      req.session.destroy();
      return res
        .status(200)
        .send(
          "<script>alert('새로운 로그인 접근이 있습니다.'); window.location.replace('/login');</script>"
        );
    }
    return res.status(200).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  // GET /user
  // console.log(req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  // GET /user/followers
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/followings', isLoggedIn, async (req, res, next) => {
  // GET /user/followings
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자 입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      const addIp = await User.update(
        {
          connectIP: requestIp.getClientIp(req),
        },
        {
          where: { id: user.id },
        }
      );
      console.log('client IP: ' + requestIp.getClientIp(req));
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  // POST /user/
  try {
    // 이메일 중복 Check
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    // Password 암호화 (bcrypt 사용)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body);

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      name: req.body.name,
      age: req.body.userAge,
      birth: req.body.birth,
      gender: req.body.gender,
      phonNumber: req.body.fullNum,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500 :: 서버 에러
  }
});

router.post('/logout', isLoggedIn, async (req, res, next) => {
  // checkIp 비우기
  try {
    await User.update(
      {
        connectIP: ' ',
      },
      {
        where: { id: req.user.id },
      }
    );

    req.logout(() => {
      res.redirect('/');
    });
    await req.session.destroy();
    return res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/profile', isLoggedIn, upload.none(), async (req, res, next) => {
  // USER /profile
  try {
    const profile = await User.update(
      {
        profileImage: req.body.image,
      },
      {
        where: { id: req.body.userId },
      }
    );
    const user = await User.findOne({ where: { id: req.body.userId } });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await user.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await user.addImages(image);
      }
    }
    res.status(200).json({ profileImage: req.body.image });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  // POST /user/images
  // console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  // DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  // DELETE /user/follower/2
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 차단하려고 하시네요?');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => {
  // GET /user/1/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'profileImage'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname', 'profileImage'],
        },
        {
          model: User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'profileImage'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
