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

window.onload = function() {

	// Call Firebase and get back a list of messages for this site
	req = new XMLHttpRequest();
	req.open("GET", "https://userballotdb.firebaseio.com/sites/" + $ub.siteId + "/.json");

	req.onreadystatechange = function() {
		if (req.readyState==4 && req.status==200) {
			data = req.responseText;
			response = JSON.parse(data);

			var selectedId = Math.floor(Math.random() * Object.keys(response.messages).length);
			var i = 0;
			// Dump the messages into an array, they're a bit easier to deal with
			for (messageId in response.messages) {
				if (i == selectedId) {
					$ub.selectedMessage = response.messages[messageId];
					$ub.selectedMessage.id = messageId;
					break;
				}
				i++;
			}
			
			$ub.displayMessage();
	    }
	}

	req.send();

}

/**
 * displayMessage(): Adds the message to the DOM and displays it
 */
$ub.displayMessage = function() {
	var body = document.getElementsByTagName("body")[0];
	var fragment = create('<div id="ub-container" style="padding: 10px; position: fixed; bottom: 0; left: 0; right: 0; height: 30px; background-color: #00ff00">' + $ub.selectedMessage.text + ' <a href="" id="ub-yes">Yes</a> <a href="" id="ub-no">No</a></div>');
	document.body.insertBefore(fragment, document.body.childNodes[0]);

	document.getElementById("ub-yes").onclick = function(e) {
		e.preventDefault();
		$ub.UpdateCount("yes");
		$ub.closeMessage();
	}
	document.getElementById("ub-no").onclick = function(e) {
		e.preventDefault();
		$ub.UpdateCount("no");
		$ub.closeMessage();
	}
}

$ub.closeMessage = function() {
	var element = document.getElementById("ub-container");
	document.getElementById("ub-container").style.display="none";
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

$ub.UpdateCount = function(type) {

	var voteType = type + "Votes"; 

	$ub.selectedMessage[voteType] = $ub.selectedMessage[voteType] + 1;
	req = new XMLHttpRequest();
	req.open("PATCH", "https://userballotdb.firebaseio.com/sites/" + $ub.siteId + "/messages/" + $ub.selectedMessage.id + "/.json");

	req.onreadystatechange = function() {
		if (req.readyState==4 && req.status==200) {
	    }
	}

	req.send(JSON.stringify($ub.selectedMessage));
}
