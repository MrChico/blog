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


function mdToHtml(id) {
    const dirPath = path.join(notePath, id);

    function makeCompleteNote(file) {
        var noteHtml = converter.makeHtml(file);  
        noteHtml = headHtml + noteHtml + '</body></html>';
        return noteHtml
    }

    function makeSummary(file, dirName, fileName) {
        var stop = file.search('\#\#\#');
        var summary = file.substring(0, stop);
        var summaryHtml = converter.makeHtml(summary);  //string
        // add summary class and link
        var routerPath = path.join('/note', dirName, fileName)
        summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="' + routerPath + '"><b>READ MORE »</b></a>';
        return summaryHtml
    }

    var notes = fs.readdirSync(dirPath);
    var summaryMenu = {};
    var allNoteHtml = {};
    var name;
    var fileName;

    // notes.forEach( note => {console.log('forEach note: '+note)} );
    for (var i = 0; i < notes.length ; i++) {
        if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
            fileName = notes[i];
            name = fileName.slice(0, -3);   // remove extension .md
            fpath = path.join(dirPath, fileName);
            file = fs.readFileSync(fpath, 'utf8');
            summaryMenu[name] = makeSummary(file, id, name);
            allNoteHtml[name] = makeCompleteNote(file);
        }
    }
    return [summaryMenu, allNoteHtml]
}

function getFilesAndPaths(dir) {
    var name, fp;
    var allNotes = {};
    var files = glob.sync("**/*.md", {cwd: notePath});
    files.forEach( function(f) {
        // fp = f.split(path.sep)
        name = f.split(path.sep).pop(); // [-1];
        allNotes[name] = '/note/' + f;
    });
    return(allNotes)
}

var allNotes = getFilesAndPaths(notePath);
console.log(util.inspect(allNotes, false, null))

// GRID + HANDLEBARS
router.get('/', function(req, res, next) {
	// res.render('notes', {title: 'Notes'}); 
	res.render('notes', {data: allNotes, title: "Notes", article: ''});
});

// Lol 
// My next rookie step will be to save all html to file in /public/html
// then have jquery set the correct html from the client side
router.get('/:dir/:id', function(req, res, next) {
	// res.render('notes', {title: 'Notes'}); 
	// res.render('notes', {data: allNotes, title: "Notes"});
    var filepath = path.join(req.params.dir, req.params.id);
    filepath = path.join(notePath, filepath );
    var file = fs.readFileSync(filepath, 'utf8');
    var fileHtml = converter.makeHtml(file);  
	res.render('notes', {data: allNotes, title: "Notes", article: fileHtml});
});

module.exports = router;
