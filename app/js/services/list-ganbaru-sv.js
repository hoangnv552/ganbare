;(function(){
'use strict';

/* Services */

/*
* Service List Ganbaru
*/
ganbareServices.factory('listGanbaru', ['$resource',
    function($resource) {
    return $resource(
        path + 'v1/ganbaru',
        {},
        {
        default: {
            method: 'GET'
        },
        pins: {
            method: 'GET',
            url: path + 'v1/users/:userId/pins'
        },
        favorites: {
            method: 'GET',
            url: path + 'v1/users/:userId/favorites/ganbaru'
        },
        user: {
            method: 'GET',
            url: path + 'v1/users/:userId/ganbaru'
        },
        isArray: true
      });
  }]);
})();