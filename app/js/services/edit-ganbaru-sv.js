'use strict';

ganbareServices.factory('editGanbaru', ['$resource', function($resource) {
	return $resource(
		path + 'v1/ganbaru/:ganbaruId',
		{
			ganbaruId: '@ganbaruId', 
			ganbaruTitle: '@ganbaruTitle', 
			ganbaruContent: '@ganbaruContent', 
			ganbaruTags: '@ganbaruTags',
			expiredDate: '@expiredDate' 
		},
		{put: {method: 'PUT'}}
	);
}]);
