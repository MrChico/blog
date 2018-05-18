
var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../views/notes.html'));
	res.sendFile(path.join(__dirname, '../views/notes.html'));
});


router.get('/:id', function(req, res, next) {
	// todo:
	// Understand what Im doing
	const testFolder = path.join(__dirname, '../public/scribbles')
	var files = fs.readdirSync(testFolder);
	console.log('This is log: '+req.params.id);
	console.log('This is log: '+files);
	// res.send(req.params.id)
	// res.send(files);
	res.sendFile(path.join(testFolder, files[0]));
});

	

module.exports = router;
