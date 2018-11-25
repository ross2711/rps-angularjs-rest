function Player(playerName) 
{
  this.playerUiName = playerName;

  this.getOptionChosenName = function(intChoiceFromUI) {
  	return arrayOfChoices[intChoiceFromUI]
  };
  
}