;(function(){
'use strict';

/* Controllers */
/* jshint node: true */

/*
* Controller my page
*/
ganbareControllers.controller('myPageGanbaruCtrl', ['$scope', 'getUserInfo', '$cookieStore',
	function( $scope, getUserInfo, $cookieStore ) {

	var userId  = $cookieStore.get('userId');

	/*
    * Get user infor
    */
    getUserInfo.getUser({id: userId}, function( response ) {
      $scope.user = response;
    }, function( error ){
      // Do something
    });


	}]);
})();
