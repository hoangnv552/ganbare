(function() {
	'use strict';

	ganbareControllers.controller('createGanbaruCtrl', ['$rootScope','$scope', '$http', '$cookieStore', '$location','geolocation', 'createGanbaru', 
		function($rootScope, $scope, $http, $cookieStore, $location, geolocation, createGanbaru) {
		$scope.createdDate = new Date();
		$scope.ganbaru = {};
		$scope.error = '*Note: According to design, this container is not originally for showing message!'

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
				var coords = response.coords;
				$scope.ganbaru.ganbaruLocation = [coords.latitudem, coords.longitude];
			}, function() {
				$scope.error = $scope.errorMsg[40];
			}).
			then(function() {
				//send request to server
				createGanbaru.save({
					ganbaruTitle: $scope.ganbaru.ganbaruTitle, 
					ganbaruContent: $scope.ganbaru.ganbaruContent, 
					ganbaruLocation: $scope.ganbaru.ganbaruLocation,
					ganbaruTags: $scope.ganbaru.ganbaruTags, 
					expiredDate: moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss')
				}, function(response) {
					var code = response.code;
					switch(code) {
						case 0: {
							$location.path('/feedmb');
						}
						default: {
							$scope.error = $rootScope.errorMsg[code];
						}
					}
				}, function() {
					$scope.error = $rootScope.errorMsg[50];
				});
			});
		};
	}]);
})();