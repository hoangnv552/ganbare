'use strict';

/* Services */
/* jshint node: true */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('getUserInfo', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:id',
    {id: '@id'},
    {
    getUser: {method: 'GET'}
  });
}]);
