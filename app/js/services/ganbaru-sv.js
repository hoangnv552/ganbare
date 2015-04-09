;(function() {
	'use strict';

	// Services ganbaru
	angular.module('ganbareServices').factory('Ganbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
	{
		var Ganbaru = $resource(ApiRootPath + 'v1/users/:userId/ganbare', {
			userId: '@userId',
			ganbaruId: '@ganbaruId'
		}, {
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
			},
			pin: {
            	method: 'POST',
            	url: ApiRootPath + 'v1/users/:userId/pins'
            },
            unpin: {
                method: 'DELETE',
                url: ApiRootPath + 'v1/users/:userId/pins/:ganbaruId'
            },
            default: {
                method: 'GET',
                url: ApiRootPath + 'v1/ganbaru'
                // transformResponse: function(data, headerGetter) {
                //     console.log(data);
                //     return data;
                // }
            },
            pins: {
                method: 'GET',
                url: ApiRootPath + 'v1/users/:userId/pins'
            },
            favorites: {
                method: 'GET',
                url: ApiRootPath + 'v1/users/:userId/favorites/ganbaru'
            },
            user: {
                method: 'GET',
                url: ApiRootPath + 'v1/users/:userId/ganbaru'
            }
		});

		return Ganbaru;
	}]);
})();
