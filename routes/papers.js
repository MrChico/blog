var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../views/papers.html'))
	res.sendFile(path.join(__dirname, '../views/papers.html'))
});

module.exports = router;
