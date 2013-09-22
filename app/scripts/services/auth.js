userballotApp.service('userballotAuthSvc', ["angularFireAuth", "$location", "$rootScope", function(angularFireAuth, $location, $rootScope) {
    var ref = new Firebase('https://userballotdb.firebaseio.com');
    angularFireAuth.initialize(ref, {
        scope: $rootScope, 
        name: "user"
    });

    $rootScope.$on("angularFireAuth:login", function(evt, user) {
       // User logged in.
       console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
       
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
                $rootScope.error = "Invalid email address";
            case 'INVALID_PASSWORD':
                $rootScope.error = "Invalid password";
            default:
                $rootScope.error = "An error has occured, please try again.";
            break;
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
        alert("logout")
        $location.path("/login");        
    }
}]);