'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';
    $scope.passwordConfirm = '';

    // authenticate a user
	$scope.register = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
		  if (!error) {
		  	console.log("User reg successful.", user);
		  	// $location.path('/admin2/');
		  } else {
		  	// The email is already in use, mabye?
		  	if (error.code == 'EMAIL_TAKEN')
		  	{
		  		console.log("error here: ", error.code);
		  		$scope.loginerror = "BLAH";
		  		alert("Email is already in use. Did you want to log in?");
		  	}
		  	else {
		  		console.log('3: Error code=' + error.code);
		  	}
		  }
		});
	}
});