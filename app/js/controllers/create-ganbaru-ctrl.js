'use strict';

ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'createGanbaru', 
	function($scope, $http, $cookieStore, $location, geolocation, createGanbaru) {
	$scope.createdDate = new Date();

	$scope.createGanbaru = function() {
		//bind data from user input: title, content, expired date,tags
		var ganbaruTitle = $scope.ganbaruTitle;
		var ganbaruContent = $scope.ganbaruContent;
		var expiredDate = ($scope.expiredDate.replace(/\//g, '') + '000000'); //format: yyyymmddhhmmss

		var tags = $scope.tags;
		var ganbaruTags = [];
		angular.forEach(tags, function(obj, objKey) {
			angular.forEach(obj, function(value, key) {
				ganbaruTags.push(value);
			});
		});

		//get latitude & longitude of location coordinates
		var ganbaruLocation = [];
		geolocation.getLocation().then(function(response) {
			ganbaruLocation.push(response.coords.latitude);
			ganbaruLocation.push(response.coords.longitude);

			//send request to server
			createGanbaru.save({ganbaruTitle: ganbaruTitle, ganbaruContent: ganbaruContent, ganbaruLocation: ganbaruLocation,
				ganbaruTags: ganbaruTags, expiredDate: expiredDate}, function(response) {
				console.log(response);
				if(response.code === 0) {
					$location.path('/feedfv');
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