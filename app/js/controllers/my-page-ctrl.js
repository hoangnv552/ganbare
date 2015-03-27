;(function(){
'use strict';

/* Controllers */

/*
* Controller my page
*/
ganbareControllers.controller('myPageGanbaruCtrl', ['$scope', 'getUserInfo', '$cookieStore',
	function( $scope, getUserInfo, $cookieStore ) {

	var userId  = $cookieStore.get('userId');

	/*
    * Get user infor
    */
    getUserInfo.getUser({
        id: userId
    }).$promise.then(function getDone(data) {
        $scope.user = data;
    });

	}]);
})();
