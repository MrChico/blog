
var express  = require('express');
var router   = express.Router();
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const notePath = path.join(__dirname, '../public/scribbles');

function readDir(dirPath) {
	console.log('path:', dirPath);
	var notes = fs.readdirSync(dirPath);

	var filePath;
	var text;
	var filePath;
	// for (var i = 0; i < notes.length; i++) {
	// 	filePath = path.join(dirPath, notes[i]);
	// 	console.log('Filepath: ' + filePath);
	// 	text = fs.readFileSync(filePath);
	// 	console.log('text \n ' + text);
	// };
	return notes
}

var notes = readDir(notePath);

router.get('/', function(req, res, next) {

	// var converter = new showdown.Converter();
	// var rlHtml = converter.makeHtml(rlText);
	res.render('notes', {
		title: 'Notes',
		h1: 'Notes',
		notes: notes,
	});
});


module.exports = router;
