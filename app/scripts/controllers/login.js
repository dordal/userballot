'use strict';

userballotApp.controller('LoginCtrl', function($scope, $location, angularFire) {
    $scope.email = '';
    $scope.password = '';

    // authenticate a user
    var userRef = new Firebase('https://userballotdb.firebaseio.com');
	var auth = new FirebaseSimpleLogin(userRef, function(error, user) {
		if (error) {
			console.log(error);
			// an error occurred while attempting login
			switch(error.code) {
			  	case 'INVALID_EMAIL':
			  		alert("invalid email address");
			  	case 'INVALID_PASSWORD':
			  		alert("invalid password");
			  	default:
			}
		} else if (user) {
			// user authenticated with Firebase
			console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
			$location.path('/admin');
		} else {
			// user is logged out
			console.log("logged out");
		}
	});

	$scope.login = function() {
		console.log("Logging in with", $scope.email, $scope.password);
		auth.login('password', {
			email: $scope.email,
			password: $scope.password
		});
	}

});
