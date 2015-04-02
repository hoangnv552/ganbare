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
			$scope.data = 'none';

			var f = document.getElementById('avatar').files[0],
			r = new FileReader();
			r.onloadend = function(e) {
				$scope.data = e.target.result;

				console.log($scope.data);
				/////////////////
				user.uploadAvatar({
					id: userId,
					image: $scope.data
				}).$promise.then(function postDone(data) {
					console.log(data);
				});
			}
			r.readAsBinaryString(f);
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
