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
let scoreTable = document.querySelector('tbody');
let historyList = document.getElementById('history');
let playerName = '';
let playerThrow = '';
let opponentThrow = '';
let opponentArr = [];
let round = 0;
let level = 0;
let roundWins = 0;
let roundLoses = 0;

let rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let playerArr = [];


// Global constructor functions
function Opponent(name, throws, catchphrase, style) {
  this.name = name,
  this.throws = throws,
  this.catchphrase = catchphrase,
  this.style = style,
  opponentArr.push(this);
}

function Player(name, score) {
  this.name = name;
  this.score = score;
  playerArr.push(this);
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

function storeResults() {
  let stringResults = JSON.stringify(playerArr);
  localStorage.setItem('playerArr', stringResults);
}

function getResults() {
  let savedResults = localStorage.getItem('playerArr');
  if(savedResults) {
    let parsedResult = JSON.parse(savedResults);
    playerArr = parsedResult;
    rank ++;
  } else {
    renderAllTableData();
  }
}

Player.prototype.renderTableData = function(i) {
  let scoreTableRow = document.createElement('tr');
  scoreTable.appendChild(scoreTableRow);
  let scoreTableRank = document.createElement('th');
  scoreTableRank.textContent = rank[i];
  scoreTableRow.appendChild(scoreTableRank);
  let scoreTablePlayer = document.createElement('td');
  scoreTablePlayer.textContent = this.name;
  scoreTableRow.appendChild(scoreTablePlayer);
  let scoreTableScore = document.createElement('td');
  scoreTableScore.textContent = this.score;
  scoreTableRow.appendChild(scoreTableScore);
};

function addUserToScoreTable() {
  playerArr.sort((a,b) => b.score - a.score);
}

function renderAllTableData() {
  for(let i = 0; i < playerArr.length; i++) {
    playerArr[i].renderTableData(i);
  }
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

function renderList() {
  for(let i = 0; i < 3; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `You threw ${playerThrow}. ${opponentArr[level].name} threw ${opponentThrow}`;
    historyList.appendChild(listItem);
  }
}

function updateScore() {
  levelNumber.textContent = `Level ${level + 1}`;
  userName.textContent = playerName;
  roundScore.textContent = `${roundWins} - ${roundLoses}`;
  opponentName.textContent = opponentArr[level].name;
  if (playerThrow !== '') {
    yourLastThrow.src = `images/${getWord(playerThrow)}.svg`;
    theirLastThrow.src = `images/${getWord(opponentThrow)}.svg`;
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
renderList();
new Opponent('Rando Calrissian', [randomThrow(), randomThrow(), randomThrow()], 'You might want to buckle up, baby!');

new Player('Coby Kat', 10);
new Player('Rando Calrissian', 9);
new Player('Eddie Scissorhands', 8);
new Player('Dirk "Knife Sandwich" Hamburg', 7);
new Player('Richie "Moneybags" Pennywise', 6);
new Player('Kristine "Paper Snowflake" Kringle', 5);
new Player('Dedra "Denouement" Nugent', 4);
new Player('Wolfgang "The Cresendo" Bachtoven', 3);
new Player('Blaine "The Rock" Johnston', 2);
new Player('Billy "The Poet" Wigglespear', 1);

console.log(playerArr);
renderAllTableData();
addUserToScoreTable();

storeResults();
getResults();

if (inGameProgress) {
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the game? Your progress will not be saved.';
  };
}


// event listeners
// form.addEventListener('submit', formSubmit);
// choices.addEventListener('click', roshambo);
