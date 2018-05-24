var express = require('express');
var path = require('path');
var router = express.Router();


router.get('/', function(req, res, next) {
	// console.log(path.join(__dirname, '../views/books.html'));
	// res.sendFile(path.join(__dirname, '../views/books.html'));
	res.render('books', { 
		title: 'Books', 
		hej: 'HEEEEEj',
		data: {a: 'a', b: 'b'},
		condition: false 
	});
});

router.get('/:id', function (req, res) {
	res.send('Id: ' + req.params.id)
})

module.exports = router;
