'use strict';

/* Services */
/* jshint node: true */

/*
* Service Add Ganbare
*/
ganbareServices.factory('getListGanbaru', ['listGanbaru', 'listPinGanbaru', 'listOfFavoriteGanbaru', 'listByUserGanbaru', '$cookieStore',
  function(listGanbaru, listPinGanbaru, listOfFavoriteGanbaru, listByUserGanbaru, $cookieStore ) {
  	var types = {
  		listTypePin: 1,
		listTypeFavorite: 2,
		listTypeUser: 3,
		listTypeHot: 4,
		listTypeExpri: 5,
		listTypeTag: 6,
		listTypeSearch: 7
	};

	var userId  = $cookieStore.get('userId'),
	timestamp = '20150318143906000';

  	/*
	* View data with list Ganbaru
	*/
	return function(skip, takeNumber, listType, contentSearch, selectTag) {
	  var ganbaruPromise;
	  switch(listType){
	    case types.listTypePin:
	      	ganbaruPromise = listPinGanbaru.query({ userId: userId, skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeFavorite:
	      	ganbaruPromise = listOfFavoriteGanbaru.query({ userId: userId, timestamp: timestamp, take: takeNumber });
	      	break;

	    case types.listTypeUser:
		    ganbaruPromise = listByUserGanbaru.query({ userId: userId, skip: skip, take: takeNumber });
		    break;

	    case types.listTypeHot:
	      	ganbaruPromise = listGanbaru.query({ filterType: 1, sortType: 1, skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeExpri:
			ganbaruPromise = listGanbaru.query({ filterType: 3, sortType: 3, skip: skip, take: takeNumber });
			break;

	    case types.listTypeTag:
	      	ganbaruPromise = listGanbaru.query({ filterType: 4, sortType: 1, tags: selectTag, skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeSearch:
			ganbaruPromise = listGanbaru.query({ searchContent: contentSearch, skip: skip, take: takeNumber });
			break;

	    default:
			ganbaruPromise = listGanbaru.query({ filterType: 2, sortType: 2, skip: skip, take: takeNumber });
	  }
		return ganbaruPromise.$promise;
	};
}]);


