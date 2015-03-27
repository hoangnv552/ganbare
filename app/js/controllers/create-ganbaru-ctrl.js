'use strict';

ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'createGanbaru', 
	function($scope, $http, $cookieStore, $location, geolocation, createGanbaru) {
	$scope.createdDate = new Date();
	console.log('ganbaruTitle = ' + $scope.ganbaruTitle);
	$scope.createGanbaru = function() {

		//bind data from user input
		var ganbaruTitle = $scope.ganbaruTitle;
		var ganbaruContent = $scope.ganbaruContent;
		var expiredDate = ($scope.expiredDate.replace(/\//g, '') + '000000'); //format: yyyymmddhhmmss
		console.log(expiredDate);

		//get latitude & longitude of location coordinates
		var ganbaruLocation = [];
		geolocation.getLocation().then(function(response) {
			var coords = {lat: response.coords.latitude, long: response.coords.longitude};
			ganbaruLocation.push(coords.lat);
			ganbaruLocation.push(coords.long);
			console.log(ganbaruLocation);

			//get arrays of tag string from user input
			var tags = $scope.tags;
			var ganbaruTags = [];
			angular.forEach(tags, function(obj, objKey) {
				angular.forEach(obj, function(value, key) {
					ganbaruTags.push(value);
				});
			});

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