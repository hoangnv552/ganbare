;(function() {
'use strict';

/*
* Change password
*/
ganbareControllers.controller('changePass', ['$scope', 'md5', 'user', '$cookieStore', '$location',
	function($scope, md5, user, $cookieStore, $location) {
		$scope.changePassword = function() {
			var userId  = $cookieStore.get('userId'),
			encryptedNewPassword;

			if ($scope.user.newPassword) {
				encryptedNewPassword = 	md5.createHash($scope.user.newPassword);
			} else {
				$scope.message = 'New password is empty';
			}

			user.changePassword({
				id: userId,
				oldPassword: $scope.user.oldPassword,
				newPassword: $scope.user.newPassword,
				encryptedNewPassword: encryptedNewPassword
			}).$promise.then(function doneChangePass(response) {
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
