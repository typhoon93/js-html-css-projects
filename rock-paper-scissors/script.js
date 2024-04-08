    let playerScore = 0;
    let computerScore = 0;
    let round = 0;
    const para = document.createElement('p');
    const roundResultContainer = document.querySelector('.roundResult');
    para.textContent="Click on rock, paper or scissors to begin the game!";
    roundResultContainer.appendChild(para);
    const currentScorePara = document.querySelector('.currentScore');
    currentScorePara.textContent = "Current score: 0 : 0";
    roundResultContainer.appendChild(para);
    let playerChoicesButtons = Array.from(document.querySelectorAll('button'));
    playerChoicesButtons.forEach(button=>button.addEventListener('click',(e)=>{
        if (button.className == 'reset'){
        round = 0;
        playerScore = 0;
        computerScore = 0;
        currentScorePara.textContent = "Current score: 0 : 0";
        para.textContent="Click on rock, paper or scissors to begin the game!";
        roundResultContainer.appendChild(para);
        return;
        } else
        if (round < 5){ // if 5 rounds are played needs to click reset to begin the game again.
        game(button.className);
        } else {
          return;
        }
      }))

    
    
    let gameChoices = ['rock','paper','scissors'];
    function computerPlay(){
      let randomNumber = Math.floor(Math.random()*gameChoices.length);
      return gameChoices[randomNumber];
    }
    function getResult(){
      if (playerScore>computerScore){
        return "You win the game by: " + playerScore + ":" + computerScore + "! Congratulations!";
      } else if(computerScore>playerScore) {
        return "You lose the game by: " + computerScore + ":" + playerScore + "! Sorry, try again!";
      } else{
        return "The game ends in a draw! The score is: " + playerScore + ":" + computerScore + "!";
      }
    }
    function playRound (playerSelection, computerSelection){
      if (playerSelection.toLowerCase() === 'rock' ){
        switch (computerSelection) {
          case "rock":
          playerScore++;
          computerScore++;
          return "You both selected ROCK, it's a draw!";
          break;
          case "paper":
          computerScore++;
          return "Paper beats rock, you lose!";         
          break;
          case "scissors":
          playerScore++;
          return "Rock beats scissors, you win!";         
          break;
          default:
          return "Something went wrong, check the code buddy.";
          }
      } else if (playerSelection.toLowerCase() === 'paper' ){
        switch (computerSelection) {
          case "rock":
          playerScore++;
          return "Paper beats rock, you win!";
          break;
          case "paper":
          computerScore++;
          playerScore++;
          return "You both selected paper, it's a draw!";
          break;
          case "scissors":
          computerScore++;
          return "Scissors beat paper, you lose!";
          break;
          default:
          return "Something went wrong, check the code buddy.";
          }
      } else if (playerSelection.toLowerCase() === 'scissors' ){
        switch (computerSelection) {
          case "rock":
          computerScore++;
          return "Rock beats scissors, you lose!";
          break;
          case "paper":
          playerScore++;
          return "Scissors beats paper, you win!";
          break;
          case "scissors":
          computerScore++;
          playerScore++;
          return "You both selected scissors, it's a draw!";
          break;
          default:
          return "Something went wrong, check the code buddy.";
          }
      } else {
            round--;
            return "Please select rock, paper or scissors!"
            
          }
    }
    function game(playerButton){
      
      round++;
      para.textContent = playRound(playerButton,computerPlay());
      if(round<5){
      currentScorePara.textContent="Current Score: You:" + playerScore + " Computer:" + computerScore;
      roundResultContainer.appendChild(para);
      } else {
        currentScorePara.textContent = "The 5 round game has ended! Click reset to start the game again.";
        para.textContent=getResult();
      }
      
      }
