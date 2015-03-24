'use strict';

/* Services */
/* jshint node: true */

var path = 'http://133.242.53.250:8888/';

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

<<<<<<< HEAD
ganbareServices.factory('tokenInjector', ['$cookieStore', function($cookieStore) {
	var tokenInjector = {
		request: function(config) {
			if($cookieStore.get('token')) {
				config.headers.Authorization = $cookieStore.get('token');
			}
			return config;
		}
	};
	return tokenInjector;
}]);

ganbareServices.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('tokenInjector');
}]);
=======
ganbareServices.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.post['Authorization'] = 'e1df2fc6-5a4a-4a9d-b55e-6702379083a8';
}]);
>>>>>>> 93c24929d11a3cca7e6fe2deb39c84212e825a25
