'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', 
		['$scope', '$cookieStore', '$routeParams', '$interval', 
		'ganbareDetail', 'addGanbare', 'pinGanbaru', 'unPinGanbaru', 
		'favoriteGanbaru', 'removeFavoriteGanbaru',
		function($scope, $cookieStore, $routeParams, $interval, ganbareDetail, addGanbare, pinGanbaru, unPinGanbaru, 
			favoriteGanbaru, removeFavoriteGanbaru) {

			var userId = $cookieStore.get('userId');
			var token = $cookieStore.get('token');
			var ganbaruId = $routeParams.ganbaruId;	

			/*send request to server*/
			ganbareDetail.query({ganbaruId: ganbaruId}, function(response) {
				console.log(response);

				var ganbaru = response.data.ganbaru;	//store ganbaru information
				var ganbaruUser = response.data.user;	//store user information of ganbaru

				//binding data get from server, present on HTML
				$scope.createdDate = ganbaru.createDate;
				$scope.expiredDate = ganbaru.expiredDate;
				$scope.ganbareNumber = ganbaru.ganbareNumber;
				$scope.ganbaruContent = ganbaru.ganbaruContent;
				$scope.username = ganbaruUser.username;
				var friendId = ganbaruUser.userId;
				//icon of pinning button
				$scope.pinIcon = {};
				$scope.pinIcon.state = ganbaru.isPinning;	

				//icon of add favorites button
				$scope.favorIcon = {};
				$scope.favorIcon.state = ganbaruUser.isFavoristUser;

				/*pin/unpin*/
				$scope.togglePinning = function() {
					//reverse icon state
					$scope.pinIcon.state = !$scope.pinIcon.state;
					if($scope.pinIcon.state) {
						pinGanbaru.pin({userId: userId, ganbaruId: ganbaruId}, function(response) {
							console.log(response);
						}, function() {
							//Handle error here
							console.log('Failed to pin!');
						});					
					} else {
						unPinGanbaru.unPin({userId: userId, ganbaruId: ganbaruId}, function(response) {
							console.log(response);
						}, function() {
							//Handle error here
							console.log('Failed to unpin');
						});
					}
				};

				//click to add favor/unfavor
				$scope.toggleFavorite = function() {
					//reverse icon state
					$scope.favorIcon.state = !$scope.favorIcon.state;
					if($scope.favorIcon.state) {
						favoriteGanbaru.add({id: userId, friendId: friendId}, function(response) {
							console.log(response);
						}, function() {
							console.log('Failed to add favorite!');
						});
					} else {
						removeFavoriteGanbaru.remove({id: userId, friendId: friendId}, function(response) {
							console.log(response);
						}, function() {
							console.log('Failed to remove favorite');
						});
					}
				}

				/*Add Ganbare*/
				var clickNumber = 0;	//the number of user's ganbare clicks
				$scope.addGanbare = function() {
					$scope.ganbareNumber++;
					clickNumber++;
				};

				function sendAddGanbareRequest() {
					//if user click, then do this
					if(clickNumber > 0) {
						addGanbare.add({userId: userId, ganbareNumber: clickNumber, ganbaruId: ganbaruId}, 
							function(response) {
								console.log(response);
							}, function() {
								//Handle error here
								console.log('Failed add ganbare!');
						});
						clickNumber = 0;
					}
				};

				//send Add Ganbare request to server every 3s
				$interval(sendAddGanbareRequest, 3000);	

			}, function() {
				//Handle error here
				console.log('Failed get ganbare detail!');
			}
		)
	}]);
})();