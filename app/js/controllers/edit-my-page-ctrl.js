;(function() {
'use strict';

/* global ganbareControllers:true */

/*
* Controller edit my page
*/
ganbareControllers.controller('editMyPageCtrl', ['$scope', '$cookieStore', 'User',
	function($scope, $cookieStore, User){
		var userId  = $cookieStore.get('userId');
		$scope.totalGanbareNumber = 0;

		$scope.user = new User();

		$scope.user.id = userId;
		/*
		* Get user infor
		*/
		$scope.user.$getUser().then(function getDone(data) {
			$scope.user = data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		/*
		* Update profile
		*/
		$scope.updateProfile = function() {
			$scope.user.username = $scope.user.data.username;
			$scope.user.profile = $scope.user.data.userProfile;
			$scope.user.id = userId;

			delete $scope.user.extendedInfor;
			delete $scope.user.data;
			delete $scope.user.code;

			$scope.user.$updateUser().then(function updateDone(response) {
				console.log(response);
			});
		};
	}]);
})();
