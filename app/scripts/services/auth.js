userballotApp.service('userballotAuthSvc', function(angularFireAuth, $location, $rootScope) {
    var ref = new Firebase('https://userballotdb.firebaseio.com');
    angularFireAuth.initialize(ref, {
        scope: $rootScope, 
        name: "user"
    });

    $rootScope.$on("angularFireAuth:logout", function(evt) {
       // User logged out.
       console.log("logged out");
       $location.path('/login')
    });

    this.logout = function() {
        angularFireAuth.logout();  
    }
});