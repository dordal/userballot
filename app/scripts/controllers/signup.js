'use strict';

userballotApp.controller('SignupCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.email = '';
    $scope.password = '';
    $scope.domain = '';
    $scope.error = null;

    // authenticate a user
	$scope.register = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
		  if (!error) {

		  	var site = new Object();
		  	site.domain = $scope.domain;
		  	site.frequency = 10;
		  	site.label = "Test";

		  	var sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites");

	  		var siteId = sitesRef.push(site).name();

		  	var emailId = user.email.replace(/\./g, ',');
		  	var userRef = new Firebase("https://userballotdb.firebaseio.com/users/");

		  	var userPromise = angularFire(sitesRef, $scope, 'users');

	  		var sitesObj = new Object();
		  	sitesObj[siteId] = siteId;

		  	var newUser = userRef.child(emailId);
	  		newUser.set({email: user.email, sites: sitesObj})

	  		// login the user and redirect to the admin interface
	  		// console.log("User Reg:", user);
	  		$location.path('/admin');

		  } else {
		  	// The email is already in use, mabye?
		  	if (error.code == 'EMAIL_TAKEN') {
		  		$scope.error = "Email is already in use. Please login.";
		  	}else {
		  		$scope.error = "Registration Error: "  + error.code;
		  	}
		  }
		});
	}
});