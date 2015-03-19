'use strict';

/* Controllers */
/* jshint node: true */

var ganbareControllers = angular.module('ganbareControllers', []);

// Controller Feed for visitors
ganbareControllers.controller('feedVisitorCtrl', ['$scope',
  function($scope) {
    $scope.title = 'Feed For Visitors';
  }]);

// Controller Login
ganbareControllers.controller('loginCtrl', ['$scope',
  function($scope) {
    $scope.title = 'Login';
  }]);
