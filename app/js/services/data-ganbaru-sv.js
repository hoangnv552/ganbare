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
            typeHot             : { filter: 1, sort: 1 },
            typeHotNew          : { filter: 1, sort: 2 },
            typeHotExpire       : { filter: 1, sort: 3 },
            typeHotNeglected    : { filter: 1, sort: 4 },

            typeNew             : { filter: 2, sort: 2 },
            typeNewHot          : { filter: 2, sort: 1 },
            typeNewExpire       : { filter: 2, sort: 3 },
            typeNewNeglected    : { filter: 2, sort: 4 },

            typeExpire          : { filter: 3, sort: 3 },
            typeExpireHot       : { filter: 3, sort: 1 },
            typeExpireNew       : { filter: 3, sort: 2 },
            typeExpireNeglected : { filter: 3, sort: 4 },

            typeTag             : { filter: 4, sort: 1 }
        };

        /*
        * View data with list Ganbaru
        */
        return function(skip, takeNumber, listType, contentSearch, selectTag, userIdParam) {
            var ganbaruPromise;
            var ganbaruParams;

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
                    ganbaruParams = { filterType: filterSort.typeHot.filter, sortType: filterSort.typeHot.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeExpire:
                    ganbaruParams = { filterType: filterSort.typeExpire.filter, sortType: filterSort.typeExpire.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeTag:
                    ganbaruParams = { filterType: filterSort.typeTag.filter, sortType: filterSort.typeTag.sort, tags: [selectTag], skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeSearch:
                    ganbaruParams = { searchContent: contentSearch, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeNew:
                    ganbaruParams = { filterType: filterSort.typeNew.filter, sortType: filterSort.typeNew.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeHotNew:
                    ganbaruParams = { filterType: filterSort.typeHotNew.filter, sortType: filterSort.typeHotNew.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeHotExpire:
                    ganbaruParams = { filterType: filterSort.typeHotExpire.filter, sortType: filterSort.typeHotExpire.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeNewHot:
                    ganbaruParams = { filterType: filterSort.typeNewHot.filter, sortType: filterSort.typeNewHot.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeNewExpire:
                    ganbaruParams = { filterType: filterSort.typeNewExpire.filter, sortType: filterSort.typeNewExpire.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeExpireNew:
                    ganbaruParams = { filterType: filterSort.typeExpireNew.filter, sortType: filterSort.typeExpireNew.sort, skip: skip, take: takeNumber };
                    break;

                case TYPES.listTypeExpireHot:
                    ganbaruParams = { filterType: filterSort.typeExpireHot.filter, sortType: filterSort.typeExpireHot.sort, skip: skip, take: takeNumber };
                    break;
                case TYPES.listTypeNewNeglected:
                    ganbaruParams = { filterType: filterSort.typeNewNeglected.filter, sortType: filterSort.typeNewNeglected.sort, skip: skip, take: takeNumber };
                    break;
                case TYPES.listTypeHotNeglected:
                    ganbaruParams = { filterType: filterSort.typeHotNeglected.filter, sortType: filterSort.typeHotNeglected.sort, skip: skip, take: takeNumber };
                    break;
                case TYPES.listTypeExpireNeglected:
                    ganbaruParams = { filterType: filterSort.typeExpireNeglected.filter, sortType: filterSort.typeExpireNeglected.sort, skip: skip, take: takeNumber };
                    break;
                }

            if (ganbaruParams) {
                ganbaruPromise = Ganbaru.default(ganbaruParams);
            }

            return ganbaruPromise.$promise;
        };
    }]);
})();
