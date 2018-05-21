
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
		name = notes[i].slice(0,-3);
		fpath = path.join(dirPath, notes[i]);
		file = fs.readFileSync(fpath, 'utf8');
		noteNames[name] = converter.makeHtml(file);
	}
	console.log('Converted markdown to html')
	return noteNames
}

var notes = {
	title: 'Vim',
	mainTitle: 'Vim - Main',
	mainHtml: '',
	menuItems: mdToHtml(notePath),
	todoItems:  ['Responsive main', 'Make it look good'] };


router.get('/', function(req, res, next) {
	res.render('generic', notes);
});

module.exports = router;