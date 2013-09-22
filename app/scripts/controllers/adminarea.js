'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';

    // load everything on login
    $scope.$on("angularFireAuth:login", function(evt, user) {

		console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

		// get the logged in user's email
		var loggedInEmail = user.email.replace(/\./g, ',');
		// use this to query the appropriate user
		var url = new Firebase("https://userballotdb.firebaseio.com/users/"+loggedInEmail);
		var userPromise = angularFire(url, $scope, 'user');

		// when this completes do something
		userPromise.then(function(user) {
			//console.log($scope.user);

			// you can't access the site due to a random ID
			for (var siteId in $scope.user.sites) {
				// reference to the users site
				var userSite = $scope.user.sites[siteId];
				break;
			}

			// get the specific site for the user from the database
		    var sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites/"+userSite);
		    var sitesPromise = angularFire(sitesRef, $scope, "site");

		    // when this completes do something
		    sitesPromise.then(function(site) {
		    	console.log($scope.site.messages);
		    });
		});

		// you would only submit if a valid user
	    $scope.submit = function() {
			$scope.messages.push($scope.question);
	    };
	});

	$scope.logout = function() {
		angularFireAuth.logout();
		$location.path("/login");
	}

});
