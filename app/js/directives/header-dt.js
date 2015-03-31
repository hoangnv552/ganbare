;(function() {
'use strict';
	ganbareDirective.directive('headerDirective', ['$cookieStore', '$location',
		function($cookieStore, $location) {
		return {
			restrict: 'E',
			controller: function($scope) {
				// Logout
				$scope.logout = function() {
					var token = $cookieStore.get('token');
					$cookieStore.remove('token');
					$cookieStore.remove('userId');
					$location.path('/feedfv');
				};
			},
			templateUrl: 'partials/includes/header.html'
		};
	}]);
})();
