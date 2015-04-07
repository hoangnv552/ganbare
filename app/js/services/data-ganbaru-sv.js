;(function(){
	'use strict';

	/*
	* Service Add Ganbare
	*/
	angular.module('ganbareServices').factory('dataGanbaru', ['TYPES', 'listGanbaru', '$cookieStore', function(TYPES, listGanbaru, $cookieStore )
	{
		var userId  = $cookieStore.get('userId');
		var timestamp = moment().format('YYYYMMDDHHmmssSSS');

	  	/*
		* View data with list Ganbaru
		*/
		return function(skip, takeNumber, listType, contentSearch, selectTag, userIdParam) {
			var ganbaruPromise;

			if (!userIdParam) {
				userIdParam = userId;
			}

			switch (listType) {
				case TYPES.listTypePin:
				  	ganbaruPromise = listGanbaru.pins({ userId: userId, skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeFavorite:
				  	ganbaruPromise = listGanbaru.favorites({ userId: userId, timestamp: timestamp, take: takeNumber });
				  	break;

				case TYPES.listTypeUser:
				    ganbaruPromise = listGanbaru.user({ userId: userIdParam, skip: skip, take: takeNumber });
				    break;

				case TYPES.listTypeHot:
				  	ganbaruPromise = listGanbaru.default({ filterType: 1, sortType: 1, skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeExpire:
					ganbaruPromise = listGanbaru.default({ filterType: 3, sortType: 3, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeTag:
				  	ganbaruPromise = listGanbaru.default({ filterType: 4, sortType: 1, tags: [selectTag], skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeSearch:
					ganbaruPromise = listGanbaru.default({ searchContent: contentSearch, skip: skip, take: takeNumber });
					break;

				default:
					ganbaruPromise = listGanbaru.default({ filterType: 2, sortType: 2, skip: skip, take: takeNumber });
				}
			return ganbaruPromise.$promise;
		};
	}]);
})();
