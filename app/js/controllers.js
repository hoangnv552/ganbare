'use strict';

/* Controllers */
/* jshint node: true */

var ganbareControllers = angular.module('ganbareControllers', ['angular-md5']).run(['$rootScope', function($rootScope) {
  $rootScope.token = null;
}]);

// Controller Feed for visitors
ganbareControllers.controller('feedVisitorCtrl', ['$rootScope', '$scope', 'listGanbaru',
  function($rootScope, $scope, listGanbaru) {
    $scope.ganbaru = listGanbaru.query();
    $scope.title = 'Feed For Visitors';

  }]);

// Controller Login
ganbareControllers.controller('loginCtrl', ['$rootScope', '$scope', '$location', 'md5','loginGanbare',
  function($rootScope, $scope, $location, md5, loginGanbare) {
    $scope.title = 'Login';
    $scope.message = '';

    $scope.login = function(){
      var email = $scope.email;
      var password = $scope.password;
      var encryptedPassword = md5.createHash(password || '');
      var code;
      loginGanbare.login({email: email, password: encryptedPassword, loginType: 1}, function(response){

        code = response.code;
        if(code === 0) {
          $rootScope.token = response.data.token;
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

ganbareControllers.controller('viewGanbareCtrl', [function() {
  
}]);
