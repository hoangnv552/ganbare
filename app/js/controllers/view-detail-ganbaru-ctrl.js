;(function() {
	'use strict';

	/* Controllers */
	angular.module('ganbareControllers').controller('viewGanbareDetailCtrl', ['$scope', '$location', '$cookieStore', '$routeParams', '$interval', 'Ganbaru', 'User','ERROR_MSG', function($scope, $location, $cookieStore, $routeParams, $interval, Ganbaru, User, ERROR_MSG) {
		
		var userId = $cookieStore.get('userId');
		var token = $cookieStore.get('token');
		var ganbaruId = $routeParams.ganbaruId;

		//navigation
		$scope.goTo = function(url) {
			$location.path(url);
		};

		function getGanbaruDetail() {
			//call to service get ganbaru detail
			return Ganbaru.getDetail({
				ganbaruId: ganbaruId
			}).$promise.then(function(response) {
				var code = response.code;
				var data = response.data;

				switch(code) {
					case 0: {
						$scope.ganbaru = data.ganbaru;
						$scope.ganbaruUser = data.user;

						//authorization 
						$scope.authorized = (userId != null && userId !== 'none');
						
						//permission to edit ganbaru
						$scope.modifiable = (userId === $scope.ganbaruUser.userId);

						//button state
						$scope.pinIcon = {state: $scope.ganbaru.isPinning};
						$scope.favorIcon = {state: $scope.ganbaruUser.isFavoristUser};
						break;
					}
					default: {
						$scope.error = ERROR_MSG[code];
					}
				}
			}, function() {
				$scope.error = ERROR_MSG[50];
			});
		};
		getGanbaruDetail();

		/*Event click to pin/unpin*/
		$scope.togglePinning = function() {
			var logic;
			//reverse icon state
			$scope.pinIcon.state = !$scope.pinIcon.state;

			if($scope.pinIcon.state) {
				logic = Ganbaru.pin;
			} else {
				logic = Ganbaru.unpin;
			}
			return logic({
				userId: userId, 
				ganbaruId: ganbaruId
			}).$promise.then(function(response) {
				console.log(response);
			}, function() {
				//Handling error here
			});
		};

		/*Event click to add/remove favor*/
		$scope.toggleFavorite = function() {
			var logic;
			var friendId = $scope.ganbaruUser.userId;
			//reverse icon state
			$scope.favorIcon.state = !$scope.favorIcon.state;

			if($scope.favorIcon.state) {
				logic = User.addFavorite;
			} else {
				logic = User.removeFavorite;
			}
			return logic({
				id: userId, 
				friendId: friendId
			}).$promise.then(function(response) {
				console.log(response);
			}, function() {
				//Handling error
			});
		};

		//function handling add user to list Ganbare after click 'add Ganbare'
		function addPeopleToListGanbare(user) {
			var found = false;
			angular.forEach($scope.ganbaru.listGanbare, function(element, key) {
				if(!found) {
					if(element.userId === user.userId) {
						found = true;
					}
				}
			});

			if(!found) {
				$scope.ganbaru.listGanbare.push(user);
			}
		}

		/*Add Ganbare event click*/
		$scope.clickNumber = 0;	//the number of user's ganbare clicks
		$scope.addGanbare = function() {
			$scope.ganbaru.ganbareNumber++;
			$scope.clickNumber++;

			if(userId != null && userId !== 'none') {
				User.getUser({
					id: userId
				}, function(response) {
					var user = {
						userId: userId, 
						userName: response.data.username
					};
					addPeopleToListGanbare(user);
				}, function() {
					//Handling error here
				});
			} else {
				//for visitors, userId still cannot be left null/undefined
				userId = 'none';
			}
		};

		function sendRequestAddGanbare() {
			if($scope.clickNumber > 0) {
				//call service add ganbare
				Ganbaru.add({
					ganbaruId: ganbaruId, 
					userId: ganbaruId, 
					ganbareNumber: $scope.clickNumber
				}).$promise.then(function(response) {
					console.log(response.data);
				}, function() {
					//Handling error
				})
			}
			$scope.clickNumber = 0;
		};

		//send request to add ganbare every 3sec
		$interval(sendRequestAddGanbare, 3000);
	}]);
})();
