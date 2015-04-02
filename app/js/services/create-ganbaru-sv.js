(function() {
	'use strict';

	ganbareServices.factory('createGanbaru', ['$resource', function($resource) {
		return $resource(
			path + 'v1/ganbaru',
			{},
			{save: {method: 'POST'}}
		);
	}]);
})();