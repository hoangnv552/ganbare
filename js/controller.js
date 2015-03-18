(function() {
	'use strict';
	var GanbareController = angular.module('GanbareController', ['ngMatch', 'angular-md5']);
	GanbareController.service('RegisterData', function() {
		var user = {};
		var responseCode;
		return {
			setUser: function(newUser) {
				user = newUser;
			},
			getUser: function() {
				return user;
			},
			setResponseCode: function(code) {
				responseCode = code;
			},
			getResponseCode: function() {
				return responseCode;
			}
		};
	});

	GanbareController.controller('RegisterCtrl', ['$scope', '$location','RegisterData', function($scope, $location, RegisterData) {	
		$scope.goTo = function(path)	{
			RegisterData.setUser($scope.user);
			$location.path(path);
		}
	}]);

	GanbareController.controller('ConfirmRegisterCtrl', ['$scope', '$http', '$location','md5', 'RegisterData', function($scope, $http, $location, md5, RegisterData) {
		var user = RegisterData.getUser();
		$scope.username = user.username;
		$scope.email = user.email;

		$scope.register = function() {
			var request = {
				method: 'POST',
				url: 'http://localhost:8888/v1/users',
				data: {
					'email': user.email,
					'username': user.username,
					'password': user.password,
					'encryptedPassword': md5.createHash(user.password),
					'loginType': 1
				}
			};
			$http(request).
				success(function(response) {
					console.log(response.code);
					// $location.path('/register/success');
					RegisterData.setResponseCode(response.code);
					$location.path('/register/success');
				}).	
				error(function() {
					console.log('Will definitely fail!');
					$location.path('/register/error');
				});
		};
	}]);

	GanbareController.controller('ResultRegisterCtrl', [function() {

	}]);
})();