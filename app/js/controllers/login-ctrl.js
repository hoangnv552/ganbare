;(function(){
    'use strict';
    /*
    * Controller Login
    */
/*
* Controller Login
*/
    angular.module('ganbareControllers').controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5', 'Session', 'ERROR_MSG', function($scope, $cookieStore, $location, md5, Session, ERROR_MSG) {
        $scope.user = new Session();

        $scope.login = function(){

            $scope.user.password = md5.createHash($scope.user.unencryptedPassword || ''); //in case user leaves blank
            $scope.user.loginType = 1;

            /*call service*/
            $scope.user.$login().then(function(response) {
                var code = response.code;
                var data = response.data;

                switch(code) {
                    case 0: {
                        $cookieStore.put('token', data.token);
                        $cookieStore.put('userId', data.userId);
                        $location.path('/feedmb');
                        break;
                    }
                    default: {
                        $scope.error = ERROR_MSG[code];
                        $location.path('/login');
                    }
                }
            }, function() {
                $scope.error = ERROR_MSG[50];
                $location.path('/login');
            });
        };
    }]);
})();
