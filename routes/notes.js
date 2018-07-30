var express  = require('express');
var router   = express.Router();
var path     = require('path');
var util     = require('util');
var fs       = require('fs');
var glob     = require('glob');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
const noteHeader = path.resolve('public/html/noteHeader.html')
const imagePath = path.resolve("public/images")
const notePath = path.resolve("public/notes")
const headHtml = fs.readFileSync(noteHeader, 'utf8');

// Many duplicate:ish functions
const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const getFiles = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isFile())

function getFilesAndPaths(dir, ext='md') {
	// find all .ext (.md) files in dir
    var name;
    var allFilesAndPaths = {};
    var files = glob.sync("**/*"+ext, {cwd: dir});
    files.forEach( function(f) {
        name = f.split(path.sep).pop(); // [-1];
        allFilesAndPaths[name] = '/note/' + f;
    });
    return(allFilesAndPaths)
}
function getHtml(fpath) {
    var markdown = fs.readFileSync(fpath, 'utf8');
    return converter.makeHtml(markdown);
}
function dirRoutes(dirs){
	data = []
	dirs.forEach( (value, index, array) => {

		imgPath = path.join(imagePath, 'notes', value, value+'.png')
		if (fs.existsSync(imgPath)) {
			imgPath = path.join('/images', 'notes', value, value+'.png')
		}else {
			imgPath = path.join('/images','universe.jpg')
		}

		data.push({
			'name': value, 
			'url': path.join('/note', value),
			'img': imgPath})
	})
	return data
}
function fileRoutes(files, dir){
	data = []
	files.forEach( (value, index, array) => {

		imgPath = path.join(imagePath, 'notes', value, value+'.png')
		if (fs.existsSync(imgPath)) {
			imgPath = path.join('/images', 'notes', value, value+'.png')
		}else {
			imgPath = path.join('/images','universe.jpg')
		}

		data.push({
			'name': value, 
			'url': path.join('/note', dir, value),
			// 'img': path.join('/images/notes', dir, value.slice(0,-2)+'png')
			//
			'img': imgPath})
	})
	return data
}

var allFilesAndPaths = getFilesAndPaths(notePath);
console.log(util.inspect(allFilesAndPaths, false, null))

router.get('/', function(req, res, next) {
	var dirs = getDirs(notePath).sort();
	var dirpaths = dirRoutes(dirs);
	res.render('notes', {
		title: 'Blog: Notes',
		isDir: true,
		dir: dirpaths,
		allNotes: allFilesAndPaths}); 
});

router.get('/:category', (req, res) => {
    var category = req.params.category;
	var files = getFiles(path.join(notePath, category));
	var filepaths = fileRoutes(files, category);
	// TODO 
	// search all files (.md) for the first image
	// store path to that image and use as thumbnail
	res.render('notes', {
		title: 'Blog: '+category,
		isDir: true,
		dir: filepaths,
		allNotes: allFilesAndPaths
	}); 
});

router.get('/:category/:file', (req, res) => {
    var category = req.params.category;
    var file = req.params.file;
	var filePath = path.join(notePath, category, file)
    var noteHtml = getHtml(filePath); // Returns html to be displayed in main container
    var noteName = file.split('/');
    noteName = noteName[noteName.length-1];
    noteName = noteName.slice(0, noteName.length-3);  // remove extension (.md)
    noteName = 'Notes: ' + noteName
	res.render('posts', {
		title: noteName,
		allNotes: allFilesAndPaths,
		article: noteHtml});
});


// ----------- REACT -----------

router.get('/react', function(req, res, next) {
	var dirs = getDirs(notePath).sort();
	var dirpaths = dirRoutes(dirs);
	// res.send(
	// 	'notes', {
	// 		title: 'Blog: Notes',
	// 		isDir: true,
	// 		dir: dirpaths,
	// 		allNotes: allFilesAndPaths}); 
	res.send({id: 'hej'});
});
module.exports = router;
