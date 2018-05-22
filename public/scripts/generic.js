
$(document).ready(function(){
	buttonPressed()
});

function buttonPressed() {

	// Read more button on summary
	$(".read-more-button").click(function(){
		var buttonId = $(this).attr('id');
		console.log('pressed: ' + buttonId );
		location.href = '/note/' + buttonId;
		// window.location.href='/note/' + buttonId;
	});
	
	// menu to the left which shows summary in main window on click
	$(".menuButton").click(function(){
		var buttonId = $(this).attr('id');
		var data = $(this).attr('data');
		$(".main").html(data);
		console.log('pressed: ' + buttonId );
	});

};