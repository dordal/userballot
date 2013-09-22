userballotApp.service('userballotAuthSvc', function(angularFireAuth, $location, $rootScope) {

    $rootScope.$on("angularFireAuth:logout", function(evt) {
       // User logged out.
       console.log("logged out");
       $location.path('/login')
    });

    this.logout = function() {
        angularFireAuth.logout();  
    }
});