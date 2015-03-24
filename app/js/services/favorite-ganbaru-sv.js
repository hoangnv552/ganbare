'use strict';

/* Services */
/* jshint node: true */

/*
* Service favorite
*/
ganbareServices.factory('favoriteGanbaru', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:id/favorites',
    {id: '@id'},
    {
    add: {method: 'POST'}
  });
}]);

/*
* Service remove favorite
*/
ganbareServices.factory('removeFavoriteGanbaru', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:id/favorites/:friendId',
    {id: '@id', friendId: '@friendId'},
    {
    remove: {method: 'DELETE'}
  });
}]);
