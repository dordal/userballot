'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';
    $scope.error = null;

<<<<<<< HEAD
    // load everything on login
    $scope.$on("angularFireAuth:login", function(evt, user) {

		console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

		// get the logged in user's email
		var loggedInEmail = user.email.replace(/\./g, ',');
		// use this to query the appropriate user
		var url = new Firebase("https://userballotdb.firebaseio.com/users/"+loggedInEmail);
		var userPromise = angularFire(url, $scope, 'user');

		var sitesRef;

		// when this completes do something
		userPromise.then(function(user) {
			//console.log($scope.user);
			var siteId;
			// you can't access the site due to a random ID
			for (siteId in $scope.user.sites) {
				// reference to the users site
				var userSite = $scope.user.sites[siteId];
				break;
			}

			// get the specific site for the user from the database
		    sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites/"+userSite);
		    var sitesPromise = angularFire(sitesRef, $scope, "site");

		    // when this completes do something
		    sitesPromise.then(function(site) {
		    	// Assign site ID for easy access
		    	$scope.site.id = siteId;
		    	console.log($scope.site.messages);
		    });
		});

		// you would only submit if a valid user
	$scope.submit = function() {

	    if($scope.question) {
		$scope.site.messages[sitesRef.push().name()] = {
	            text: $scope.question, yesVotes: 0, noVotes: 0, position: 0, active: 1
	        };
	    } else {
		this.error = 'Dude you for got to ask a question...';
	    }

	    $scope.question = '';
	};
    });

	$scope.logout = function() {
		userballotAuthSvc.logout();
	};
=======
    var url = new Firebase("https://userballotdb.firebaseio.com");
    angularFireAuth.initialize(url, {scope: $scope, name: "user"});

    var user = $scope.user;
    /*if (user == null) {
   		$location.path("/login");
   		return;      
    }*/
	//console.log('ADMIN AREA CTRL: User ID: ' + user.id + ', Provider: ' + user.provider);

	// get the logged in user's email
	var loggedInEmail = user.email.replace(/\./g, ',');
	// use this to query the appropriate user
	var url = new Firebase("https://userballotdb.firebaseio.com/users/"+loggedInEmail);
	var userPromise = angularFire(url, $scope, 'user');

	var sitesRef;

	// when this completes do something
	userPromise.then(function(user) {
		//console.log($scope.user);
		var siteId;
		// you can't access the site due to a random ID
		for (siteId in $scope.user.sites) {
			// reference to the users site
			var userSite = $scope.user.sites[siteId];
			break;
		}

		// get the specific site for the user from the database
	    sitesRef = new Firebase("https://userballotdb.firebaseio.com/sites/"+userSite);
	    var sitesPromise = angularFire(sitesRef, $scope, "site");

	    // when this completes do something
	    sitesPromise.then(function(site) {
	    	// Assign site ID for easy access
	    	$scope.site.id = siteId;
	    	console.log($scope.site.messages);
	    });
	});

	$scope.logout = function() {
		userballotAuthSvc.logout();
	}

	// you would only submit if a valid user
    $scope.submit = function() {
    	$scope.site.messages[sitesRef.push().name()] = {
         	text: $scope.question, yesVotes: 0, noVotes: 0, position: 0, active: 1
        };
	$scope.question = '';
    };

>>>>>>> a031b9e6eedd381b3f55dfd44b4de0ac2fe6affe
});


userballotApp.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});
