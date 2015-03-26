(function() {
	'use strict';

	ganbareServices.factory('createGanbaru', ['$resource', function($resource) {
		return $resource(
			path + 'v1/ganbaru',
			{ganbaruTitle: '@ganbaruTitle', ganbaruContent: '@ganbaruContent', expiredDate: '@expiredDate', ganbaruLocation: '@ganbaruLocation'},
			{save: {method: 'POST'}}
		);
	}]);
})();