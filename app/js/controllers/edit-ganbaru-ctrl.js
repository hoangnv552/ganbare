;(function() {
	'use strict';

	/* global ganbareControllers:true */

	angular.module('ganbareControllers').controller('editGanbaruCtrl', 
		['$scope','$cookieStore', '$interval','$location', '$routeParams','Ganbaru', 
		function($scope, $cookieStore, $interval, $location, $routeParams, Ganbaru)
		{
			var userId = $cookieStore.get('userId');
			// var ganbaruId = $routeParams.ganbaruId;
			var ganbaru = new Ganbaru();
			ganbaru.ganbaruId = $routeParams.ganbaruId;
			
			$scope.inputTags = [];

			ganbaru.$getDetail().then(function(response) {
				var code = response.code;
				var data = response.data;
				switch(code) {
					case 0: {
						$scope.ganbaru = data.ganbaru;
						$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYY/MM/DD');
						angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
							$scope.inputTags.push({text: obj});
						});
						break;
					}
					default: {
						$scope.error = $rootScope.errorMsg[code];
					}
				}
			}, function() {
				$scope.error = $rootScope.errorMsg[50];
			});

			$scope.editGanbaru = function() {

			};

			//navigation
			$scope.goTo = function(url) {
				$location.path(url);
			};

			/*get Ganbaru detail and present on HTML*/
			// getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
			// 	console.log(response);

			// 	var code = response.code;
			// 	var data = response.data;

			// 	switch(code) {
			// 		case 0: {
			// 			$scope.ganbaru = data.ganbaru;
			// 			$scope.ganbaruUser = data.user;
			// 			//format date
			// 			$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYY/MM/DD');
			// 			console.log($scope.ganbaru.expiredDate);
			// 			//for Tag Input
			// 			angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
			// 				$scope.inputTags.push({text: obj});
			// 			});
			// 			break;
			// 		}
			// 		default: {
			// 			$scope.error = $rootScope.errorMsg[code];
			// 		}
			// 	}
			// }, function() {
			// 	$scope.error = 'Cannot establish connection to server!';
			// });

			// /*Edit Ganbare Event*/
			// $scope.editGanbaru = function() {
			// 	//convert array of tags objects --> array of tags string
			// 	$scope.ganbaru.ganbaruTags = [];
			// 	angular.forEach($scope.inputTags, function(obj, key) {
			// 		$scope.ganbaru.ganbaruTags.push(obj.text);
			// 	});

			// 	//format date
			// 	$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss');

			// 	//call service
			// 	editGanbaru.put({
			// 		ganbaruId: ganbaruId,
			// 		ganbaruTitle: $scope.ganbaru.ganbaruTitle,
			// 		ganbaruContent: $scope.ganbaru.ganbaruContent,
			// 		ganbaruTags: tags,
			// 		expiredDate: $scope.ganbaru.expiredDate
			// 	}, function(response) {
			// 		console.log(response.code);
			// 		switch(response.code) {
			// 			case 0: {
			// 				$location.path('ganbaru/' + ganbaruId);
			// 				break;
			// 			}
			// 			default: {

			// 			}
			// 		}

			// 	}, function() {
			// 		$scope.error = 'Cannot establish connection to server!';
			// 	});
			// };

			// /*Add Ganbare event*/
			// $scope.addGanbare = function() {
			// 	$scope.ganbaru.ganbareNumber++;
			// 	$scope.clickNumber++;
			// };

			// //send Add Ganbare request to server every 3s
			// var sendRequest = function() {
			// 	getUtilities.sendRequestAddGanbare($scope, userId, ganbaruId).then(function(response) {
			// 		console.log(response);
			// 	}, function() {
			// 		//Handling error here
			// 	});
			// 	$scope.clickNumber = 0;
			// };
			// $interval(sendRequest, 3000);
		}
	]);
})();
