;(function() {
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
      when('/ganbaru/:ganbaruId', {
        templateUrl: 'partials/view-ganbare-detail.html',
        controller : 'viewGanbareDetailCtrl'
      }).
      when('/creategb', {
        templateUrl: 'partials/create-ganbaru.html',
        controller: 'createGanbaruCtrl'
      }).
      when('/mypage', {
        templateUrl: 'partials/my-page.html',
        controller: 'myPageGanbaruCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
}());
