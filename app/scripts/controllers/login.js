'use strict';

userballotApp.controller('LoginCtrl', function($scope, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';

	// Function to handle login button submit
	$scope.login = function() {
		console.log("Logging in with", $scope.email, $scope.password);
		angularFireAuth.login('password', {
			email: $scope.email,
			password: $scope.password
		});
	}
});
