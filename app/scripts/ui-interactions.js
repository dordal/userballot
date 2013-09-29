$(document).ready(function() {
	$('body').delegate('#helpBlockShow', 'click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).toggleClass('open');
			$('#helpBlock').hide();
		} else {
			$(this).toggleClass('open');
			$('#helpBlock').show();
			$('#helpBlock textarea').select();
		}


	});
	$('body').delegate('.close', 'click', function(e) {
		e.preventDefault();
		$(this).parent().hide();
	});
	$('body').delegate('#save-question', 'click', function(e) {
		$(this).siblings('textarea').text('');
		$('.action-message').text('Yay! You\'ve added a new question.').fadeIn('fast', function() {
				$(this).delay(2500).fadeOut('fast');	
		});;

	});
});