'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', ['$scope', '$cookieStore', 'ganbareDetail', 'addGanbare', 
		function($scope, $cookieStore, ganbareDetail, addGanbare) {
		console.log('ganbaruId = ' + $cookieStore.get('ganbaruId'));
		// var ganbare = ganbareDetail.query({ganbaruId: $cookieStore.get('ganbaruId')});
		// ganbare.$promise.then(function(response) {
		// 	console.log(response);
		// 	$scope.createdDate = response.data.ganbaru.createDate;
		// 	$scope.expiredDate = response.data.ganbaru.expiredDate;
		// 	$scope.username = response.data.user.username;
		// 	$scope.ganbareNumber = response.data.ganbaru.ganbareNumber;
		// 	$scope.ganbaruContent = response.data.ganbaru.ganbaruContent;

		// 	$scope.addGanbare = function() {
		// 		$scope.ganbareNumber++;
		// 		// console.log($cookieStore.get('userId'));
		// 		addGanbare.add({userId: $cookieStore.get('userId'), ganbareNumber: 1, ganbaruId: $cookieStore.get('ganbaruId')}, function(res) {
		// 			console.log(res);
		// 		}, function() {
		// 			console.log('failed add ganbare');
		// 		});
		// 	};

		// }, function() {
		// 	//Handling error here
		// 	console.log('error');
		// });
		var userId = $cookieStore.get('userId');
		var ganbaruId = $cookieStore.get('ganbaruId');

		ganbareDetail.query({ganbaruId: ganbaruId}, function(response) {
			$scope.createdDate = response.data.ganbaru.createDate;
			$scope.expiredDate = response.data.ganbaru.expiredDate;
			$scope.ganbareNumber = response.data.ganbaru.ganbareNumber;
			$scope.username = response.data.user.username;

			$scope.addGanbare = function() {
				
			};
		}, function() {
			//Handle error here
		})
	}]);
})();