var express  = require('express');
var router   = express.Router();
var path     = require('path');
var util     = require('util');
var fs       = require('fs');
var glob     = require('glob');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
const noteHeader = path.join(__dirname, '../public/html/noteHeader.html')
const notePath = path.join(__dirname, '../public/notes/');
const headHtml = fs.readFileSync(noteHeader, 'utf8');


function getFilesAndPaths(dir) {
	// find all markdown files in 
    var name, fp;
    var allFilesAndPaths = {};
    var files = glob.sync("**/*.md", {cwd: dir});
    files.forEach( function(f) {
        // fp = f.split(path.sep)
        name = f.split(path.sep).pop(); // [-1];
        allFilesAndPaths[name] = '/note/' + f;
    });
	// TODO 
	// 1. Sort files
	// 2. Chategorize files 
    return(allFilesAndPaths)
}

var allFilesAndPaths = getFilesAndPaths(notePath);
// console.log(util.inspect(allFilesAndPaths, false, null))

function getHtml(file) {
    file = path.join(notePath, file);
    var markdown = fs.readFileSync(file, 'utf8');
    return converter.makeHtml(markdown);
}

router.get('/', function(req, res, next) {
	res.render('notes', {data: allFilesAndPaths, title: "Notes", article: "Note Frontpage HTML", showMenu: true});
});

router.get('/*', (req, res) => {
    var id = req.path;
    var noteHtml = getHtml(id); // Returns html to be displayed in main container
    var noteName = id.split('/');

    noteName = noteName[noteName.length-1];
    noteName = noteName.slice(0, noteName.length-3);  // remove extension (.md)
    noteName = 'Notes: ' + noteName

	res.render('notes', {data: allFilesAndPaths, title: noteName, article: noteHtml, showMenu: false});
});

module.exports = router;

// Jquery send get request: /dirs/../file.md
// getHtml finds the file and converts it from markdown to html
// and sends back
// Jquery sets relevant html.
// router.get('/*', (req, res) => {
//     var id = req.path;
//     var html = getHtml(id);
// 	res.send(html);
// });
