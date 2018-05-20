
var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

const noteFolderPath = path.join(__dirname, '../public/scribbles')
var files = fs.readdirSync(noteFolderPath);

router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../views/notes.html'));
	res.sendFile(path.join(__dirname, '../views/notes.html'));
});


router.get('/:id', function(req, res, next) {
	console.log('This is log: '+ req.params.id);
	var fileIndex = req.params.id;
	res.sendFile(path.join(noteFolderPath, files[fileIndex]));
});

	

module.exports = router;
