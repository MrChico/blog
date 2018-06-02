$(document).ready(function(){

    $(".sidenav").hover(function(){
        $(this).css("width", "20%");
        $(".main").css("width", "80%");
        }, function(){
        $(this).css("width", "10%");
        $(".main").css("width", "90%");
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
