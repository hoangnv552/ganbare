'use strict';

/* Services */
/* jshint node: true */

var path = 'http://133.242.53.250:8888/';

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

ganbareServices.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.post['Authorization'] = 'db11f5f4-9e67-4728-8306-0f1feba721a3';
}]);
