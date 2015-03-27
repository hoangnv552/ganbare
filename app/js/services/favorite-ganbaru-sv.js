;(function(){
'use strict';

/* Services */

/*
* Service favorite
*/
ganbareServices.factory('favoriteGanbaru', ['$resource',
    function($resource) {
    return $resource(
        path + 'v1/users/:id/favorites',
        {id: '@id'},
        {
        add: {
            method: 'POST'
        },
        remove: {
            method: 'DELETE',
            url: path + 'v1/users/:id/favorites/:friendId'
        }
    });
    }]);
})();