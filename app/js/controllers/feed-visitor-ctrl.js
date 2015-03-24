'use strict';

/* Controllers */
/* jshint node: true */

/*
* Controller Feed for visitors
*/
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru',
  'addGanbare', '$interval', '$location', 'pinGanbaru', 'unPinGanbaru', 'favoriteGanbaru',
  'removeFavoriteGanbaru', 'listPinGanbaru', 'listOfFavoriteGanbaru', 'listByUserGanbaru',
  function($scope, $cookieStore, listGanbaru, addGanbare, $interval, $location, pinGanbaru,
    unPinGanbaru, favoriteGanbaru, removeFavoriteGanbaru, listPinGanbaru, listOfFavoriteGanbaru,
    listByUserGanbaru) {

    // $scope.totalGanbaru = 100;
    // $scope.ganbaruPerPage = 5;
    // $scope.currentPage = 1;
    $scope.takeNumber = 5;
    $scope.listType = '';

    $scope.listTypePin = 1;
    $scope.listTypeFavorite = 2;
    $scope.listTypeUser = 3;
    $scope.listTypeHot = 4;
    $scope.listTypeExpri = 5;
    $scope.listTypeTag = 6;

    var ganbaruIdAndNumber = [];
    $scope.totalNumber = 0;

    var userId  = $cookieStore.get('userId');
    var token  = $cookieStore.get('token');
    var timestamp = '20150318143906000';

    /*
    * View data Ganbaru
    */
    function paginViewGanbaru( takeNumber, listType ) {
      if ( listType === $scope.listTypePin ) {
        var ganbaruPromise = listPinGanbaru.query({ userId: userId, skip: 0, take: $scope.takeNumber });
      }
      else if ( listType === $scope.listTypeFavorite ) {
        var ganbaruPromise = listOfFavoriteGanbaru.query({ userId: userId, timestamp: timestamp, take: $scope.takeNumber });
      }
      else if ( listType === $scope.listTypeUser ) {
        var ganbaruPromise = listByUserGanbaru.query({ userId: userId, skip: 0, take: $scope.takeNumber });
      }
      else if ( listType === $scope.listTypeHot ) {
        var ganbaruPromise = listGanbaru.query({ filterType: 1, sortType: 1, skip: 0, take: $scope.takeNumber });
      }
      else if ( listType === $scope.listTypeExpri ) {
        var ganbaruPromise = listGanbaru.query({ filterType: 3, sortType: 3, skip: 0, take: $scope.takeNumber });
      }
      else if ( listType === $scope.listTypeTag ) {
        var ganbaruPromise = listGanbaru.query({ filterType: 4, sortType: 4, skip: 0, take: $scope.takeNumber });
      }
      else {
        var ganbaruPromise = listGanbaru.query({ filterType: 2, sortType: 2, skip: 0, take: $scope.takeNumber });
      }

      ganbaruPromise.$promise.then(function( data ) {
        $scope.ganbaru = data;
        console.log( $scope.ganbaru );
        $scope.lengthData = data.data.length;
      }, function( error ) {
        $scope.getGanbaruError = 'Get Data Error';
      });
    }

    /*
    * Defaul load page
    */
    paginViewGanbaru( $scope.takeNumber );

    /*
    * If list more ganbaru
    */
    $scope.listMoreGanbaru = function() {
      $scope.takeNumber = $scope.takeNumber + 5;
      paginViewGanbaru($scope.takeNumber, $scope.listType);
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

    /*
    * Function add ganbare
    */
    $scope.addGanbare = function( item ) {
      var count = 1;
      var length = ganbaruIdAndNumber.length;
      $scope.totalNumber++;

      if ( length > 0 ) {
        var i;
        var currentGanbaruId = item.ganbaru.ganbaruId;

        for ( i = 0; i < length; i++ ) {
          if ( currentGanbaruId === ganbaruIdAndNumber[i].ganbaruId ) {
            ganbaruIdAndNumber[i].ganbareNumber++;
          } else {
            ganbaruIdAndNumber.push({ ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count });
          }
        }
      } else {
        ganbaruIdAndNumber.push({ ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: count });
      }
    };



    /*
    * Add ganbare
    */
    function callIntervalAddGanbare() {
      var length = ganbaruIdAndNumber.length;

      if ( length > 0 ) {
        for (var i = 0; i < length; i++ ) {
          var ganbaruId = ganbaruIdAndNumber[i].ganbaruId;
          var ganbareNumber = ganbaruIdAndNumber[i].ganbareNumber;

          addGanbare.add({ userId: userId, ganbaruId: ganbaruId, ganbareNumber: ganbareNumber }, function( response ) {
            response.$promise.then( function( data ) {
              console.log( data.data );
            }, function( error ) {
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
    $interval( callIntervalAddGanbare, 3000 );

    /*
    * Set pin ganbaru
    */
    $scope.pinGanbaru = function( ganbaruId ) {
      pinGanbaru.pin({ userId: userId, ganbaruId: ganbaruId }, function( response ) {
        response.$promise.then( function( data ) {
          paginViewGanbaru( $scope.takeNumber, $scope.listType );
        }, function( error ) {
          // Do something
        });
      });
    };

    /*
    * Set unpin ganbaru
    */
    $scope.unPinGanbaru = function( ganbaruId ) {
      unPinGanbaru.unPin({ userId: userId, ganbaruId: ganbaruId }, function( response ){
        response.$promise.then( function( data ) {
          paginViewGanbaru( $scope.takeNumber, $scope.listType );
        }, function( error ) {
          // Do something
        });
      });
    };

    /*
    * Set favorite ganbaru
    */
    $scope.addFavorite = function ( friendId ) {
      favoriteGanbaru.add({ id: userId, friendId: friendId }, function( response ) {
        response.$promise.then( function( data ) {
          console.log( data );
          paginViewGanbaru( $scope.takeNumber, $scope.listType );
        }, function( error ){
          // Do something
        });
      });
    };

    /*
    * Set remove favorite ganbaru
    */
    $scope.removeFavorite = function( friendId ) {
      removeFavoriteGanbaru.remove({ id: userId, friendId: friendId }, function( response ) {
        response.$promise.then( function( data ) {
          console.log( data );
          paginViewGanbaru( $scope.takeNumber, $scope.listType );
        }, function( error ) {
          // Do something
        });
      });
    };

    /*
    * List pin ganbaru
    */
    $scope.listGanbaru = function() {
      paginViewGanbaru( $scope.takeNumber, 0 );
    };

    /*
    * List pin ganbaru
    */
    $scope.listPinGanbaru = function() {
      $scope.listType = $scope.listTypePin;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypePin );
    };

    /*
    * List favorite ganbaru
    */
    $scope.listOfFavoriteGanbaru = function() {
      $scope.listType = $scope.listTypeFavorite;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeFavorite );
    };

    /*
    * List favorite ganbaru
    */
    $scope.listByUserGanbaru = function(){
      $scope.listType = $scope.listTypeUser;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeUser );
    };

    /*
    * List hot ganbaru
    */
    $scope.listHotGanbaru = function(){
      $scope.listType = $scope.listTypeHot;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeHot );
    };

    /*
    * List listExpireGanbaru ganbaru
    */
    $scope.listExpireGanbaru = function(){
      $scope.listType = $scope.listTypeExpri;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeExpri );
    };

  }]);
