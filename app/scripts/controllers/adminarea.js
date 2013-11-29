'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, $location, angularFire, angularFireAuth, userballotAuthSvc) {
    $scope.sites = [];
    $scope.messages = [];
    $scope.question = '';
    $scope.myError = '';

    var user = $scope.user;

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

			// reset editing on new page loads
			for( var message in $scope.site.messages ){
				$scope.site.messages[message].editing = false;
			}

	    });

	    // Flash updates to the vote counts
		$scope.$watch("site.messages", function(newMessages, oldMessages) {
			if (oldMessages != null) {
				var flashClass = "";
				var messageName = "";

				// Compare old messages to new messages. Figure out if the yes or no vote count was
				// updated and flash the correct one
				for (var message in newMessages) {
					if (newMessages[message].yesVotes != oldMessages[message].yesVotes) {
						flashClass = "yes";
						messageName = message;
					}
					if (newMessages[message].noVotes != oldMessages[message].noVotes) {
						flashClass = "no";
						messageName = message;
					}
					if (newMessages[message].mute != oldMessages[message].mute) {
						flashClass = "mute";
						messageName = message;
					}
					if (newMessages[message].views != oldMessages[message].views) {
						flashClass = "views";
						messageName = message;
					}
				}
				if (flashClass != "") {
	    			$("." + flashClass + "-" + messageName).css("background-color", "#eee");
	    			$("." + flashClass + "-" + messageName).animate({
	    				backgroundColor: "#ffffff"
	    			}, 1000)

				}
			}
		})

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
	            text: $scope.question, yesVotes: 0, noVotes: 0, position: 0, active: 0, views: 0, mute: 0, updated: new Date()
	        };
	    } else {
			this.error = 'Dude you forgot to ask a question...';
	    }

	    $scope.question = '';
	};


    $scope.logout = function() {
		userballotAuthSvc.logout();
    };

    // Turn muting ability off for site
    $scope.setAllowMute = function( muteFlag ) {
    	if (muteFlag) {
    		$scope.site.allowmute = 1;
    	} else {
    		$scope.site.allowmute = 0;
    	}
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
		var old = $scope.site.messages[key].active;
    	$scope.site.messages[key].active = 0;
    	$scope.updateTimestamps(index, 'draft', (old != 0));
	}
	// switch the active state to 1
	$scope.selectActive = function( index ){
		var key = keyAt($scope.site.messages, index);
		var old = $scope.site.messages[key].active;
    	$scope.site.messages[key].active = 1;
    	$scope.updateTimestamps(index, 'active', true, (old != 1));
	}

	// open the message for editing
	$scope.editMessage = function( index ){
		var key = keyAt($scope.site.messages, index);
		$scope.site.messages[key].editing = true;
	}

	// reset all the count fields to 0 
	$scope.resetMessageCount = function( index ) {
		var key = keyAt($scope.site.messages, index);
		var old = $scope.site.messages[key].active;
		$scope.site.messages[key].mute = 0;
		$scope.site.messages[key].views = 0;
		$scope.site.messages[key].yesVotes = 0;
		$scope.site.messages[key].noVotes = 0;
		$scope.updateTimestamps(index, 'reset', (old == 1));
	}
	// update the message
	$scope.updateMessage = function( index ){
		var key = keyAt($scope.site.messages, index);
		$scope.site.messages[key].editing = false;
		$scope.updateTimestamps(index, 'update');
	}

	$scope.updateTimestamps = function( index, action, isChange) {
		console.log("yup");
		var key = keyAt($scope.site.messages, index);
		var ts = new Date();
		switch (action) {
        case 'active':
          if (isChange) {
	        $scope.site.messages[key].startdate = ts;
	        $scope.site.messages[key].enddate = null;	
          }      
          break;
        case 'draft':
          if (isChange) {
          	$scope.site.messages[key].enddate = ts;	
          }
          break;
        case 'reset':
          if (isChange) {
            $scope.site.messages[key].startdate = ts;	
          }
          else {
            $scope.site.messages[key].startdate = null;	
          }
          $scope.site.messages[key].enddate = null;
          break;
        case 'update':
          break;
        }

        $scope.site.messages[key].updated = ts;
	}

});

var keyAt = function(obj, index) {
    var i = 0;
    for (var key in obj) {
        if ((index || 0) === i++) return key;
    }
}


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

