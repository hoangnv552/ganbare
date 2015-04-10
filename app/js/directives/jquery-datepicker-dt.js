;(function() {
	'use strict';
	angular.module('ganbareDirective').directive('jquerydatepicker', ['$parse', function($parse) {
		return {
			restrict: 'AC',
			link: function(scope, element, attrs) {
				var ngModel = $parse(attrs.ngModel);
				$(function() {
					element.datetimepicker({
						inline: true,
			            dateFormat: 'yy/mm/dd',
			            showOtherMonths: true,
		            	dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
			            onSelect: function(dateText, inst) {
			               scope.$apply(function(scope) {
			               		ngModel.assign(scope, dateText);
			               });
			           }
					})
				});
			}
		};
	}]);

	// angular.module('ganbareDirective').directive('jquerydatepickertrigger', [function() {
	// 	return {
	// 		restrict: 'AC',
	// 		link: function(scope, element, attrs) {
	// 			$(function() {
	// 				element.click(function() {
	// 					var x = $('.jquerydatepicker').datetimepicker('show');
	// 					console.log(x);
	// 					scope.$apply();
	// 				});
	// 			});
	// 		}
	// 	};
	// }]);
})();