;(function(){
'use strict';

/* Controllers */

/*
* Controller Feed for visitors
*/
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru',
	'addGanbare', '$interval', '$location', 'pinGanbaru', 'favoriteGanbaru',
	'getUserInfo', 'getListGanbaru',
	function($scope, $cookieStore, listGanbaru, addGanbare, $interval, $location, pinGanbaru,
		favoriteGanbaru, getUserInfo, getListGanbaru) {

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
		token  = $cookieStore.get('token'),
		ganbaruIdAndNumber = [],
		skip = 0;
		$scope.take = 5;


		$scope.totalNumber = 0;
		$scope.checkboxesListTag = ['Sport', 'Dance', 'Music', 'Game'];
		$scope.selectTag = ['Sport'];
		$scope.listType = '';
		$scope.ganbaru = [];

		// var now = new Date();
		// console.log(now.toISOString());

		// console.log(now.toISOString().slice(0, 10).replace(/-/g, "")
		// + now.toISOString().slice(11, 19).replace(/:/g, "") + now.toISOString().slice(20, 23));

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

		/*
		* Get user infor
		*/
		getUserInfo.getUser({
			id: userId
		}).$promise.then(function getDone(data) {
			$scope.user = data;
		});

		/*
		* Defaul load page
		*/
		getListGanbaru( skip, $scope.take, '' ).then(function(data) {
			$scope.ganbaru = $scope.ganbaru.concat(data.data);
		});

		/*
		* If list more ganbaru
		*/
		$scope.listMoreGanbaru = function() {
			skip = skip + 5;
			getListGanbaru( skip, $scope.take, $scope.listType).then(function(data) {
				$scope.ganbaru = $scope.ganbaru.concat(data.data);
			});

		};

		/*
		* Function add ganbare
		*/
		$scope.addGanbare = function( item ) {
			var count = 1;
			var length = ganbaruIdAndNumber.length;
			$scope.totalNumber++;

			if ( length > 0 ) {
				var i;
				var currentGanbaruId = item.ganbaru.ganbaruId;

				for ( i = 0; i < length; i++ ) {
					if ( currentGanbaruId === ganbaruIdAndNumber[i].ganbaruId ) {
						ganbaruIdAndNumber[i].ganbareNumber++;
					} else {
						ganbaruIdAndNumber.push({ ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count });
					}
				}
			} else {
				ganbaruIdAndNumber.push({ ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count });
			}
		};



		/*
		* Add ganbare
		*/
		function callIntervalAddGanbare() {
			var length = ganbaruIdAndNumber.length;

			if ( length > 0 ) {
				for (var i = 0; i < length; i++ ) {
					var ganbaruId = ganbaruIdAndNumber[i].ganbaruId;
					var ganbareNumber = ganbaruIdAndNumber[i].ganbareNumber;

					addGanbare.add({ userId: userId, ganbaruId: ganbaruId, ganbareNumber: ganbareNumber }, function( response ) {
						response.$promise.then( function( data ) {
							console.log( data.data );
						}, function( error ) {
							// Do something
						});
					});
				}
				ganbaruIdAndNumber = [];
			}
		};

		/*
		* Set interval callIntervalAddGanbare function
		*/
		$interval( callIntervalAddGanbare, 3000 );

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
		$scope.addFavorite = function (item) {
			return favoriteGanbaru.add({
				id: userId,
				friendId: item.user.userId
			}).$promise.then(function addDone(data) {
				if (data.code === 0) {
					item.user.isFavoristUser = true;
				}
			});
		};

		/*
		* Set remove favorite ganbaru
		*/
		$scope.removeFavorite = function( item ) {
			return favoriteGanbaru.remove({
				id: userId,
				friendId: item.user.userId
			}).$promise.then(function unFavorite(data) {
				if (data.code === 0) {
					item.user.isFavoristUser = false;
				}
			});
		};

		/*
		* List pin ganbaru
		*/
		$scope.listGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = '';
			getListGanbaru( skip, $scope.take, '' ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List pin ganbaru
		*/
		$scope.listPinGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = types.listTypePin;
			getListGanbaru( skip, $scope.take, types.listTypePin ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List favorite ganbaru
		*/
		$scope.listOfFavoriteGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = types.listTypeFavorite;
			getListGanbaru( skip, $scope.take, types.listTypeFavorite ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List favorite ganbaru
		*/
		$scope.listByUserGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = types.listTypeUser;
			getListGanbaru( skip, $scope.take, types.listTypeUser ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List hot ganbaru
		*/
		$scope.listHotGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = types.listTypeHot;
			getListGanbaru( skip, $scope.take, types.listTypeHot ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List listExpireGanbaru ganbaru
		*/
		$scope.listExpireGanbaru = function() {
			$scope.showTags = false;
			$scope.listType = types.listTypeExpire;
			getListGanbaru( skip, $scope.take, types.listTypeExpire ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List Tag ganbaru
		*/
		$scope.listTagGanbaru = function() {
			$scope.showTags = true;
		}

		/*
		* Search ganbaru
		*/
		$scope.searchGanbaru = function(contentSearch) {
			if (contentSearch) {
				$scope.listType = types.listTypeSearch;
				getListGanbaru( skip, $scope.take, types.listTypeSearch, contentSearch ).then(function(data) {
					$scope.ganbaru = data.data;
				});
			} else {
				getListGanbaru( skip, $scope.take, '' ).then(function(data) {
					$scope.ganbaru = data.data;
				});
			}
		};

		/*
		* Search tag ganbaru
		*/
		$scope.searchTagGanbaru = function() {
			$scope.listType = types.listTypeTag;
			getListGanbaru( skip, $scope.take, types.listTypeTag,'' , $scope.selectTag ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};
	}]);
})();
