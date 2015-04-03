;(function() {
'use strict';

/*
* Change password
*/
ganbareControllers.controller('changePass', ['$scope', 'md5', 'User', '$cookieStore', '$location',
	function($scope, md5, User, $cookieStore, $location) {
		$scope.user = new User();

		$scope.changePassword = function() {
			var userId  = $cookieStore.get('userId'),
			encryptedNewPassword;

			if ($scope.user.newPassword) {
				encryptedNewPassword = 	md5.createHash($scope.user.newPassword);
			} else {
				$scope.message = 'New password is empty';
			}

			$scope.user.encryptedNewPassword = encryptedNewPassword;
			$scope.user.id = userId;

			//Change password
			$scope.user.$changePassword().then(function doneChangePass(response) {
				console.log(response);
				if (response.code === 0) {
					$location.path('/login');
				} else {
					$scope.message = 'Change password error';
				}
			});
		};
	}]);
})();
