'use strict';

/* Services */
/* jshint node: true */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('searchGanbaru', ['$resource',
  function($resource) {
  return $resource(
    path + 'v1/ganbaru?:searchContent?skip=:skip&take=:take',
    {searchContent: '@searchContent', skip: '@skip', take: '@take'},
    {
    search: {method: 'GET'}
  });
}]);
