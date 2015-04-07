;(function(){
	'user strict';

	angular.module('ganbareFilters', []).filter('dateFilter', function()
	{
		return function(input) {
			return moment(input, 'YYYY/MM/DD').format('YYYY/MM/DD h:mm:ss');
		};
	});

	angular.module('ganbareFilters').filter('caculatorDate', function() {
		return function(createDate, expireDate) {
			var dateCreate = moment(createDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
			var dateExpire = moment(expireDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
			var t = moment(dateCreate).twix(dateExpire);

			return t.count("days");
		}
	});
})();
