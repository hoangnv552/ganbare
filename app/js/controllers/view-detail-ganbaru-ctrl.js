'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', ['$scope', '$cookieStore', '$routeParams', '$interval',
		'ganbareDetail', 'addGanbare', 'pinGanbare', 
		function($scope, $cookieStore, $routeParams, $interval, ganbareDetail, addGanbare, pinGanbare) {

		ganbareDetail.query({ganbaruId: $routeParams.ganbaruId}, function(response) {
			//binding data get from server
			console.log('userId = ' + $cookieStore.get('userId'));
			console.log('ganbaruId = ' + $routeParams.ganbaruId);
			console.log('token = ' + $cookieStore.get('token'));
			console.log(response);
			$scope.createdDate = response.data.ganbaru.createDate;
			$scope.expiredDate = response.data.ganbaru.expiredDate;
			$scope.ganbareNumber = response.data.ganbaru.ganbareNumber;
			$scope.ganbaruContent = response.data.ganbaru.ganbaruContent;
			$scope.username = response.data.user.username;

			$scope.pinIcon = {};
			$scope.pinIcon.state = response.data.ganbaru.isPinning;	

			$scope.favorIcon = {};
			$scope.favorIcon.state = response.data.user.isFavoristUser;

			var clickNumber = 0;	//the number of user's ganbare clicks

			//click to pin/unpin
			$scope.togglePinning = function() {
				$scope.pinIcon.state = !$scope.pinIcon.state;
				console.log($cookieStore.get('token'));
				if($scope.pinIcon.state) {
					pinGanbare.save({userId: $cookieStore.get('userId'), ganbaruId: $routeParams.ganbaruId}, function(response) {
						console.log(response);
					}, function() {
						console.log('Fail to pin!');
					});					
				}
			};

			//click to add favor/unfavor
			$scope.toggleFavorite = function() {
				$scope.favorIcon.state = !$scope.favorIcon.state;
			}

			//click to add ganbare
			$scope.addGanbare = function() {
				$scope.ganbareNumber++;
				clickNumber++;
			};

			function sendAddGanbareRequest() {
				//if user click, then do this
				if(clickNumber > 0) {
					addGanbare.add({userId: $cookieStore.get('userId'), ganbareNumber: clickNumber, ganbaruId: $routeParams.ganbaruId}, 
						function(response) {
							console.log(response);
						}, function() {
							//Handle error here
							console.log('Failed add ganbare number!');
					});
					clickNumber = 0;
				}
			};

			//send Add Ganbare request to server each 3s
			$interval(sendAddGanbareRequest, 3000);	

		}, function() {
			//Handle error here
			console.log('Failed get ganbare detail!');
		})
	}]);
})();