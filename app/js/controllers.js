'use strict';

/* Controllers */
/* jshint node: true */

var ganbareControllers = angular.module('ganbareControllers', ['angular-md5']);

// Controller Feed for visitors
ganbareControllers.controller('feedVisitorCtrl', ['$scope', 'listGanbaru',
  function($scope, listGanbaru) {

    $scope.ganbaru = listGanbaru.query();
    $scope.title = 'Feed For Visitors';

  }]);

// Controller Login
ganbareControllers.controller('loginCtrl', ['$scope', '$location', 'md5','loginGanbare',
  function($scope, $location, md5, loginGanbare) {
    $scope.title = 'Login';
    $scope.message = '';

    $scope.login = function(){
      var email = $scope.email;
      var password = $scope.password;
      var encryptedPassword = md5.createHash(password);
      var code;
      loginGanbare.login({email: email, password: encryptedPassword, loginType: 1}, function(res){

        code = res.code;
        if(code === 0) {
          $location.path('/feedfv');
        }
        else {
          if(code === 12) {
            $scope.message = 'Email not found!';
          }
          else if(code === 20) {
            $scope.message = 'Invalid password!';
          }
          else if(code === 21) {
            $scope.message = 'Incorrect password!';
          }
          $location.path('/login');
        }
      }, function(error) {
        $scope.message = 'Cannot connect to server. Please try again later!';
        $location.path('/login');
      });
    }
  }]);
