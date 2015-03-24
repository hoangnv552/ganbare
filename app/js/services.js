'use strict';

/* Services */
/* jshint node: true */

var path = 'http://133.242.53.250:8888/';

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

ganbareServices.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.post['Authorization'] = 'e1df2fc6-5a4a-4a9d-b55e-6702379083a8';
}]);
