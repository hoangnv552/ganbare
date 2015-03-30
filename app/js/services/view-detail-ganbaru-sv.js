(function() {
	ganbareServices.factory('ganbaruDetail', ['$resource', function($resource) {
		return $resource(
			path + 'v1/ganbaru/:ganbaruId',
			{ganbaruId: '@ganbaruId'},
			{
				query: {method: 'GET'},
				isArray: false
			}
		);
	}]);
})();