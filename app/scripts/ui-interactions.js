$(document).ready(function() {
	$('body').delegate('#helpBlockShow', 'click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).toggleClass('open');
			$('#helpBlock').hide();
			$('.ask-new-question').removeClass('highlight');
			$('#questionsWrap').show();
			$('.main-nav-item').removeClass('active');
		} else {
			$('#settingsBlock').hide();
			$('#settingsBlockShow').removeClass('open');
			$(this).toggleClass('open');
			$('#helpBlock').show();
			$('.ask-new-question').show();
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
			$('.main-nav-item').removeClass('active');
			$('.ask-new-question').show();
			$('#questionsWrap').show();
		} else {
			$(this).toggleClass('open');
			$('#helpBlock').hide();
			$('#helpBlockShow').removeClass('open');
			$('.ask-new-question').removeClass('highlight').hide();
			$('#settingsBlock').show();
			$('#questionsWrap').hide();
		}
	});
	$('body').delegate('.close', 'click', function(e) {
		e.preventDefault();
		$('.ask-new-question').removeClass('highlight');
	});
	$('body').delegate('#save-question', 'click', function(e) {
		$(this).siblings('textarea').text('');
		$('.action-message').text('Yay! You\'ve added a new question.').fadeIn('fast', function() {
				$(this).delay(2500).fadeOut('fast');	
		});;

	});
});