function fullHeader() {
    document.getElementById("fullHeader").style.height="400px";
}

function smallHeader() {
    document.getElementById("fullHeader").style.height="300px";
    document.getElementById("header-text").style.height="30px";
}

// function openNav() {
//     document.getElementById("menu").style.width="20%";
//     document.getElementById("main").style.width="80%";
// }

// function closeNav() {
//     document.getElementById("menu").style.width="0%";
//     document.getElementById("main").style.width="100%";
// }


// hasClass
function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
    	elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// toggleClass
function toggleClass(elem, elem2, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');

        elem.style.width="0px";
        elem2.style.color="white";
    } else {
        elem.style.width="200px";
        elem2.style.color="#696363";
        elem.className += ' ' + className;
    }
}

var theToggleButton = document.getElementById('global-menu');
theToggleButton.onclick = function() {
    var menu = document.getElementById("menu");
    toggleClass(menu, this, 'visible');
    return false;
}


$(document).ready(function(){

    // $(".sidenav").hover(function(){
    //     Just a tiny easy functional example of
    //     doing something.
    //     $(this).css("width", "20%");
    //     $(".main").css("width", "80%");
    //     }, function(){
    //     $(this).css("width", "5%");
    //     $(".main").css("width", "95%");
    // });

    $(".menu-item").on('click', function(){
        var name = $(this).attr('id');  // AI.md
        console.log('NAME: ' + name);
        // Change html in main container
        // to name of note. (header titles etc)
        $.get(name, function(data, status){
            $('.main').html(data);
        });
        closeNav();
    });

    // Hide side menu and shrink header.
    // Make header image with links go after article
    // Incitement to design a nice frontpage for blog

    // $(".header").hover(function(){
    //     // shrink header
    //     $(this).css("height", "500px");
    //     }, function(){
    //     $(this).css("height", "100px");
    // });

    $(".hide-sidenav").on('click', function(){
        var name = $(this).attr('id');  // AI.md
        console.log('NAME: ' + name);
        $.get(name, function(data, status){
            $('.main').html(data);
        });
        // how: 
        //  transition between two html structures.
        //  Change css ?
    });


    // test snippet
    // $(".test-item").on('click', function(){
    // });

});

