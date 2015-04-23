;(function(){
    'use strict';

    /*
    * Controller my page
    */
    angular.module('ganbareControllers').controller('myPageGanbaruCtrl', ['$scope', 'ngDialog', 'User', '$cookieStore', 'dataGanbaru', 'Ganbaru', 'TYPES', '$routeParams', '$interval', 'getUtilities', function( $scope, ngDialog, User, $cookieStore, dataGanbaru, Ganbaru, TYPES, $routeParams, $interval, getUtilities )
    {

    	var userId  = $cookieStore.get('userId');
        var ganbaruIdAndNumber = [];
        var take = 5;

        $scope.types = TYPES;
        $scope.skip = 0;
        $scope.ganbaru = [];
        $scope.length = 0;
        $scope.totalGanbareNumber = 0;

        var sort = $routeParams.sort;

        var sortType = {
            'new'       : TYPES.listTypeUserNew,
            'hot'       : TYPES.listTypeUserHot,
            'neglected' : TYPES.listTypeUserNeglected,
            'expire'    : TYPES.listTypeUserExpire
        };

        angular.forEach(sortType, function(value, key) {
            if (key == sort) {
                $scope.listType = value;
            }
        });

        /*
        * Get list my page (list by user)
        */
        dataGanbaru($scope.skip, take, $scope.listType).then(function(data) {
            $scope.ganbaru = data.data;
            $scope.totalGanbareNumber = data.extendedInfor.totalGanbareNumber;
        });

        /*
        * Get list more
        */
        $scope.listMoreGanbaru = function() {
            $scope.skip = $scope.skip + 5;
            dataGanbaru( $scope.skip, take, $scope.listType).then(function(data) {
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

        /*
        * Function add ganbare
        */
        $scope.addGanbare = function(item) {
            // Caculator total ganbaru number for view
            $scope.totalNumber++;
            // Caculator total ganbaru number for function addGanbare
            $scope.countNumber++;

            getUtilities.caculatorArrNumberClicked($scope, item, ganbaruIdAndNumber).then(function(response){
                ganbaruIdAndNumber = response;
            });
        };

        /*
        * Add ganbare
        */
        function callIntervalAddGanbare() {
            var length = ganbaruIdAndNumber.length;
            //Set back countNumber = 0
            $scope.countNumber = 0;

            if (length > 0) {
                for (var i = 0; i < length; i++ ) {

                    Ganbaru.add({
                        userId: userId,
                        ganbaruId: ganbaruIdAndNumber[i].ganbaruId,
                        ganbareNumber: ganbaruIdAndNumber[i].ganbareNumber
                    }).$promise.then(function addDone(data) {
                        console.log(data.data);
                    });
                }
                ganbaruIdAndNumber = [];
            }
        }

        /*
        * Set interval callIntervalAddGanbare function
        */
        var idInterval = $interval(callIntervalAddGanbare, 3000);

        /*
        * Delete interval if escape scope
        */
        $scope.$on("$destroy", function() {
            if (idInterval) {
                $interval.cancel(idInterval);
            }
        });

        /*
        * Set pin ganbaru
        */
        $scope.pinGanbaru = function(item) {
            return Ganbaru.pin({
                userId: userId,
                ganbaruId: item.ganbaru.ganbaruId
            }).$promise.then(function pinDone(data) {
                if (data.code === 0) {
                    item.ganbaru.isPinning = true;
                }
            });
        };

        /*
        * Set unpin ganbaru
        */
        $scope.unPinGanbaru = function(item) {
            return Ganbaru.unpin({
                userId: userId,
                ganbaruId: item.ganbaru.ganbaruId
            }).$promise.then(function unPinDone(data) {
                if (data.code === 0) {
                    item.ganbaru.isPinning = false;
                }
            });
        };

        /*
        * Set favorite ganbaru
        */
        $scope.addFavorite = function (item, ganbaru) {
            return User.addFavorite({
                id: userId,
                friendId: item.user.userId
            }).$promise.then(function addDone(data) {
                if (data.code === 0) {
                    angular.forEach(ganbaru, function(value, key) {
                        if (item.user.userId === value.user.userId) {
                            value.user.isFavoristUser = true;
                        }
                    });
                }
            });
        };

        /*
        * Set remove favorite ganbaru
        */
        $scope.removeFavorite = function(item, ganbaru) {
            return User.removeFavorite({
                id: userId,
                friendId: item.user.userId
            }).$promise.then(function unFavorite(data) {
                if (data.code === 0) {
                    angular.forEach(ganbaru, function(value, key) {
                        if (item.user.userId === value.user.userId) {
                            value.user.isFavoristUser = false;
                        }
                    });
                }
            });
        };
    }]);
})();
