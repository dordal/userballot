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
	$('body').delegate('#save-question', 'click', function(e) {
		$(this).siblings('textarea').text('');
		$('.action-message').text('Bingo! The question as been added.').fadeIn('fast', function() {
				$(this).delay(2000).fadeOut('fast');	
		});;

	});
});