(function() {
	ganbareServices.factory('ganbareDetail', ['$resource', '$cookieStore', function($resource, $cookieStore) {
		return $resource(
			path + 'v1/ganbaru/:ganbaruId',
			{ganbaruId: '@ganbaruId'},
			{
				query: {method: 'GET'},
				isArray: false
			}
		);
	}]);

	// ganbareServices.factory('pinGanbare', ['$resource', '$cookieStore', function($resource, $cookieStore) {
	// 	return $resource(
	// 		path + 'v1/users/:userId/pins',
	// 		{userId: '@userId'},
	// 		{
	// 			save: {method: 'POST'}
	// 		}
	// 	);
	// }]);
})();