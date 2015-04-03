;(function(){
'use strict';

/* global ganbareServices:true */
/* global path:true */

/*
* Service utilites
*/
ganbareServices.factory('getUtilities', ['$q', 'addGanbare', 'ganbaruDetail',
	function($q, addGanbare, ganbaruDetail){
		return {
			/*
			* Caculator array same [{ ganbaruId: sddf234sf, ganbareNumber: 2 }]
			*/
			caculatorArrNumberClicked: function($scope, ganbaru, ganbaruIdAndNumber) {
				var deferred = $q.defer(),
				count = 1,
				length = ganbaruIdAndNumber.length,
				flgCheck = false;

				if (length > 0) {
					var i,
					currentGanbaruId = ganbaru.ganbaru.ganbaruId;

					for (i = 0; i < length; i++) {
						if (currentGanbaruId === ganbaruIdAndNumber[i].ganbaruId) {
							ganbaruIdAndNumber[i].ganbareNumber = $scope.countNumber;
							flgCheck = true;
						}
					}
					if (flgCheck === false) {
						$scope.countNumber = 1;
						ganbaruIdAndNumber.push({ ganbaruId: ganbaru.ganbaru.ganbaruId, ganbareNumber: count });
					}
				} else {
					ganbaruIdAndNumber.push({ ganbaruId: ganbaru.ganbaru.ganbaruId, ganbareNumber: count });
				}

				if (!ganbaruIdAndNumber) {
					deferred.reject('Error caculatorArrNumberClicked function');
				}

				deferred.resolve(ganbaruIdAndNumber);

				return deferred.promise;
			},

			/*Add ganbare in view Ganbaru Detail Page & Edit Ganbaru Detail Page*/
			sendRequestAddGanbare: function($scope, userId, ganbaruId) {
				var deferred = $q.defer();
				if($scope.clickNumber > 0) {
					addGanbare.add({
						userId: userId,
						ganbaruId: ganbaruId,
						ganbareNumber: $scope.clickNumber
					}, function(response) {
						deferred.resolve(response.data);
					}, function() {
						deferred.reject('Failed To Add Ganbare!');
					});
				}
				return deferred.promise;
			},

			/*Get Ganbaru Detail in view Ganbaru Detail Page & Edit Ganbaru Detail Page*/
			sendRequestGetGanbaruDetail: function(ganbaruId) {
				var deferred = $q.defer();
				ganbaruDetail.query({ganbaruId: ganbaruId}, function(response) {
					deferred.resolve(response);
				}, function() {
					deferred.reject('Failed To Get Ganbaru Detail!');
				});
				return deferred.promise;
			}
		};
	}]);
})();
