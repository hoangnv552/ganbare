'use strict';

/* Services */
/* jshint node: true */

/*
* Service List Ganbaru
*/
ganbareServices.factory('listGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/ganbaru?filterType=:filterType&sortType=:sortType&skip=:skip&take=:take',
      {filterType: '@filterType', sortType: '@sortType', skip: '@skip', take: '@take'},
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
      path + 'v1/users/:userId/pins?skip=:skip&take=:take',
      {userId: '@userId', skip: '@skip', take: '@take'},
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
      path + 'v1/users/:userId/favorites/ganbaru?timestamp=:timestamp&take=:take',
      {userId: '@userId', timestamp: '@timestamp', take: '@take'},
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
      path + 'v1/users/:userId/ganbaru?skip=:skip&take=:take',
      {userId: '@userId', skip: '@skip', take: '@take'},
      {
        query: {
          method: 'GET'
        },
        isArray: true
      });
  }]);
