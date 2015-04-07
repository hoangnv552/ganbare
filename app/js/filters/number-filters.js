;(function() {
	'use strict';

	angular.module('ganbareFilters').filter('numberFilter', function()
	{
		return function(n, len) {
			var num = parseInt(n, 10);
			var len = parseInt(len, 10);

			if (isNaN(num) || isNaN(len)) {
				return n;
			}
			num =  '' + num;
			while (num.length < len) {
				num = '0' + num;
			}
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	});
})();
