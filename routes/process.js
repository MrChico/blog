var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('process', { 
			title0: 'Process'
	})
});
module.exports = router;
