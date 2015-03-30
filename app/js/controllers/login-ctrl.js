;(function(){
'use strict';

/* Controllers */

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

        switch(code) {
          case 12: {
            $scope.message = 'Email not found!';
          }
          case 20: {
            $scope.message = 'Invalid password!';
          }
          case 21: {
            $scope.message = 'Incorrect password!';
            $location.path('/login');
            break;
          }
          case 0: {
            $cookieStore.put('token', response.data.token);
            $cookieStore.put('userId', response.data.userId);
            $location.path('/feedmb');
          }
        }
      }, function(error) {
        $scope.message = 'Cannot connect to server. Please try again later!';
        $location.path('/login');
      });
    };
  }]);
})();
