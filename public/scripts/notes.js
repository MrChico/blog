$(document).ready(function(){

    // $(".sidenav").hover(function(){
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
    });

    $(".hide-sidenav").on('click', function(){
        // Hide side menu and shrink header.
        // Make header image with links go after article
        // Incitement to design a nice frontpage for blog
        var name = $(this).attr('id');  // AI.md
        console.log('NAME: ' + name);
        $.get(name, function(data, status){
            $('.main').html(data);
        });
        // how: 
        //  transition between two html structures.
        //  Change css ?
    });

    $(".menu-item").on('click', function(){
        var name = $(this).attr('id');  // AI.md
        console.log('NAME: ' + name);
        $.get(name, function(data, status){
            $('.main').html(data);
        });
    });

    // test snippet
    // $(".test-item").on('click', function(){
    // });

});
