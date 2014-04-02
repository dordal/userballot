'use strict';

userballotApp.controller('OrderCtrl', function($scope, $location, $http, $routeParams, $firebase, userballotAuthSvc) {
	$scope.formData = {};
	$scope.generalError = null;
	$scope.submitting = false;

	var APP_DOMAIN = window.location.hostname;
	
	// Set the Stripe API key. Stripe library is included in the template
	switch(APP_DOMAIN){
		case 'app.userballot.com':
			// Set production Stripe key
			Stripe.setPublishableKey('pk_live_YFL2ah0sPFrgonpwoIHqd4VB');
		break;
		default:
			// Set test Stripe key for staging
			Stripe.setPublishableKey('pk_test_XXkWU5p7DzBrBqIAqOIjtEzL');
		break;
	}
	// so we display the right plan
	$scope.plan = $routeParams.plan;

	// Define the response handler for Stripe
	$scope.stripeResponseHandler = function(status, response) {

		// we need to get data from our logged-in user to do this
		$scope.auth.$getCurrentUser().then(function(user){

			var $form = $('#order-form');

			if (response.error) {
				// Show the errors on the form
				$scope.generalError = response.error.message;
				$scope.submitting = false;
			} else {
				$scope.generalError = "";
				// token contains id, last4, and card type
				var token = response.id;
				// Insert the token into the form so it gets submitted to the server
				$scope.formData.stripeToken = token;
				$scope.formData.plan = $routeParams.plan;
				$scope.formData.email = user.email;
				
				// Submit the form the order processor
				$http({
					method  : 'POST',
					url     : 'order.php',
					data    : $.param($scope.formData),  // pass in data as strings
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
				})
				.success(function(data) {
					// Yay, we've saved our token and set up the subscription. Now associate the plan with the user in Firebase
					if (data.success) {
						// get the logged in user's email
						var emailId = user.email.replace(/\./g, ',');

						// save the new plan type to the user's account
						var userRef = new Firebase(FIREBASE_DOMAIN + "/users/" + emailId);
						$scope.user = $firebase(userRef);
						$scope.user.planType = $routeParams.plan;
						$scope.user.$save('planType');

						// Redirect back to the admin area
						$location.path('/admin/');
						
					} else {
						$scope.generalError = data.error;
						$scope.submitting = false;
					}
				});
			}
		});
	};

	// process a new order
	$scope.placeOrder = function() {
		var form = document.getElementById("order-form");

		// Disable the submit button to prevent repeated clicks
		$scope.submitting = true;

		Stripe.card.createToken(form, $scope.stripeResponseHandler);

		// Prevent the form from submitting with the default action
		return false;
	};

	// helper to call the logout service if need
	// be. (there is a logout link in this page)
	$scope.logout = function() {
		userballotAuthSvc.logout();
	};

});