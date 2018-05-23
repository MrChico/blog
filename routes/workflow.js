var express = require('express');
var path = require('path');
var router = express.Router();


var workflow = {
	title: 'Workflow',
	mainTitle: 'Workflow - Main',
	menuItems: {
		'Workflow': '/workflow',
		'Vim': '/workflow/vim',
		'Blog': '/workflow/blog',
	},
	todoItems:  [ 'Vim', 'Blog', 'Everything' ] };


var vim = {
	title: 'Vim',
	mainTitle: 'Vim - Main',
	mainHtml: '',
	menuItems: ['Vim', 'Sources', 'Init.vim', 'Plugins'],
	todoItems:  ['Vim', 'Blog', 'Everything'] };


router.get('/', function(req, res, next) {
	res.render('generic', workflow);
});

router.get('/vim', function(req, res, next) {
	// res.send(vim);
	res.render('generic', vim);
});

module.exports = router;
