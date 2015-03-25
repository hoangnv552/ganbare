'use strict';

/* Controllers */
/* jshint node: true */

/*
* Controller Feed for visitors
*/
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru',
  'addGanbare', '$interval', '$location', 'pinGanbaru', 'unPinGanbaru', 'favoriteGanbaru',
  'removeFavoriteGanbaru', 'listPinGanbaru', 'listOfFavoriteGanbaru', 'listByUserGanbaru',
  'searchGanbaru', 'getUserInfo',
  function($scope, $cookieStore, listGanbaru, addGanbare, $interval, $location, pinGanbaru,
    unPinGanbaru, favoriteGanbaru, removeFavoriteGanbaru, listPinGanbaru, listOfFavoriteGanbaru,
    listByUserGanbaru, searchGanbaru, getUserInfo) {

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
    $scope.listTypeSearch = 7;

    var ganbaruIdAndNumber = [];
    $scope.totalNumber = 0;

    var userId  = $cookieStore.get('userId');
    var token  = $cookieStore.get('token');
    var timestamp = '20150318143906000';
    $scope.contentSearch = '';

    $scope.checkboxesListTag = ['Sport', 'Dance', 'Music', 'Game'];
    $scope.selectTag = ['Sport'];

    // var now = new Date();
    // console.log(now.toISOString());

    // console.log(now.toISOString().slice(0, 10).replace(/-/g, "")
    // + now.toISOString().slice(11, 19).replace(/:/g, "") + now.toISOString().slice(20, 23));

    /*
    * Selection texbox
    */
    $scope.toggleSelection = function(tag) {
      var idx = $scope.selectTag.indexOf(tag);
      // is currently selected
      if (idx > -1) {
        $scope.selectTag.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selectTag.push(tag);
      }
    };

    /*
    * Get user infor
    */
    getUserInfo.getUser({id: userId}, function( response ) {
      $scope.user = response;
    }, function( error ){
      // Do something
    });

    /*
    * View data with list Ganbaru
    */
    function paginViewGanbaru( takeNumber, listType ) {
      var ganbaruPromise,
          skip = 0;

      switch(listType){
        case $scope.listTypePin:
          ganbaruPromise = listPinGanbaru.query({ userId: userId, skip: skip, take: $scope.takeNumber });
          break;

        case $scope.listTypeFavorite:
          ganbaruPromise = listOfFavoriteGanbaru.query({ userId: userId, timestamp: timestamp, take: $scope.takeNumber });
          break;

        case $scope.listTypeUser:
          ganbaruPromise = listByUserGanbaru.query({ userId: userId, skip: skip, take: $scope.takeNumber });
          break;

        case $scope.listTypeHot:
          ganbaruPromise = listGanbaru.query({ filterType: 1, sortType: 1, skip: skip, take: $scope.takeNumber });
          break;

        case $scope.listTypeExpri:
          ganbaruPromise = listGanbaru.query({ filterType: 3, sortType: 3, skip: skip, take: $scope.takeNumber });
          break;

        case $scope.listTypeTag:
          ganbaruPromise = listGanbaru.query({ filterType: 4, sortType: 1, tags: $scope.selectTag, skip: skip, take: $scope.takeNumber });
          break;

        case $scope.listTypeSearch:
          ganbaruPromise = listGanbaru.query({ searchContent: $scope.contentSearch, skip: skip, take: $scope.takeNumber });
          break;

        default:
          ganbaruPromise = listGanbaru.query({ filterType: 2, sortType: 2, skip: skip, take: $scope.takeNumber });
      }

      ganbaruPromise.$promise.then(function( data ) {
        $scope.ganbaru = data;
        $scope.lengthData = data.data.length;
        $scope.totalNumber = 0;
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
      $scope.showTags = false;
      $scope.listType = '';
      paginViewGanbaru( $scope.takeNumber, '' );
    };

    /*
    * List pin ganbaru
    */
    $scope.listPinGanbaru = function() {
      $scope.showTags = false;
      $scope.listType = $scope.listTypePin;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypePin );
    };

    /*
    * List favorite ganbaru
    */
    $scope.listOfFavoriteGanbaru = function() {
      $scope.showTags = false;
      $scope.listType = $scope.listTypeFavorite;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeFavorite );
    };

    /*
    * List favorite ganbaru
    */
    $scope.listByUserGanbaru = function() {
      $scope.showTags = false;
      $scope.listType = $scope.listTypeUser;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeUser );
    };

    /*
    * List hot ganbaru
    */
    $scope.listHotGanbaru = function() {
      $scope.showTags = false;
      $scope.listType = $scope.listTypeHot;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeHot );
    };

    /*
    * List listExpireGanbaru ganbaru
    */
    $scope.listExpireGanbaru = function() {
      $scope.showTags = false;
      $scope.listType = $scope.listTypeExpri;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeExpri );
    };

    /*
    * List Tag ganbaru
    */
    $scope.listTagGanbaru = function() {
      $scope.showTags = true;
    }

    /*
    * Search ganbaru
    */
    $scope.searchGanbaru = function() {
      if( $scope.contentSearch ) {
        $scope.listType = $scope.listTypeSearch;
        paginViewGanbaru( $scope.takeNumber, $scope.listTypeSearch );
      } else {
        paginViewGanbaru( $scope.takeNumber, '' );
      }
    };

    /*
    * Search tag ganbaru
    */
    $scope.searchTagGanbaru = function() {
      $scope.listType = $scope.listTypeTag;
      paginViewGanbaru( $scope.takeNumber, $scope.listTypeTag );
    }
  }]);
