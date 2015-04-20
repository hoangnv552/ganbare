(function() {
	'use strict';
	angular.module('ganbareControllers').controller('ganbaruDetailCtrl', ['$scope', '$cookieStore', '$interval', '$filter', '$route','Ganbaru', 'ngDialog', 'passingGanbaruService', function($scope, $cookieStore, $interval, $filter, $route, Ganbaru, ngDialog, passingGanbaruService) {
		$scope.ganbaru = passingGanbaruService.getGanbaru();
		$scope.mouseClickNumber = 0;	//click ganbare
		getGanbaruDetail();

		var userId = $cookieStore.get('userId');
		var expiredDurationInterval = $interval(calculateExpiredDuration, 1000);
		var addGanbareInterval = $interval(sendRequestAddGanbare, 3000);
		
		$scope.$on('$destroy', function() {
			$interval.cancel(expiredDurationInterval);
			$interval.cancel(addGanbareInterval);
		});

		function getGanbaruDetail() {
			return Ganbaru.getDetail({
				ganbaruId: $scope.ganbaru.ganbaru.ganbaruId
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
			$scope.ganbaru.ganbaru.ganbareNumber++;//bind at view of main page
		}

		function sendRequestAddGanbare() {
			if($scope.mouseClickNumber > 0) {
				Ganbaru.add({
					ganbaruId: $scope.ganbaruDetail.ganbaru.ganbaruId,
					ganbareNumber: $scope.mouseClickNumber,
					userId: userId
				}).$promise.then(function(response) {
					console.log(response);

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
			return userId === $scope.ganbaru.user.userId;
		};

		//event click of Edit
		$scope.ganbaruEditDialog = function() {
			if(!isAuthorized()) {
				return;
			}

        	$scope.closeThisDialog();
        	passingGanbaruService.setGanbaru($scope.ganbaruDetail);

            ngDialog.open({
                template: 'partials/includes/edit.html',

                controller: 'editGanbaruCtrl',
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
	}]);
})();