;(function() {
	'use strict';
	angular.module('ganbareServices').factory('fileUpload', ['$http', 'ApiRootPath', '$q', '$cookieStore', 'TYPES_UPLOAD', function($http, ApiRootPath, $q, $cookieStore, TYPES_UPLOAD)
	{
		var userId = $cookieStore.get('userId');
		var urlTmp = ApiRootPath + 'v1/users/' + userId;

		// Upload avarta
		var upload = function(file, type) {
			var fd = new FormData();
			var deferred = $q.defer();
			var url;

			switch (type) {
				case TYPES_UPLOAD.avatar:
					url = urlTmp +'/avatars';
					break;

				case TYPES_UPLOAD.background:
					url = urlTmp +'/backgrounds';
					break;

				case TYPES_UPLOAD.image:
					url = urlTmp +'/images';
					break;
			}

			fd.append('image', file);

			$http.post(url, fd, {
				transformRequest: angular.identity,
            	headers: {
            		'Content-Type': undefined
            	}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		return {
			upload: upload
		}
	}]);
})();
