;(function(){
'use strict';

/* Controllers */

/*
* Controller Login
*/
ganbareControllers.controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5','user',
  function($scope, $cookieStore, $location, md5, user) {
    $scope.error = '';

    $scope.login = function(){
      var email = $scope.email;
      var password = $scope.password;
      var encryptedPassword = md5.createHash(password || ''); //in case user leaves blank
      var code;
      /*call service*/
      user.login({email: email, password: encryptedPassword, loginType: 1}, function(response){

        code = response.code;

        switch(code) {
          case 0: {
            $cookieStore.put('token', response.data.token);
            $cookieStore.put('userId', response.data.userId);
            $location.path('/feedmb');
            break;
          }
          case 1: {
            $scope.error = 'Unknown error. We are sorry for the convenience...';
            $location.path('/login');
            break;
          }
          case 2: {
            $scope.error = "Login unsuccessful. Please re-check your information!";
            break;
          }
          case 12: {
            $scope.error = 'Email not found!';
            $location.path('/login');
            break;
          }
          case 21: {
            $scope.error = 'Incorrect password!';
            $location.path('/login');
            break;
          }
        }
      }, function() {
        $scope.error = 'Cannot establish connection to server!';
        $location.path('/login');
      });
    };
  }]);
})();
