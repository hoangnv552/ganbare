'use strict';

/* Services */
/* jshint node: true */

var path = 'http://133.242.53.250:8888/';

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

/*
* Service List Ganbaru
*/
ganbareServices.factory('listGanbaru', ['$resource',
  function($resource) {
    return $resource(
      path + 'v1/ganbaru?filterType=2&sortType=3&skip=0&take=10',
      {},
      {
        query: {
          method: 'GET',
          headers: {
            'Authorization': '429af4c5-fc7d-4ab5-816a-896dcffd1b27'
          }
        },
        isArray: true
      });
  }]);
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
