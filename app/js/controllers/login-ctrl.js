'use strict';

/* Controllers */
/* jshint node: true */

/*
* Controller Login
*/
ganbareControllers.controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5','loginGanbare',
  function($scope, $cookieStore, $location, md5, loginGanbare) {
    $scope.message = '';

    $scope.login = function(){
      var email = $scope.email;
      var password = $scope.password;
      var encryptedPassword = md5.createHash(password || '');
      var code;
      loginGanbare.login({email: email, password: encryptedPassword, loginType: 1}, function(response){

        code = response.code;
        if(code === 0) {
          $cookieStore.put('token', response.data.token);
          $cookieStore.put('userId', response.data.userId);
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
    };
  }]);
