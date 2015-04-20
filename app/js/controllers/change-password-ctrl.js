;(function() {
	'use strict';

	/*
	* Change password
	*/
	angular.module('ganbareControllers').controller('changePass', ['$scope', 'md5', 'User', '$location', function($scope, md5, User, $location) {
		var user = $scope.user = new User({
			id: User.getCurrentUserId()
		});

		$scope.changePassword = function() {

			if (user.newPassword) {
				user.encryptedNewPassword = md5.createHash(user.newPassword);

				user.$changePassword().then(function doneChangePass(response) {
					console.log(response);
					if (response.code === 0) {
						$location.path('/login');
					} else {
						$scope.message = 'Change password error';
					}
				});
			} else {
				$scope.message = 'New password is empty';

			}
		};
	}]);
})();
