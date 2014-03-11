'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, $routeParams, angularFire, angularFireAuth, userballotAuthSvc) {
	$scope.email = '';
	$scope.password = '';
	$scope.repassword = '';
	$scope.domain = '';
	$scope.error = null;
	$scope.domainError = null;
	$scope.emailError = null;

	$scope.pcheck = function() {
		if ($scope.password != $scope.repassword) {
			return true;
		}
	}
	
	// authenticate a user
	$scope.register = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
			var emailRegex = /[a-zA-Z0-9_.-]+@[A-Za-z0-9]+\.[a-zA-Z0-9]+/;
			var domainRegex = /((http|https)\:\/\/)?[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+/;
			var emailMatch = $scope.email.match(emailRegex);
			//var domainMatch = $scope.domain.match(domainRegex);

			$scope.emailError = null;

			if (!error && emailMatch) {
				angularFireAuth.login("password", {email: $scope.email, password: $scope.password}).then(function() {
					var site = {};
					//site.domain = $scope.domain;
					site.hue = "#2ecc71"; // questions are "userballot green" by default
					site.shade = "light";
					site.frequency = 10;
					site.allowmute = 0; // dis-allow muting questions by default
					site.qCount = 0;
					
					site.messages = {};
					site.messages['default1'] = createMessage("Would you find a mobile version of our website helpful?");
					site.messages['default2'] = createMessage("Would you recommend our products and service to others?");
					site.messages['default3'] = createMessage("If we asked you to describe what we offer you, would that be easy to do?");

					var sitesRef = new Firebase(FIREBASE_DOMAIN + "/sites");

					var siteId = sitesRef.push(site).name();

					var emailId = user.email.replace(/\./g, ',');
					site.userEmailId = emailId;
					var userRef = new Firebase(FIREBASE_DOMAIN + "/users/");

					var userPromise = angularFire(sitesRef, $scope, 'users');

					var sitesObj = {};
					sitesObj[siteId] = siteId;

					var newUser = userRef.child(emailId);
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
			} else if ( !(emailMatch) || error.code === 'EMAIL_TAKEN' ) {
				if (!emailMatch) {
					$scope.emailError = "Invalid email.";
				}

				if (error.code === 'EMAIL_TAKEN') {
					$scope.emailError = "Email is already in use. Please login here.";
				} else {
					$scope.error = "Please check that all forms have been filled out and are correct.";
				}
			}
			// log in manually, set noLogin to true
		}, true);
	};
});

function createMessage(messageText) {
	var message = {};
	message['text'] = messageText;
	message['noVotes'] = 0;
	message['yesVotes'] = 0;
	message['views'] = 0;
	message['mute'] = 0;
	message['position'] = 0;
	message['active'] = 1;
	return message;
}

