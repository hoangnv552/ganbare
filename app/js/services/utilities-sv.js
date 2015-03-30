;(function(){
'use strict';

/*
* Service utilites
*/
ganbareServices.factory('getUtilities', ['$q',
	function($q){
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
			}
		}
	}]);
})()
