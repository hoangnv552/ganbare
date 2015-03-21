'use strict';

/* Controllers */
/* jshint node: true */

var ganbareControllers = angular.module('ganbareControllers', ['angular-md5', 'ngCookies']);

// Controller Feed for visitors
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru', 'addGanbare', '$interval',
  function($scope, $cookieStore, listGanbaru, addGanbare, $interval) {
    $scope.ganbaru = listGanbaru.query();

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
    }

    // Set interval callIntervalAddGanbare function
    $interval(callIntervalAddGanbare, 4000);

    var userId  = $cookieStore.get('userId');

    function callIntervalAddGanbare(){
      var length = ganbaruIdAndNumber.length;

      if(length > 0){
        var i;

        for(i = 0; i < length; i++){
          var ganbaruId = ganbaruIdAndNumber[i].ganbaruId;
          var ganbareNumber = ganbaruIdAndNumber[i].ganbareNumber;

          addGanbare.add({userId: userId, ganbaruId: ganbaruId, ganbareNumber: ganbareNumber}, function(response){
      
            var code = response.code;

            if(code === 0){
              // $scope.ganbaru.extendedInfor.totalGanbareNumber = response.extendedInfor.totalGanbareNumber;
              // $scope.ganbareNumberUpdate = response.data.ganbareNumber;
              // $scope.ganbaruId = response.data.ganbaruId;
              console.log(response.data);
            }
          });
        }
        ganbaruIdAndNumber = [];
      }
    }
  }]);

/*
* Controller Login
*/ 
ganbareControllers.controller('loginCtrl', ['$scope', '$cookieStore','$location', 'md5','loginGanbare',
  function($scope, $cookieStore, $location, md5, loginGanbare) {
    $scope.message = '';

    $scope.login = function(){
      var email = $scope.email;
      var password = $scope.password;
      var encryptedPassword = md5.createHash(password);
      var code;
      loginGanbare.login({email: email, password: encryptedPassword, loginType: 1}, function(response){

        code = response.code;
        if(code === 0) {
          $cookieStore.put('token', response.data.token);
          $cookieStore.put('userId', response.data.userId);
          $location.path('/feedfv');
        }
        else {
          if(code === 12) {
            $scope.message = 'Email not found!';
          }
          else if(code === 20) {
            $scope.message = 'Invalid password!';
          }
          else if(code === 21) {
            $scope.message = 'Incorrect password!';
          }
          $location.path('/login');
        }
      }, function(error) {
        $scope.message = 'Cannot connect to server. Please try again later!';
        $location.path('/login');
      });
    }
  }]);
