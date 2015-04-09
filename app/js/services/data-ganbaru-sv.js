;(function(){
	'use strict';

	/*
	* Service Add Ganbare
	*/
	angular.module('ganbareServices').factory('dataGanbaru', ['TYPES', 'Ganbaru', '$cookieStore', function(TYPES, Ganbaru, $cookieStore )
	{
		var userId  = $cookieStore.get('userId');
		var timestamp = moment().format('YYYYMMDDHHmmssSSS');

		var filterSort = {
			typeHot       : { filter: 1, sort: 1 },
			typeHotNew    : { filter: 1, sort: 2 },
			typeHotExpire : { filter: 1, sort: 3 },

			typeNew       : { filter: 2, sort: 2 },
			typeNewHot    : { filter: 2, sort: 1 },
			typeNewExpire : { filter: 2, sort: 3 },

			typeExpire    : { filter: 3, sort: 3 },
			typeExpireHot : { filter: 3, sort: 1 },
			typeExpireNew : { filter: 3, sort: 2 },

			typeTag       : { filter: 4, sort: 1 }
		};

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
				  	ganbaruPromise = Ganbaru.pins({ userId: userId, skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeFavorite:
				  	ganbaruPromise = Ganbaru.favorites({ userId: userId, timestamp: timestamp, take: takeNumber });
				  	break;

				case TYPES.listTypeUser:
				    ganbaruPromise = Ganbaru.user({ userId: userIdParam, skip: skip, take: takeNumber });
				    break;

				case TYPES.listTypeHot:
				  	ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeHot.filter, sortType: filterSort.typeHot.sort, skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeExpire:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeExpire.filter, sortType: filterSort.typeExpire.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeTag:
				  	ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeTag.filter, sortType: filterSort.typeTag.sort, tags: [selectTag], skip: skip, take: takeNumber });
				  	break;

				case TYPES.listTypeSearch:
					ganbaruPromise = Ganbaru.default({ searchContent: contentSearch, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeNew:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeNew.filter, sortType: filterSort.typeNew.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeHotNew:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeHotNew.filter, sortType: filterSort.typeHotNew.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeHotExpire:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeHotExpire.filter, sortType: filterSort.typeHotExpire.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeNewHot:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeNewHot.filter, sortType: filterSort.typeNewHot.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeNewExpire:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeNewExpire.filter, sortType: filterSort.typeNewExpire.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeExpireNew:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeExpireNew.filter, sortType: filterSort.typeExpireNew.sort, skip: skip, take: takeNumber });
					break;

				case TYPES.listTypeExpireHot:
					ganbaruPromise = Ganbaru.default({ filterType: filterSort.typeExpireHot.filter, sortType: filterSort.typeExpireHot.sort, skip: skip, take: takeNumber });
					break;
				}
			return ganbaruPromise.$promise;
		};
	}]);
})();
