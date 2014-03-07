/*
 * client.js
 *
 * Client-side code for UserBallot
 * Given the specified site ID, this gets questions
 * and displays one question with controls for answering
 *
 *also send data to be analyzed
 *
 * This code is kickin' it old school. No libraries, all standard JS
 * This is done so that we keep the load on user's site extremely light
 */

// change if needed for testing
var UB_FIREBASE_DOMAIN = "https://userballotdb.firebaseio.com/";
var UB_URL = "http://userballot-app-tfite/ub.php";

window.onload = function() {

	// Call UserBallot and get back a list of messages for this site
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

};

/**
 * displayMessage(): Adds the message to the DOM and displays it
 */
$ub.displayMessage = function( allowmute, frequency, hue, shade ) {
	// Check to see the last time that we voted
	var vote_cookie = docCookies.hasItem('ub-vote-' + window.location.host);
	var is_muted = docCookies.hasItem("mute");
	if (( !is_muted ) && ( !vote_cookie )) {
		var padding = "15px 10px 15px";
		var textPadding = "10px 170px 0 0";
		var textAlign = "left";
		var buttonHeight = "10px 10px";
		var buttonWidth = "60px";
		var ballotHeight = "40px";
		var bottomLogo = "5px";
		var ballotBG = "#fbfbfb";
		var ballotText = "#323232"
		var ballotColor = hue;
		var ballotShade = shade;
		var ballotButton = ballotColor;
		var ballotButtonLocation = "right: 0px;"
		var ballotButtonText = "#ffffff";
		var borderColor = hue;
		var powered = "powered.svg"
		var poweredSide = "right";
		if (ballotColor === undefined) {
			var ballotColor = "#2ecc71";
		}
		if (ballotShade === undefined) {
			var ballotShade = "light";
		}

		if (($ub.windowWidth() < 600) && ($ub.windowWidth() > 480)) {
			padding = "10px 10px 15px";
			textPadding = "0 140px 0 0";
			textAlign = "justify";
			ballotHeight = "100px";
			ballotButtonLocation = "right: 0px";
		}

		if ($ub.windowWidth() < 960) {
			padding = "15px 10px 0px";
			buttonHeight = "10px 10px";
			ballotHeight = "70px";
			textAlign = "right";
		}

		if (($ub.windowWidth() > 601) && ($ub.windowWidth() < 959)) {
			textPadding = "10px 200px 0 0";
			ballotButtonLocation = "right: 0px";
		}

		if (($ub.windowWidth() < 1279) && ($ub.windowWidth() > 961)) {
			textPadding = "10px 240px 0 0";
			ballotButtonLocation = "right: 120px";
			}

		if ($ub.windowWidth() < 1279) {
			textAlign = "left";
		}

		if ($ub.windowWidth() < 480) {
			ballotHeight = "90px";
			bottomLogo = "5px";
			textPadding = "0 140px 0 0";
			textAlign = "justify";
			ballotButtonLocation = "right: 0px";
		}

		if ($ub.windowWidth() < 395) {
			ballotHeight = "120px";
			buttonWidth = "55px";
			bottomLogo = "50px";
		}

		if (ballotShade === "vibrant") {
			ballotButton = "#ffffff";
			ballotBG = ballotColor;
			ballotButtonText = ballotColor;
			ballotText = "#ffffff";
			borderColor = "";
			powered = "poweredVibrant.svg"
		}

		if (ballotShade === "dark") {
			ballotBG = "#323232";
			ballotButton = ballotColor;
			ballotButtonText = "#ffffff";
			ballotText = "#ffffff";
			powered = "poweredDark.svg"
		}

		var html = ""+
			"<div id='ub-container' style='z-index: 1000; padding: " + padding + "; height: " + ballotHeight + "; position: fixed; bottom: 0; left: 0; right: 0; background-color: " + ballotBG + "; color: " + ballotText + "; font-size: 16px; font-family: Helvetica, sans-serif; font-weight: lighter; border-top: 5px solid  " +  borderColor + ";'>"+
			"	<div style='text-align: left; position: relative; max-width: 1024px; height: 100%; margin: 0 auto;'>"+
			"		<span id='message-text' style='text-align: " + textAlign + "; padding: " + textPadding + "; word-break: break-word; position: absolute; left: 0; right: 45px;'>" + $ub.selectedMessage.text + "</span>"+
			"		<span style='position: absolute; " + ballotButtonLocation + "'>"+
			"			<a style='text-align: center; border-radius: 3px; background-color: " +  ballotButton + "; color: " + ballotButtonText + "; text-decoration: none; padding: " + buttonHeight + "; width: " + buttonWidth + "; display: inline-block;' href='' id='ub-yes'>Yes</a> "+
			"			<a style='text-align: center; border-radius: 3px; background-color: " +  ballotButton + "; color: " + ballotButtonText + "; text-decoration: none; padding: " + buttonHeight + "; width: " + buttonWidth + "; display: inline-block;' href='' id='ub-no'>No</a>"+
			"		</span>"+
			"	</div>";
		if ( allowmute == 1 ) {
			html += "<div style='position: absolute; bottom: 5px; left: 10px; font-size:10px'> <a href='' id='ub-mute'>Don't show this again</a></div>";
		} else {
			html += "<a href='' id='ub-mute'></a>";
		}
			html += "" +
			"   <div style='position: absolute; bottom: " + bottomLogo + "; " + poweredSide + ": 10px; font-size:10px'><a href='http://www.userballot.com'><img style='width:auto; max-height: 20px;' src='http://www.userballot.com/img/" + powered + "'/></a></div>"+
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

				$ub.updateCount("vote", "y");

				docCookies.setItem($ub.selectedMessage.id,"yes",10 * 365 * 24 * 60 * 60,window.location.host);
				docCookies.setItem('ub-vote-' + window.location.host,"voted",frequency * 24 * 60 * 60, window.location.host);

                req = new XMLHttpRequest();

                // Access control is not set here, this causes an error. This will be fixed when we integrate 
                // Connor's code into ub.php on the app.userballot.com domain
                req.open("GET", UB_URL + "/analytics/visit.php?siteId=" + $ub.siteId);
                req.send();

				document.getElementById("ub-yes").style.display="none";
				document.getElementById("ub-no").style.display="none";
				document.getElementById("message-text").innerHTML = "Thank you!";

				setTimeout(function() {
					$ub.closeMessage();
				}, 500);
			};

			document.getElementById("ub-no").onclick = function(e) {
				e.preventDefault();

				$ub.updateCount("vote", "n");

				docCookies.setItem($ub.selectedMessage.id,"no",10 * 365 * 24 * 60 * 60,window.location.host);
				docCookies.setItem('ub-vote-' + window.location.host,"voted",frequency * 24 * 60 * 60, window.location.host);

                
                // Access control is not set here, this causes an error. This will be fixed when we integrate 
                // Connor's code into ub.php on the app.userballot.com domain
                req.open("GET", UB_URL + "/analytics/visit.php?siteId=" + $ub.siteId);
                req.send();
				
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

			$ub.updateCount("view");

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

$ub.updateCount = function(type, answer) {
	
	var url = UB_URL + "?a=" + type + "&id=" + $ub.siteId + "&q=" + $ub.selectedMessage.id;
	if (answer !== undefined) {
		url += "&t=" + answer;
	}
	req = new XMLHttpRequest();
	req.open("GET", url);
	req.send();

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

$ub.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check; 
};

$ub.windowWidth = function() {
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
};

