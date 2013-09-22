'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth) {
    $scope.email = '';
    $scope.password = '';

    // authenticate a user
    

	$scope.addMe = function() {
		var chatRef = new Firebase('https://userballotdb.firebaseIO.com');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		 // 	auth.logout();
		  } else {
		    // user is logged out
		  }
		});
		$scope.email = $scope.form.email;
		$scope.password = $scope.form.password;
		auth.createUser($scope.form.email, $scope.form.password, function(error, user) {
		  if (!error) {
		  	$location.path('/admin/');
		  }
		  else {
		  	if ( error == 'Error: The specified email address is already in use') {
		  		auth.login('password',$scope.email, $scope.password);
		  	}
		  	else console.log(error + ' ' + $scope.email + ' ' + $scope.password);
		  }
		});
	}

});