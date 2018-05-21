
var express  = require('express');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const notePath = path.join(__dirname, '../public/notes');

function readDir(dirPath) {
	var notes = fs.readdirSync(dirPath);
	var name;
	var noteNames = {};
	for (var i = 0; i < notes.length ; i++) {
		name = notes[i].slice(0,-3);
		noteNames[name] = notes[i];
	}
	return noteNames
}

var notes = {
	title: 'Vim',
	mainTitle: 'Vim - Main',
	mainHtml: '',
	menuItems: readDir(notePath),
	todoItems:  ['Vim', 'Blog', 'Everything'] };


router.get('/', function(req, res, next) {
	// var converter = new showdown.Converter();
	// var rlHtml = converter.makeHtml(rlText);
	res.render('generic', notes);
});


module.exports = router;
