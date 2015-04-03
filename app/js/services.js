;(function() {
	'use strict';

	/* Services */
	angular.module('ganbareServices', ['ngResource']);

	angular.module('ganbareServices').factory('tokenInjector', ['$cookieStore', function($cookieStore) {
		return {
			request: function(config) {
				var token = $cookieStore.get('token');

				if (token) {
					config.headers.Authorization = token;
				}

				return config;
			}
		};
	}]);

	angular.module('ganbareServices').config(['$httpProvider', function($httpProvider) {

		$httpProvider.interceptors.push('tokenInjector');
	}]);

	angular.module('ganbareServices').constant('ApiRootPath', 'http://133.242.53.250:8888/');

	// list types ganbaru
	angular.module('ganbareServices').constant('TYPES', {
		listTypePin:      1,
		listTypeFavorite: 2,
		listTypeUser:     3,
		listTypeHot:      4,
		listTypeExpire:   5,
		listTypeTag:      6,
		listTypeSearch:   7
	});
})();
