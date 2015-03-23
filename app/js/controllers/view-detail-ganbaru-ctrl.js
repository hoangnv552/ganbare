'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', ['$scope', '$cookieStore', '$routeParams', 'ganbareDetail', 'addGanbare', 
		function($scope, $cookieStore, $routeParams, ganbareDetail, addGanbare) {

		ganbareDetail.query({ganbaruId: $routeParams.ganbaruId}, function(response) {
			console.log(response);
			$scope.createdDate = response.data.ganbaru.createDate;
			$scope.expiredDate = response.data.ganbaru.expiredDate;
			$scope.ganbareNumber = response.data.ganbaru.ganbareNumber;
			$scope.ganbaruContent = response.data.ganbaru.ganbaruContent;
			$scope.username = response.data.user.username;
		}, function() {
			//Handle error here
			console.log('Failed get ganbare');
		})
	}]);
})();