
$(document).ready(function() {

	// Click events for pricing buttons
	$(".plan-button").click(function(e) {

		var planId = $(this).attr("plan");
		var appUrl = $("#app-url").val();
		window.location = appUrl + "/#/order/" + planId;
	});
});
