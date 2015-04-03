(function() {
	'use strict';
	/* global ganbareServices:true */
	/* global path:true */

	ganbareServices.factory('Ganbaru', ['$resource', function($resource) {
		return $resource(path + 'v1/ganbaru', {}, {
			save: {
				method: 'POST'
			},
			query: {
				method: 'GET'
			}
		});
	}]);
})();
