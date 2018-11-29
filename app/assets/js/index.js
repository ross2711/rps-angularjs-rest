let arrayOfChoices = ["rock", "paper", "scissors"];
let angularJs = angular.module("myApp", ["ngRoute"]);

angularJs.value('Username', "Player");

angularJs.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: './pages/intro.html',
            controller: 'introCtrl'
        })
        .when("/Game", {
            templateUrl: './pages/main-game.html',
            controller: 'gameMainCtrl'
        });
});

angularJs.controller("introCtrl", function($scope, $rootScope, Username) {

    $(document).ready(function() {
        $("#userInput").keyup(function(event) {
            let inputText = $(this).val();
            if (inputText.length > 0) {
                $("#startBtn").css("display");
                $rootScope.Username = inputText;
            }
        });
    });
});

angularJs.controller("gameMainCtrl", function($scope, $http, $rootScope, Username) {

    $scope.callAPI = function() {
        $http.get('http://localhost:3000/random-number').
        then(function(response) {
            playGame(response.data.answer);
        });
    }

    $scope.choice = function(numOfPlayerOption) {
        playGame(numOfPlayerOption);
    };

    $scope.Username = $rootScope.Username;
    $scope.ScorePlayer = 0;
    $scope.ScoreComputer = 0;

    const playGame = function(numOfPlayerOption) {

        let mainGameClassInstance = new StartGame();
        let computerClassInstance = new Computer();
        let playerClassInstance = new Player();
        let playerChoiceName = playerClassInstance.getOptionChosenName(numOfPlayerOption);
        let computerChoice = computerClassInstance.getOption();
        let computerChoiceName = computerClassInstance.getOptionChosenName();
        let gameWinner = mainGameClassInstance.getWinner(numOfPlayerOption, computerChoice);

        function scoreUpdate() {

            if (gameWinner == "Player") {
                $scope.ScorePlayer++;
            } else if (gameWinner == "Computer") {
                $scope.ScoreComputer++;
            }

            if ($scope.ScorePlayer == 3 || $scope.ScoreComputer == 3) {

                if ($scope.ScorePlayer == 3) {
                    win = "You"
                };

                if ($scope.ScoreComputer == 3) {
                    win = "Computer"
                };
                setTimeout(function() {
                    alert(win + " Won!");
                }, 500);
                $scope.ScorePlayer = 0;
                $scope.ScoreComputer = 0;
            }
        };

        scoreUpdate($scope.ScorePlayer, gameWinner, $scope.ScoreComputer);

        if ($(".container").eq(0).find("#myModal").length == 0) {
            $('.container').eq(0).append(mainGameClassInstance.generateModal(playerChoiceName, computerChoiceName, gameWinner));
        } else {
            $('#myModal').remove();
            $('.container').eq(0).append(mainGameClassInstance.generateModal(playerChoiceName, computerChoiceName, gameWinner));
        }
        $('#myModal').modal('show', setTimeout(function() {
            $('#myModal').modal('hide');
        }, 1000));
    };

});