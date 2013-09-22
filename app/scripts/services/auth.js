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
       $location.path('/login')
    });
    $rootScope.$on("angularFireAuth:error", function(evt, err) {
        // There was an error during authentication.
        switch(err.code) {
            case 'INVALID_EMAIL':
                alert("Invalid Email Address");
            case 'INVALID_PASSWORD':
                alert("Invalid Password");
            default:
                alert("Unknown Error: " + err.code);
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