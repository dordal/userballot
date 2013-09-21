userballotApp.service('userballotAuthSvc', ["angularFireAuth", "$location", "$rootScope", function(angularFireAuth, $location, $rootScope) {
    var ref = new Firebase('https://userballotdb.firebaseio.com');
    angularFireAuth.initialize(ref, {
        scope: $rootScope, 
        name: "user"
    });

    $rootScope.$on("angularFireAuth:login", function(evt, user) {
       // User logged in.
       console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
       $location.path('/admin');
    });
    $rootScope.$on("angularFireAuth:logout", function(evt) {
       // User logged out.
       console.log("logged out");
    });
    $rootScope.$on("angularFireAuth:error", function(evt, err) {
      // There was an error during authentication.
       console.log(error);
                // an error occurred while attempting login
                switch(error.code) {
                    case 'INVALID_EMAIL':
                        alert("invalid email address");
                    case 'INVALID_PASSWORD':
                        alert("invalid password");
                    default:
                }
    });
}])