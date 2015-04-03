;(function(){
    'use strict';

    /*
    * Service pin Ganbaru
    */
    angular.module('ganbareServices').factory('pinGanbaru', ['ApiRootPath', '$resource', function(ApiRootPath, $resource)
    {
        return $resource(ApiRootPath + 'v1/users/:userId/pins', {
            userId: '@userId'
            }, {
                pin: {
                    method: 'POST'
                },
                unpin: {
                    method: 'DELETE',
                    url: ApiRootPath + 'v1/users/:userId/pins/:ganbaruId'
                }
            }
        );
    }]);
})();
