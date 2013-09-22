'use strict';

userballotApp.controller('LoginCtrl', ["$scope", "angularFire", "angularFireAuth", "userballotAuthSvc", "$location", function($scope, angularFire, angularFireAuth, userballotAuthSvc, $location) {
    $scope.email = '';
    $scope.password = '';

	// Function to handle login button submit
	$scope.login = function() {
		userballotAuthSvc.login($scope.email, $scope.password);
		 $location.path('/admin');
	}

}]);
