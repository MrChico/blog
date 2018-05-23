
var express  = require('express');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
const notePath = path.join(__dirname, '../public/notes');
const noteHeader = path.join(notePath, '../html/noteHeader.html')
var headHtml = fs.readFileSync(noteHeader, 'utf8');

// console.log('noteRouter __dirname: ' + __dirname)  // /home/erik/blog/routes


function makeNotes(fpath, name) {
	file = fs.readFileSync(fpath, 'utf8');
	// complete note
	var summaryHtml = makeSummary(file, name);  //string
	var completeHtml = makeCompleteNote(file);
	return [summaryHtml, completeHtml]
}


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
	summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="/note/' + name + '"><b>READ MORE »</b></a>';
	return summaryHtml
}


function mdToHtml(dirPath) {
	var notes = fs.readdirSync(dirPath);
	var summaryMenu = {};
	var allNoteHtml = {};
	var name, fileName;
	for (var i = 0; i < notes.length ; i++) {
		if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
			fileName = notes[i];
			name = fileName.slice(0, -3);   // remove extension .md
			fpath = path.join(dirPath, fileName);
			var [summaryHtml, noteHtml] = makeNotes(fpath, name);  // array with name, htmlSummary
			summaryMenu[name] = summaryHtml;
			allNoteHtml[name] = noteHtml;
		}
	}
	return [summaryMenu, allNoteHtml]
}


var [summaryMenu, noteHtml] = mdToHtml(notePath);

var notes = {
	title: 'Notes',
	mainTitle: 'Main',
	mainHtml: '',
	menuItems: summaryMenu,
	todoItems:  ['Responsive main', 'Make it look good'] 
};

router.get('/', function(req, res, next) {
	res.render('generic', notes);
});

router.get('/:id', function(req, res, next) {
	var noteId = req.params.id;
	var note = noteHtml[noteId];
	res.send(note);
});

module.exports = router;