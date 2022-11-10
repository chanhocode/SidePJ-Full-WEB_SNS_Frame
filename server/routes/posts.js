const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

// 게시글들 불러오기
router.get('/', async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    // findAll을 이용해 데이터를 모두 불러올 수 있다.
    const posts = await Post.findAll({
      where,
      // 10개 씩 가져온다.
      limit: 10,
      order: [
        // 최신 게시글 순으로 가져온다.
        ['createdAt', 'DESC'],
        // 댓글 최신순
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
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
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}); // end 게시글들 불러오기

module.exports = router;
