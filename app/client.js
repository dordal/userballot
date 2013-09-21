/*
 * client.js
 * 
 * Client-side code for UserBallot
 * Given the specified site ID, this gets questions
 * and displays one question with controls for answering
 *
 * This code is kickin' old school. No libraries, standard JS
 * This is done so that we keep the load on user's site extremely light
 */

var $UserBallot = window.$Swft || {};

$UserBallot.siteId = '42ffb13ae494'; // This can move into the generated JS code that is included on the site

window.onload = function() {

	// Call Firebase and get back a list of messages for this site
	req = new XMLHttpRequest();
	req.open("GET", "https://userballotdb.firebaseio.com/sites/" + $UserBallot.siteId + "/.json");

	req.onreadystatechange = function() {
		if (req.readyState==4 && req.status==200) {
			data = req.responseText;
			response = JSON.parse(data);

			var messages = new Array();
			// Dump the messages into an array, they're a bit easier to deal with
			for (message in response.messages) {
				messages.push(response.messages[message]);
			}

			var selectedId = Math.floor(Math.random() * messages.length);
			var selectedMessage = messages[selectedId];
			alert(selectedMessage.text);

			//document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
	    }
	}

	data = req.send();

	
	

}


