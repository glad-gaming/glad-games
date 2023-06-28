'use strict';

// global variables

let inGameProgress = false;
let form = document.getElementById('form');
let choices = document.getElementById('choices');
let score = document.getElementById('score');
let levelNumber = document.getElementById('levelNumber');
let userName = document.getElementById('playerName');
let roundScore = document.getElementById('roundscore');
let opponentName = document.getElementById('opponentName');
let yourLastThrow = document.getElementById('yourLastThrow');
let theirLastThrow = document.getElementById('theirLastThrow');
let playerName = '';
let playerThrow = '';
let opponentThrow = '';
let opponentArr = [];
let round = 0;
let level = 0;
let roundWins = 0;
let roundLoses = 0;


if (inGameProgress) {
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the game? Your progress will not be saved.';
  };
}


// Global constructor functions
function Opponent(name, throws, catchphrase, style) {
  this.name = name,
    this.throws = throws,
    this.catchphrase = catchphrase,
    this.style = style,
    opponentArr.push(this);
}


// functions
function formSubmit(event) {
  event.preventDefault();
  playerName = event.target.name.value;
  inGameProgress = true;
  form.innerHTML = '';
  form.remove();
  console.log(playerName);
}

function randomThrow() {
  let random = Math.floor(Math.random() * 2);
  if (random === 0) {
    return 'R';
  } else if (random === 1) {
    return 'P';
  } else if (random === 2) {
    return 'S';
  }
}
function postHistory(player, opponent, result) {

}
function getWord(input) {
  if (input === 'R') {
    return 'rock';
  } else if (input === 'P') {
    return 'paper';
  } else if (input === 'S') {
    return 'scissors';
  }
}

function updateScore() {
  levelNumber.textContent = `Level ${level + 1}`;
  userName.textContent = playerName;
  roundScore.textContent = `${roundWins} - ${roundLoses}`;
  opponentName.textContent = opponentArr[level].name;
  if (playerThrow !== '') {
    yourLastThrow.src = `images/${getWord(playerThrow)}.svg`;
    theirLastThrow.src = `images/${getWord(opponentThrowt)}.svg`;
  }
}

function roshambo(event) {
  playerThrow = event.target.alt;
  playerThrow = playerThrow.charAt(0);
  console.log(playerThrow);
  let result;
  opponentThrow = opponentArr[level].throws[round];
  if (playerThrow === opponentThrow) {
    result = 'Draw';
  } else if (playerThrow === 'R' && opponentThrow === 'S') {
    result = 'Win';
  } else if (playerThrow === 'R' && opponentThrow === 'P') {
    result = 'Lose';
  } else if (playerThrow === 'S' && opponentThrow === 'P') {
    result = 'Win';
  } else if (playerThrow === 'S' && opponentThrow === 'R') {
    result = 'Lose';
  } else if (playerThrow === 'P' && opponentThrow === 'R') {
    result = 'Win';
  } else if (playerThrow === 'P' && opponentThrow === 'S') {
    result = 'Lose';
  }
  postHistory(playerThrow, opponentThrow, result);
}

// executable code
new Opponent('Rando Calrissian', [randomThrow(), randomThrow(), randomThrow()], 'You might want to buckle up, baby!');

// event listeners
form.addEventListener('submit', formSubmit);
choices.addEventListener('click', roshambo);
