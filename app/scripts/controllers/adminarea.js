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
	// open the message for editing
	$scope.editMessage = function( index ){
		var key = keyAt($scope.site.messages, index);
		$scope.site.messages[key].editing = true;
	}
	// update the message
	$scope.updateMessage = function( index ){
		var key = keyAt($scope.site.messages, index);
		console.log($scope.site.messages[key]);
		$scope.site.messages[key].editing = false;
	}

});

var keyAt = function(obj, index) {
    var i = 0;
    for (var key in obj) {
        if ((index || 0) === i++) return key;
    }
}

userballotApp.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});

userballotApp.directive('updateModelOnBlur', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elm, attr, ngModelCtrl)
    {
      if(attr.type === 'radio' || attr.type === 'checkbox')
      {
        return;
      }

      // Update model on blur only
      elm.unbind('input').unbind('keydown').unbind('change');
      var updateModel = function()
      {
        scope.$apply(function()
        {
          ngModelCtrl.$setViewValue(elm.val());
        });
      };
      elm.bind('blur', updateModel);

      // Not a textarea
      if(elm[0].nodeName.toLowerCase() !== 'textarea')
      {
        // Update model on ENTER
        elm.bind('keydown', function(e)
        {
          e.which == 13 && updateModel();
        });
      }
    }
  };
});
