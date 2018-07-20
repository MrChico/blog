var express = require('express');
var router  = express.Router();
var path    = require('path');
var fs      = require('fs');
var glob     = require('glob');

const notePath = path.resolve("public/notes")

function getFilesAndPaths(dir, ext='md') {
	// find all .ext (.md) files in dir
    var name, fp;
    var allFilesAndPaths = {};
    var files = glob.sync("**/*"+ext, {cwd: dir});
    files.forEach( function(f) {
        // fp = f.split(path.sep)
        name = f.split(path.sep).pop(); // [-1];
        allFilesAndPaths[name] = '/note/' + f;
    });
    return(allFilesAndPaths)
}

// handlebars
router.get('/', function(req, res, next) {
	var allNotes = getFilesAndPaths(notePath)
	res.render('index', { title: 'Blog', allNotes: allNotes}); 
});

module.exports = router;
