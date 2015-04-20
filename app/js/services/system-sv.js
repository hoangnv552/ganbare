(function() {
	'use strict';
	angular.module('ganbareServices').factory('System', ['ApiRootPath', '$resource', function(ApiRootPath, $resource) {
		return $resource(ApiRootPath + 'v1/systems', {}, {ping: {method: 'GET'}});
	}]);
})();

