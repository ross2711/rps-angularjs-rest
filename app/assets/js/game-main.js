
function StartGame() 
{
   this.getWinner = function(Player1Choice,computerPlayerChoice){
    if (Player1Choice == computerPlayerChoice){
        return "Draw";
    }
    else if (Player1Choice == 0 && computerPlayerChoice == 1){
        return "Computer";
    }
    else if (Player1Choice == 0 && computerPlayerChoice == 2){
      return "Player";
    }  
    else if (Player1Choice == 1 && computerPlayerChoice == 0){
        return "Player";   
    }
    else if (Player1Choice == 1 && computerPlayerChoice == 2){
        return "Computer"; 
    }
    else if (Player1Choice == 2 && computerPlayerChoice == 0){
        return "Computer"; 
    }
    else if (Player1Choice == 2 && computerPlayerChoice == 1){
        return "Player";                                 
    }   
    else{
        return "Computer";
    }
  };
}