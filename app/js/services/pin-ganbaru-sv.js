;(function(){
'use strict';

/* global ganbareServices:true */
/* global path:true */

/*
* Service pin Ganbaru
*/
ganbareServices.factory('pinGanbaru', ['$resource',
    function($resource) {
    return $resource(
        path + 'v1/users/:userId/pins',
        {userId: '@userId'},
        {
        pin: {
            method: 'POST'
        },
        unpin: {
            method: 'DELETE',
            url: path + 'v1/users/:userId/pins/:ganbaruId'
        }
    });
}]);
})();
