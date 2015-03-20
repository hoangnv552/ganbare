'use strict';

/* App Module **/
/*jslint node: true*/

var ganbareApp = angular.module('ganbareApp', [
  'ngRoute',
  'ganbareControllers',
  'ganbareServices'
]);

ganbareApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/feedfv', {
        templateUrl: 'partials/feed-for-visitors.html',
        controller : 'feedVisitorCtrl'
      }).
      when('/login',{
        templateUrl: 'partials/login.html',
        controller : 'loginCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
