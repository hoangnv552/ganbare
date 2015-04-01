ganbareControllers.controller('registerCtrl', ['$scope', '$location', 'md5', 'registerGanbare', 
	function($scope, $location, md5, registerGanbare) {
		$scope.panel = 1;

		$scope.setPanel = function(setPanel) {
			$scope.panel = setPanel;
		}

		$scope.isPanel = function(checkPanel) {
			return $scope.panel === checkPanel;
		}

		$scope.submitForm = function() {
			registerGanbare.register({
				email: $scope.email,
				password: $scope.password,
				encryptedPassword: md5.createHash($scope.password || ''),
				username: $scope.username,
				loginType: 1
			}, function(response) {
				console.log(response);
			}, function() {
				console.log('Failed to register!');
				//Handling error here
			});
		};
}]);