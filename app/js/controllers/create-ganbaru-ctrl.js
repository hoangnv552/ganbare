;(function() {
	'use strict';

	angular.module('ganbareControllers').controller('createGanbaruCtrl', ['$rootScope','$scope', '$http', '$cookieStore', '$location','geolocation', 'Ganbaru', 
		function($rootScope, $scope, $http, $cookieStore, $location, geolocation, Ganbaru) {
		$scope.createdDate = new Date();
		$scope.ganbaru = new Ganbaru();
		$scope.error = '*Note: According to design, this container is not originally for showing message!'

		function saveGanbaru() {
			$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss');

			return $scope.ganbaru.$save().then(function(response) {
				var code = response.code;
				switch(code) {
					case 0: {
						$location.path('/feedmb');
					}
					default: {
						$scope.error = $rootScope.errorMsg[code];
					}
				}
			});
		};

		$scope.createGanbaru = function() {
			//bind data from user input: title, content, expired date,tags
			$scope.ganbaru.ganbaruTags = [];

			//get array of tags from input 
			angular.forEach($scope.tagsInput, function(obj, objKey) {
				angular.forEach(obj, function(value, key) {
					$scope.ganbaru.ganbaruTags.push(value);
				});
			});

			geolocation.getLocation().then(function(response) {
				var coords = response.coords;
				$scope.ganbaru.ganbaruLocation = [coords.latitude, coords.longitude];
				
				return saveGanbaru();
			}, function() {
				$scope.error = $rootScope.errorMsg[40];
			});
    	};

    	$scope.goTo = function(url) {
    		$location.path(url);
    	};
	}]);
})();


