(function() {
	'use strict';

	angular.module('ganbareServices').factory('ganbaruDetail', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
	{
		return $resource(ApiRootPath + 'v1/ganbaru/:ganbaruId', {},
			{
				query: {method: 'GET'},
			}
		);
	}]);
})();
