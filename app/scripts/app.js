'use strict';

//
// Environment Switching
//
// We switch based on the hostname the site is running under (APP_DOMAIN).
//
// NOTE: IF YOU ADD A DOMAIN HERE, YOU MUST ALSO ADD IT TO CLIENT.JS
//
var APP_DOMAIN = window.location.hostname;
var FIREBASE_DOMAIN;

switch(APP_DOMAIN){
  case 'app.userballot.com':
    FIREBASE_DOMAIN = 'https://userballotdb.firebaseio.com';
  break;
  default:
    // staging & dev hosts go under a single staging DB
    FIREBASE_DOMAIN = 'https://userballotdb-staging.firebaseio.com';
}

// console.log("Current Firebase Domain: " + FIREBASE_DOMAIN);

var userballotApp = angular.module('userballotApp', ['firebase'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/loading', {
        templateUrl: 'views/loading.html',
        controller: "LoadingCtrl"
      })
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
      var ref = new Firebase(FIREBASE_DOMAIN);
      angularFireAuth.initialize(ref, {scope: $rootScope, name: "user", path: '/loading'});
   }]);