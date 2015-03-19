'use strict';

/* Services */
/* jshint node: true */

var ganbareServices = angular.module('ganbareServices', ['ngResource']);

ganbareServices.factory('LIST_GANBARU', ['$resource',
  function($resource) {
    return $resource(
      '',
      {},
      {

      })
  }]);
