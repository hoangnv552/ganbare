'use strict';

/* Controllers */
/* jshint node: true */

/*
* Controller Feed for visitors
*/
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru',
  'addGanbare', '$interval', '$location', 'pinGanbaru',
  function($scope, $cookieStore, listGanbaru, addGanbare, $interval, $location, pinGanbaru) {
    // $scope.totalGanbaru = 100;
    // $scope.ganbaruPerPage = 5;
    // $scope.currentPage = 1;
    $scope.takeNumber = 5;

    function paginViewGanbaru(takeNumber){

      var ganbaruPromise = listGanbaru.query({filterType: 2, sortType: 2, skip: 0, take: $scope.takeNumber});

      ganbaruPromise.$promise.then(function(data){
        $scope.ganbaru = data;
        console.log(data.data);
        $scope.lengthData = data.data.length;
      }, function(error){
        $scope.getGanbaruError = 'Get Data Error';
      });
    }

    /*
    * Defaul load page
    */
    paginViewGanbaru($scope.takeNumber);

    /*
    * If list more ganbaru
    */
    $scope.listMoreGanbaru = function() {
      $scope.takeNumber = $scope.takeNumber + 5;
      paginViewGanbaru($scope.takeNumber);
    }

    // Array pagination
    // var arrPagination = [{key: 1, value: 0}];
    // var i;
    // var valueSkip = 0;
    // var skip = $scope.totalGanbaru / $scope.ganbaruPerPage;

    // for(i = 2; i < skip; i++){
    //   valueSkip = valueSkip + $scope.ganbaruPerPage;
    //   arrPagination.push({key: i, value: valueSkip});
    // }

    // If pagination
    // $scope.pageChangeHandler = function(newPage) {
    //   var skipNumber;
    //   var i;
    //   var length = arrPagination.length;

    //   for(i = 0; i < length; i++){
    //     if(newPage === arrPagination[i].key){
    //       skipNumber = arrPagination[i].value;
    //     }
    //   }
    //   paginViewGanbaru(skipNumber);
    // };

    var ganbaruIdAndNumber = [];
    $scope.totalNumber = 0;

    /*
    * Function add ganbare
    */
    $scope.addGanbare = function(item) {
      var count = 1;
      var length = ganbaruIdAndNumber.length;
      $scope.totalNumber++;

      if(length > 0){
        var i;
        var currentGanbaruId = item.ganbaru.ganbaruId;

        for(i = 0; i < length; i++){
          if(currentGanbaruId === ganbaruIdAndNumber[i].ganbaruId){
            ganbaruIdAndNumber[i].ganbareNumber++;
          } else {
            ganbaruIdAndNumber.push({ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count});
          }
        }
      } else {
        ganbaruIdAndNumber.push({ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count});
      }
    };

    var userId  = $cookieStore.get('userId');

    /*
    * Add ganbare
    */
    function callIntervalAddGanbare(){
      var length = ganbaruIdAndNumber.length;

      if(length > 0){
        var i;

        for(i = 0; i < length; i++){
          var ganbaruId = ganbaruIdAndNumber[i].ganbaruId;
          var ganbareNumber = ganbaruIdAndNumber[i].ganbareNumber;

          addGanbare.add({userId: userId, ganbaruId: ganbaruId, ganbareNumber: ganbareNumber}, function(response){
            response.$promise.then(function(data){
              console.log(data.data);
            }, function(error){
              // Do something
            });
          });
        }
        ganbaruIdAndNumber = [];
      }
    }

    /*
    * Set interval callIntervalAddGanbare function
    */
    $interval(callIntervalAddGanbare, 3000);

    var token  = $cookieStore.get('token');
    console.log(token);
    console.log(userId);
    /*
    * Set pin ganbaru
    */
    $scope.pinGanbaru = function(state, ganbaruId){
      $scope.pinState = !state;
      $scope.ganbaruIdPin = ganbaruId;

      pinGanbaru.pin({userId: userId, ganbaruId: ganbaruId}, function(response){
        response.$promise.then(function(data){
          console.log(data);
        }, function(error){
          // Do something
        });
      });
    }

  }]);
