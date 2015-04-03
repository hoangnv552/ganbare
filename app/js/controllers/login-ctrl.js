;(function(){
'use strict';
/*global ganbareControllers:true */
/* Controllers */

/*
* Controller Login
*/
var MESSAGE = {
    1: 'Unknown error. We are sorry for the convenience...',
    2: 'Login unsuccessful. Please re-check your information!',
    12: 'Email not found!',
    21: 'Incorrect password!'
}

ganbareControllers.controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5', 'User',
    function($scope, $cookieStore, $location, md5, User) {
        $scope.error = '';
        $scope.user = new User();

        $scope.login = function(){

            var encryptedPassword = md5.createHash($scope.user.password || ''); //in case user leaves blank
            $scope.user.password = encryptedPassword;
            $scope.user.loginType = 1;

            /*call service*/
            $scope.user.$login().then(function(response) {
                var code = response.code;

                switch(code) {
                    case 0: {
                        $cookieStore.put('token', response.data.token);
                        $cookieStore.put('userId', response.data.userId);
                        $location.path('/feedmb');
                        break;
                    }
                    default: {
                        $scope.error = MESSAGE[response.code];
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
