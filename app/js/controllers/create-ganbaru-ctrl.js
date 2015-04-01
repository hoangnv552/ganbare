'use strict';

ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'createGanbaru', 
	function($scope, $http, $cookieStore, $location, geolocation, createGanbaru) {
	$scope.createdDate = new Date();

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
				expiredDate: moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmssSSS')
			}, function(response) {
				console.log(response);
				if(response.code === 0) {
					$location.path('/feedmb');
				}
			}, function() {
				console.log('Failed to create ganbaru');
				//Handling error here
			});
		}, function() {
			console.log('Failed to get location!');
			//Handling error here
		});
	};
}]);