;(function() {
	'use strict';

	/*
	* Controller edit my page
	*/
	angular.module('ganbareControllers').controller('editMyPageCtrl', ['$scope', '$cookieStore', 'User', 'fileUpload', 'TYPES_UPLOAD', '$location', function($scope, $cookieStore, User, fileUpload, TYPES_UPLOAD, $location)
	{
		var userId  = $cookieStore.get('userId');

		var avatarId;
		var backgroundId;

		$scope.totalGanbareNumber = 0;
		$scope.types = TYPES_UPLOAD;
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
			$scope.user.avatarId = avatarId;
			$scope.user.backgroundId = backgroundId;

			delete $scope.user.extendedInfor;
			delete $scope.user.data;
			delete $scope.user.code;

			$scope.user.$updateUser().then(function updateDone(response) {
				if (response.code === 0) {
					$location.path('/feedmb');
				}
			});
		};

		/*
		* Upload avatar
		*/
		$scope.upload = function(type) {
			var file;
			if (type === TYPES_UPLOAD.avatar && $scope.avatar) {
				file = $scope.avatar;
			} else if (type === TYPES_UPLOAD.background && $scope.background) {
				file = $scope.background;
			}

			if (file) {
				fileUpload.upload(file, type).then(function(data) {
					if (type === TYPES_UPLOAD.avatar) {
						avatarId = data.data.imageId;
					} else {
						backgroundId = data.data.imageId;
					}
				});
			}
		}

	}]);
})();
