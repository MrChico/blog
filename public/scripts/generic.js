$(document).ready(function(){
    buttonPressed()
});

function buttonPressed() {
    // menu to the left which shows summary in main window on click
    $(".menuButton").click(function(){
        var buttonId = $(this).attr('id');
        console.log('Menu pressed: ' + buttonId );
        var data = $(this).attr('data');
        $(".main").html(data);
    });
};
