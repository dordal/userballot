'use strict';

userballotApp.controller('LoginCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';

	// Function to handle login button submit
	$scope.login = function() {
		userballotAuthSvc.login($scope.email, $scope.password);
		$location.path('/admin');
	}
});
