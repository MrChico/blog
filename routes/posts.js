var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('posts')
});

// router.get('/', function(req, res, next) {
// 	console.log(path.join(__dirname, '../views/blog.html'))
// 	res.sendFile(path.join(__dirname, '../views/blog.html'))
// });

module.exports = router;
