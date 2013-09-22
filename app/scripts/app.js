'use strict';

var userballotApp = angular.module('userballotApp', ['firebase'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/adminarea.html',
        controller: 'AdminAreaCtrl',
        authRequired: true
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/admin'
      });
  }])

   // establish authentication
   .run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope) {
      var ref = new Firebase('https://userballotdb.firebaseio.com');
      angularFireAuth.initialize(ref, {scope: $rootScope, name: "user", path: '/login'});
   }]);