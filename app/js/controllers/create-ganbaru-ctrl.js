ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'createGanbaru',
	function($scope, $http, $cookieStore, $location, geolocation, createGanbaru) {
	'use strict';
	$scope.createdDate = new Date();
	$scope.ganbaru = {};
	$scope.error = '*Note: According to design, this container is not originally for showing message!';

	$scope.goToFeed = function() {
		$location.path('/feedmb');
	};

	$scope.createGanbaru = function() {
		//bind data from user input: title, content, expired date,tags
		$scope.ganbaru.ganbaruTags = [];
		$scope.ganbaru.ganbaruLocation = [];

		//get array of tags from input
		angular.forEach($scope.tagsInput, function(obj, objKey) {
			angular.forEach(obj, function(value, key) {
				$scope.ganbaru.ganbaruTags.push(value);
			});
		});

		//get latitude & longitude of location coordinates
		geolocation.getLocation().then(function(response) {
			$scope.ganbaru.ganbaruLocation.push(response.coords.latitude);
			$scope.ganbaru.ganbaruLocation.push(response.coords.longitude);

			//send request to server
			createGanbaru.save({
				ganbaruTitle: $scope.ganbaru.ganbaruTitle,
				ganbaruContent: $scope.ganbaru.ganbaruContent,
				ganbaruLocation: $scope.ganbaru.ganbaruLocation,
				ganbaruTags: $scope.ganbaru.ganbaruTags,
				expiredDate: moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss')
			}, function(response) {
				switch(response.code) {
					case 0: {
						$location.path('/feedmb');
						break;
					}
					case 1: {
						$scope.error = 'Unknown error.';
						break;
					}
					case 2: {
						$scope.error = 'Create ganbaru unsuccessful. Please check information again!';
						break;
					}
					case 3: {
						$scope.error = 'Session outdated. Please log in again!';
						break;
					}
				}
			}, function() {
				$scope.error = 'Failed to establish connection to server. Please try again later!';
			});
		}, function() {
			$scope.error = 'Failed to get your current location coordinates!';
		});
	};
}]);
