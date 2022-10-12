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

// <배포버전>
// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1)
//   app.use(morgan('combined'));
//   app.use(hpp());
//   app.use(helmet());
// } else {
//   app.use(morgan('dev'));
// }
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// < 배포 버전 >
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://chanhopj.com',
//       'http://43.200.67.2',
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: 'http://localhost:3000',
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
  res.send('hello express');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
  console.log('server On');
});
