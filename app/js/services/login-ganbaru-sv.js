'use strict';

/* Services */
/* jshint node: true */

/*
* Service Login
*/
ganbareServices.factory('loginGanbare', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/sessions',
    {},
    {
    login: {method: 'POST'}
  });
}]);
