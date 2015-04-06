;(function() {
	'use strict';

	angular.module('ganbareDirective').directive('leftDirective', ['User',
		function(User) {
		return {
			restrict: 'E',
			controller: function($scope) {
				//Get user infor
				var user = new User({
					id: User.getCurrentUserId()
				});

				user.$getUser().then(function getDone(data) {
					$scope.user = data;
				});
			},
			templateUrl: 'partials/includes/main-left.html'
		};
	}]);
})();
