
$(document).ready(function() {

	// Click events for pricing buttons
	$(".buy-btn").click(function(e) {

		var planId = $(this).attr("plan");
		var appUrl = $("#app-url").val();
		window.location = appUrl + "/#/signup/" + planId;
	});
});

	//scroll to

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});