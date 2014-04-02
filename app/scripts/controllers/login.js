'use strict';

userballotApp.controller('LoginCtrl', function($scope, $rootScope, $location, $firebaseSimpleLogin) {

    // Handle login button submit
    $scope.login = function() {
        $rootScope.auth.$login('password', {
            email: $scope.email,
            password: $scope.password
        });
    };

    // Handle and report errors
    $scope.$on("$firebaseSimpleLogin:error", function(evt, error) {

        // There was an error during authentication.
        switch(error.code) {

            case 'INVALID_EMAIL':
                $scope.emailError = "Invalid email or password";
            break;
            case 'INVALID_PASSWORD':
                $scope.passwdError = "Invalid email or password";
            break;
            case 'INVALID_USER':
                $scope.error = "Unable to find a user with email: " + $scope.email;
                break;
            default:
                $scope.error = "Login Error: " + error.code;
        }
    });

    // Success function to redirect to admin page
    $scope.$on("$firebaseSimpleLogin:login", function(evt, user) {
        $location.path('/admin');
    });
});