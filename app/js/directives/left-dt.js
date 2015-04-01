;(function() {
'use strict';
ganbareDirective.directive('leftDirective', ['user', '$cookieStore',
	function(user, $cookieStore) {
	return {
		restrict: 'E',
		controller: function($scope) {
			//Get user infor
			var userId  = $cookieStore.get('userId');

			user.getUser({
				id: userId
			}).$promise.then(function getDone(data) {
				$scope.user = data;
			});
		},
		templateUrl: 'partials/includes/main-left.html'
	};
}]);
})();
