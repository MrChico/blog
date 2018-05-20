// Created by express
var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var fs           = require('fs');

var indexRouter    = require('./routes/index');
var aboutRouter    = require('./routes/about');
var notesRouter    = require('./routes/notes');
var papersRouter   = require('./routes/papers');
var bookRouter     = require('./routes/books');
var workflowRouter = require('./routes/workflow');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/books', bookRouter);
app.use('/note', notesRouter);
app.use('/papers', papersRouter);
app.use('/workflow', workflowRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error   = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


app.on('connection', (socket) => {
	console.log('listening client')
})


const server = app.listen(process.env.PORT || 3003, () => {
  console.log('Listening', server.address());
});

module.exports = app;
