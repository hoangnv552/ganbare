(function() {
	'use strict';
	angular.module('ganbareServices').service('passingGanbaruService', [function() {
		var ganbaruDetail = {};

		return {
			setGanbaru: function(ganbaru) {
				ganbaruDetail = ganbaru;
			},
			getGanbaru: function() {
				return ganbaruDetail;
			}
		};
	}]);
})();