
var express = require('express');
var path = require('path');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.render('index', { 
// 		title0: 'title0'
// 	})
// });

router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../views/blog.html'))
	res.sendFile(path.join(__dirname, '../views/blog.html'))
});


module.exports = router;
