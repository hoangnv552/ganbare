;(function(){
    'use strict';
    /*
    * Controller Login
    */
/*
* Controller Login
*/
    angular.module('ganbareControllers').controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5', 'Session', 'System', 'ERROR_MSG', function($scope, $cookieStore, $location, md5, Session, System, ERROR_MSG) {
        $scope.system = new System();
        $scope.user = new Session();
        $scope.totalNumber = 0;
        getGanbareSum();

        function getGanbareSum() { 
            $scope.system.$ping().then(function(response) {
                $scope.totalGanbareNumber = response.extendedInfor.totalGanbareNumber;
            })
        };

        $scope.login = function() {
            //modify data that cannot be directly binded
            $scope.user.password = md5.createHash($scope.user.unencryptedPassword || ''); //in case user leaves blank
            $scope.user.loginType = 1;
            return login();
        };

        function login() {
            return $scope.user.$login().then(function(response) {
                console.log(response);
                var code = response.code;
                var data = response.data;

                switch (code) {
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
