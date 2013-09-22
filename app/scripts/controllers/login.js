'use strict';

userballotApp.controller('LoginCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';

   	console.log(userballotAuthSvc);

	// Function to handle login button submit
	$scope.login = function() {
		userballotAuthSvc.login($scope.email, $scope.password);
	}
});
