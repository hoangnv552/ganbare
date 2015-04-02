;(function(){
'user strict';

angular.module('ganbareFilters', []).filter('dateFilter',
	function() {
	return function(input) {
		return moment(input, 'YYYY-MM-DD').format('YYYY-MM-DD');
	};
});
})();
