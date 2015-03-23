'use strict';

/* Services */
/* jshint node: true */

/*
* Service favorite
*/
ganbareServices.factory('favoriteGanbaru', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:userId/ganbare',
    {userId: '@userId'},
    {
    add: {method: 'PUT'}
  });
}]);
