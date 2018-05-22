
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
	var name;
	var noteNames = {};
	for (var i = 0; i < notes.length ; i++) {
		if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
			var summary = makeSummary(notes[i], dirPath);  // array with name, htmlSummary
			console.log('name: ' + summary[0]);
			console.log('lenth of summary: ' + summary[1].length);
			noteNames[summary[0]] = summary[1];
		}
	}
	return noteNames
}


function makeSummary(fileName, dirPath) {
	name = fileName.slice(0,-3);   // remove extension .md
	fpath = path.join(dirPath, fileName);
	file = fs.readFileSync(fpath, 'utf8');
	var stop = file.search('\#\#\#');
	var summary = file.substring(0,stop);
	
	// convert text (which is in markdown) to html
	var summaryHtml = converter.makeHtml(summary);  //string
	// add summary class and button
	summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="/note/' + fileName + '"><b>READ MORE »</b></a>';
	
	console.log();
	console.log('name: ' + name);
	console.log(summaryHtml);
	console.log(summaryHtml.length);
	console.log(typeof summaryHtml);
	return [name, summaryHtml]
}
// var summary = makeSummary(fpath);
// console.log(summary);


var notes = {
	title: 'Vim',
	mainTitle: 'Vim - Main',
	mainHtml: '',
	menuItems: mdToHtml(notePath),
	todoItems:  ['Responsive main', 'Make it look good'] 
};

router.get('/', function(req, res, next) {
	res.render('generic', notes);
});

router.get('/:id', function(req, res, next) {
	res.send(req.params.id);
});

module.exports = router;