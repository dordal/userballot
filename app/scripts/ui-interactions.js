$(document).ready(function() {
	$('body').delegate('#helpBlockShow', 'click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).toggleClass('open');
			$('#helpBlock').hide();
			$('.ask-new-question').removeClass('highlight');
			$('#questionsWrap').show();
		} else {
			$('#settingsBlock').hide();
			$('#settingsBlockShow').removeClass('open');
			$(this).toggleClass('open');
			$('#helpBlock').show();
			$('#helpBlock textarea').select();
			$('.ask-new-question').addClass('highlight');
			$('#questionsWrap').hide();
		}
	});
	$('body').delegate('#settingsBlockShow', 'click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).toggleClass('open');
			$('#settingsBlock').hide();
		} else {
			$(this).toggleClass('open');
			$('#helpBlock').hide();
			$('#helpBlockShow').removeClass('open');
			$('.ask-new-question').removeClass('highlight');
			$('#settingsBlock').show();
			$('#questionsWrap').show();
		}
	});
	$('body').delegate('.close', 'click', function(e) {
		e.preventDefault();
		$('#settingsBlock').hide();
		$('#helpBlock').hide();
		$('#helpBlockShow').toggleClass('open');
		$('.ask-new-question').removeClass('highlight');
		$('#questionsWrap').show();
	});
	$('body').delegate('#save-question', 'click', function(e) {
		$(this).siblings('textarea').text('');
		$('.action-message').text('Yay! You\'ve added a new question.').fadeIn('fast', function() {
				$(this).delay(2500).fadeOut('fast');	
		});;

	});
});