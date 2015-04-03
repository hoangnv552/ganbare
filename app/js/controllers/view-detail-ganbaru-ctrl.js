
(function() {
	'use strict';

	/* Controllers */
	ganbareControllers.controller('viewGanbareDetailCtrl',
		['$scope', '$location', '$cookieStore', '$routeParams', '$interval',
		'ganbaruDetail', 'addGanbare', 'pinGanbaru',
		'favoriteGanbaru', 'User', 'getUtilities',
		function($scope, $location, $cookieStore, $routeParams, $interval, ganbaruDetail, addGanbare, pinGanbaru,
			favoriteGanbaru, User, getUtilities) {

			var userId = $cookieStore.get('userId');
			var token = $cookieStore.get('token');
			var ganbaruId = $routeParams.ganbaruId;

			//navigation
			$scope.goTo = function(url) {
				$location.path(url);
			};

			/*Get Ganbaru detail to*/
			getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
				console.log(response);

				switch(response.code) {
					case 0: {
						$scope.ganbaru = response.data.ganbaru;
						$scope.ganbaruUser = response.data.user;

						//give permission of editing ganbaru
						$scope.authorized = (userId != null && userId !== 'none');
						$scope.modifiable = (userId === $scope.ganbaruUser.userId);

						//pinning & favorite button icon state
						$scope.pinIcon = {state: $scope.ganbaru.isPinning};
						$scope.favorIcon = {state: $scope.ganbaruUser.isFavoristUser};
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
						$scope.error = 'Session outdated. Please login again!';
						break;
					}
				}

			}, function(response) {
				//Handling error here
				$scope.error = 'Error: Cannot establish connection to server. Please try again later!';
			});

			/*Event click to pin/unpin*/
			$scope.togglePinning = function() {
				//reverse icon state
				$scope.pinIcon.state = !$scope.pinIcon.state;
				if($scope.pinIcon.state) {
					pinGanbaru.pin(
						{userId: userId, ganbaruId: ganbaruId}, function(response) {
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

			/*Event click to add/remove favor*/
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
			};

			/*Add Ganbare*/
			$scope.clickNumber = 0;	//the number of user's ganbare clicks
			$scope.firstTimeGanbare = true;

			$scope.addGanbare = function() {
				$scope.ganbaru.ganbareNumber++;
				$scope.clickNumber++;

				if(userId != null && userId !== 'none') {
					User.getUser({id: userId}, function(response) {
						var userInfo = {userId: userId, userName: response.data.username};
						var found = false;
						angular.forEach($scope.ganbaru.listGanbare, function(obj, key) {
							//if found === false, continue searching
							if(!found) {
								if(obj.userName === userInfo.userName) {
									found = true;
								}
							}
						});

						//after searching all, found = false, then push
						if(!found) {
							$scope.ganbaru.listGanbare.push(userInfo);
						}
					}, function() {
						//Handling error here
					});
				} else {
					//for visitors, userId still cannot be left null/undefined
					userId = 'none';
				}
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
