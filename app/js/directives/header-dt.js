;(function() {
'use strict';
ganbareDirective.directive('headerDirective', ['$cookieStore', '$location', 'User',
	function($cookieStore, $location, User) {
	return {
		restrict: 'E',
		controller: function($scope) {

			// Logout
			$scope.logout = function() {
				var token = $cookieStore.get('token');

				User.logout({
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
