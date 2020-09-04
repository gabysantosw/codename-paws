const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./database-connection');

const indexRouter = require('./routes/index');
const sheltersRouter = require('./routes/shelters');
const animalsRouter = require('./routes/animals');
const postsRouter = require('./routes/posts');

const app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
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
