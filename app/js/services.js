
/* Services */

var path = 'http://133.242.53.250:8888/';

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

ganbareServices.factory('tokenInjector', ['$cookieStore', function($cookieStore) {
	'use strict';
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
	'use strict';
	$httpProvider.interceptors.push('tokenInjector');
}]);
