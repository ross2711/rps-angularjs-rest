let angularJs = angular.module("myApp", ["ngRoute"]);

angularJs.config(function($routeProvider) {
    $routeProvider
    .when("/", {
     templateUrl : './pages/intro.html',
     controller : 'introCtrl'
    })
});

angularJs.controller("introCtrl", function ($scope, $rootScope) {
    $( document ).ready(function() {
      $("#userInput").keyup(function(event) {
         let userInputText = $(this).val();
         if (userInputText.length > 0){
          $("#startBtn").css("display","inline");
         }
      });
    });  
});        

