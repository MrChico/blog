var express = require('express');
var path = require('path');
var router = express.Router();

// router.get('/', function(req, res, next) {
// 	console.log(path.join(__dirname, '../views/index.html'))
// 	res.sendFile(path.join(__dirname, '../views/index.html'))
// });

// Pug
// router.get('/', function(req, res, next) {
// 	res.render('index', {title: 'Blog'}); 
// });

// handlebars
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Blog'}); 
});

// // grid. Plain HTML
// router.get('/', function(req, res, next) {
//     var filePath = path.join(__dirname, '../views/layout.html');
// 	res.sendFile(filePath);
// });

module.exports = router;
