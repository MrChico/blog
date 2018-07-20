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
const notePath = path.resolve("public/notes")
const headHtml = fs.readFileSync(noteHeader, 'utf8');

// Many duplicate:ish functions
const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const getFiles = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isFile())

function getFilesAndPaths(dir, ext='md') {
	// find all .ext (.md) files in dir
    var name, fp;
    var allFilesAndPaths = {};
    var files = glob.sync("**/*"+ext, {cwd: dir});
    files.forEach( function(f) {
        // fp = f.split(path.sep)
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
		data.push({
			'name': value, 
			'path': '/note/'+value, 
			'img': '/images/categories/'+value+'.png'
		})
	})
	return data
}
function fileRoutes(files, dir){
	data = []
	files.forEach( (value, index, array) => {
		data.push({
			'name': value, 
			'path': '/note/'+dir+'/'+value,
			'img': '/images/notes/'+value+'.png'
		})
	})
	return data
}

var allFilesAndPaths = getFilesAndPaths(notePath);
console.log(util.inspect(allFilesAndPaths, false, null))


router.get('/', function(req, res, next) {
	var dirs = getDirs(notePath).sort();
	var dirpaths = dirRoutes(dirs);
	res.render('notes', {  title: 'Blog', Dir: dirpaths, allNotes: allFilesAndPaths}); 
});

router.get('/:category', (req, res) => {
    var category = req.params.category;
	var files = getFiles(path.join(notePath, category));
	var filepaths = fileRoutes(files, category);
	// TODO 
	// search all files (.md) for the first image
	// store path to that image and use as thumbnail
	res.render('notes', {Dir: filepaths, title: 'Blog', allNotes: allFilesAndPaths}); 
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
	res.render('posts', {allNotes: allFilesAndPaths, title: noteName, article: noteHtml});
});

module.exports = router;
