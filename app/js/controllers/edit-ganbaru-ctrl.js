(function() {
	'use strict';
	angular.module('ganbareControllers').controller('editGanbaruCtrl', ['$scope', '$location', '$route', '$filter', 'Ganbaru', 'passingGanbaruService', 'USER_NOTIFY', 'getUtilities', function($scope, $location, $route, $filter, Ganbaru, passingGanbaruService, USER_NOTIFY, getUtilities) {
        $scope.ganbaruDetail = passingGanbaruService.getGanbaru();
        $scope.jquerydatepicker = $filter('clientDateFilter')($scope.ganbaruDetail.ganbaru.expiredDate);
        $scope.notification = USER_NOTIFY.dateSet;

        $scope.addTag = function() {
            getUtilities.addTag($scope, $scope.ganbaruDetail.ganbaru);
        };

        $scope.updateGanbaru = function() {
        	//if user do not choose date from picker, then do nothing
        	if(!$scope.jquerydatepicker) {
        		return;
        	}

        	//assign property that cannot be directly binded
        	var newGanbaru = {
        		ganbaruId: $scope.ganbaruDetail.ganbaru.ganbaruId,
        		ganbaruTitle: $scope.ganbaruDetail.ganbaru.ganbaruTitle,
        		ganbaruContent: $scope.ganbaruDetail.ganbaru.ganbaruContent,
        		ganbaruTags: $scope.ganbaruDetail.ganbaru.ganbaruTags
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
	}]);	
})();