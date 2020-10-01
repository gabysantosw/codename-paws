const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const multer = require('multer');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongooseConnection = require('./database-connection');

const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const sheltersRouter = require('./routes/shelters');
const animalsRouter = require('./routes/animals');
const postsRouter = require('./routes/posts');

const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 6 * 1024 * 1024, // 6mb
  },
});

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')());
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'], usePolling: true })
    .watch([`${__dirname}/public`, `${__dirname}/views`]);
}

app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sanitize({ replaceWith: '_' }));

app.use(
  session({
    secret: ['superdupersecuresecret', 'notasuperdupersecuresecret'],
    store: new MongoStore({ mongooseConnection, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
    },
  })
);

app.use(multerMid.single('file'));

app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/shelter');

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/account', accountRouter);
app.use('/api/shelters', sheltersRouter);
app.use('/api/animals', animalsRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
