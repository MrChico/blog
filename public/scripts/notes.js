
function sideMenuOpen(){
    // alert('sideMenuOpen');
    // using id
    var sidenav = document.getElementById("menu");
    var main = document.getElementById('main');

    // using class
    var testMain = document.getElementsByClassName('main');
    // alert(testMain);

    sidenav.style.width = '25%';
    main.style.width = '75%';
}

function sideMenuClose(){
    // alert('sideMenuClose');
    var sidenav = document.getElementById("menu");
    var main = document.getElementById("main");
    sidenav.style.width = '5%';
    main.style.width = '95%';
}

var request = new XMLHttpRequest();

$(document).ready(function(){

    $(".sidenav").hover(function(){
        $(this).css("width", "20%");
        }, function(){
        $(this).css("width", "10%");
    });

    $(".menu-item").on('click', function(){
        var name = $(this).text();  // AI.md
        // alert('Name: ' + name);
        // alert($(this).attr("href"));
        // $.get('/', function(data, status){ 
        //     // alert("Data: " + data + "\nStatus: f + status);
        //     $('.main').html('<h1>Hello</h1>');
        // });
        // $('.main').html( '<h1>Hello</h1>' + name);
    });

    $(".test-item").on('click', function(){

        // $.getJSON('/note/data.json', function(data){
        //     console.log('JSON');
        //     console.log(data);
        //     alert('hej');
        // })
        $.get("note/AI.md", function(data, status){
            // alert("Data: " + data + "\nStatus: " + status);
            console.log('Status: ' + status);
            console.log('typeof: ' + typeof data);
            $('.main').html( '<h1>Hello</h1>' + name + data);
            // var obj = jQuery.parseJSON(data)
            console.log(data['AI.md']);
            for (x in data) {
                console.log(x);
            }

        });
            // console.log('JSON');
        // console.log('hej');

    });

});
