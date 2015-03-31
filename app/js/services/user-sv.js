;(function(){
'use strict';

/* Services */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('user', ['$resource',
  	function($resource) {
  	return $resource(
    	path + 'v1/users/:id',
    	{},
    	{
    	getUser: {
    		method: 'GET'
    	},
    	uploadAvatar: {
    		method: 'POST',
    		url: path + 'v1/users/:id/avatars'
    	},
  	});
}]);
})();
