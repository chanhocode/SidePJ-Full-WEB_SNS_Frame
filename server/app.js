const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공!');
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://chanhopj.com',
    ],
    credentials: true,
  })
);

app.use('/', express.static(path.join(__dirname, 'uploads')));
// comment:: req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
// <배포 버전>
// app.use(
//   session({
//     saveUninitialized: false,
//     resave: false,
//     secret: process.env.COOKIE_SECRET,
//     proxy: true,
//     cookie: {
//       httpOnly: true,
//       secure: true,
//       domain: process.env.NODE_ENV === 'production' && '.chanhopj.com',
//     },
//   })
// );

// clearExpired: 유효 기간이 지난 세션은 삭제
// checkExpirationInterval: 세션의 유효기간을 체크하는 시간을 설정
// expiration: 세션의 유효기간을 설정
// const option = {
//   host: '127.0.0.1',
//   port: 3065,
//   user: 'root',
//   password: process.env.DB_PASSWORD,
//   database: 'node-full-sns',
//   clearExpired: true,
//   checkExpirationInterval: 10000,
//   expiration: 10000,
// };

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello server');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

// '0.0.0.0' : request-ip 를 사용시 IPv4로 데이터를 추가하기 위해 사용 (기본 IPv6)
app.listen(3065, '0.0.0.0', () => {
  console.log('server On');
});
