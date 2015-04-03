;(function(){
'use strict';

/* global ganbareServices:true */
/* global path:true */

/*
* Service Add Ganbare
*/
ganbareServices.factory('getListGanbaru', ['listGanbaru', '$cookieStore',
  function(listGanbaru, $cookieStore ) {

  	var types = {
  		listTypePin:      1,
		listTypeFavorite: 2,
		listTypeUser:     3,
		listTypeHot:      4,
		listTypeExpire:   5,
		listTypeTag:      6,
		listTypeSearch:   7
	};

	var userId  = $cookieStore.get('userId'),
	timestamp = moment().format('YYYYMMDDHHmmssSSS');

  	/*
	* View data with list Ganbaru
	*/
	return function(skip, takeNumber, listType, contentSearch, selectTag, userIdParam) {
	  var ganbaruPromise;

	  if (!userIdParam) {
	  	userIdParam = userId;
	  }

	  switch(listType){
	    case types.listTypePin:
	      	ganbaruPromise = listGanbaru.pins({ userId: userId, skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeFavorite:
	      	ganbaruPromise = listGanbaru.favorites({ userId: userId, timestamp: timestamp, take: takeNumber });
	      	break;

	    case types.listTypeUser:
		    ganbaruPromise = listGanbaru.user({ userId: userIdParam, skip: skip, take: takeNumber });
		    break;

	    case types.listTypeHot:
	      	ganbaruPromise = listGanbaru.default({ filterType: 1, sortType: 1, skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeExpire:
			ganbaruPromise = listGanbaru.default({ filterType: 3, sortType: 3, skip: skip, take: takeNumber });
			break;

	    case types.listTypeTag:
	      	ganbaruPromise = listGanbaru.default({ filterType: 4, sortType: 1, tags: [selectTag], skip: skip, take: takeNumber });
	      	break;

	    case types.listTypeSearch:
			ganbaruPromise = listGanbaru.default({ searchContent: contentSearch, skip: skip, take: takeNumber });
			break;

	    default:
			ganbaruPromise = listGanbaru.default({ filterType: 2, sortType: 2, skip: skip, take: takeNumber });
	  }
		return ganbaruPromise.$promise;
	};
}]);
})();
