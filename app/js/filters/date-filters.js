;(function(){
	'user strict';

	angular.module('ganbareFilters', []).filter('dateFilter', function()
	{
		return function(input) {
			return moment(input, 'YYYY/MM/DD H:mm:ss').format('YYYY/MM/DD H:mm:ss');
		};
	});

	angular.module('ganbareFilters').filter('caculatorDate', function()
	{
		return function(createDate, expireDate) {
			var dateCreate = moment().format('YYYY-MM-DD H:mm:ss');
			var dateExpire = moment(expireDate, 'YYYY-MM-DD').format('YYYY-MM-DD H:mm:ss');
			var t = moment(dateCreate).twix(dateExpire);

			return t.count("days");
		}
	});
})();
