let arrayOfChoices = ["rock","paper","scissors"];

let angularJs = angular.module("myApp", ["ngRoute"]);

angularJs.value('Username', "Player");

angularJs.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : './pages/intro.html',
        controller : 'introCtrl'
    })
    .when("/Game", {
        templateUrl : './pages/main-game.html',
        controller : 'gameMainCtrl'
    });
});

angularJs.controller("introCtrl", function ($scope, $rootScope, Username) {
    $( document ).ready(function() {
      $("#userInput").keyup(function(event) {
         let inputText = $(this).val();
         if (inputText.length > 0){
          $("#startBtn").css("display");
          $rootScope.Username = inputText;
         }
      });
    });  
});        


angularJs.controller("gameMainCtrl", function ($scope, $rootScope, Username) {
    
    $scope.Username = $rootScope.Username;
    $scope.ScorePlayer = 0;
    $scope.ScoreComputer = 0;

    $( document ).ready(function() {

        let mainGameClassInstance = new StartGame();
        let computerClassInstance = new Computer();
        let playerClassInstance = new Player();

        $(".btn-group > button.btn").on("click", function(){

            let numOfPlayerOption = +this.value;
            let playerChoiceName = playerClassInstance.getOptionChosenName(numOfPlayerOption);
            let computerChoice = computerClassInstance.getOption();
            let computerChoiceName = computerClassInstance.getOptionChosenName();
            let gameWinner = mainGameClassInstance.getWinner( parseInt(numOfPlayerOption), computerChoice);

        });
    });  
});        
