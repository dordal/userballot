'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';
    $scope.error = '';
    $scope.urlError = '';
    $scope.emailError = '';

    // authenticate a user
	$scope.register = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
		    var regex = /[A-Za-z0-9_.-]+@[A-Za-z0-9]+\.[a-zA-Z0-9]+/;
		    var emailMatch = $scope.email.match(regex);

		    if (!error && emailMatch) {
			// login the user and redirect to the admin interface
		  	// console.log("User Reg:", user);
		  	$location.path('/admin');
		    } else if (!emailMatch) {
			$scope.emailError = " Not a valid email.";
		    } else {
			if (error.code === 'EMAIL_TAKEN') {
		  	    $scope.emailError = " Email is already in use. Please login.";
			} else {
			    $scope.error = "Registration Error: "  + error.code;
			}
		    }
		});
	};
});

