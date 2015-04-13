;(function() {
	'use strict';

	angular.module('ganbareControllers').controller('createGanbaruCtrl', ['$scope', '$http', '$cookieStore', '$location','geolocation', 'ERROR_MSG', 'Ganbaru', function($scope, $http, $cookieStore, $location, geolocation, ERROR_MSG, Ganbaru) {
		$scope.createdDate = new Date();
		$scope.ganbaru = new Ganbaru();
		$scope.error = '*Note: According to design, this container is not originally for showing message!'

		function saveGanbaru() {
			return $scope.ganbaru.$save().then(function(response) {
				var code = response.code;
				console.log(response);
				switch (code) {
					case 0: {
						$location.path('/feedmb');
					}
					default: {
						$scope.error = ERROR_MSG[code];
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
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

			//bind hours, minutes, seconds
			var now = moment(),
				expiredDay = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDD'),
				expiredHour = moment({
				h: now.hours(),
				m: now.minutes(),
				s: now.seconds()
			}).format('HHmmss');

			$scope.ganbaru.expiredDate = expiredDay.concat(expiredHour);

			//get Location service
			geolocation.getLocation().then(function(response) {
				var coords = response.coords;
				$scope.ganbaru.ganbaruLocation = [coords.latitude, coords.longitude];

				return saveGanbaru();
			}, function() {
				$scope.error = ERROR_MSG[40];
			});
		};

		$scope.goTo = function(url) {
			$location.path(url);
		};
	}]);
})();


