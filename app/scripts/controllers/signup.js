'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, $routeParams, angularFire, angularFireAuth, userballotAuthSvc) {
	$scope.email = '';
	$scope.password = '';
	$scope.domain = '';
	$scope.error = null;
	$scope.domainError = null;
	$scope.emailError = null;

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
					site.frequency = 10;
					site.allowmute = 0; // dis-allow muting questions by default

					// TF - not sure we want to associate the first name and last name with the site -- maybe this would be
					// useful for cross-referencing purposes, but I think it makes more sense on the user object.
					site.firstName = $scope.firstName;
					site.lastName = $scope.lastName;
					
					site.messages = {};
					site.messages['default1'] = createMessage("Would you find a mobile version of our website helpful?");
					site.messages['default2'] = createMessage("Would you recommend our products and service to others?");
					site.messages['default3'] = createMessage("If we asked you to describe what we offer you, would that be easy to do?");

					var sitesRef = new Firebase(FIREBASE_DOMAIN + "/sites");

					var siteId = sitesRef.push(site).name();

					var emailId = user.email.replace(/\./g, ',');
					var userRef = new Firebase(FIREBASE_DOMAIN + "/users/");

					var userPromise = angularFire(sitesRef, $scope, 'users');

					var sitesObj = {};
					sitesObj[siteId] = siteId;

					var newUser = userRef.child(emailId);
					newUser.set({firstName: $scope.firstName, lastName: $scope.lastName, email: user.email, sites: sitesObj});
					

					// login the user and redirect to the admin interface
					// console.log("User Reg:", user);
					// If this is a free trial account, redirect to the "getting started" view in the admin area
					if ($routeParams['plan'] === "" || $routeParams['plan'] === "trial") {
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
					$scope.emailError = "Email is already in use. Please login.";
				} else {
					$scope.error = "There was an error.";
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

