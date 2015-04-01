;(function() {
'use strict';

/*
* Controller edit my page
*/
ganbareControllers.controller('editMyPageCtrl', ['$scope', '$cookieStore', 'user',
	function($scope, $cookieStore, user){
		var userId  = $cookieStore.get('userId');
		$scope.totalGanbareNumber = 0;

		/*
		* Get user infor
		*/
		user.getUser({
			id: userId
		}).$promise.then(function getDone(data) {
			$scope.user = data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		/*
		* Upload file
		*/
		$scope.uploadFile = function() {
			var file = $scope.avatar;
			console.log(file);
			user.uploadAvatar({
				id: userId,
				file: file
			}).$promise.then(function postDone(data) {
				console.log(data);
			});
		};

		/*
		* Update profile
		*/
		$scope.updateProfile = function() {
			user.updateUser({
				id: userId,
				username: $scope.user.data.username,
				profile: $scope.user.data.userProfile
			}).$promise.then(function updateDone(response) {
				console.log(response);
			})
		}
	}]);
})();
