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
function AdminAreaCtrl( $scope, $firebase, userballotAuthSvc) {

	/**
	 * initView: called when the view initializes
	 * @return {void}
	 */
	$scope.initView = function() {
		
		// at this point the user needs to be authenticated
		// before we can do anything, so we use the promise.then
		// callback to determine when that has happened 
		$scope.auth.$getCurrentUser().then(function(user){

			// get the logged in user's email
			var loggedInEmail = user.email.replace(/\./g, ',');

			// use this to query the appropriate user
			var userDataRef = new Firebase(FIREBASE_DOMAIN + "/users/"+loggedInEmail);
			$scope.userData = $firebase(userDataRef);

			// this is our user to edit throughout this controller
			// (once bound) ACCESSED AS: $scope.user
			$scope.userData.$bind($scope, 'user').then(function() {

				var siteId;
				var userSite;
				// you can't access the site due to a random ID
				for (siteId in $scope.user.sites) {
					// reference to the users site
					userSite = $scope.user.sites[siteId];
					break;
				}
				
				// get vote count
				var currentDate = new Date();
				var currentMonth= ('0'+(currentDate.getMonth()+1)).slice(-2);
				var currentYear = currentDate.getFullYear();
				var voteCount = 0;
				if ($scope.user.votes && $scope.user.votes[currentYear] &&
						$scope.user.votes[currentYear][currentMonth])
				{
					voteCount = $scope.user.votes[currentYear][currentMonth];
				}
				$scope.user.voteCount = voteCount;
								
				// get the specific site for the user from the database
				// we set the ref in scope here so we can push to the
				// site object from other methods
				$scope.siteRef = new Firebase(FIREBASE_DOMAIN + "/sites/"+userSite);
				$scope.siteData = $firebase($scope.siteRef);

				// this is our site to read/write to throughout this
				// controller (once bound) ACCESSED AS: $scope.site
				$scope.siteData.$bind($scope, 'site').then(function() {

					// Assign site ID for easy access
					$scope.site.id = siteId;

					// reset editing on new page loads
					for( var message in $scope.site.messages ){
						$scope.site.messages[message].editing = false;
					}

					//reset account detail editing
					$scope.user.editing = false;
					$scope.user.editingEmail = false;

					// reset the "alertTab" flag
					if ($scope.user.alertTab === true) {
						$scope.user.alertTab = false;
					}

				});

				// set the default admin area state
				if (typeof $scope.user.firstVisit === 'undefined' || $scope.user.firstVisit === true) {
					$scope.adminViewState('setup');
					$scope.user.firstVisit = false;
				} else {
					$scope.adminViewState('questions');
				}

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
		
			}); // close of: $scope.userData.$bind($scope, 'user').then...
				
		}); //close of: $scope.auth.$getCurrentUser()
	};

	/**
	 * submit: called when a user attempts to add
	 * a new question
	 * 
	 * @return {void}
	 */
	$scope.submit = function() {
		if($scope.question) {
			// if there are no questions (messages) in
			// the site object we create a new object for it
			if (typeof $scope.site.messages === 'undefined') {
				$scope.site.messages = {};
			}
			// if there is no reference to the number of questions
			// associated with this site in our object we should
			// create that 
			if (typeof $scope.site.qCount === 'undefined') {
				$scope.site.qCount = 0;
			}
			// and add one to the count for this new question
			$scope.site.qCount = $scope.site.qCount + 1;
			
			// add the question
			$scope.site.messages[$scope.siteRef.push().name()] = {
				text: $scope.question,
				yesVotes: 0,
				noVotes: 0,
				position: $scope.site.qCount, //itemPosition,
				active: 1, //questions active by default
				views: 0,
				mute: 0,
				updated: new Date()
			};

		}else{
			this.error = 'Dude you forgot to ask a question...';
		}
		// reset this so the "Ask a new question" box
		// is empty for the next one
		$scope.question = '';
	};

	// helper function for logging out that calls
	// the auth service
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

	// update the site with the desired
	// shade (or really theme)
	$scope.setShade = function( shade ) {
		$scope.site.shade = shade;
	};

	// remove a message at a specific index based on 
	// a click in the dom
	$scope.removeMessage = function ( message ) {
		if (confirm('Are you sure you want to delete this question?')){
			// loop through the site messages to find the passed in message
			for (var i in $scope.site.messages) {
				if ($scope.site.messages[i] == message) {
					$scope.site.messages[i] = null;
				}
			}
		}
	};

	// switch the active state to 0
	$scope.selectDraft = function( message ){
		var old = message.active;
		message.active = 0;
		$scope.updateTimestamps(message, 'draft', (old != 0));
	};

	// switch the active state to 1
	$scope.selectActive = function( message ){
		var old = message.active;
		message.active = 1;
		$scope.updateTimestamps(message, 'active', true, (old != 1));
	};

	// open the message for editing
	$scope.editMessage = function( message ){
		message.editing = true;
	};


	// reset all the count fields to 0 
	$scope.resetMessageCount = function( message ) {
		if (confirm("Are you sure you want to reset this question's answers?")){
			var old = message.active;
			message.mute = 0;
			message.views = 0;
			message.yesVotes = 0;
			message.noVotes = 0;
			$scope.updateTimestamps(message, 'reset', (old == 1));
		}
	};

	$scope.noEditAcct = function( index ) {
		$scope.user.editing = false;
	};

	$scope.editAcct = function( index ) {
		$scope.user.editing = true;
	};

	$scope.noEditAcctEmail = function( index ) {
		$scope.user.editingEmail = false;
	};

	$scope.editAcctEmail = function( index ) {
		$scope.user.editingEmail = true;
	};

	$scope.alertTab = function() {
		$scope.user.alertTab = true;
	};

	$scope.alertTabClose = function() {
		$scope.user.alertTab = false;
	}

	// update the message
	$scope.updateMessage = function( message ){
		message.editing = false;
		$scope.updateTimestamps(message, 'update');
	};

	$scope.updateTimestamps = function( message, action, isChange) {
		var ts = new Date();
		switch (action) {
			case 'active':
			if (isChange) {
				message.startdate = ts;
				message.enddate = null;
			}
			break;
			case 'draft':
			if (isChange) {
				message.enddate = ts;
			}
			break;
			case 'reset':
			if (isChange) {
				message.startdate = ts;
			}
			else {
				message.startdate = null;
			}
			message.enddate = null;
			break;
			case 'update':
			break;
		}
		message.updated = ts;
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
		$scope.user.alertTab = false;
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

