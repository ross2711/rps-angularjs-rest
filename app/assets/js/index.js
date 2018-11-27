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

            function scoreUpdate() {
                console.log('run score update');

                if (gameWinner == "Player"){
                    $scope.$apply(function () {
                        $scope.ScorePlayer ++;
                        console.log("gameWinner: Player " + $scope.ScorePlayer);
                    });
                }

                else if (gameWinner == "Computer"){
                    $scope.$apply(function () {
                        $scope.ScoreComputer ++;
                        console.log("gameWinner: Computer " + $scope.ScoreComputer);
                    });
                }

                
                if ( $scope.ScorePlayer == 3 || $scope.ScoreComputer == 3 ) {

                    // determine which variable is 3
                    if ($scope.ScorePlayer == 3) var win = "You";

                    if ($scope.ScoreComputer == 3) var win =  "Computer";
                    setTimeout(function(){
                        alert(win+ " Won!");
                        $scope.$apply(function () {
                            $scope.ScorePlayer = 0;
                            $scope.ScoreComputer = 0;
                            console.log("reset ");
                        });
                    }, 500);
                } 
            };

            scoreUpdate ($scope.ScorePlayer, gameWinner, $scope.ScoreComputer);

            console.log('ending', $scope.ScoreComputer, $scope.ScorePlayer);

            if ($( ".container" ).eq(0).find( "#myModal" ).length == 0 ){
                $('.container').eq(0).append(mainGameClassInstance.generateModal(playerChoiceName,computerChoiceName,gameWinner));
            } else {
                $('#myModal').remove();
                $('.container').eq(0).append(mainGameClassInstance.generateModal(playerChoiceName,computerChoiceName,gameWinner));
            } 
            $('#myModal').modal('show', setTimeout(function(){
                $('#myModal').modal('hide');
            }, 1500));
        });
    });  
});     