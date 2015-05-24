var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var https = require('https');


var routes = require('./routes/index');
var signup = require('./routes/signup');

var app = express();
var dbUrl = 'mongodb://127.0.0.1:12345/blog';
var mongoStore = require('connect-mongo')(session);
// view engine setup
console.log(__dirname);
app.set('views', path.join(__dirname, 'app/views/'));
app.set('view engine', 'ejs');
mongoose.connect(dbUrl);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:'codebeauty',
    store: new mongoStore({
        url:dbUrl,
        collection:'sessions',
        ttl:60*30
    })
}))
app.use(express.static(path.join(__dirname, '')));

/**
 * 中间件控制着是否登录
 * */
app.use(function(req,res,next){
    var username = req.session.user;
    app.locals.username = username ? username.name : '';
    next();
});


app.use('/', routes);
app.use('/signup', signup);
require('./lib/router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
console.log(app.get('env'))
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
