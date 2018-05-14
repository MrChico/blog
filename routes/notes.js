
var express = require('express');
var path = require('path');
var router = express.Router();


router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../views/notes.html'));
	res.sendFile(path.join(__dirname, '../views/notes.html'));
});

router.get('/:noteId', function (req, res) {
	console.log(req.params);
})

module.exports = router;
