angular.module("ngMatch",[]),angular.module("ngMatch").directive("match",[function(){return{require:"ngModel",restrict:"A",scope:{match:"="},link:function(a,b,c,d){a.$watch(function(){return d.$pristine&&angular.isUndefined(d.$modelValue)||a.match===d.$modelValue},function(a){d.$setValidity("mismatch",a)})}}}]);