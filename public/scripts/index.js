$(function(){
	$('.button').on('click', function(){
		var postTitle = $(this).parent().find('h1').text()
		location.href = "/notes/" + postTitle
	})

	$('.about').on('click', function(){
		location.href = "/about"
	})
});


// function bgChanger(interval) {
//     var int = 0;
// 	var colors = ['blue', 'green', 'red', 'yellow'];
//     function func() {
//         // document.body.style.background = colors[int]; 
// 		d3.select("body").style("background-color", colors[int]);
//         int++;
//         if(int === colors.length) { int = 0; }
//     }
//     var swap = window.setInterval(func, interval);
// }
// bgChanger(1000); //milliseconds, frames
