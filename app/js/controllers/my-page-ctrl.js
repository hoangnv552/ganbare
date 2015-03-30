;(function(){
'use strict';

/* Controllers */

/*
* Controller my page
*/
ganbareControllers.controller('myPageGanbaruCtrl', ['$scope', 'getUserInfo', '$cookieStore', 'getListGanbaru',
	function( $scope, getUserInfo, $cookieStore, getListGanbaru ) {

	var userId  = $cookieStore.get('userId'),
    listTypeUser = 3,
    take = 5;
    $scope.skip = 0;
    $scope.ganbaru = [];
    $scope.length = 0;
    $scope.totalGanbareNumber = 0;

    /*
    * Get user infor
    */
    getUserInfo.getUser({
        id: userId
    }).$promise.then(function getDone(data) {
        $scope.user = data;
    });

    /*
    * Get list my page (list by user)
    */
    getListGanbaru( $scope.skip, take, listTypeUser ).then(function(data) {
        $scope.ganbaru = data.data;
        $scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
    });

    /*
    * Get list more
    */
    $scope.listMoreGanbaru = function() {
        $scope.skip = $scope.skip + 5;
        getListGanbaru( $scope.skip, take, listTypeUser).then(function(data) {
            $scope.ganbaru = $scope.ganbaru.concat(data.data);
            $scope.length = $scope.ganbaru.length;
        });
    }

	}]);
})();
