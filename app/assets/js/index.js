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

angularJs.controller("gameMainCtrl", function ($scope, $http, $rootScope, Username) {

    console.log('here');
    
    $scope.callAPI = function() {
        $http.get('http://localhost:3000/random-number').
        then(function(response) {
            console.log('res',response);
            playGame(response.data.answer);
        });
    }

    $scope.choice = function(numOfPlayerOption) {
        //let numOfPlayerOption = +this.value;
        console.log('clicked', numOfPlayerOption)
        // parseInt(numOfPlayerOption)
        playGame(numOfPlayerOption);
    };

    $scope.Username = $rootScope.Username;
    $scope.ScorePlayer = 0;
    $scope.ScoreComputer = 0;
        
    const playGame = function(numOfPlayerOption){
        console.log('playGame', numOfPlayerOption)
        let mainGameClassInstance = new StartGame();
        let computerClassInstance = new Computer();
        let playerClassInstance = new Player();
        let playerChoiceName = playerClassInstance.getOptionChosenName(numOfPlayerOption);
        let computerChoice = computerClassInstance.getOption();
        let computerChoiceName = computerClassInstance.getOptionChosenName();
        let gameWinner = mainGameClassInstance.getWinner( numOfPlayerOption, computerChoice);

        function scoreUpdate() {
            console.log('run score update');

            if (gameWinner == "Player"){
                //$scope.$apply(function () {
                    $scope.ScorePlayer ++;
                    console.log("gameWinner: Player " + $scope.ScorePlayer);
                //});
            }

            else if (gameWinner == "Computer"){
                //$scope.$apply(function () {
                    $scope.ScoreComputer ++;
                    console.log("gameWinner: Computer " + $scope.ScoreComputer);
                //});
            }

            
            if ( $scope.ScorePlayer == 3 || $scope.ScoreComputer == 3 ) {

                // determine which variable is 3
                if ($scope.ScorePlayer == 3) var win = "You";

                if ($scope.ScoreComputer == 3) var win =  "Computer";
                setTimeout(function(){
                    alert(win+ " Won!");
                    //$scope.$apply(function () {
                        
                        console.log("reset ");
                    //});
                }, 500);
                $scope.ScorePlayer = 0;
                $scope.ScoreComputer = 0;
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
    };

    // $( document ).ready(function() {

    //     $(".btn-group > button.btn").on("click", function() {
    //         let numOfPlayerOption = +this.value;
    //         console.log('clicked', numOfPlayerOption)
    //         // parseInt(numOfPlayerOption)
    //         playGame(numOfPlayerOption);
    //     });
    // });  
});     
