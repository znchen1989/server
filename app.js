var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subscriionRouter = require('./routes/subscription');
var webPush = require('web-push');

var app = express();

process.env.VAPID_PUBLIC_KEY = 'BLZPV-2DsQHybsTbzWrJxLi9fQFiN7qaNwl4_2NTp4f_cQ1QUfaeMvNBdtiDu4YoKOt0TDJpbB14GU2MI3Qhp40';
process.env.VAPID_PRIVATE_KEY = 'svIVeYdBsmaDDkgvGt8jmb3goRrb6_4j6YpvMf1JJgw';
// console.log('-----process.env.VAPID_PUBLIC_KEY', process.env.VAPID_PUBLIC_KEY);
// console.log('-----process.env.VAPID_PRIVATE_KEY', process.env.VAPID_PRIVATE_KEY);
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
    "environment variables. You can use the following ones:");
  console.log('webPush.generateVAPIDKeys()', webPush.generateVAPIDKeys());
  return;
}

webPush.setVapidDetails(
  'http://localhost:3000/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscription', subscriionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
