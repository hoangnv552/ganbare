;(function(){
'use strict';

/* Controllers */

/*
* Controller Login
*/
ganbareControllers.controller('loginCtrl', ['$rootScope', '$scope', '$cookieStore','$location', 'md5','user', 
  function($rootScope, $scope, $cookieStore, $location, md5, user) {
    $scope.error = '';

    $scope.login = function() {

      $scope.user = new user();
      $scope.user.email = $scope.email;
      $scope.user.password = md5.createHash($scope.password || ''); //in case user leaves blank
      $scope.user.loginType = 1;
      
      return $scope.user.$login().then(function(response) {
        var code = response.code;
       
        switch(code) {
          case 0: {
            var data = response.data;
            $cookieStore.put('token', data.token);
            $cookieStore.put('userId', data.userId);
            $location.path('/feedmb');
            break;
          }
          default: {
            $scope.error = $rootScope.errorMsg[code]
            $location.path('/login');
          }
        }
      }, function() {
         $scope.error = $rootScope.errorMsg[50];
         $location.path('/login');
      });
    };
  }]);
})();
