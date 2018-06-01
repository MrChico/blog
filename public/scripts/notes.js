$(document).ready(function(){
    $(".sidenav").hover(function(){
        $(this).css("width", "20%");
        }, function(){
        $(this).css("width", "10%");
    });

    $(".menu-item").on('click', function(){
        var name = $(this).attr('id');  // AI.md
        console.log('NAME: ' + name);

        $.get(name, function(data, status){
            // alert("Data: " + data + "\nStatus: " + status);
            // console.log('Status: ' + status);
            // console.log('typeof: ' + typeof data);
            $('.main').html( '<h1>Hello</h1>' + name + data);
            // var obj = jQuery.parseJSON(data)
            for (x in data) {
                console.log(x);
            }

        });
    });

    // test snippet
    // $(".test-item").on('click', function(){
    // });

});
