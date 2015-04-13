;(function() {
	'use strict';

	angular.module('ganbareControllers').controller('registerCtrl', ['$scope', '$location', '$route', 'md5', 'User', 'System', 'ERROR_MSG', function($scope, $location, $route, md5, User, System, ERROR_MSG) {
		var panel = {
			input: 'inputPanel',
			confirm: 'confirmPanel',
			verify: 'verifyPanel',
			error: 'errorPanel'
		};

		$scope.panel = panel.input;
		$scope.user = new User();
		$scope.system = new System();
		getGanbareSum();

        function getGanbareSum() { 
            $scope.system.$ping().then(function(response) {
                $scope.totalNumber = response.extendedInfor.totalGanbareNumber;
            })
        };

		$scope.setPanel = function(setPanel) {
			$scope.panel = setPanel;
		};

		$scope.isPanel = function(checkPanel) {
			return $scope.panel === checkPanel;
		};

		$scope.submitForm = function() {
			$scope.user.encryptedPassword = md5.createHash($scope.user.password || '');
			$scope.user.loginType = 1;
			
			return $scope.user.$register().then(function(response) {
				var code = response.code;
				console.log(response);
				switch (code) {
					case 0: {
						$scope.user.registeringId = response.data.userId;
						$scope.setPanel(panel.verify);
						break;
					}
					default: {
						$scope.error = ERROR_MSG[code];
						$scope.setPanel(panel.error);
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
				$scope.setPanel(panel.error);
			});
		};

		$scope.verifyUser = function() {
			return $scope.user.$verify().then(function(response) {
				switch(response.code) {
					case 0: {
						$location.path('/login');
						break;
					}
					default: {
						$scope.error = ERROR_MSG[code];
						$scope.setPanel(panel.error);
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
			});
		};

		$scope.goTo = function(url) {
			if (url === '/register') {
				$route.reload();
			} else {
				$location.path(url);
			}
		};
	}]);
})();
