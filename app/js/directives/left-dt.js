;(function() {
'use strict';
/* global ganbareDirective:true */
ganbareDirective.directive('leftDirective', ['User', '$cookieStore',
	function(User, $cookieStore) {
	return {
		restrict: 'E',
		controller: function($scope) {
			//Get user infor
			var user = new User(),
			userId  = $cookieStore.get('userId');

			user.id = userId;
			user.$getUser().then(function getDone(data) {
				$scope.user = data;
			});
		},
		templateUrl: 'partials/includes/main-left.html'
	};
}]);
})();
