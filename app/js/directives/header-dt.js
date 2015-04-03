;(function() {
	'use strict';

	angular.module('ganbareDirective').directive('headerDirective', ['$cookieStore', '$location', 'Session', function($cookieStore, $location, Session)
	{
		return {
			restrict: 'E',
			controller: function($scope) {

				// Logout
				$scope.logout = function() {
					var token = $cookieStore.get('token');

					Session.logout({
						token: token
					}).$promise.then(function(response) {
						if (response.code === 0) {
							$cookieStore.remove('token');
							$cookieStore.remove('userId');
							$location.path('/feedfv');
						} else {
							// Do something
						}
					});
				};
			},
			templateUrl: 'partials/includes/header.html'
		};
	}]);
})();
