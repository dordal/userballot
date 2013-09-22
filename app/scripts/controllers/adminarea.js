'use strict';

userballotApp.controller('AdminAreaCtrl', ["$scope", "$location", "angularFire", "angularFireAuth", "userballotAuthSvc", function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';

    // load everything on login
    $scope.$on("angularFireAuth:login", function(evt, user) {
		// get the logged in user's email
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

		    $scope.submit = function() {
				console.log($scope.question);
		    };
	});
	$scope.logout = function() {
		userballotAuthSvc.logout();
	}
}]);
