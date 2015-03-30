'use strict';

ganbareControllers.controller('editGanbaruCtrl', ['$scope', '$cookieStore', '$routeParams','ganbaruDetail', 'editGanbaru', 'getUtilities',
	function($scope, $cookieStore, $routeParams, ganbaruDetail, editGanbaru, getUtilities) {
		var userId = $cookieStore.get('userId');
		var token = $cookieStore.get('token');
		var ganbaruId = $routeParams.ganbaruId;	

		ganbaruDetail.query({ganbaruId: ganbaruId}, function(response) {
			console.log(response);
			$scope.ganbaru = response.data.ganbaru;
			$scope.ganbaruUser = response.data.user;

			function formatDate(dateStr) {
				var expiredDate = dateStr.slice(0, 4) + '/' + dateStr.slice(4, 6) + '/' + dateStr.slice(6, 8);
				return expiredDate;
			};

			$scope.ganbaru.expiredDate = formatDate($scope.ganbaru.expiredDate);

			var tags = [];
			angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
				tags.push({text: obj}); 
			});
			$scope.ganbaru.ganbaruTags = tags;

			/*Send edit request*/
			$scope.editGanbaru = function() {
				tags = [];
				angular.forEach($scope.ganbaru.ganbaruTags, function(obj, key) {
					tags.push(obj.text);
				});
				editGanbaru.put(
					{
						ganbaruId: ganbaruId, 
						ganbaruTitle: $scope.ganbaru.ganbaruTitle, 
						ganbaruContent: $scope.ganbaru.ganbaruContent,
						ganbaruTags: tags,
						expiredDate: ($scope.ganbaru.expiredDate.replace(/\//g, '') + '000000')
					}, function(response) {
						console.log(response);
					}, function() {
						console.log('Fail to edit!');
					});
			};

		}, function() {
			//Handling error here
			console.log('Failed to get ganbaru detail!');
		});
}]);	