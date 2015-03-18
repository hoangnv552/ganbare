'use strict';

/* Services */
/* jshint node: true */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource(
    	'phones/:xyz.json',
    	{},
      {
    		query: {
				method:'GET',
				params: {
					xyz: 'phones'
				},
				isArray: true
			}
    	});
  }]);
