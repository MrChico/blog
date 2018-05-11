var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('phd', { title0: 'title0' })
});

module.exports = router;
