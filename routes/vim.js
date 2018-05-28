var express = require('express');
var path = require('path');
var router = express.Router();
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
const notePath = path.join(__dirname, '../public/notes/vim');
const noteHeader = path.join(__dirname, '../public/html/noteHeader.html')
var headHtml = fs.readFileSync(noteHeader, 'utf8');

function mdToHtml(dirPath) {
    function makeCompleteNote(file) {
        var noteHtml = converter.makeHtml(file);  
        noteHtml = headHtml + noteHtml + '</body></html>';
        return noteHtml
    }
    function makeSummary(file, name) {
        var stop = file.search('\#\#\#');
        var summary = file.substring(0,stop);
        var summaryHtml = converter.makeHtml(summary);  //string
        // add summary class and link
        summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="/vim/' + name + '"><b>READ MORE »</b></a>';
        return summaryHtml
    }

    var notes = fs.readdirSync(dirPath);
    var summaryMenu = {};
    var allNoteHtml = {};
    var name, fileName;
    for (var i = 0; i < notes.length ; i++) {
        if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
            fileName = notes[i];
            name = fileName.slice(0, -3);   // remove extension .md
            fpath = path.join(dirPath, fileName);
            file = fs.readFileSync(fpath, 'utf8');
            summaryMenu[name] = makeSummary(file, name);
            allNoteHtml[name] = makeCompleteNote(file);
        }
    }
    return [summaryMenu, allNoteHtml]
}

var [summaryMenu, allNoteHtml] = mdToHtml(notePath);

var vim = {
    title: 'Vim',
    mainTitle: 'Vim - Main',
    mainHtml: '',
    menuItems: summaryMenu, 
    mainPug: '<h1> Vim</h1>', 
    todoItems:  ['Vim', 'Blog', 'Everything'] 
};

var home = {
    title: 'Home',
    mainTitle: 'Home',
    mainHtml: '',
    menuItems: summaryMenu, 
    mainPug: '<h1> Vim</h1>', 
    todoItems:  ['Vim', 'Blog', 'Everything'] 
};

router.get('/', function(req, res, next) {
    res.render('generic', home);
});

router.get('/:id', function(req, res, next) {
    console.log('Id:' + req.params.id)
    var note = allNoteHtml[req.params.id];
    console.log('Note:' + note)
    res.send(note);
});


module.exports = router;
