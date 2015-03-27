;(function(){
'use strict';

/* Services */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('getUserInfo', ['$resource',
  	function($resource) {
  	return $resource(
    	path + 'v1/users/:id',
    	{id: '@id'},
    	{
    	getUser: {method: 'GET'}
  	});
}]);
})();