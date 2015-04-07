;(function() {
	'use strict';

	angular.module('ganbareControllers').controller('registerCtrl', ['$scope', '$location', 'md5', 'User', 'ERROR_MSG', function($rootScope, $scope, $location, md5, User, ERROR_MSG) {
		$scope.panel = 'registerPanel';
		$scope.user = new User();

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
				switch(code) {
					case 0: {
						$scope.user.registeringId = response.data.userId;
						$scope.setPanel('verifyPanel');
						break;
					}
					default: {
						$scope.error = $rootScope.errorMsg[code];
						$scope.setPanel('errorPanel');
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
				$scope.setPanel('errorPanel');
			});
		}

		$scope.verifyUser = function() {
			return $scope.user.$verify().then(function(response) {
				switch(response.code) {
					case 0: {
						$location.path('/login');
						break;
					}
					default: {
						$scope.error = ERROR_MSG[code];
						$scope.setPanel('errorPanel');
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
			});
		};

		$scope.goTo = function(url) {
			$location.path(url);
		};
	}]);
})();
