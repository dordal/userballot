'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, $routeParams, $firebase, userballotAuthSvc) {


	$scope.error = null;
	$scope.emailError = null;

	
	/**
	 * register: create a new user in Firebase Simple Login, and 
	 * create a user to match directly in our Firebase datastore
	 * 
	 * @return {void}
	 */
	$scope.register = function() {

		// use the AngularFire $createUser method to add an entry
		// to Firebase Simple Login 
		$scope.auth.$createUser($scope.email, $scope.password, true)
			// when that has completed
			.then(
			// on success
			function(result) {

				var emailRegex = /[a-zA-Z0-9_.-]+@[A-Za-z0-9]+\.[a-zA-Z0-9]+/;
				var domainRegex = /((http|https)\:\/\/)?[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+/;
				var emailMatch = $scope.email.match(emailRegex);

				$scope.emailError = null;

				if (emailMatch) {
					$scope.auth.$login("password", {email: $scope.email, password: $scope.password}).then(function(user) {

						// site object to build on
						var site = {};
						
						// questions are "userballot green" by default
						site.hue = "#2ecc71";
						site.shade = "light";
						site.frequency = 10;
						// disallow muting questions by default
						site.allowmute = 0;
						site.qCount = 0;
						
						// nested messages object for defaults
						// displayed with every new account
						site.messages = {};
						site.messages['default1'] = $scope.createMessage("Would you find a mobile version of our website helpful?");
						site.messages['default2'] = $scope.createMessage("Would you recommend our products and service to others?");
						site.messages['default3'] = $scope.createMessage("If we asked you to describe what we offer you, would that be easy to do?");

						// and escape the email
						var emailId = user.email.replace(/\./g, ',');
						// add it to the site object
						site.userEmailId = emailId;

						// push the default site data into a new site
						var sitesRef = new Firebase(FIREBASE_DOMAIN + "/sites");
						var siteId = sitesRef.push(site).name();
						
						// instantiate a firebase reference to /users
						// so we can add a new one there
						var userRef = new Firebase(FIREBASE_DOMAIN + "/users/");

						// populate new user object with mirrored information
						// including a reference to their Site ID
						// so we can look up the site based on the user
						var sitesObj = {};
						sitesObj[siteId] = siteId;
						
						// escaped email (from emailId above) will also be the
						// top level key for the user
						var newUser = userRef.child(emailId);
						
						// add everything else to the user, and 
						// we're done with this part of the process
						newUser.set({firstName: $scope.firstName, lastName: $scope.lastName, email: user.email, sites: sitesObj});
						
						// Inject conversion tracking iframe into page so we track this in Adwords
						jQuery("body").append('<iframe src="/conversion.html" width="0" height="0"/>');

						// Fire event for GA conversion tracking
						ga('send', 'event', 'Account', 'Create');

						// login the user and redirect to the admin interface
						// If this is a free trial account, redirect to the "getting started" view in the admin area
						if ($routeParams['plan'] === undefined || $routeParams['plan'] === "trial") {
							$location.path('/admin');
						} else {
							$location.path('/order/' + $routeParams['plan']);
						}
					});

				}else{
					$scope.emailError = "Invalid email.";
				}

			// on error
			}, function(error) {
				// look at the return code from firebase,
				// or give a generic error
				if (error.code === 'EMAIL_TAKEN') {
					$scope.emailError = "Email is already in use. <a href='#/login'>Please log in</a>.";
				} else {
					$scope.error = "Please check that all forms have been filled out and are correct.";
				}
			}
		);
	};

	/**
	 * createMessage: helper method used here for populating
	 * the user's default message set
	 * 
	 * @param  {string} messageText the content of the message
	 * @return {object}             the message object
	 */
	$scope.createMessage = function(messageText) {
		var message = {};
		message['text'] = messageText;
		message['noVotes'] = 0;
		message['yesVotes'] = 0;
		message['views'] = 0;
		message['mute'] = 0;
		message['position'] = 0;
		message['active'] = 1;
		return message;
	};

	/**
	 * pcheck: check the password matches
	 * @return {[type]} [description]
	 */
	$scope.pcheck = function() {
		return ($scope.password !== $scope.repassword);
	};

});