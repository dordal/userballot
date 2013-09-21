'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, angularFireCollection) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';

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

			//var userEmail = user.email.replace('.','\.');
			var usersRef = new Firebase("https://userballotdb.firebaseio.com/users");
		    $scope.users = angularFireCollection(usersRef, function(){
		    	console.log($scope.users);
		    });

			// get the sites from the database
		    //var sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites");
		    //angularFire(sitesRef, $scope, "sites");

		    $scope.submit = function() {
			console.log($scope.question);
		    };

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
