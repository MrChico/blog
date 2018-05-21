
var names = ['Vim', 'Sources', 'init.vim', 'Plugins' ]

$(document).ready(function(){
	buttonPressed()
});

function buttonPressed() {
	$(".menuButton").click(function(){
		var buttonId = $(this).attr('id');
		var data = $(this).attr('data');
		$(".main").html(data);
		console.log('pressed: ' + buttonId );
	});
};