'use strict';

/* Controllers */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl',
		['$scope', '$location', '$cookieStore', '$routeParams', '$interval',
		'ganbaruDetail', 'addGanbare', 'pinGanbaru',
		'favoriteGanbaru', 'user', 'getUtilities',
		function($scope, $location, $cookieStore, $routeParams, $interval, ganbaruDetail, addGanbare, pinGanbaru,
			favoriteGanbaru, user, getUtilities) {

			var userId = $cookieStore.get('userId');
			var token = $cookieStore.get('token');
			var ganbaruId = $routeParams.ganbaruId;

			$scope.goTo = function(url) {
				$location.path(url);
			}


			getUtilities.sendRequestGetGanbaruDetail(ganbaruId).then(function(response) {
				console.log(response);
				if(response.code === 0) {
					$scope.ganbaru = response.data.ganbaru;
					$scope.ganbaruUser = response.data.user;

					//give permission of editing ganbaru
					$scope.authorized = (userId != null && userId !== 'none')
					$scope.modifiable = (userId === $scope.ganbaruUser.userId);
					console.log('userId = ' + userId);
					console.log('authorized = ' + $scope.authorized);
					console.log('modifiable = ' + $scope.modifiable);
					/*Pin/Unpin Event*/
					$scope.pinIcon = {state: $scope.ganbaru.isPinning};
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
					$scope.favorIcon = {state: $scope.ganbaruUser.isFavoristUser};
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
					$scope.firstTimeGanbare = true;

					$scope.addGanbare = function() {
						$scope.ganbaru.ganbareNumber++;
						$scope.clickNumber++;

						if(userId && userId !== 'none') {
							user.getUser({id: userId}, function(response) {
								var userInfo = {userId: userId, userName: response.data.username};
								var found = false;
								angular.forEach($scope.ganbaru.listGanbare, function(obj, key) {
									if(!found) {
										if(obj.userName === userInfo.userName) {
											found = true;
										}
									}
								});

								if(!found) {
									$scope.ganbaru.listGanbare.push(userInfo);
								}
							}, function() {
								//Handling error here
							});
						} else {
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
					}

					$interval(sendRequest, 3000);
				}

			}, function(response) {
				//Handling error here
			});
	}]);
})();
