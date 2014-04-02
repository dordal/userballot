userballotApp.service('userballotAuthSvc', function($firebaseSimpleLogin, $location, $rootScope) {

	// if someone has successfully logged out
	// we want to be sure they are always redirected
	// to the login page
	$rootScope.$on("$firebaseSimpleLogin:logout", function(evt) {
		// User logged out.
		$location.path('/login');
	});

	return {
		// performs the logout 
		logout: function() {
			$rootScope.auth.$logout();
		}
	};
});