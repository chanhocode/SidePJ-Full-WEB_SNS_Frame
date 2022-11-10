// 로그인 유무 검사 미들웨어
exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated가 true이면 로그인 상태
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};
