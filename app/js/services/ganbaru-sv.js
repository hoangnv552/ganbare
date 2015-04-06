;(function() {
	'use strict';

	// Services ganbaru
	angular.module('ganbareServices').factory('Ganbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
	{
		var Ganbaru = $resource(ApiRootPath + 'v1/users/:userId/ganbare', {
			userId: '@userId',
			ganbaruId: '@ganbaruId'
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
			},
			getDetail: {
				method: 'GET',
				url: ApiRootPath + 'v1/ganbaru/:ganbaruId'
			},
			update: {
				method: 'PUT',
				url: ApiRootPath + 'v1/ganbaru/:ganbaruId'
			}
		});

		return Ganbaru;
	}]);
})();
