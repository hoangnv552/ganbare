;(function() {
	'use strict';

	var UNABLE_CONNECT_SERVER_CODE = 50;

	/* global ganbareControllers:true */

	angular.module('ganbareControllers').controller('editGanbaruCtrl', ['$scope','$cookieStore', '$interval','$location', '$routeParams', 'ERROR_MSG','Ganbaru', function($scope, $cookieStore, $interval, $location, $routeParams, ERROR_MSG, Ganbaru) {
		var ganbaruId = $routeParams.ganbaruId,
			userId = $cookieStore.get('userId'),
			ganbaru = new Ganbaru({
				ganbaruId: ganbaruId,
				userId: userId
			});

		//call function to get Ganbaru Detail and bind on view
		getGanbaruDetail();

		//event click of Add Ganbare Button
		$scope.clickNumber = 0;
		$scope.addGanbare = function() {
			$scope.ganbaru.ganbareNumber++;
			$scope.clickNumber++;
		};

		//event click of Confirm Edit Ganbare Button
		$scope.editGanbaru = function() {
			//Bind data from view
			ganbaru.ganbaruTitle = $scope.ganbaru.ganbaruTitle;
			ganbaru.ganbaruContent = $scope.ganbaru.ganbaruContent;
			ganbaru.ganbaruTags = [];

			angular.forEach($scope.inputTags, function(element, key) {
				ganbaru.ganbaruTags.push(element.text);
			});

			ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss');
			return updateGanbaru();
		};

		//navigation
		$scope.goTo = function(url) {
			$location.path(url);
		};

		function getGanbaruDetail() {
			//call to service get detail
			Ganbaru.getDetail({
				ganbaruId: ganbaru.ganbaruId
			}).$promise.then(function(response) {
				var code = response.code;
				var data = response.data;

				switch(code) {
					case 0: {
						$scope.ganbaru = data.ganbaru;
						$scope.ganbaruUser = data.user;
						$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYY/MM/DD');

						$scope.inputTags = [];
						angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
							$scope.inputTags.push({text: obj});
						});
						break;
					}
					default: {
						$scope.error = ERROR_MSG[code];
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[UNABLE_CONNECT_SERVER_CODE];
			});
		};

		function updateGanbaru() {
			//call to service update ganbaru
			return ganbaru.$update().then(function(response) {
				$location.path('ganbaru/' + ganbaruId);
			}, function() {
				//Handling error
			});
		};

		function sendRequestAddGanbare() {
			//call to service add ganbare
			if($scope.clickNumber > 0) {
				Ganbaru.add({
					ganbaruId: ganbaruId,
					userId: ganbaruId,
					ganbareNumber: $scope.clickNumber
				}).$promise.then(function(response) {
					console.log(response.data);
				}, function() {
					//Handling error
				});
			}
			$scope.clickNumber  = 0;
		};

		//send call to service each 3 sec
		$interval(sendRequestAddGanbare, 3000);
	}]);
})();
