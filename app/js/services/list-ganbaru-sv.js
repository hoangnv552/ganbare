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
          method: 'GET',
          // headers: {
          //   'Authorization': '891e25c2-fdc2-4232-b8c2-8aeec0f296ca'
          // }
        },
        isArray: true
      });
  }]);
