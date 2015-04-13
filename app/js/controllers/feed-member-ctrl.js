;(function() {
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
			var i;

			if (length > 0) {
				for (i = 0; i < length; i++ ) {

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

		//notification message display at edit page and create page
		var notification = {
			set: '期限が設定されています',
			unset: '期限が設定されていません'
		};

		/*
		* Show dialog detail
		*/
		$scope.createGanbaruDialog = function() {
			ngDialog.open({
				template:'partials/includes/create.html',

				controller: ['$scope', 'User', '$interval', '$filter', 'geolocation', '$route', function($scope, User, $interval, $filter, geolocation, $route) {
					getUserInfo();
					$scope.ganbaru = new Ganbaru();
					$scope.ganbaru.ganbaruTags = [];
					$interval(calculateCurrentTime, 1000);

					function calculateCurrentTime() {
						$scope.ganbaru.createDate = moment();
					};

					//get Username and bind on view
					function getUserInfo() {
						return User.getUser({
							id: userId
						}).$promise.then(function(response) {
							switch(response.code) {
								case 0: {
									$scope.ganbaru.username = response.data.username;
								}
								default: {

								}
							}
						}, function() {
							//Handling error
						});
					};

					$scope.$watch('jquerydatepicker', function() {
                    	//check if user choose date from picker and notify
                    	if($scope.jquerydatepicker) {
                    		$scope.notification = notification.set;
                    	} else {
                    		$scope.notification = notification.unset;
                    	}
                    });

					//put tag
					$scope.addTag = function() {
                		if(addTag($scope.tagInput, $scope.ganbaru.ganbaruTags)) {
                			$scope.tagInput = undefined;
                		}
		            };

		            //event click of create Ganbaru button
					$scope.createGanbaru = function() {
						$scope.ganbaru.expiredDate = $filter('serverDateFilter')($scope.jquerydatepicker);
						return getLocation($scope.ganbaru);
					};

					function getLocation(ganbaru) {
						geolocation.getLocation().then(function(response) {
							var coords = response.coords;
							ganbaru.ganbaruLocation = [coords.latitude, coords.longitude];
							return createGanbaru(ganbaru);
						}, function() {
							//Handling error
						});
					};

					function createGanbaru(ganbaru) {
						return ganbaru.$save().then(function(response) {
							console.log(response);
							switch(response.code) {
								case 0: {

									$scope.closeThisDialog();
                    				$route.reload();
                    				break;
								}
								default: {

								}
							}
						}, function() {
							//Handling error
						});
					};
				}],
				className: 'ngdialog-theme-plain',
				showClose: false
			})
		}

		/*
		* Show dialog create ganbaru
		*/
		$scope.ganbaruDetailDialog = function(ganbaru) {
			ngDialog.open({
				template: 'partials/includes/detail.html',

				// Controller Detail
				controller: ['$scope', '$interval', '$filter', '$route','Ganbaru', function($scope, $interval, $filter, $route, Ganbaru) {
					$scope.ganbaru = ganbaru;
					$scope.mouseClickNumber = 0;	//click ganbare
					getGanbaruDetail();

					function getGanbaruDetail() {
						return Ganbaru.getDetail({
							ganbaruId: ganbaru.ganbaru.ganbaruId
						}).$promise.then(function(response) {
							switch(response.code) {
								case 0: {
									$scope.ganbaruDetail = response.data;
									$interval(calculateExpiredDuration, 1000);
									$interval(sendRequestAddGanbare, 3000);
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
						ganbaru.ganbaru.ganbareNumber++; //bind at view of main page
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
						var expiredDate = $scope.ganbaruDetail.ganbaru.expiredDate;
						$scope.ganbaruDetail.ganbaru.expiredDuration = $filter('durationTimeFilter')(expiredDate);
					};

					//check authorization for edit and delete function
					function isAuthorized() {
						return userId === ganbaru.user.userId;
					}

					//event click of Edit
					$scope.ganbaruEditDialog = function() {
						if(!isAuthorized()) {
							return;
						}

			        	$scope.closeThisDialog();
			        	var ganbaruDetail = $scope.ganbaruDetail;

			            ngDialog.open({
			                template: 'partials/includes/edit.html',

			                controller: ['$scope', '$location', '$filter', function($scope, $location, $filter) {
			                    $scope.ganbaruDetail = ganbaruDetail;
			                    $scope.jquerydatepicker = $filter('clientDateFilter')(ganbaruDetail.ganbaru.expiredDate);

			                    $scope.addTag = function() {
		                    		if(addTag($scope.tagInput, $scope.ganbaruDetail.ganbaru.ganbaruTags)) {
		                    			$scope.tagInput = undefined;
		                    		}
			                    };

			                    $scope.$watch('jquerydatepicker', function() {
			                    	//check if user choose date from picker and notify
			                    	if($scope.jquerydatepicker) {
			                    		$scope.notification = notification.set;
			                    	} else {
			                    		$scope.notification = notification.unset;
			                    	}
			                    });

			                    $scope.updateGanbaru = function() {
			                    	//if user do not choose date from picker, then do nothing
			                    	if(!$scope.jquerydatepicker) {
			                    		return;
			                    	}

			                    	//assign property that cannot be directly binded
			                    	var newGanbaru = {
			                    		ganbaruId: ganbaruDetail.ganbaru.ganbaruId,
			                    		ganbaruTitle: ganbaruDetail.ganbaru.ganbaruTitle,
			                    		ganbaruContent: ganbaruDetail.ganbaru.ganbaruContent,
			                    		ganbaruTags: ganbaruDetail.ganbaru.ganbaruTags
			                    	};

			                    	newGanbaru.expiredDate = $filter('serverDateFilter')($scope.jquerydatepicker);
			                    	return updateGanbaru(newGanbaru);
			                    };

			                    function updateGanbaru(ganbaru) {
			                    	Ganbaru.update(ganbaru).$promise.then(function(response) {
                		           		console.log(response);
			                    		switch(response.code) {
			                    			case 0: {
			                    				$scope.closeThisDialog();
			                    				$route.reload();
			                    				break;
			                    			}
			                    			default: {

			                    			}
			                    		}
			                    	}, function() {
			                    		//Handling error
			                    	});
			                    };

			                }],
			                className: 'ngdialog-theme-plain',
			                showClose: false
			            });
			        };

			   		//event click of Delete
			        $scope.ganbaruDetele = function() {
			        	if(!isAuthorized()) {
			        		return;
			        	}
			        	Ganbaru.deleteGanbaru({
			        		ganbaruId: $scope.ganbaruDetail.ganbaru.ganbaruId
			        	}).$promise.then(function(response) {
			        		console.log(response);
			        		switch(response.code) {
			        			case 0: {
			        				$scope.closeThisDialog();
			        				$route.reload();
			        				break;
			        			}
			        			default: {

			        			}
			        		}
			        	}, function() {
			        		//Handling error
			        	});
			        };
				}],
				className: 'ngdialog-theme-plain',
				showClose: false
			});
		};

		function addTag(tagName, tagList) {
        	if(!tagName) {
        		return false;
        	}
        	var i = 0;
        	//do not allow dupplicated tags
        	for(i = 0; i < tagList.length; i++) {
        		if(tagList[i] === tagName) {
        			return false;
        		}
        	}
        	//not found in list, then add
        	if(i === tagList.length) {
        		tagList.push(tagName);
        		return true;
        	}
        };
	}]);
})();
