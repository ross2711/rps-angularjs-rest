function StartGame() {

  this.getWinner = function(Player1Choice, computerPlayerChoice) {
    if (Player1Choice == computerPlayerChoice) {
        return "Draw";
    } else if (Player1Choice == 0 && computerPlayerChoice == 1) {
        return "Computer";
    } else if (Player1Choice == 0 && computerPlayerChoice == 2) {
        return "Player";
    } else if (Player1Choice == 1 && computerPlayerChoice == 0) {
        return "Player";
    } else if (Player1Choice == 1 && computerPlayerChoice == 2) {
        return "Computer";
    } else if (Player1Choice == 2 && computerPlayerChoice == 0) {
        return "Computer";
    } else if (Player1Choice == 2 && computerPlayerChoice == 1) {
        return "Player";
    } else {
        return "Computer";
    } 
  };

  getOutcomeImage = function(gameOutcome) {
    if (gameOutcome == "Draw") {
        return "draw.gif";
    } else if (gameOutcome == "Player") {
        return "win.gif";
    } else if (gameOutcome == "Computer") {
        return "lose.gif";
    }
    return "";
  }

  this.generateModal = function(choiceFromPlayer, choiceFromComputer, gameOutcome) {
    var test = getOutcomeImage(gameOutcome);
    newtest = (test.slice(0, -4)).toUpperCase();;
    if (choiceFromComputer != null && gameOutcome != null) {
        return "<div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content'> <div class='modal-body' style='text-align: center;'><p>" + "You chose " + String(choiceFromPlayer) + "<br/>CPU chose " + String(choiceFromComputer) + "</br></br>" + "<img src='./assets/img/" + test + "'> </p> </div><div class='modal-footer'><h1 >" + newtest + "</h1></div></div></div></div>";
    }
    return "";
  };

}