var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//basically, it imports database stuffs such as connection, data models
var db = require('./model/db'),
    blob = require('./model/blobs');

//it imports routes (controller/event-like stuffs)
//index just for a server default page
var routes = require('./routes/index'),
    blobs = require('./routes/blobs');

//var users = require('./routes/users');

var app = express();

app.listen(8099);

// view engine setup
// jade is a html-like with different syntax - could be changed


// view engine setup
//var cons = require('consolidate');
//app.engine('html', cons.swig)
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.disable('etag');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//static middleware
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/stylesheets'));

app.use('/', routes);
app.use('/blobs', blobs);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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