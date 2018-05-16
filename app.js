// Created by express
var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

var indexRouter  = require('./routes/index');
var aboutRouter  = require('./routes/about');
var notesRouter  = require('./routes/notes');
var papersRouter = require('./routes/papers');
var testRouter   = require('./routes/testRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/papers', papersRouter);
app.use('/test', testRouter);
app.use('/notes', notesRouter);

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


var PORT=3003
app.listen(3003)
console.log('listening on port ' + PORT) 
module.exports = app;
