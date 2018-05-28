var express  = require('express');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

// TODO
// The only router that handles all the code for
// the tab "Notes" in .header.navbar
// Combine /vim, /workflow,  /notes router
// functions

const converter = new showdown.Converter();
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
        var summary = file.substring(0, stop);
        var summaryHtml = converter.makeHtml(summary);  //string
        // add summary class and link
        summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="/note/' + name + '"><b>READ MORE »</b></a>';
        return summaryHtml
    }

    var notes = fs.readdirSync(dirPath);
    var summaryMenu = {};
    var allNoteHtml = {};
    var name;
    var fileName;

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

// console.log('noteRouter __dirname: ' + __dirname)  // /home/erik/blog/routes




function getPage(id) {
    const notePath = path.join(__dirname, '../public/notes/'+id);
    return mdToHtml(notePath); 
}
var [summaryMenu, noteHtml] = getPage()

function getPageContent(id) {
    // id is string
    var notes = {
        title: id,
        mainTitle: id,
        mainHtml: '',
        menuItems: summaryMenu,
        todoItems:  ['Responsive main', 'Make it look good'] 
    };
    return notes

}
var page = getPageContent(id)

// vad ska hända i router vim, notes, workflow
// var = vimNoteWFProgrammingTrainingFancywords
//

router.get('/', function(req, res, next) {
    res.render('generic', page);
});

router.get('/:id', function(req, res, next) {
    var noteId = req.params.id;
    var noteChategory(notId);
    var note = noteHtml[noteId];
    //which former router to call
    res.render(noteId);
});

router.get('/:pageId/:noteId', function(req, res, next) {
    var noteId = req.params.pageId.noteId;
    console.log('noteId', noteId);
    var note = noteHtml[noteId];
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
    var notes = {
        title: 'Notes',
        mainTitle: 'Main',
        mainHtml: '',
        menuItems: summaryMenu,
        todoItems:  ['Responsive main', 'Make it look good'] 
    };
    var workflow = {
        title: 'Workflow',
        mainTitle: 'Workflow - Main',
        mainHtml: '',
        menuItems: summaryMenu, 
        mainPug: '<h1> Vim</h1>', 
        todoItems:  ['Vim', 'Blog', 'Everything'] 
    };
    var dummyVar = notes

    // var noteChategory(notId);
    // console.log('noteChategory', noteId);
    //which former router to call
    res.render('generic', dummyVar);
    // res.render('generic', page);
});
router.get('/:id', function(req, res, next) {
    console.log('Id:' + req.params.id)

    res.render('generic', notes);
});

module.exports = router;
