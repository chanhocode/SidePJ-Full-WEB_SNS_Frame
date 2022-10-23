const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // id 칸 _ req.body.email
        passwordField: 'password', // password 칸 _ req.body.password
      },
      // 로그인 전략
      async (email, password, done) => {
        try {
          // db에서의 이메일 유무 체크
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            // db에 동일한 이메일이 존재하지 않을 떄 _ passport에서는 응답을 보내주지 않고 done으로 응답을 확인
            return done(null, false, {
              reason: '존재하지 않는 사용자 입니다.',
            });
          }
          // 입력된 패스워드를 해쉬화하여 db에 저장된 패스워드와 비교
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // 성공
            return done(null, user);
          } else {
            // 실패
            return done(null, false, { reason: '잘못된 비밀번호 입니다.' });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
