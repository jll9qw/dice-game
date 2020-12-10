'use strict';
//=============================================================
//Global variables
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const activePlayer1 = document.querySelector('.player--0');
const activePlayer2 = document.querySelector('.player--1');
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  activePlayer1.classList.toggle('player--active');
  activePlayer2.classList.toggle('player--active');
};
let scores, currentScore, activePlayer, playing;

//=============================================================
//Initializiing the game
//=============================================================
const initialValues = function(){
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    score0El.textContent=0;
    score1El.textContent=0;
    currentScoreP1.textContent = 0;
    currentScoreP2.textContent = 0;
    diceImg.classList.add('hidden');
    activePlayer1.classList.remove('player--winner');
    activePlayer2.classList.remove('player--winner');
    activePlayer1.classList.add('player--active');
    activePlayer2.classList.remove('player--active');
}
  
  initialValues();

//=============================================================
//Rolling the dice
//=============================================================
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice
    diceImg.classList.remove('hidden');

    //use dice variable to generate dice image
    diceImg.src = `dice-${dice}.png`;
    //check for a rolled one
    if (dice !== 1) {
      currentScore += dice;
      //save the current score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //add the to the current score
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//=============================================================
//Holding the score
//=============================================================
holdScoreBtn.addEventListener('click', function () {
  //add the current score to the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check the score >=100 then finish the game
    if (scores[activePlayer] >= 21) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
//=============================================================
//Reseting the game
//=============================================================
newGameBtn.addEventListener('click', initialValues);
//=============================================================
