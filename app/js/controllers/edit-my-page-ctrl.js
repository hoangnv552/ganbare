;(function() {
'use strict';

/*
* Controller edit my page
*/
ganbareControllers.controller('editMyPageCtrl', ['$scope', '$cookieStore', 'user',
	function($scope, $cookieStore, user){
		var userId  = $cookieStore.get('userId');
		$scope.totalGanbareNumber = 0;

		//Get user infor
		user.getUser({
			id: userId
		}).$promise.then(function getDone(data) {
			$scope.user = data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		// Upload file
		$scope.uploadFile = function() {
			console.log($scope.avatar);
		};
	}]);
})();
