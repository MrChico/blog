
var path     = require('path');
var fs       = require('fs');
var showdown = require('showdown');
showdown.setFlavor('github');

const converter = new showdown.Converter();
var fpath = 'CLEVR.md';

function makeSummary(fpath) {
	file = fs.readFileSync(fpath, 'utf8');
    var stop = file.search('\#\#\#');
    var summary = file.substring(0,stop);
    // TODO
    // add button for link to complete note
    return converter.makeHtml(summary);
}

var summary = makeSummary(fpath);
console.log(summary);