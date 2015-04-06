;(function() {
	'use strict';

	// Services Session
	angular.module('ganbareServices').factory('Session', ['ApiRootPath', '$resource', '$cookieStore', function(ApiRootPath, $resource, $cookieStore)
	{
		return $resource(ApiRootPath + 'v1/sessions/:token', {}, {
			login: {
                method: 'POST'
            },
            logout: {
                method: 'DELETE'
            },
		});
	}]);
})();
