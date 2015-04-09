;(function(){
	'use strict';


	/*
	* Controller Feed for visitors
	*/
	angular.module('ganbareControllers').controller('feedMemberCtrl', ['TYPES', '$scope', '$cookieStore', 'Ganbaru', '$interval', '$location', 'dataGanbaru', 'getUtilities', 'ngDialog', 'User', function(TYPES, $scope, $cookieStore, Ganbaru, $interval, $location, dataGanbaru, getUtilities, ngDialog, User)
	{
		var userId = $cookieStore.get('userId');
		var ganbaruIdAndNumber = [];
		var take = 5;

		$scope.skip = 0;
		$scope.types = TYPES;
		$scope.totalNumber = 0;
		$scope.checkboxesListTag = ['Sport', 'Dance', 'Music', 'Game'];
		$scope.selectTag = ['Sport'];
		$scope.listType = '';
		$scope.ganbaru = [];
		$scope.length = 0;
		$scope.totalGanbareNumber = 0;
		$scope.countNumber = 0;
		$scope.contentSearch;

		// If user logout
		if (!userId) {
			userId = 'none';
		}

		/*
		* Defaul load page
		*/
		$scope.listType = TYPES.listTypeHot;
		dataGanbaru($scope.skip, take, TYPES.listTypeHot).then(function(data) {
			$scope.ganbaru = data.data;
			$scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
		});

		/*
		* If list more ganbaru
		*/
		$scope.listMoreGanbaru = function() {
			$scope.skip = $scope.skip + 5;

			return dataGanbaru($scope.skip, take, $scope.listType).then(function(data) {
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

			return getUtilities.caculatorArrNumberClicked($scope, item, ganbaruIdAndNumber).then(function(response){
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

					Ganbaru.add({
						userId: userId,
						ganbaruId: ganbaruIdAndNumber[i].ganbaruId,
						ganbareNumber: ganbaruIdAndNumber[i].ganbareNumber
					}).$promise.then(function addDone(data) {
						console.log(data.data);
					});
				}

				// clear array
				// hien tai: new array
				ganbaruIdAndNumber = [];
			}
		}

		/*
		* Set interval callIntervalAddGanbare function
		*/
		var idInterval = $interval(callIntervalAddGanbare, 3000);

		/*
		* Delete interval if escape scope
		*/
		$scope.$on('$destroy', function() {
			if (idInterval) {
				$interval.cancel(idInterval);
			}
		});

		/*
		* Set pin ganbaru
		*/
		$scope.pinGanbaru = function(item) {
			return Ganbaru.pin({
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
			return Ganbaru.unpin({
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
			return User.addFavorite({
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
			return User.removeFavorite({
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
		$scope.listGanbaru = function(type) {
			$scope.showTags = false;
			if ($scope.listType !== type) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = type;
			dataGanbaru($scope.skip, take, type).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List by user ganbaru
		*/
		$scope.listByUserGanbaru = function() {
			$scope.showTags = false;
			if ($scope.listType !== TYPES.listTypeUser) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = TYPES.listTypeUser;
			dataGanbaru( $scope.skip, take, TYPES.listTypeUser ).then(function(data) {
				$scope.ganbaru = data.data;
			});
		};

		/*
		* List Tag ganbaru
		*/
		$scope.listTagGanbaru = function() {
			$scope.showTags = true;
		};

		$scope.keyPress = function(keyCode){
      		if (keyCode === 13) {
      			if ($scope.contentSearch) {
					if ($scope.listType !== TYPES.listTypeSearch) {
						$scope.ganbaru = [];
						$scope.skip = 0;
					}
					$scope.listType = TYPES.listTypeSearch;
					dataGanbaru( $scope.skip, take, TYPES.listTypeSearch, $scope.contentSearch ).then(function(data) {
						$scope.ganbaru = data.data;
					});
				} else {
					if ($scope.listType !== TYPES.listTypeNew) {
						$scope.ganbaru = [];
						$scope.skip = 0;
					}
					$scope.listType = TYPES.listTypeNew;
					dataGanbaru( $scope.skip, take, TYPES.listTypeNew ).then(function(data) {
						$scope.ganbaru = data.data;
					});
				}
      		}
     	};



		/*
		* Search ganbaru
		*/
		$scope.searchGanbaru = function(contentSearch) {

		};

		/*
		* Search tag ganbaru
		*/
		$scope.searchTagGanbaru = function() {
			if ($scope.listType !== TYPES.listTypeTag) {
				$scope.ganbaru = [];
				$scope.skip = 0;
			}
			$scope.listType = TYPES.listTypeTag;
			dataGanbaru( $scope.skip, take, TYPES.listTypeTag,'' , $scope.selectTag ).then(function(data) {
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

		/*
		* Show dialog detail
		*/
		$scope.ganbaruDialog = function(ganbaru) {
			ngDialog.open({
				template: 'partials/includes/detail.html',

				// Controller Detail
				controller: ['$scope', '$interval', 'Ganbaru', function($scope, $interval, Ganbaru) {
					$scope.ganbaru = ganbaru;
					$scope.mouseClickNumber = 0;
					getGanbaruDetail();
					$interval(calculateExpiredDuration, 1000);
					$interval(sendRequestAddGanbare, 3000);

					function getGanbaruDetail() {
						Ganbaru.getDetail({
							ganbaruId: ganbaru.ganbaru.ganbaruId
						}).$promise.then(function(response) {
							switch(response.code) {
								case 0: {
									$scope.ganbaruDetail = response.data;
									break;
								}
								default: {

								}
							}
						}, function() {
							//Handling error here
						});
					}

					$scope.addGanbare = function() {
						$scope.ganbaruDetail.ganbaru.ganbareNumber++;
						$scope.mouseClickNumber++;
						ganbaru.ganbaru.ganbareNumber++;
					}

					function sendRequestAddGanbare() {
						if($scope.mouseClickNumber > 0) {
							Ganbaru.add({
								ganbaruId: $scope.ganbaruDetail.ganbaru.ganbaruId,
								ganbareNumber: $scope.mouseClickNumber,
								userId: userId
							}).$promise.then(function(response) {
								console.log(response.data);

							}, function() {
								//Handling error
							});
						}
						$scope.mouseClickNumber = 0;
					}

					function calculateExpiredDuration() {
						var now = moment();
						var expiredDate = moment($scope.ganbaruDetail.ganbaru.expiredDate, 'YYYYMMDDhhmmss');
						$scope.ganbaruDetail.ganbaru.expiredDuration = moment.duration(expiredDate.diff(now)).format('D日 ＋ hh:mm:ss');
					};
				}],
				className: 'ngdialog-theme-plain',
				showClose: false
			});
		}

	}]);
})();
