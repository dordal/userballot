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
       console.log(err);
                // an error occurred while attempting login
                switch(err.code) {
                    case 'INVALID_EMAIL':
                        alert("invalid email address");
                    case 'INVALID_PASSWORD':
                        alert("invalid password");
                    default:
                }
    });

    this.login = function(email, password) {
        console.log("Logging in with", email, password);
        angularFireAuth.login('password', {
            email: email,
            password: password
        });
    }

    this.logout = function() {
        angularFireAuth.logout();
        $location.path("/login");        
    }
}]);