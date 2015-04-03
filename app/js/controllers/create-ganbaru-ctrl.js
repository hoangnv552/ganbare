var MESSAGES = {
	1: 'Unknown error.',
	2: 'Create ganbaru unsuccessful. Please check information again!',
	3: 'Session outdated. Please log in again!'
};

ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'Ganbaru',
	function($scope, $http, $cookieStore, $location, geolocation, Ganbaru) {
	'use strict';
	$scope.createdDate = new Date();
	$scope.ganbaru = new Ganbaru();
	$scope.error = '*Note: According to design, this container is not originally for showing message!';

	function saveGanbaru() {
		// set 1 so property ko dc data-bind
		$scope.ganbaru.expiredDate = moment(ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss')

		return $scope.ganbaru.$save();
	}



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
		return geolocation.getLocation().then(function(response) {
			$scope.ganbaru.ganbaruLocation.push(response.coords.latitude);
			$scope.ganbaru.ganbaruLocation.push(response.coords.longitude);

			//send request to server
			return saveGanbaru($scope.ganbaru);
		}, function() {
			$scope.error = 'Failed to get your current location coordinates!';

			return $q.reject();
		}).then(function(response) {
			switch(response.code) {
				case 0: {
					$location.path('/feedmb');
					break;
				}
				default: {
					$scope.error = MESSAGES[response.code];
					break;
				}
			}
		}, function() {
			$scope.error = 'Failed to establish connection to server. Please try again later!';
		});
	};
}]);
