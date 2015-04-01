'use strict';

ganbareControllers.controller('editGanbaruCtrl', ['$scope','$cookieStore', '$interval','$location', '$routeParams','ganbaruDetail', 'editGanbaru', 
	'getUtilities',
	function($scope, $cookieStore, $interval, $location, $routeParams, ganbaruDetail, editGanbaru, getUtilities) {
		var userId = $cookieStore.get('userId');
		var token = $cookieStore.get('token');
		var ganbaruId = $routeParams.ganbaruId;	

		getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
			console.log(response);
			$scope.ganbaru = response.data.ganbaru;
			$scope.ganbaruUser = response.data.ganbaruUser;
			$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, "YYYY-MM-DD").format("YYYY/MM/DD");

			var tags = [];
			angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
				tags.push({text: obj});
			});

			$scope.editGanbaru = function() {
				tags = [];
				angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
					tags.push(obj.text);
				});
				$scope.ganbaru.expiredDate = moment($scope.ganbaru.expiredDate, "YYYY-MM-DD").format("YYYYMMDDHHmmssSSS");

				editGanbaru.put({
					ganbaruId: ganbaruId,
					ganbaruTitle: $scope.ganbaru.ganbaruTitle,
					ganbaruContent: $scope.ganbaru.ganbaruContent,
					ganbaruTags: tags,
					expiredDate: $scope.ganbaru.expiredDate
				}, function(response) {
					if(response.code === 0) {
						$location.path('ganbaru/' + ganbaruId);
					}
				}, function() {
					console.log('Edit ganbaru detail failed');
				});
			};

		}, function() {
			//Handling error here
		});

		$scope.addGanbare = function() {
			$scope.ganbaru.ganbareNumber++;
			$scope.clickNumber++;
		}
						

		//send Add Ganbare request to server every 3s
		var sendRequest = function() { 
			getUtilities.sendRequestAddGanbare($scope, userId, ganbaruId).then(function(response) {
				console.log(response);
			}, function() {
				//Handling error here
			});
			$scope.clickNumber = 0;
		}

		$interval(sendRequest, 3000);
}]);	