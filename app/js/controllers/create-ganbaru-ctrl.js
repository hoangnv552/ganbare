(function() {
	'use strict';
	angular.module('ganbareControllers').controller('createGanbaruCtrl', ['$scope', '$cookieStore', 'User', 'Ganbaru', '$interval', '$filter', 'geolocation', '$route', 'getUtilities', 'USER_NOTIFY', function($scope, $cookieStore, User, Ganbaru, $interval, $filter, geolocation, $route, getUtilities, USER_NOTIFY) {
		getUserInfo();
		$scope.ganbaru = new Ganbaru();
		$scope.ganbaru.ganbaruTags = [];

		var calculateCurrentTime = $interval(calculateCurrentTime, 1000);
		$scope.$on('$destroy', function() {
			$interval.cancel(calculateCurrentTime);
		});

		function calculateCurrentTime() {
			$scope.ganbaru.createDate = moment();
		};

		//get Username and bind on view
		function getUserInfo() {
			return User.getUser({
				id: $cookieStore.get('userId')
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
        		$scope.notification = USER_NOTIFY.dateSet;
        	} else {
        		$scope.notification = USER_NOTIFY.dateNotSet;
        	}
        });

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
	}]);
})();
