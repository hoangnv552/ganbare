;(function() {
'use strict';

/* global ganbareControllers:true */

ganbareControllers.controller('editGanbaruCtrl', ['$scope','$cookieStore', '$interval','$location', '$routeParams','ganbaruDetail', 'editGanbaru',
	'getUtilities',
	function($scope, $cookieStore, $interval, $location, $routeParams, ganbaruDetail, editGanbaru, getUtilities) {
		var userId = $cookieStore.get('userId');
		var ganbaruId = $routeParams.ganbaruId;
		$scope.error = '';

		//for storing object tags: {text: tagName}
		var tags = [];

		//navigation
		$scope.goTo = function(url) {
			$location.path(url);
		};

		/*get Ganbaru detail and present on HTML*/
		getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
			console.log(response);

			switch(response.code) {
				case 0: {
					$scope.ganbaru = response.data.ganbaru;
					$scope.ganbaruUser = response.data.user;

					//format date
					$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYY/MM/DD');

					//convert array of tags string --> array of tags object
					angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
						tags.push({text: obj});
					});
					break;
				}
				case 1: {
					$scope.error = 'Unknown error!';
					break;
				}
				case 2: {
					$scope.error = 'Currently no message for this error!';
					break;
				}
				case 3: {
					$scope.error = 'Session outdated. Please log in again!';
					break;
				}
			}
		}, function() {
			$scope.error = 'Cannot establish connection to server!';
		});


		/*Edit Ganbare Event*/
		$scope.editGanbaru = function() {
			//convert array of tags objects --> array of tags string
			tags = [];
			angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
				tags.push(obj.text);
			});

			//format date
			$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, 'YYYY-MM-DD').format('YYYYMMDDHHmmss');

			//call service
			editGanbaru.put({
				ganbaruId: ganbaruId,
				ganbaruTitle: $scope.ganbaru.ganbaruTitle,
				ganbaruContent: $scope.ganbaru.ganbaruContent,
				ganbaruTags: tags,
				expiredDate: $scope.ganbaru.expiredDate
			}, function(response) {
				console.log(response.code);
				switch(response.code) {
					case 0: {
						$location.path('ganbaru/' + ganbaruId);
						break;
					}
					//Discuss with server later
					case 1: {

						break;
					}
					case 2: {

						break;
					}
					case 3: {

						break;
					}
				}

			}, function() {
				$scope.error = 'Cannot establish connection to server!';
			});
		};

		/*Add Ganbare event*/
		$scope.addGanbare = function() {
			$scope.ganbaru.ganbareNumber++;
			$scope.clickNumber++;
		};

		//send Add Ganbare request to server every 3s
		var sendRequest = function() {
			getUtilities.sendRequestAddGanbare($scope, userId, ganbaruId).then(function(response) {
				console.log(response);
			}, function() {
				//Handling error here
			});
			$scope.clickNumber = 0;
		};
		$interval(sendRequest, 3000);
}]);
})();
