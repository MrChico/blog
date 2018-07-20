
function mdToHtml(id) {
    function makeCompleteNote(file) {
        var noteHtml = converter.makeHtml(file);  
        noteHtml = headHtml + noteHtml + '</body></html>';
        return noteHtml
    }
    function makeSummary(file, dirName, fileName) {
        var stop = file.search('\#\#\#');
        var summary = file.substring(0, stop);
        var summaryHtml = converter.makeHtml(summary);  //string
        // add summary class and link
        var routerPath = path.join('/notes', dirName, fileName)
        summaryHtml = '<div class="summary">' + summaryHtml + '<a class="read-more-button" href="' + routerPath + '"><b>READ MORE »</b></a>';
        return summaryHtml
    }

    const dirPath = path.join(notePath, id);
    var notes = fs.readdirSync(dirPath);
    var summaryMenu = {};
    var allNoteHtml = {};
    var name;
    var fileName;
    // notes.forEach( note => {console.log('forEach note: '+note)} );
    for (var i = 0; i < notes.length ; i++) {
        if (!fs.statSync(path.join(dirPath, notes[i])).isDirectory()) {
            fileName = notes[i];
            name = fileName.slice(0, -3);   // remove extension .md
            fpath = path.join(dirPath, fileName);
            file = fs.readFileSync(fpath, 'utf8');
            summaryMenu[name] = makeSummary(file, id, name);
            allNoteHtml[name] = makeCompleteNote(file);
        }
    }
    return [summaryMenu, allNoteHtml]
}
