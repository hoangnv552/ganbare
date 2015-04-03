;(function(){
'use strict';
/* global ganbareControllers:true */
/*
* Controller list by user
*/

ganbareControllers.controller('listByUser', ['$scope', '$routeParams', 'getListGanbaru', '$interval',
	'addGanbare', 'getUtilities', 'pinGanbaru', '$cookieStore', 'favoriteGanbaru',
	function($scope, $routeParams, getListGanbaru, $interval, addGanbare, getUtilities,
		pinGanbaru, $cookieStore, favoriteGanbaru) {

		var ganbaruIdAndNumber = [],
		userIdParam = $routeParams.userId,
		userId  = $cookieStore.get('userId'),
		take = 5;
		$scope.skip = 0;
		$scope.length = 0;
		$scope.totalNumber = 0;
		$scope.ganbaru = [];
		$scope.totalGanbareNumber = 0;
		$scope.countNumber = 0;

		// list by user
		var listType = 3;

		/*
		* Defaul load page
		*/
		getListGanbaru( $scope.skip, take, listType, '', '', userIdParam).then(function(data) {
			$scope.ganbaru = data.data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		/*
		* If list more ganbaru
		*/
		$scope.listMoreGanbaru = function() {
			$scope.skip = $scope.skip + 5;
			getListGanbaru( $scope.skip, take, listType, '', '', userIdParam).then(function(data) {
				$scope.ganbaru = $scope.ganbaru.concat(data.data);
				$scope.length = $scope.ganbaru.length;
			});
		};

		/*
		* Function add ganbare
		*/
		$scope.addGanbare = function(item) {
			// Caculator total ganbaru number for view
			$scope.totalNumber++;
			// Caculator total ganbaru number for function addGanbare
			$scope.countNumber++;

			getUtilities.caculatorArrNumberClicked($scope, item, ganbaruIdAndNumber).then(function(response){
				ganbaruIdAndNumber = response;
			});
		};

		/*
		* Add ganbare
		*/
		function callIntervalAddGanbare() {
			var length = ganbaruIdAndNumber.length;
			//Set back countNumber = 0
			$scope.countNumber = 0;

			if (length > 0) {
				for (var i = 0; i < length; i++ ) {
					var ganbaruId = ganbaruIdAndNumber[i].ganbaruId;
					var ganbareNumber = ganbaruIdAndNumber[i].ganbareNumber;

					addGanbare.add({
						userId: userId,
						ganbaruId: ganbaruId,
						ganbareNumber: ganbareNumber
					}).$promise.then(function addDone(data) {
						console.log(data.data);
					});
				}
				ganbaruIdAndNumber = [];
			}
		}

		/*
		* Set interval callIntervalAddGanbare function
		*/
		$interval(callIntervalAddGanbare, 3000);

		/*
		* Set pin ganbaru
		*/
		$scope.pinGanbaru = function(item) {
			return pinGanbaru.pin({
				userId: userId,
				ganbaruId: item.ganbaru.ganbaruId
			}).$promise.then(function pinDone(data) {
				if (data.code === 0) {
					item.ganbaru.isPinning = true;
				}
			});
		};

		/*
		* Set unpin ganbaru
		*/
		$scope.unPinGanbaru = function(item) {
			return pinGanbaru.unpin({
				userId: userId,
				ganbaruId: item.ganbaru.ganbaruId
			}).$promise.then(function unPinDone(data) {
				if (data.code === 0) {
					item.ganbaru.isPinning = false;
				}
			});
		};

		/*
		* Set favorite ganbaru
		*/
		$scope.addFavorite = function (item, ganbaru) {
			return favoriteGanbaru.add({
				id: userId,
				friendId: item.user.userId
			}).$promise.then(function addDone(data) {
				if (data.code === 0) {
					angular.forEach(ganbaru, function(value, key) {
						if (item.user.userId === value.user.userId) {
							value.user.isFavoristUser = true;
						}
					});
				}
			});
		};

		/*
		* Set remove favorite ganbaru
		*/
		$scope.removeFavorite = function(item, ganbaru) {
			return favoriteGanbaru.remove({
				id: userId,
				friendId: item.user.userId
			}).$promise.then(function unFavorite(data) {
				if (data.code === 0) {
					angular.forEach(ganbaru, function(value, key) {
						if (item.user.userId === value.user.userId) {
							value.user.isFavoristUser = false;
						}
					});
				}
			});
		};
	}]);
})();
