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
		listTypeNew              :  0,
		listTypePin              :  1,
		listTypeFavorite         :  2,
		listTypeUser             :  3,
		listTypeHot              :  4,
		listTypeExpire           :  5,
		listTypeTag              :  6,
		listTypeSearch           :  7,
		listTypeHotNew           :  8,
		listTypeHotExpire        :  9,
		listTypeNewHot           :  10,
		listTypeNewExpire        :  11,
		listTypeExpireNew        :  12,
		listTypeExpireHot        :  13,
		listTypeHotNeglected     :  14,
		listTypeNewNeglected     :  15,
		listTypeExpireNeglected  :  16
	});

	// list types Upload file
	angular.module('ganbareServices').constant('TYPES_UPLOAD', {
		avatar     : 1,
		background : 2,
		image      : 3
	});

	angular.module('ganbareServices').constant('ERROR_MSG', {
		1: 'Unknown error!',
		2: 'Invalid information!',
		11: 'Email has been registered before!',
		12: 'Email not found!',
		20: 'Invalid password!',
		21: 'Incorrect password!',
		40: 'Failed to get current location coordinates',
		50: 'Cannot establish connection to server!'
	});
})();
