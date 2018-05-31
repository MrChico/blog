var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var fs           = require('fs');
var hbs          = require('express-handlebars');

// Routes
var indexRouter      = require('./routes/index');
var aboutRouter      = require('./routes/about');
var notesRouter      = require('./routes/notes');

var app = express();

function writeNoteDirsToFile(dir) {
    // Simple, non robust function to store the directories and files
    // in the notes folder
    var results = {};
    files = fs.readdirSync(dir);
    files.forEach(function(file) {
        filepath = path.resolve(dir, file);
        // the prefix '?' indicates folders which should not be shown in blog
        if (fs.statSync(filepath).isDirectory() && file[0] !=='?') {
            // results.push(file)
            results[file] = fs.readdirSync(filepath)
        } 
    });
    let data = JSON.stringify(results, null, 2);  
    fs.writeFileSync('./public/data/menu-notes.json', data);  
    return results
};
// writeNoteDirsToFile(path.join(__dirname, '/public/notes/'));

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/note', notesRouter);
app.use('/about', aboutRouter);


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
