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

	var UB_FIREBASE_DOMAIN;

	switch(window.location.hostname){
	  case 'app.userballot.com':
	    UB_FIREBASE_DOMAIN = 'https://userballotdb.firebaseio.com';
	  break;
	  default:
	    UB_FIREBASE_DOMAIN = 'https://userballotdb-staging.firebaseio.com';
	}

	// Call Firebase and get back a list of messages for this site
	req = new XMLHttpRequest();
	req.open("GET", UB_FIREBASE_DOMAIN + "/sites/" + $ub.siteId + "/.json");

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
				$ub.displayMessage( response.allowmute, response.frequency );
			}
		}
	};

	req.send();

};

/**
 * displayMessage(): Adds the message to the DOM and displays it
 */
$ub.displayMessage = function( allowmute, frequency ) {
	// Check to see the last time that we voted
	var vote_cookie = docCookies.hasItem('ub-vote-' + window.location.host);
	var is_muted = docCookies.hasItem("mute");
	if (( !is_muted ) && ( !vote_cookie )) {

		var html = ""+
			"<div id='ub-container' style='z-index: 1000; padding: 20px 10px 15px; height: 40px; position: fixed; bottom: 0; left: 0; right: 0; background-color: #fbfbfb; color: #323232; font-size: 16px; border-top: 2px solid #D8E0E5;'>"+
			"	<div style='text-align: left; position: relative; max-width: 1024px; margin: 0 auto;'>"+
			"		<img src='img/questionflag.png' height='22' width='19' style='height: 22px; width: 19px; position: absolute; top: 1px; left: 0;' />"+
			"		<span id='message-text' style='text-align: left;padding: 5px 150px 0 0; word-break: break-word; position: absolute; left: 0; right: 45px;'>" + $ub.selectedMessage.text + "</span>"+
			"		<span style='position: absolute; right: 0;'>"+
			"			<a style='text-align: center; background-color: #2ecc71; color: #ffffff; text-decoration: none; padding: 5px 10px; width: 60px; display: inline-block;' href='' id='ub-yes'>Yes</a> "+
			"			<a style='text-align: center; background-color: #2ecc71; color: #ffffff; text-decoration: none; padding: 5px 10px; width: 60px; display: inline-block;' href='' id='ub-no'>No</a>"+
			"		</span>"+
			"	</div>";
		if ( allowmute !== 0 ) {
			html += "<div style='position: absolute; bottom: 5px; left: 10px; font-size:10px'> <a href='' id='ub-mute'>Don't show this again</a></div>";
		} else {
			html += "<a href='' id='ub-mute'></a>";
		}
			html +=
			"   <div style='position: absolute; bottom: 5px; right: 10px; font-size:10px'>Powered by <a href='http://www.userballot.com'>userballot.com</a></div>"+
			"</div>";


		var body = document.getElementsByTagName("body")[0];
		var fragment = create(html);

		setTimeout(function() {
			document.body.appendChild(fragment, document.body);
			if (window.jQuery) {
				jQuery("#ub-container").css("display", "none");
				jQuery("#ub-container").fadeIn();
			}

			document.getElementById("ub-yes").onclick = function(e) {
				e.preventDefault();

				$ub.updateCount("yesVotes");
				docCookies.setItem($ub.selectedMessage.id,"yes",10 * 365 * 24 * 60 * 60,window.location.host);
				docCookies.setItem('ub-vote-' + window.location.host,"voted",frequency * 24 * 60 * 60, window.location.host);


				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Thank you!";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			};

			document.getElementById("ub-no").onclick = function(e) {
				e.preventDefault();

				$ub.updateCount("noVotes");
				docCookies.setItem($ub.selectedMessage.id,"no",10 * 365 * 24 * 60 * 60,window.location.host);
				docCookies.setItem('ub-vote-' + window.location.host,"voted",frequency * 24 * 60 * 60, window.location.host);

				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Thank you!";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			};

			document.getElementById("ub-mute").onclick = function(e) {
				e.preventDefault();
				$ub.updateCount("mute");
				$ub.setMuteCookie();

				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Okay...";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			};

			$ub.updateCount("views");
			$ub.updateUrlList();
		}, 1500);
	}
};

$ub.setMuteCookie = function() {
	docCookies.setItem('mute','yes',10 * 365 * 24 * 60 * 60,window.location.host);
}


$ub.closeMessage = function() {
	if (window.jQuery) {
		jQuery("#ub-container").slideUp();
	} else {
		var element = document.getElementById("ub-container");
		document.getElementById("ub-container").style.display="none";
	}
};

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

$ub.updateCount = function(type) {
	
	reqRefresh = new XMLHttpRequest();
	reqRefresh.open("GET", UB_FIREBASE_DOMAIN + "/sites/" + $ub.siteId + "/messages/" + $ub.selectedMessage.id + "/" + type + "/.json");
	reqRefresh.onreadystatechange = function() {
		tempID = $ub.selectedMessage.id;
		if (reqRefresh.readyState==4 && reqRefresh.status==200) {
			data = reqRefresh.responseText;
			response = JSON.parse(data);

			count = response;
	
			if (isNaN(count)) {
				count = 0;
			}

			count++;
			
			req = new XMLHttpRequest();
			req.open("PATCH", UB_FIREBASE_DOMAIN + "/sites/" + $ub.siteId + "/messages/" + $ub.selectedMessage.id +  "/.json");

			req.onreadystatechange = function() {
				if (req.readyState==4 && req.status==200) {
				}
			};
			var updateStr = '{"' + type + '":"' + count + '"}';
			req.send(updateStr);
		}
	};
	reqRefresh.send();

};

$ub.updateUrlList = function() {
	var reqRefresh = new XMLHttpRequest();
	reqRefresh.open("GET", UB_FIREBASE_DOMAIN + "/sites/" + $ub.siteId + "/urls/.json");
	reqRefresh.onreadystatechange = function() {
		if (reqRefresh.readyState==4 && reqRefresh.status==200) {
			data = reqRefresh.responseText;
			response = JSON.parse(data);

			var urls = [];
			var found = false;
			var currentUrl = window.location.href;
			if (response !== null) {
				urls = response;
				for (var urlIdx in urls) {
					if (currentUrl == urls[urlIdx]) {
						found = true;
					}
				}
				if (!found) {
					urls.push(currentUrl);
				}
			} else {
				urls.push(currentUrl);
			}

			req = new XMLHttpRequest();
			req.open("PATCH", UB_FIREBASE_DOMAIN + "/sites/" + $ub.siteId + "/urls/.json");

			req.onreadystatechange = function() {
				if (req.readyState==4 && req.status==200) {
				}
			};
			req.send(JSON.stringify(urls));
		}
	};
	reqRefresh.send();
};
