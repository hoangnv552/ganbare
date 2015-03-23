'use strict';

/* Services */
/* jshint node: true */

/*
* Service Add Ganbare
*/
ganbareServices.factory('addGanbare', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:userId/ganbare',
    {userId: '@userId'},
    {
    add: {method: 'PUT'}
  });
}]);
