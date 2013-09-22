'use strict';

<<<<<<< HEAD
userballotApp.controller('LoginCtrl', ["$scope", "angularFire", "angularFireAuth", "userballotAuthSvc", "$location", function($scope, angularFire, angularFireAuth, userballotAuthSvc, $location) {
    $scope.email = '';
    $scope.password = '';


=======
userballotApp.controller('LoginCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';

>>>>>>> 60138760a4bd929715d74a7bd88e8243c637e64a
	// Function to handle login button submit
	$scope.login = function() {
		userballotAuthSvc.login($scope.email, $scope.password);
		 $location.path('/admin');
	}
});
