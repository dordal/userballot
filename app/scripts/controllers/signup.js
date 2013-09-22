'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth) {
    $scope.email = '';
    $scope.password = '';

    // authenticate a user
    
    $scope.loginerror = {message: 'OK'};
	$scope.addMe = function() {
		var chatRef = new Firebase('https://userballotdb.firebaseIO.com');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    // $location.path('/login/');
		    console.log('2: ' + error );
		  } else if (user) {
		 	// $location.path('/admin/');
		  } 
		});
		auth.createUser($scope.email, $scope.password, function(error, user) {
		  if (!error) {
		  	// $location.path('/admin2/');
		  }
		  else {
		  	// The email is already in use, mabye?
		  	if (error.code == 'EMAIL_TAKEN')
		  	{
		  		$scope.loginerror.message = 'Email is already in use. Did you want to log in?';
		  	}
		  	else {
		  		console.log('3: Error code=' + error.code);
		  	}
		  }
		});
	}

});