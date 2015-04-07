;(function() {
	'use strict';

	angular.module('ganbareDirective').directive('fileModel', ['$parse', function($parse)
	{
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				var handleChange = function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				};

				element.on('change', handleChange);

				scope.$on('$destroy', function() {
					element.off('change', handleChange);
				});
			}
		};
	}]);
})();
