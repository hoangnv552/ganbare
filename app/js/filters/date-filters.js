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


	//inside ganbaru detail and ganbaru edit controller
	angular.module('ganbareFilters').filter('serverDateFilter', function() {
		return function(clientDateStr) {
			return moment(clientDateStr, 'YYYY/MM/DD HH:mm:ss').format('YYYYMMDDHHmmss');
		};
	});

	angular.module('ganbareFilters').filter('clientDateFilter', function() {
		return function(serverDateFilter) {
			return moment(serverDateFilter, 'YYYYMMDDHHmmss').format('YYYY/MM/DD HH:mm');
		};
	});

	angular.module('ganbareFilters').filter('durationTimeFilter', function() {
		return function(serverDateString) {
			var now = moment();
			var expiredDate = moment(serverDateString, 'YYYYMMDDHHmmss');
			var duration = moment.duration(expiredDate.diff(now));
			return duration.format('D日 ＋ hh:mm:ss');
		}
	});
})();
