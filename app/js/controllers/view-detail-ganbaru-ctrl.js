'use strict';

/* Controllers */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', 
		['$scope', '$location', '$cookieStore', '$routeParams', '$interval', 
		'ganbaruDetail', 'addGanbare', 'pinGanbaru', 
		'favoriteGanbaru', 'getUtilities',
		function($scope, $location, $cookieStore, $routeParams, $interval, ganbaruDetail, addGanbare, pinGanbaru, 
			favoriteGanbaru, getUtilities) {

			var userId = $cookieStore.get('userId');
			var token = $cookieStore.get('token');
			var ganbaruId = $routeParams.ganbaruId;	

			getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
				console.log(response);
				$scope.ganbaru = response.data.ganbaru;
				$scope.ganbaruUser = response.data.user;

				$scope.getTime = function(dateStr) {
					var year = parseInt(dateStr.slice(0,4));
					var month = parseInt(dateStr.slice(4,6));
					var date = parseInt(dateStr.slice(6,8));
					return new Date(year, month - 1, date);
				};

				$scope.pinIcon = {state: $scope.ganbaru.isPinning};
				$scope.favorIcon = {state: $scope.ganbaruUser.isFavoristUser};

				/*Pin/Unpin Event*/
				$scope.togglePinning = function() {
					//reverse icon state
					$scope.pinIcon.state = !$scope.pinIcon.state;
					if($scope.pinIcon.state) {
						var pin = pinGanbaru.pin({userId: userId, ganbaruId: ganbaruId}, function(response) {
							console.log(response);
						}, function() {
							//Handle error here
							console.log('Failed to pin!');
						});					
					} else {
						pinGanbaru.unpin({userId: userId, ganbaruId: ganbaruId}, function(response) {
							console.log(response);
						}, function() {
							//Handle error here
							console.log('Failed to unpin');
						});
					}
				};

				// Add/remove favorite Event
				$scope.toggleFavorite = function() {
					var friendId = $scope.ganbaruUser.userId;
					//reverse icon state
					$scope.favorIcon.state = !$scope.favorIcon.state;
					if($scope.favorIcon.state) {
						favoriteGanbaru.add({id: userId, friendId: $scope.ganbaruUser.userId}, function(response) {
							console.log(response);
						}, function() {
							console.log('Failed to add favorite!');
						});
					} else {
						favoriteGanbaru.remove({id: userId, friendId: friendId}, function(response) {
							console.log(response);
						}, function() {
							console.log('Failed to remove favorite');
						});
					}
				}

				/*Add Ganbare*/
				$scope.clickNumber = 0;	//the number of user's ganbare clicks
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
				}

				$interval(sendRequest, 3000);

				/*go to Edit page*/
				$scope.goToEditPage = function() {
					$location.path('/ganbaru/' + ganbaruId +'/edit');
				};

			}, function(response) {
				//Handling error here
			});
	}]);
})();