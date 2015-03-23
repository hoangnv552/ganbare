'use strict';

/* Controllers */
/* jshint node: true */

(function() {
	ganbareControllers.controller('viewGanbareDetailCtrl', ['$scope', '$cookieStore', '$routeParams', '$interval', 'ganbareDetail', 'addGanbare', 
		function($scope, $cookieStore, $routeParams, $interval, ganbareDetail, addGanbare) {

		ganbareDetail.query({ganbaruId: $routeParams.ganbaruId}, function(response) {
			//binding data get from server
			$scope.createdDate = response.data.ganbaru.createDate;
			$scope.expiredDate = response.data.ganbaru.expiredDate;
			$scope.ganbareNumber = response.data.ganbaru.ganbareNumber;
			$scope.ganbaruContent = response.data.ganbaru.ganbaruContent;
			$scope.username = response.data.user.username;

			var clickNumber = 0;	//the number of user's ganbare clicks
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