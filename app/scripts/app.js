'use strict';

//
// Environment Switching
//
// We switch based on the hostname the site is running under (APP_DOMAIN).
//
// NOTE: client.js DOES NOT use this environment file and is hard-coded to 
// the production DB ( userballotdb.firebaseio.com ). We can't easily switch
// there because window.location.hostname returns the name of the site the 
// embed is running on, not something like app.userballot.com. Therefore, if 
// you need to test voting on a staging domain, you should temporarily change 
// the UB_FIREBASE_DOMAIN constant to whatever database you need.
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

var userballotApp = angular.module('userballotApp', ['firebase', 'ui.bootstrap'])
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
      .when('/signup/', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        authRequired: false
      })
      .when('/signup/:plan', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        authRequired: false
      })
      .when('/order/:plan', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl',
        authRequired: false
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
