'use strict';

/* Controllers */
/* jshint node: true */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {

    $scope.phone = Phone.get({
        xyz: $routeParams.abc
    }, function(phone) {
        $scope.mainImageUrl = phone.images[0];
    });


    // $scope.phone instanceof Phone == true
    // $routeParams instanceof Phone == true

    // var a = new A(); a is instance of class A -> a instanceof A == true

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };

  }]);


// var Phone = function() {
//   this.$promise = new Promise();
// };

// var proto = Phone.prototype;

// proto.setModel = function(model) {
//   this.model = model;

//   return this;
// };

// proto.setDescription = function(description) {
//   this.description = description;

//   return this;
// };

// Phone.get = function(params, callback) {
//   var phone = new Phone();

//   http.getPhone(params, function(data) {
//     // for (var key in data) {
//     //   obj[key] = data[key];
//     // }

//     phone.setModel(data.model).setDescription(data.description);

//     phone.$promise.resolve(phone);

//     if (callback) {
//       callback(phone);
//     }
//   });

//   return phone;
// };

// Phone.query = function(params, callback) {
//   var phones = [];
//   phones.$promise = new Promise();

//   http.getPhone(params, function(arr) {
//     for (var i = 0; i < arr.length; i++) {
//       phones.push(arr[i]);
//     }

//     phones.$promise.resolve(phones);

//     if (callback) {
//       callback(phones);
//     }
//   });

//   return phones;
// };

// $('#abc').hide() -> this
// $('#abc').css('height', 'auto') -> this
// $('#abc').show(); -> this


