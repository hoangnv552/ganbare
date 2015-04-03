;(function() {
	'use strict';

	angular.module('ganbareServices').factory('editGanbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
	{
		return $resource(ApiRootPath + 'v1/ganbaru/:ganbaruId', {
				ganbaruId: '@ganbaruId',
			},
			{
				put: {method: 'PUT'}
			}
		);
	}]);
})();
