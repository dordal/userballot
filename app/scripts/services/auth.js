userballotApp.service('userballotAuthSvc', function(angularFireAuth, $location, $rootScope) {
    $rootScope.$on("angularFireAuth:logout", function(evt) {
       // User logged out.
       $location.path('/login')
    });

    this.logout = function() {
        angularFireAuth.logout();  
    }
});