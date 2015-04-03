;(function() {
	'use strict';

	// Services ganbaru
	angular.module('ganbareServices').factory('Ganbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
	{
		var Ganbaru = $resource(ApiRootPath + 'v1/users/:userId/ganbare', {
			userId: '@userId'
		},
		{
			add: {
				method: 'PUT'
			},
			deleteGanbaru: {
				method: 'DELETE',
				url: ApiRootPath + 'v1/ganbaru/:ganbaruId'
			},
			save: {
				method: 'POST',
				url: ApiRootPath + 'v1/ganbaru'
			},
			query: {
				method: 'GET'
			}
		});

		return Ganbaru;
	}]);
})();
