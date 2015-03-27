(function() {
	ganbareServices.factory('ganbaruDetail', ['$resource', '$cookieStore', function($resource, $cookieStore) {
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