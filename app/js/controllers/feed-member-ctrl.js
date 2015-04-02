;(function(){
'use strict';

/* Controllers */

/*
* Controller Feed for visitors
*/
ganbareControllers.controller('feedMemberCtrl', ['$scope', '$cookieStore',
	'addGanbare', '$interval', '$location', 'pinGanbaru', 'favoriteGanbaru',
	'getListGanbaru', 'getUtilities',
	function($scope, $cookieStore, addGanbare, $interval, $location, pinGanbaru,
		favoriteGanbaru, getListGanbaru, getUtilities) {

		var types = {
	  		listTypePin: 1,
			listTypeFavorite: 2,
			listTypeUser: 3,
			listTypeHot: 4,
			listTypeExpire: 5,
			listTypeTag: 6,
			listTypeSearch: 7
		},
		userId  = $cookieStore.get('userId'),
		ganbaruIdAndNumber = [],
		take = 5;
		$scope.skip = 0;

		$scope.totalNumber = 0;
		$scope.checkboxesListTag = ['Sport', 'Dance', 'Music', 'Game'];
		$scope.selectTag = ['Sport'];
		$scope.listType = '';
		$scope.ganbaru = [];
		$scope.length = 0;
		$scope.totalGanbareNumber = 0;
		$scope.countNumber = 0;

		// If user logout
		if (!userId) {
			userId = 'none';
		}

		/*
		* Defaul load page
		*/
		getListGanbaru( $scope.skip, take, '' ).then(function(data) {
			$scope.ganbaru = data.data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		/*
		* If list more ganbaru
		*/
		$scope.listMoreGanbaru = function() {
			$scope.skip = $scope.skip + 5;
			getListGanbaru( $scope.skip, take, $scope.listType).then(function(data) {
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

		/*
		* List pin ganbaru
		*/
		$scope.listGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== '') {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = '';
			getListGanbaru( $scope.skip, take, '' ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List pin ganbaru
		*/
		$scope.listPinGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== types.listTypePin) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypePin;
			getListGanbaru( $scope.skip, take, types.listTypePin ).then(function(data) {
				$scope.ganbaru = data.data;

			});
		};

		/*
		* List favorite ganbaru
		*/
		$scope.listOfFavoriteGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== types.listTypeFavorite) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypeFavorite;
			getListGanbaru( $scope.skip, take, types.listTypeFavorite ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List by user ganbaru
		*/
		$scope.listByUserGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== types.listTypeUser) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypeUser;
			getListGanbaru( $scope.skip, take, types.listTypeUser ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List hot ganbaru
		*/
		$scope.listHotGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== types.listTypeHot) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypeHot;
			getListGanbaru( $scope.skip, take, types.listTypeHot ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List listExpireGanbaru ganbaru
		*/
		$scope.listExpireGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== types.listTypeExpire) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypeExpire;
			getListGanbaru( $scope.skip, take, types.listTypeExpire ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List Tag ganbaru
		*/
		$scope.listTagGanbaru = function() {
			$scope.showTags = true;
		};

		/*
		* Search ganbaru
		*/
		$scope.searchGanbaru = function(contentSearch) {
			if (contentSearch) {
				if ($scope.listType !== types.listTypeSearch) {
					$scope.ganbaru = [];
					$scope.skip = 0;
				}
				$scope.listType = types.listTypeSearch;
				getListGanbaru( $scope.skip, take, types.listTypeSearch, contentSearch ).then(function(data) {
					$scope.ganbaru = data.data;
				});
			} else {
				if ($scope.listType !== '') {
					$scope.ganbaru = [];
					$scope.skip = 0;
				}
				getListGanbaru( $scope.skip, take, '' ).then(function(data) {
					$scope.ganbaru = data.data;
				});
			}
		};

		/*
		* Search tag ganbaru
		*/
		$scope.searchTagGanbaru = function() {
			if ($scope.listType !== types.listTypeTag) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = types.listTypeTag;
			getListGanbaru( $scope.skip, take, types.listTypeTag,'' , $scope.selectTag ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* Selection texbox
		*/
		$scope.toggleSelection = function(tag) {
			var idx = $scope.selectTag.indexOf(tag);
			// is currently selected
			if (idx > -1) {
				$scope.selectTag.splice(idx, 1);
			}
			// is newly selected
			else {
				$scope.selectTag.push(tag);
			}
		};

	}]);
})();
