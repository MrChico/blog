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

    console.log('!!! mkToHtml')
    const dirPath = path.join(notePath, id);
    var notes = fs.readdirSync(dirPath);
    console.log('!!! mkToHtml2')
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
    var allFilesAndPaths = {};
    var files = glob.sync("**/*.md", {cwd: notePath});
    files.forEach( function(f) {
        // fp = f.split(path.sep)
        name = f.split(path.sep).pop(); // [-1];
        allFilesAndPaths[name] = '/note/' + f;
    });
    return(allFilesAndPaths)
}

var allFilesAndPaths = getFilesAndPaths(notePath);
console.log(util.inspect(allFilesAndPaths, false, null))

function getHtml(file) {
    file = path.join(notePath, file);
    var markdown = fs.readFileSync(file, 'utf8');
    return converter.makeHtml(markdown);
}

// GRID + HANDLEBARS
router.get('/', function(req, res, next) {
	res.render('notes', {data: allFilesAndPaths, title: "Notes", article: "HelloYo", showMenu: true});
});

// Jquery send get request: /dirs/../file.md
// getHtml finds the file and converts it from markdown to html
// and sends back
// Jquery sets relevant html.
// router.get('/*', (req, res) => {
//     var id = req.path;
//     var html = getHtml(id);
// 	res.send(html);
// });

// no jquery
// Choosing the menu-items opens a new page the same as the first one
// but with the relevant html in the relevant container
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
