'use strict';

userballotApp.controller('AdminAreaCtrl', function($scope, angularFire) {
    $scope.sites = [];

    // get the sites from the database
    var ref = new Firebase("https://userballotdb.firebaseio.com/sites");
    angularFire(ref, $scope, "sites");

});
