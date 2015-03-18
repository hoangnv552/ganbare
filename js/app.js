(function() {
	'use strict';
	var app = angular.module('Ganbare', ['ngRoute', 'GanbareController']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/register', {
				templateUrl: 'templates/register.html',
				controller: 'RegisterCtrl'
			}).
			when('/register/confirm', {
				templateUrl: 'templates/confirm.html',
				controller: 'ConfirmRegisterCtrl'
			}).
			when('/register/error', {
				templateUrl: 'templates/register_error.html',
				controller: 'ConfirmRegisterCtrl'
			}).
			when('/register/success', {
				templateUrl: 'templates/register_success.html',
				controller: 'ResultRegisterCtrl'
			});
	}]);
})();