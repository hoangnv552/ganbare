(function() {
'use strict';
	ganbareServices.factory('ganbaruDetail', ['$resource', function($resource) {
		return $resource(
			path + 'v1/ganbaru/:ganbaruId',
			{},
			{
				query: {method: 'GET'},
			}
		);
	}]);
})();
