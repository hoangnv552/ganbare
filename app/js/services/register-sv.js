(function() {
	'use strict';

	ganbareServices.factory('registerGanbare', ['$resource', function($resource) {
		return $resource(
			path + 'v1/users', 
			{
				email: '@email',
				password: '@password',
				encryptedPassword: '@password',
				username: '@userName',
				loginType: '@loginType'
			}, 
			{
				register: {method: 'POST'}
			});
	}]);
})();