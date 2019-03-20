var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var messages= require('express-messages');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 
var flash = require('connect-flash');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var sessionStore = new session.MemoryStore;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  // res.locals.messages = messages(req, res);
 // res.locals.sessionFlash = req.session.sessionFlash;
 // delete req.session.sessionFlash;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
