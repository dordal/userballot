$(document).ready(function() {
	$('body').delegate('.main-nav-item', 'click', function(e) {
		e.preventDefault();
		$('#embedCodeProvider').show();
		$('#embedCodeProvider textarea').select();

	});
	$('body').delegate('.close', 'click', function(e) {
		e.preventDefault();
		$(this).parent().hide();
	});
});