;(function(){
    'use strict';

    /*
    * Service pin Ganbaru
    */
    angular.module('ganbareServices').factory('User', ['ApiRootPath', '$resource', '$cookieStore', function(ApiRootPath, $resource, $cookieStore)
    {
        var User = $resource(ApiRootPath + 'v1/users/:id', {
            id: '@id'
        }, {
            getUser: {
                method: 'GET'
            },
            uploadAvatar: {
                method: 'POST',
                url: ApiRootPath + 'v1/users/:id/avatars',
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            },
            updateUser: {
                method: 'PUT'
            },
            changePassword: {
                method: 'PUT',
                url: ApiRootPath + 'v1/users/:id/password'
                // transformResponse: function(response, headers) {
                //      response = {
                //         code: Number,
                //         data: user
                //     }

                //     return response.data;
                // }
            },
            register: {
                method: 'POST'
            },
            verify: {
                method: 'PUT'
            },
            addFavorite: {
                method: 'POST',
                url: ApiRootPath + 'v1/users/:id/favorites'
            },
            removeFavorite: {
                method: 'DELETE',
                url: ApiRootPath + 'v1/users/:id/favorites/:friendId'
            }
        });

        User.getCurrentUserId = function() {
            return $cookieStore.get('userId');
        };

        return User;
    }]);
})();
