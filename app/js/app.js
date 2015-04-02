;(function() {
'use strict';

/* App Module **/
/*jslint node: true*/

var ganbareApp = angular.module('ganbareApp', [
    'ngRoute',
    'ganbareControllers',
    'ganbareServices',
    'ganbareFilters',
    'ganbareDirective'
]);

ganbareApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/feedfv', {
                templateUrl: 'partials/feed-for-visitors.html',
                controller : 'feedMemberCtrl'
            }).
            when('/feedmb', {
                templateUrl: 'partials/feed-for-member.html',
                controller: 'feedMemberCtrl'
            }).
            when('/login',{
                templateUrl: 'partials/login.html',
                controller : 'loginCtrl'
            }).
            when('/ganbaru/:ganbaruId', {
                templateUrl: 'partials/view-ganbaru-detail.html',
                controller: 'viewGanbareDetailCtrl'
            }).
            when('/ganbaru/:ganbaruId/edit', {
                templateUrl: 'partials/edit-ganbaru.html',
                controller: 'editGanbaruCtrl'
            }).
            when('/creategb', {
                templateUrl: 'partials/create-ganbaru.html',
                controller: 'createGanbaruCtrl'
            }).
            when('/mypage', {
                templateUrl: 'partials/my-page.html',
                controller: 'myPageGanbaruCtrl'
            }).
            when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'registerCtrl'
            }).
            when('/register/:userId/verify', {
                templateUrl: 'partials/verify-register.html',
                controller: 'registerCtrl'
            }).
            when('/edit-my-page', {
                templateUrl: 'partials/edit-my-page.html',
                controller : 'editMyPageCtrl'
            }).
            when('/users/:userId/ganbaru', {
                templateUrl: 'partials/list-by-user.html',
                controller : 'listByUser'
            }).
            when('/password/change', {
                templateUrl: 'partials/change-password.html',
                controller : 'changePass'
            }).
            otherwise({
                redirectTo: '/feedfv'
            });
        }]);
}());
