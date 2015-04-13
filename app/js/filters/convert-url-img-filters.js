;(function() {
	'use strict';

	angular.module('ganbareFilters').filter('convertUrlImg', ['ApiRootPath', '$cookieStore', function(ApiRootPath, $cookieStore) {
		return function (input) {
			console.log(input);
			var userId = $cookieStore.get('userId');
			var parser = document.createElement('a');

			parser.href = input;
			var urlImg = ApiRootPath + 'v1/users/' + userId + '/image' + parser.pathname;

			return urlImg;
		}
	}]);
})();
