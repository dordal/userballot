'use strict';

userballotApp.controller('LoginCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';
	$scope.error = null;

	// Handle login button submit
	$scope.login = function() {
        console.log("Logging in with", $scope.email, $scope.password);
        angularFireAuth.login('password', {
            email: $scope.email,
            password: $scope.password
        });
	}

	// Handle and report errors
    $scope.$on("angularFireAuth:error", function(evt, error) {
        // There was an error during authentication.
        switch(error.code) {
            case 'INVALID_EMAIL':
                $scope.error = "Invalid Email Address";
            break;
            case 'INVALID_PASSWORD':
                $scope.error = "Invalid Password";
            break;
            case 'INVALID_USER':
            	$scope.error = "Unable to find a user with email: " + $scope.email;
           	break;
            default:
                $scope.error = "Login Error: " + error.code;
        }
    });

    // Success function to redirect to admin page
 	$scope.$on("angularFireAuth:login", function(evt, user) {
        $location.path('/admin');
    });    
});
