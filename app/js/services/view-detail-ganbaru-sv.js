(function() {
	ganbareServices.factory('ganbareDetail', ['$resource', '$cookieStore',function($resource, $cookieStore) {
		console.log('token = ' + $cookieStore.get('token'));
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