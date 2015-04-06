ganbareControllers.controller('registerCtrl', ['$rootScope', '$scope', '$location', 'md5', 'user', 
	function($rootScope, $scope, $location, md5, user) {
		$scope.panel = 'registerPanel';

		$scope.setPanel = function(setPanel) {
			$scope.panel = setPanel;
		}

		$scope.isPanel = function(checkPanel) {
			return $scope.panel === checkPanel;
		}

		$scope.submitForm = function() {
			return user.register({
				email: $scope.email,
				password: $scope.password,
				encryptedPassword: md5.createHash($scope.password || ''),
				username: $scope.username,
				loginType: 1}).
				$promise.then(function(response) {
					var code = response.code;
					var data = response.data;
					switch(code) {
						case 0: {
							$scope.registeringId = data.userId;
							$scope.setPanel('verifyPanel');
							break;
						}
						default: {
							$scope.error = $rootScope.errorMsg[code];
						}
					}
				}, function() {
					$scope.error = $rootScope.errorMsg[50];
				}
			);
		};

		$scope.verifyUser = function() {
			return user.verify({
				registeringId: $scope.registeringId}).
				$promise.then(function(response) {
					switch(response.code) {
						case 0: {
							$location.path('/login');
							break;
						}
						default: {
							$scope.error = $rootScope.errorMsg[code];
						}
					}
			}, function() {
				$scope.error = $rootScope.errorMsg[50];
				$scope.setPanel('errorPanel');
			});
		};

		$scope.goTo = function(url) {
			$location.path(url);
		};
}]);