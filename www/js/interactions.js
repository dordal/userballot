
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

$(document).ready(function() {
	$(".ubb").on('click', function() {
		var r = document.createElement("script");
		r.type = "text/javascript";
		r.innerHTML = "var $ub = window.$ub || {};$ub.siteId = '-J9G9EIDUHVaZMRqI3M-';";
		document.body.appendChild(r);
    	var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://app.userballot.com/client.js";
		document.body.appendChild(s);

		//Show UserBallot
		var UB_FIREBASE_DOMAIN = "https://userballotdb.firebaseio.com/";
		var UB_URL = "https://app.userballot.com/ub.php";
		
		req = new XMLHttpRequest();
		req.open("GET", UB_URL + "?a=get&id=" + $ub.siteId);

		req.onreadystatechange = function() {
			if (req.readyState==4 && req.status==200) {
				data = req.responseText;
				response = JSON.parse(data);

				// create array of active messages only
				var activeMessages = [];
				if( response ){
					
					for (var messageId in response.messages) {

						var messageObject = response.messages[messageId];
						// for some reason setting.id wasn't working
						messageObject.hash = messageId;
						
						if(( messageObject.active === 1 )&& (!docCookies.hasItem(messageId))){
							activeMessages.push(messageObject);
						}
					}
				}

				// check to make sure there are any active messages
				// before trying to access message properties
				if( activeMessages.length > 0 ){

					// select a random number based on the number of active messages
					var selectedId = Math.floor(Math.random() * Object.keys(activeMessages).length);
					
					// select the message
					$ub.selectedMessage = activeMessages[selectedId];
					$ub.selectedMessage.id = activeMessages[selectedId].hash;
					// display the selected message
					$ub.displayMessage( response.allowmute, response.frequency, response.hue, response.shade );
				}
			}
		};

	req.send();
	});
})