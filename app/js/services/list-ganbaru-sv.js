'use strict';

/* Services */
/* jshint node: true */

/*
* Service List Ganbaru
*/
ganbareServices.factory('listGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/ganbaru',
      {},
      {
        query: {
          method: 'GET'
        },
        isArray: true
      });
  }]);

/*
* Service List Pin Ganbaru
*/
ganbareServices.factory('listPinGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/users/:userId/pins',
      {},
      {
        query: {
          method: 'GET'
        },
        isArray: true
      });
  }]);

/*
* Service listOfFavoriteGanbaru
*/
ganbareServices.factory('listOfFavoriteGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/users/:userId/favorites/ganbaru',
      {},
      {
        query: {
          method: 'GET'
        },
        isArray: true
      });
  }]);

/*
* Service listByUserGanbaru
*/
ganbareServices.factory('listByUserGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/users/:userId/ganbaru',
      {},
      {
        query: {
          method: 'GET'
        },
        isArray: true
      });
  }]);
