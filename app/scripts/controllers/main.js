'use strict';

userballotApp.controller('MainCtrl', function($scope,angularFire) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Testacular'
  ];

  $scope.users = [];
  var ref = new Firebase("https://userballotdb.firebaseio.com/users");
  angularFire(ref, $scope, "users");

  console.log($scope.users);

});
