
$(document).ready(function() {

	// Click events for pricing buttons
	$(".buy-btn").click(function(e) {

		var planId = $(this).attr("plan");
		var appUrl = $("#app-url").val();
		window.location = appUrl + "/#/signup/" + planId;
	});
});
