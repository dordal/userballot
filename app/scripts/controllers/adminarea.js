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

	    /*
	    sitesRef.on('child_added', function(snapshot) {
	    	var snapVal = snapshot.val();
	    	if (snapshot.name() == 'messages') {
	    		snapshot.ref().on('child_changed', function(messageSnapshot) {
	    			var messageName = messageSnapshot.name();
	    			$(".yes-" + messageName).css("background-color", "#00FF00");
	    			$(".yes-" + messageName).animate({
	    				backgroundColor: "#FFF"
	    			}, 1000)
	    		})
	    	}
		});
		*/

		 $scope.$watch('state', function(){
            if ($scope.onStateChange){
              $scope.onStateChange();
            }
        }, true);
	});

	// you would only submit if a valid user
	$scope.submit = function() {
	    if($scope.question) {
	    	if ($scope.site.messages == undefined) {
	    		$scope.site.messages = new Object();
	    	}
			$scope.site.messages[sitesRef.push().name()] = {
	            text: $scope.question, yesVotes: 0, noVotes: 0, position: 0, active: 0
	        };
	    } else {
			this.error = 'Dude you forgot to ask a question...';
	    }

	    $scope.question = '';
	};


    $scope.logout = function() {
		userballotAuthSvc.logout();
    };

    // remove a message at a specific index based on 
    // a click in the dom
    $scope.removeMessage = function ( index ) {
    	var key = keyAt($scope.site.messages, index);
    	$scope.site.messages[key] = null;
	};
	// switch the active state to 0
	$scope.selectDraft = function( index ){
		var key = keyAt($scope.site.messages, index);
    	$scope.site.messages[key].active = 0;
	}
	// switch the active state to 1
	$scope.selectActive = function( index ){
		var key = keyAt($scope.site.messages, index);
    	$scope.site.messages[key].active = 1;
	}

});

var keyAt = function(obj, index) {
    var i = 0;
    for (var key in obj) {
        if ((index || 0) === i++) return key;
    }
}

userballotApp.directive('highlightChanges', function(){
  return {
    link: function(scope, elm, attrs, ctrl) {
      scope.$watch('value', function(){
        var bgColor = $(elm).css('backgroundColor');
        //$(elm).text(scope.value);
        $(elm).css('backgroundColor', '#37AFD3');
        $(elm).animate({
          backgroundColor: "white"
        }, 1000);
      }, true);
    }
  };
});
