/*
 * File : adminarea.js
 *
 * AdminAreaCtrl defines the possible actions within the main UB interface
 * in that it provides control to setup, settings, and the main question
 * creation and incoming data related view
 *
 */

/*jshint globalstrict: true*/

'use strict';

function AdminAreaCtrl( $scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
	$scope.sites = [];
	$scope.messages = [];
	$scope.question = '';
	$scope.myError = '';

	var user = $scope.user;

	// get the logged in user's email
	var loggedInEmail = user.email.replace(/\./g, ',');
	// use this to query the appropriate user
	var url = new Firebase(FIREBASE_DOMAIN + "/users/"+loggedInEmail);
	var userPromise = angularFire(url, $scope, 'user');

	// when this completes use the user data to get their site
	userPromise.then(function(user) {

		var siteId;
		var userSite;
		// you can't access the site due to a random ID
		for (siteId in $scope.user.sites) {
			// reference to the users site
			userSite = $scope.user.sites[siteId];
			break;
		}

		// get the specific site for the user from the database
		$scope.sitesRef = new Firebase(FIREBASE_DOMAIN + "/sites/"+userSite);
		var sitesPromise = angularFire($scope.sitesRef, $scope, "site");

		// when this completes we have the site ID
		sitesPromise.then(function(site) {
			// Assign site ID for easy access
			$scope.site.id = siteId;

			// reset editing on new page loads
			for( var message in $scope.site.messages ){
				$scope.site.messages[message].editing = false;
				$scope.site.messages[message].open = false;
			}

			//reset account detail editing
			$scope.user.editing = false;

		});

		// Flash updates to the vote counts
		$scope.$watch("site.messages", function(newMessages, oldMessages) {
			if (oldMessages != null) {
				var flashClass = "";
				var messageName = "";

				// Compare old messages to new messages. Figure out if the yes or no vote count was
				// updated and flash the correct one
				for (var message in newMessages) {
					if (newMessages[message].yesVotes != oldMessages[message].yesVotes) {
						flashClass = "yes";
						messageName = message;
					}
					if (newMessages[message].noVotes != oldMessages[message].noVotes) {
						flashClass = "no";
						messageName = message;
					}
					if (newMessages[message].mute != oldMessages[message].mute) {
						flashClass = "mute";
						messageName = message;
					}
					if (newMessages[message].views != oldMessages[message].views) {
						flashClass = "views";
						messageName = message;
					}
				}
				if (flashClass !== "") {
					jQuery("." + flashClass + "-" + messageName).css("background-color", "#eee");
					jQuery("." + flashClass + "-" + messageName).animate({
						backgroundColor: "#ffffff"
					}, 1000);

				}
			}
		});

		$scope.$watch('state', function(){
			if($scope.onStateChange){
				$scope.onStateChange();
			}
		}, true);

		// set the default admin area state
		if ($scope.user.firstVisit === undefined || $scope.user.firstVisit == true) {
			$scope.adminViewState('setup');
			$scope.user.firstVisit = false;
		} else {
			$scope.adminViewState('questions');
			
		}
		
	});

	// you would only submit if a valid user
	$scope.submit = function() {

		if($scope.question) {
			if ($scope.site.messages == undefined) {
				$scope.site.messages = {};

			}
			$scope.site.qCount = $scope.site.qCount + 1;
			var count = $scope.site.qCount;
			$scope.site.messages[$scope.sitesRef.push().name()] = {
				text: $scope.question,
				yesVotes: 0,
				noVotes: 0,
				position: count, //itemPosition,
				active: 1, //questions active by default
				views: 0,
				mute: 0,
				updated: new Date()
			};

		}else{
			this.error = 'Dude you forgot to ask a question...';
		}
		$scope.question = '';
	};

	$scope.logout = function() {
		userballotAuthSvc.logout();
	};

	// Turn muting ability off for site
	$scope.setAllowMute = function( muteFlag ) {
		if (muteFlag) {
			$scope.site.allowmute = 1;
		}else{
			$scope.site.allowmute = 0;
		}
	};

	$scope.setShade = function( shade ) {
		$scope.site.shade = shade;
	};

	// remove a message at a specific index based on 
	// a click in the dom
	$scope.removeMessage = function ( index ) {
		if (confirm('Are you sure you want to delete this question?')){
			var key = $scope.keyAt($scope.site.messages, index);
			$scope.site.messages[key] = null;
		}else{
		}
	};

	// switch the active state to 0
	$scope.selectDraft = function( index ){
		var key = $scope.keyAt($scope.site.messages, index);
		var old = $scope.site.messages[key].active;
		$scope.site.messages[key].active = 0;
		$scope.updateTimestamps(index, 'draft', (old != 0));
	};

	// switch the active state to 1
	$scope.selectActive = function( index ){
		var key = $scope.keyAt($scope.site.messages, index);
		var old = $scope.site.messages[key].active;
		$scope.site.messages[key].active = 1;
		$scope.updateTimestamps(index, 'active', true, (old != 1));
	};

	// open the message for editing
	$scope.editMessage = function( index ){
		var key = $scope.keyAt($scope.site.messages, index);
		$scope.site.messages[key].editing = true;
	};


	// reset all the count fields to 0 
	$scope.resetMessageCount = function( index ) {
		if (confirm("Are you sure you want to reset this question's answers?")){
			var key = $scope.keyAt($scope.site.messages, index);
			var old = $scope.site.messages[key].active;
			$scope.site.messages[key].mute = 0;
			$scope.site.messages[key].views = 0;
			$scope.site.messages[key].yesVotes = 0;
			$scope.site.messages[key].noVotes = 0;
			$scope.updateTimestamps(index, 'reset', (old == 1));
		}else{
		}
	};

	$scope.noEditAcct = function( index ) {
		$scope.user.editing = false;
	}

	$scope.editAcct = function( index ) {
		$scope.user.editing = true;
	};

	// update the message
	$scope.updateMessage = function( index ){
		var key = $scope.keyAt($scope.site.messages, index);
		$scope.site.messages[key].editing = false;
		$scope.updateTimestamps(index, 'update');
	};

	$scope.updateTimestamps = function( index, action, isChange) {
		var key = $scope.keyAt($scope.site.messages, index);
		var ts = new Date();
		switch (action) {
			case 'active':
			if (isChange) {
				$scope.site.messages[key].startdate = ts;
				$scope.site.messages[key].enddate = null;
			}
			break;
			case 'draft':
			if (isChange) {
				$scope.site.messages[key].enddate = ts;
			}
			break;
			case 'reset':
			if (isChange) {
				$scope.site.messages[key].startdate = ts;
			}
			else {
				$scope.site.messages[key].startdate = null;
			}
			$scope.site.messages[key].enddate = null;
			break;
			case 'update':
			break;
		}
		$scope.site.messages[key].updated = ts;
	};

	$scope.keyAt = function(obj, index) {
		var i = 0;
		for (var key in obj) {
			if ((index || 0) === i++) return key;
		}
	};


	/**
	 * adminViewState provides a way to keep track of the
	 * admin area state based on a string passed in
	 * 
	 * @param  {string} stateFlag - currently one of:
	 * "questions", "setup", or "settings"
	 * @return {void}   no direct return
	 * 
	 */
	$scope.adminViewState = function( stateFlag ) {

		$scope.adminView = {};

		// default
		$scope.adminView.state = 'questions';
		// otherwise set it to whatever was passed in
		if( stateFlag ){
			$scope.adminView.state = stateFlag;
		}
	};

	$scope.openAnalytics = function(index) {
		var messageId = $scope.keyAt($scope.site.messages, index);
		$scope.site.messages[messageId].open = !$scope.site.messages[messageId].open;
		if ($scope.site.messages[messageId].open) {
			$.ajax( "/analytics/getdata.php?siteId=" + $scope.site.id + "&question=" + messageId  ).done(
				function(msg) {
					
					var analytics = jQuery.parseJSON(msg);
					console.log(analytics);

					var line1 = [['2014-03-06 00:00:00', 60], ['2014-03-06 01:00:00', 56], ['2014-03-06 02:00:00', 50], ['2014-03-06 03:00:00', 55],
					['2014-03-06 04:00:00', 53], ['2014-03-06 05:00:00', 55], ['2014-03-06 06:00:00', 52], ['2014-03-06 07:00:00', 53],
					['2014-03-06 08:00:00', 54], ['2014-03-06 09:00:00', 54], ['2014-03-06 10:00:00', 55], ['2014-03-06 11:00:00', 56]];

					var plot1 = jQuery.jqplot('chart-' + index, [line1], {
						seriesColors: [ "#2ecc71" ],
						title:'Yes Votes',
						axes:{
							xaxis:{
								renderer:jQuery.jqplot.DateAxisRenderer,
								tickOptions:{
									formatString:'%b&nbsp;%#d&nbsp;%H:%M'
								} 
							},
							yaxis:{
								tickOptions:{
									formatString:'%.0f\%'
								},
								min: 0,
								max: 100
							}
						},
						seriesDefaults: {
							fill: true,
							fillAlpha: 0.6,
							fillColor: "#C9F2DB",
							fillAndStroke: true,
							lineWidth: 3
						},
						highlighter: {
							show: true,
							sizeAdjust: 7.5
						},
						cursor: {
							show: false
						}
					});
				}
			);
				
			
		}
	};


}

$(document).ready(function(){  
  
//get the height and width of the page  
var window_width = $(window).width();  
var window_height = $(window).height();  
  
//vertical and horizontal centering of modal window(s)  
/*we will use each function so if we have more then 1 
modal window we center them all*/  
$('.modal_window').each(function(){  
  
    //get the height and width of the modal  
    var modal_height = $(this).outerHeight();  
    var modal_width = $(this).outerWidth();  
  
    //calculate top and left offset needed for centering  
    var top = (window_height-modal_height)/2;  
    var left = (window_width-modal_width)/2;  
  
    //apply new top and left css values  
    $(this).css({'top' : top , 'left' : left});  
  
});  
  
    $('.activate_modal').click(function(){  
  
          //get the id of the modal window stored in the name of the activating element  
          var modal_id = $(this).attr('name');  
  
          //use the function to show it  
          show_modal(modal_id);  
  
    });  
  
    $('.close_modal').click(function(){  
  
        //use the function to close it  
        close_modal();  
  
    });  
  
});  
  
//THE FUNCTIONS  
  
function close_modal(){  
  
    //hide the mask  
    $('#mask').fadeOut(500);  
  
    //hide modal window(s)  
    $('.modal_window').fadeOut(500);  
  
}  
function show_modal(modal_id){  
  
    //set display to block and opacity to 0 so we can use fadeTo  
    $('#mask').css({ 'display' : 'block', opacity : 0});  
  
    //fade in the mask to opacity 0.8  
    $('#mask').fadeTo(500,0.8);  
  
     //show the modal window  
    $('#'+modal_id).fadeIn(500);  
  
}  

/**
 * the updateModelOnBlur directive simply saves data when a user
 * finishes editing a field
 * @return {void} [d
 */
userballotApp.directive('updateModelOnBlur', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elm, attr, ngModelCtrl) {
			if(attr.type === 'radio' || attr.type === 'checkbox') {
				return;
			}

			// Update model on blur only
			elm.unbind('input').unbind('keydown').unbind('change');
			var updateModel = function() {
				scope.$apply(function() {
					ngModelCtrl.$setViewValue(elm.val());
				});
			};
			elm.bind('blur', updateModel);

			// Not a textarea
			if(elm[0].nodeName.toLowerCase() !== 'textarea') {
				// Update model on ENTER
				elm.bind('keydown', function(e) {
					e.which == 13 && updateModel();
				});
			}
		}
	};
});

