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
const notePath = path.join(__dirname, '../public/notes/');
var headHtml = fs.readFileSync(noteHeader, 'utf8');

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

function getMainHtml(id){
    const htmlPath = path.join(__dirname, '../public/html', id + '.html');
    if (fs.existsSync(htmlPath)) {
        var html = fs.readFileSync(htmlPath, 'utf8');
    }
    return html
}

function getPageData(id) {
    var [summaryMenu, noteHtml] = mdToHtml(id); 
    var notes = {
        title: id,
        mainTitle: id,
        mainHtml: getMainHtml(id),
        menuItems: summaryMenu,
        fullNotes: noteHtml,
    };
    return notes
}


// frontPage for notes where all subchategories should be listed
// summary cards from all?
// router.get('/', function(req, res, next) {
//     var pageData = getPageData('notes')
//     res.render('generic', pageData);
// });


// regular notePage for specific subchategory
// workflow, vim, programming, notes, training
// router.get('/:id', function(req, res, next) {
//     var pageData = getPageData(req.params.id)
//     res.render('generic', pageData);
// });


// router.get('/:id/:note', function(req, res, next) {
//     var id = req.params.id;
//     var note = req.params.note;
//     var pageData = getPageData(req.params.id);
//     var fullNotes = pageData['fullNotes']
//     var page = fullNotes[note]
//     console.log('Browsing: ' + path.join('/note', id, note));
//     // console.log('Id: ' + id + '\nnote: ' + note + '\npage: ' + typeof page);
//     res.send(page);
// });


// GRID + HANDLEBARS
router.get('/', function(req, res, next) {
	res.render('notes', {title: 'Notes'}); 
});

module.exports = router;
