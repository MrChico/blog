
var names = ['Vim', 'Sources', 'init.vim', 'Plugins' ]

$(document).ready(function(){
	buttonPressed()
});

function buttonPressed() {
	$(".menuButton").click(function(){
		var buttonId = $(this).attr('id');
		console.log('pressed: ' + buttonId );
		$(".main").text(names[buttonId]);
	});
};

// $(document).ready(function(){
// 	$("#btn0").click(function(){
// 		console.log('pressed ')
// 		$(".main").text("Hello world!");
// 	});
// 	$("#btn1").click(function(){
// 		$(".main").html("<b>Hello world!</b>");
// 	});
// 	$("#btn2").click(function(){
// 		$(".main").val("Dolly Duck");
// 	});
// 	$("#btn3").click(function(){
// 		$(".main").val("Dolly Duck");
// 	});
// });
