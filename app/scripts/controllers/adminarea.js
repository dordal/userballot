'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';
    $scope.myError = '';

    var user = $scope.user;

	console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

	// get the logged in user's email
	var loggedInEmail = user.email.replace(/\./g, ',');

	// use this to query the appropriate user
	var url = new Firebase("https://userballotdb.firebaseio.com/users/"+loggedInEmail);
	var userPromise = angularFire(url, $scope, 'user');

	var sitesRef;

	// when this completes use the user data to get their site
	userPromise.then(function(user) {

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

	    // when this completes we have the site ID
	    sitesPromise.then(function(site) {
			// Assign site ID for easy access
			$scope.site.id = siteId;

	    });
	});

	// you would only submit if a valid user
	$scope.submit = function() {
	    if($scope.question) {
	    	if ($scope.site.messages == undefined) {
	    		$scope.site.messages = new Object();
	    	}
			$scope.site.messages[sitesRef.push().name()] = {
	            text: $scope.question, yesVotes: 0, noVotes: 0, position: 0, active: 1
	        };
	    }

	    $scope.question = '';
	};


    $scope.logout = function() {
		userballotAuthSvc.logout();
    };

    $scope.removeMessage = function ( index ) {
    	console.log($scope.site.messages);
		$scope.site.messages.splice( index, 1 );
	};
});


userballotApp.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});
