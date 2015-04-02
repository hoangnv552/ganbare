;(function() {
'use strict';
ganbareDirective.directive('headerDirective', ['$cookieStore', '$location', 'user',
	function($cookieStore, $location, user) {
	return {
		restrict: 'E',
		controller: function($scope) {
			// Logout
			$scope.logout = function() {
				var token = $cookieStore.get('token');
				user.logout({
					token: token
				}).$promise.then(function(response) {
					$cookieStore.remove('token');
					$cookieStore.remove('userId');
					$location.path('/feedfv');
				});
			};
		},
		templateUrl: 'partials/includes/header.html'
	};
}]);
})();
