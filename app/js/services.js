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
      path + 'v1/ganbaru?filterType=2&sortType=2&skip=0&take=10',
      {},
      {
        query: {
          method: 'GET',
          headers: {
            'Authorization': '891e25c2-fdc2-4232-b8c2-8aeec0f296ca'
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
