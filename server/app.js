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

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공!');
  })
  .catch(console.error);
// passport 연결 
passportConfig();

// 디버깅 편의
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

// cors setting
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://chanhopj.com',
      'http://43.200.67.2',
    ],
    // 쿠키도 함께 전달
    credentials: true,
  })
); // end cors setting

app.use('/', express.static(path.join(__dirname, 'uploads')));

// comment:: req.body
// 프론트에서 json 형식의 data 를 req.body에 넣어준다.
app.use(express.json());
// form submit을 하면 urlencoded방식으로 data가 넘어온다. 그 데이터를 req.body에 넣어준다.
app.use(express.urlencoded({ extended: true }));

// 쿠키 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.chanhopj.com',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

// 데이터 흐름: dispatch Component -> reducer -> saga -> router
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(80, () => {
  console.log('server On');
});
