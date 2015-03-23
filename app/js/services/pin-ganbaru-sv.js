'use strict';

/* Services */
/* jshint node: true */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('pinGanbaru', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/users/:userId/pins',
    {userId: '@userId'},
    {
    pin: {method: 'POST'}
  });
}]);
