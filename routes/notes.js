
var express  = require('express');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
const notePath = path.join(__dirname, '../public/notes');


function mdToHtml(dirPath) {
	var notes = fs.readdirSync(dirPath);
	var summaryMenu = {};
	var noteHTML = {};
	var name, fileName;
	for (var i = 0; i < notes.length ; i++) {
		if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
			fileName = notes[i];
			name = fileName.slice(0, -3);   // remove extension .md
			fpath = path.join(dirPath, fileName);
			var summary = makeNotes(fpath, name);  // array with name, htmlSummary
			summaryMenu[name] = summary[0];
			noteHTML[name] = summary[1];
		}
	}
	return [summaryMenu, noteHTML]
}


function makeNotes(fpath, name) {
	file = fs.readFileSync(fpath, 'utf8');
	// complete note
	var completeHtml = converter.makeHtml(file);  

	// make summary
	var stop = file.search('\#\#\#');
	var summary = file.substring(0,stop);
	var summaryHtml = converter.makeHtml(summary);  //string
	// add summary class and link
	summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="/note/' + name + '"><b>READ MORE »</b></a>';
	return [summaryHtml, completeHtml];
}


var allNotes = mdToHtml(notePath);
var summaryMenu = allNotes[0];
var noteHTML = allNotes[1];

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

var f = function() {
	return {test: "hej", hej: "test"}}
var { test, hej } = f()

router.get('/:id', function(req, res, next) {
	var noteId = req.params.id;
	var note = noteHTML[req.params.id];
	// res.render('notes', note );
	res.send(note);
});

module.exports = router;