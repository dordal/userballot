'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, angularFire) {
    $scope.sites = [];

    // authenticate a user
    var userRef = new Firebase('https://userballotdb.firebaseio.com');
	var auth = new FirebaseSimpleLogin(userRef, function(error, user) {

		if (error) {
			console.log(error);
			// an error occurred while attempting login
			switch(error.code) {
			  	case 'INVALID_EMAIL':
			  		alert("invalid email address");
			  	case 'INVALID_PASSWORD':
			  		alert("invalid password");
			  	default:
			}
		} else if (user) {
			// user authenticated with Firebase
			console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

			// get the logged in user's email
			var loggedInEmail = user.email.replace(/\./g, ',');
			// use this to query the appropriate user
			var url = new Firebase("https://userballotdb.firebaseio.com/users/id/"+loggedInEmail);
			var userPromise = angularFire(url, $scope, 'user');
			// when this completes do something
			userPromise.then(function(user) {
				console.log($scope.user);

				var userSite = user.sites.id;

				// get the site for the user from the database
			    var sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites/id/"+userSite);
			    var sitesPromise = angularFire(sitesRef, $scope, "sites");

			    sitesPromise.then(function(sites) {
			    	console.log($scope.sites);
			    });

			});

			

		} else {
			// user is logged out
			console.log("logged out");
		}
	});
	auth.login('password', {
		email: 'test@exavault.com',
		password: 'quaker17'
	});

});
