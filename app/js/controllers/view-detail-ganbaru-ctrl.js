'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', 
		['$scope', '$cookieStore', '$routeParams', '$interval', 
		'ganbareDetail', 'addGanbare', 'pinGanbaru', 'unPinGanbaru', 
		function($scope, $cookieStore, $routeParams, $interval, ganbareDetail, addGanbare, pinGanbaru, unPinGanbaru) {

			var userId = $cookieStore.get('userId');
			var token = $cookieStore.get('token');
			var ganbaruId = $routeParams.ganbaruId;	

			//send request to server
			ganbareDetail.query({ganbaruId: ganbaruId}, function(response) {
				console.log(response.data.ganbaru);

				var ganbaru = response.data.ganbaru;	//store ganbaru information
				var ganbaruUser = response.data.user;	//store user information of ganbaru

				//binding data get from server, present on HTML
				$scope.createdDate = ganbaru.createDate;
				$scope.expiredDate = ganbaru.expiredDate;
				$scope.ganbareNumber = ganbaru.ganbareNumber;
				$scope.ganbaruContent = ganbaru.ganbaruContent;
				$scope.username = ganbaruUser.username;

				//icon of pinning button
				$scope.pinIcon = {};
				$scope.pinIcon.state = ganbaru.isPinning;	

				//icon of add favorites button
				$scope.favorIcon = {};
				$scope.favorIcon.state = ganbaruUser.isFavoristUser;

				//click to pin/unpin
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
					}
					else {
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
					$scope.favorIcon.state = !$scope.favorIcon.state;
				}

				var clickNumber = 0;	//the number of user's ganbare clicks

				//click to add ganbare
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

				//send Add Ganbare request to server each 3s
				$interval(sendAddGanbareRequest, 3000);	

			}, function() {
				//Handle error here
				console.log('Failed get ganbare detail!');
			}
		)
	}]);
})();