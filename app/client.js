/*
 * client.js
 * 
 * Client-side code for UserBallot
 * Given the specified site ID, this gets questions
 * and displays one question with controls for answering
 *
 * This code is kickin' it old school. No libraries, all standard JS
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

			// create array of active messages only
			var activeMessages = new Array();
			if( response ){
				
				for (messageId in response.messages) {

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
				$ub.displayMessage();
			}
	    }
	}

	req.send();

}

/**
 * displayMessage(): Adds the message to the DOM and displays it
 */
$ub.displayMessage = function() {
	var is_muted = docCookies.hasItem("mute");
	if ( !is_muted ) { 

		var html = ""+
			"<div id='ub-container' style='z-index: 1000; padding: 30px 10px 35px; height: 50px; position: fixed; bottom: 0; left: 0; right: 0; background-color: #ffffff; color: #16a085; font-size: 18px; border-top: 10px solid #D8E0E5;'>"+
			"	<div style='text-align: left; position: relative; max-width: 980px; margin: 0 auto;'>"+
			"		<img src='http://app.userballot.com/img/question-flag.png' height='22' width='19' style='height: 22px; width: 19px; position: absolute; top: 1px; left: 0;' />"+
			"		<span id='message-text' style='text-align: left;padding: 0 150px 0 50px; word-break: break-word; position: absolute; left: 0; right: 45px;'>" + $ub.selectedMessage.text + "</span>"+
			"		<span style='position: absolute; right: 0;'>"+
			"			<a style='text-align: center; background-color: #1abc9c; color: #ffffff; text-decoration: none; padding: 3px 10px; width: 60px; display: inline-block;' href='' id='ub-yes'>Yes</a> "+
			"			<a style='text-align: center; background-color: #1abc9c; color: #ffffff; text-decoration: none; padding: 3px 10px; width: 60px; display: inline-block;' href='' id='ub-no'>No</a>"+
			"		</span>"+
			"	</div>"+
			"   <div style='position: absolute; top: 98px; left: 10px; font-size:10px'><a href='' id='ub-mute'>Don't show this again</a></div>"+
			"   <div style='position: absolute; top: 98px; right: 10px; font-size:10px'>Powered by <a href='http://www.userballot.com'>userballot.com</a></div>"+
			"</div>";


		var body = document.getElementsByTagName("body")[0];
		var fragment = create(html);

		setTimeout(function() {
			document.body.appendChild(fragment, document.body);
			if (window.jQuery) {
				$("#ub-container").css("display", "none");
				$("#ub-container").fadeIn();
			} 

			document.getElementById("ub-yes").onclick = function(e) {
				e.preventDefault();
				$ub.UpdateCount("yesVotes");
				docCookies.setItem($ub.selectedMessage.id,"yes");

				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Thank you!";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			}
			document.getElementById("ub-no").onclick = function(e) {
				e.preventDefault();
				$ub.UpdateCount("noVotes");
				docCookies.setItem($ub.selectedMessage.id,"no");
				
				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Thank you!";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			}

			document.getElementById("ub-mute").onclick = function(e) {
				e.preventDefault();
				$ub.UpdateCount("mute");
				$ub.setMuteCookie();

				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Okay...";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			}
			$ub.UpdateCount("views");
		}, 1500)
	}
}

$ub.setMuteCookie = function() {
	docCookies.setItem('mute','yes');
}

$ub.closeMessage = function() {
	if (window.jQuery) {
		$("#ub-container").slideUp();
	} else {
		var element = document.getElementById("ub-container");
		document.getElementById("ub-container").style.display="none";
	}
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

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  
  
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

$ub.UpdateCount = function(type) {
	
	reqRefresh = new XMLHttpRequest();
	reqRefresh.open("GET", "https://userballotdb.firebaseio.com/sites/" + $ub.siteId + "/messages/" + $ub.selectedMessage.id + "/.json");
	reqRefresh.onreadystatechange = function() {
		tempID = $ub.selectedMessage.id;
		if (reqRefresh.readyState==4 && reqRefresh.status==200) {
			data = reqRefresh.responseText;
			response = JSON.parse(data);
			
			$ub.selectedMessage = response;
			$ub.selectedMessage.id = tempID;
	
			if (isNaN($ub.selectedMessage[type])) {
				$ub.selectedMessage[type] = 0;
			}

			$ub.selectedMessage[type] = $ub.selectedMessage[type] + 1;
			
			req = new XMLHttpRequest();
			req.open("PATCH", "https://userballotdb.firebaseio.com/sites/" + $ub.siteId + "/messages/" + $ub.selectedMessage.id + "/.json");

			req.onreadystatechange = function() {
				if (req.readyState==4 && req.status==200) {
				}
			};

			req.send(JSON.stringify($ub.selectedMessage));
		}
	};
	reqRefresh.send();
};
