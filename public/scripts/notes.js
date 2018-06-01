function sideMenuToggle(){
    // TODO
    var elem = document.getElementById("menu");
    var col = elem.style.background;

    console.log('col: ' + col[0]);
    if (col[0] === 'g'){
        elem.style.background = 'black';
    } else {
        elem.style.background = 'green';
    }
    // elam.style.grid-template-columns = '10px auto';

    // li.style.background = 'green';
}
