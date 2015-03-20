'use strict';

/* Controllers */
/* jshint node: true */

var ganbareControllers = angular.module('ganbareControllers', ['angular-md5', 'ngCookies']);

// Controller Feed for visitors
ganbareControllers.controller('feedVisitorCtrl', ['$scope', '$cookieStore', 'listGanbaru', 'addGanbare',
  function($scope, $cookieStore, listGanbaru, addGanbare) {
    $scope.ganbaru = listGanbaru.query();

    $scope.addGanbare = function(item) {
      var userId  = $cookieStore.get('userId');

      addGanbare.add({userId: userId, ganbaruId: item.ganbaru.ganbaruId, ganbareNumber: 2}, function(response){
        var code = response.code;

        if(code === 0){
          $scope.ganbaru.extendedInfor.totalGanbareNumber = response.extendedInfor.totalGanbareNumber;

          var log = [];
          angular.forEach($scope.ganbaru.data, function(value, key) {
            //this.push(key + ': ' + value);
            console.log(value);
          }, log);
        }

      })
    }
  }]);

// Controller Login
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
