;(function(){
    'use strict';

    /*
    * Service List Ganbaru
    */
    angular.module('ganbareServices').factory('listGanbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
    {
        return $resource(ApiRootPath + 'v1/ganbaru', {}, {
                default: {
                    method: 'GET',
                    // transformResponse: function(data, headerGetter) {
                    //     console.log(data);
                    //     return data;
                    // }
                },
                pins: {
                    method: 'GET',
                    url: ApiRootPath + 'v1/users/:userId/pins'
                },
                favorites: {
                    method: 'GET',
                    url: ApiRootPath + 'v1/users/:userId/favorites/ganbaru'
                },
                user: {
                    method: 'GET',
                    url: ApiRootPath + 'v1/users/:userId/ganbaru'
                },
                isArray: true
            }
        );
    }]);
})();
