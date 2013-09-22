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
  }]);
