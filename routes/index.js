var express = require('express');
var path = require('path');
var router = express.Router();

// handlebars
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Blog'}); 
});


module.exports = router;
