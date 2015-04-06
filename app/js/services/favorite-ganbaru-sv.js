;(function(){
    'use strict';

    /*
    * Service favorite
    */
    angular.module('ganbareServices').factory('favoriteGanbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
    {
        return $resource(ApiRootPath + 'v1/users/:id/favorites', {
                id: '@id'
            },
            {
                add: {
                    method: 'POST'
                },
                remove: {
                    method: 'DELETE',
                    url: ApiRootPath + 'v1/users/:id/favorites/:friendId'
                }
            }
        );
    }]);
})();
