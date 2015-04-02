ganbareControllers.controller('registerCtrl', ['$scope', '$location', 'md5', 'user', 
	function($scope, $location, md5, user) {
		$scope.panel = 1;

		$scope.setPanel = function(setPanel) {
			$scope.panel = setPanel;
		}

		$scope.isPanel = function(checkPanel) {
			return $scope.panel === checkPanel;
		}

		$scope.submitForm = function() {
			user.register({
				email: $scope.email,
				password: $scope.password,
				encryptedPassword: md5.createHash($scope.password || ''),
				username: $scope.username,
				loginType: 1
			}, function(response) {
				console.log(response);
				if(response.code === 0) {
					$scope.registeringId = response.data.userId;
					$scope.setPanel(3);
				}
				switch(response.code) {
					case 0: {
						$scope.registeringId = response.data.userId;
						$scope.setPanel(3);
						break;
					}
					case 1: {
						$scope.error = 'Unknown error. We are sorry for the convenience...';
						break;
					}
					case 2: {
						$scope.error = "Register unsuccessful. Please re-check your information!";
						break;
					}
					case 10: {
						$scope.error = 'Your email is invalid!';
						break;
					}
					case 11: {
						$scope.error = 'This email has been registered before!';
						break;
					}
					case 20: {
						$scope.error = 'Your password is invalid!';
						break;
					}
				}
			}, function() {
				$scope.error = 'Cannot establish connection to server. Please try again later!';
			});
		};

		$scope.verifyUser = function() {
			console.log($scope.userId);
			user.verify({registeringId: $scope.registeringId}, function(response) {
				switch(response.code) {
					case 0: {
						$location.path('/login');
						break;
					}
					case 1: {
						$scope.error = 'Unknown error. We are sorry for the convenience...';
						$scope.setPanel(4);
						break;
					}
					case 2: {
						$scope.error = "Register unsuccessful. Please re-check your information!";
						$scope.setPanel(4);
						break;
					}
				}
			}, function() {
				console.log('Failed to verify user!');
				$scope.error = 'Cannot establish connection to server. Please try again later!';
				$scope.setPanel(4);
			});
		};

		$scope.goTo = function(url) {
			$location.path(url);
		};
}]);