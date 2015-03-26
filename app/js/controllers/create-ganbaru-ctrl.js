'use strict';

ganbareControllers.controller('createGanbaruCtrl', ['$scope', '$cookieStore', 'geolocation', 'createGanbaru', 
	function($scope, $cookieStore, geolocation, createGanbaru) {
	$scope.createdDate = new Date();
	console.log($cookieStore.get('token'));

	var coords;
	geolocation.getLocation().then(function(response) {
		coords = {'lat': response.coords.latitude, 'long': response.coords.longitude}; 
		console.log(coords);

		$scope.createGanbaru = function() {
			var ganbaruTitle = $scope.ganbaruTitle;
			var ganbaruContent = $scope.ganbaruContent;
			var expiredDate = $scope.expiredDate.replace(/\//g, '') + '000000';
			var ganbaruLocation = [];
			ganbaruLocation.push(coords.lat);
			ganbaruLocation.push(coords.long);

			var create = createGanbaru.save({ganbaruTitle: ganbaruTitle, ganbaruContent: ganbaruContent, expiredDate: expiredDate, ganbaruLocation: ganbaruLocation}, function(response) {
				console.log(response);
			}, function() {
				console.log('Failed create ganbaru');
			});
			console.log(create);
		}
	}, function() {
		//Error loading location data;
	});
}]);