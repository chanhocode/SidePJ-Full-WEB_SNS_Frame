const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // router/user의 req.logine의 user _ 쿠키랑 묶어줄 id만 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // 로그인을 성공하고 나서 그 다음 요청 부터 매번 실행해서 id를 통해서 user의 정보를 가져옴 (라우터실행되기전 매번 실행)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
