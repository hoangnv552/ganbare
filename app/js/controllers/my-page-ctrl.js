;(function(){
    'use strict';

    /*
    * Controller my page
    */
    angular.module('ganbareControllers').controller('myPageGanbaruCtrl', ['$scope', 'User', '$cookieStore', 'dataGanbaru', 'Ganbaru', function( $scope, User, $cookieStore, dataGanbaru, Ganbaru )
    {

    	var userId  = $cookieStore.get('userId'),
        listTypeUser = 3,
        take = 5;
        $scope.skip = 0;
        $scope.ganbaru = [];
        $scope.length = 0;
        $scope.totalGanbareNumber = 0;

        /*
        * Get list my page (list by user)
        */
        dataGanbaru($scope.skip, take, listTypeUser).then(function(data) {
            $scope.ganbaru = data.data;
            $scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
        });

        /*
        * Get list more
        */
        $scope.listMoreGanbaru = function() {
            $scope.skip = $scope.skip + 5;
            dataGanbaru( $scope.skip, take, listTypeUser).then(function(data) {
                $scope.ganbaru = $scope.ganbaru.concat(data.data);
                $scope.length = $scope.ganbaru.length;
            });
        };

        /*
        * Delete ganbaru
        */
        $scope.deleteGanbaru = function(ganbaru) {
            console.log(ganbaru);
            Ganbaru.deleteGanbaru({
                ganbaruId: ganbaru.ganbaru.ganbaruId
            }).$promise.then(function deleteDone(response) {
                console.log(response);
            });
        };

    }]);
})();
