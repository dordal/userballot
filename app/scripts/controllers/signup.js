'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';

    // authenticate a user
	$scope.register = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
		  if (!error) {
		  	// login the user and redirect to the admin interface
		  	// console.log("User Reg:", user);
		  	$location.path('/admin');
		  } else {
		  	// The email is already in use, mabye?
		  	if (error.code == 'EMAIL_TAKEN') {
		  		$scope.error = "Email is already in use. Please login.";
		  	} else if (error.code == 'INVALID_EMAIL') {
		  		$scope.error = "Email address is invalid. Please try again."
		  	}else {
		  		$scope.error = "Registration Error: "  + error.code;
		  	}
		  }
		});
	}
});