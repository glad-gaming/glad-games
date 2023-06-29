'use strict';

// global variables

let inGameProgress = false;
let form = document.getElementById('form');
let choices = document.getElementById('choices');
let score = document.getElementById('score');
let levelNumber = document.getElementById('levelNumber');
let userName = document.getElementById('playerName');
let roundScore = document.getElementById('roundScore');
let opponentName = document.getElementById('opponentName');
let yourLastThrow = document.getElementById('yourLastThrow');
let theirLastThrow = document.getElementById('theirLastThrow');
let promptUser = document.getElementById('prompt');
let scoreTable = document.querySelector('tbody');
let historyList = document.getElementById('history');
let playerName = '';
let playerThrow = '';
let lastThrow = '';
let opponentThrow = '';
let opponentArr = [];
let round = 0;
let level = 0;
let opponentNumber = 0;
let roundWins = 0;
let roundLoses = 0;

let rank = 1;

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
  updateScore();
  promptUser.textContent = opponentArr[level].catchphrase;
  choices.addEventListener('click', roshambo);
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the game? Your progress will not be saved.';
  };
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

function storeResults() {
  let stringResults = JSON.stringify(playerArr);
  localStorage.setItem('playerArr', stringResults);
}

function getResults() {
  let savedResults = localStorage.getItem('playerArr');
  if(savedResults) {
    let parsedResult = JSON.parse(savedResults);
    for (let i = 0; i < parsedResult.length; i++) {
      new Player(parsedResult[i].name, parsedResult[i].score);
    }
  } else if (window.location.pathname === '/score.html') {
    renderAllTableData();
  }
}

Player.prototype.renderTableData = function() {
  let scoreTableRow = document.createElement('tr');
  scoreTable.appendChild(scoreTableRow);
  let scoreTableRank = document.createElement('th');
  scoreTableRank.textContent = rank;
  rank++;
  scoreTableRow.appendChild(scoreTableRank);
  let scoreTablePlayer = document.createElement('td');
  scoreTablePlayer.textContent = this.name;
  scoreTableRow.appendChild(scoreTablePlayer);
  let scoreTableScore = document.createElement('td');
  scoreTableScore.textContent = this.score;
  scoreTableRow.appendChild(scoreTableScore);
};

function sortTable() {
  playerArr.sort((a,b) => b.score - a.score);
}

function renderAllTableData() {
  for(let i = 0; i < playerArr.length; i++) {
    playerArr[i].renderTableData();
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

function getLast() {
  return lastThrow;
}

function getSame() {
  return playerThrow;
}

function renderList(result) {
  let listItem = document.createElement('p');
  listItem.textContent = `You threw ${getWord(playerThrow)}. ${opponentArr[level].name} threw ${getWord(opponentThrow)}. You ${result}!`;
  historyList.appendChild(listItem);
}

function updateScore() {
  levelNumber.textContent = `Level ${level + 1}`;
  userName.textContent = playerName;
  roundScore.textContent = `${roundWins} - ${roundLoses}`;
  opponentName.textContent = opponentArr[level].name;
  if (playerThrow !== '') {
    yourLastThrow.src = `images/${getWord(playerThrow)}.svg`;
    theirLastThrow.src = `images/${getWord(opponentThrow)}.svg`;
  } else {
    yourLastThrow.src = 'images/questionmark.svg';
    theirLastThrow.src = 'images/questionmark.svg';
  }
}

function roshambo(event) {
  playerThrow = event.target.alt;
  if (playerThrow) {
    playerThrow = playerThrow.charAt(0);
    console.log(playerThrow);
    let result;
    opponentThrow = opponentArr[opponentNumber].throws[round];
    if (playerThrow === opponentThrow) {
      result = 'tied';
    } else if (playerThrow === 'R' && opponentThrow === 'S') {
      result = 'won';
      roundWins++;
    } else if (playerThrow === 'R' && opponentThrow === 'P') {
      result = 'lost';
      roundLoses++;
    } else if (playerThrow === 'S' && opponentThrow === 'P') {
      result = 'won';
      roundWins++;
    } else if (playerThrow === 'S' && opponentThrow === 'R') {
      result = 'lost';
      roundLoses++;
    } else if (playerThrow === 'P' && opponentThrow === 'R') {
      result = 'won';
      roundWins++;
    } else if (playerThrow === 'P' && opponentThrow === 'S') {
      result = 'lost';
      roundLoses++;
    }
    renderList(result);
    if (roundWins === 2) {
      level++;
      if (opponentNumber < opponentArr.length) {
        opponentNumber++;
      } else {
        opponentNumber = 0;
      }
      round = 2;
      roundWins = 0;
      roundLoses = 0;
      playerThrow = '';
      promptUser.textContent = opponentArr[opponentNumber].catchphrase;
    } else if (roundLoses === 2) {
      new Player(playerName, level);
      storeResults();
      inGameProgress = false;
      roundScore.textContent = `${roundWins} - ${roundLoses}`;
      window.onbeforeunload = function() {};
      playAgain();
    }
    updateScore();
    lastThrow = playerThrow;
    if (round === 2) {
      round = 0;
    } else {
      round++;
    }
  }
}

function playAgain() {
  promptUser.innerHTML = '<p>You Lose!</p><div id="playAgain">Play Again?</div>';
  let playAgainButton = document.getElementById('playAgain');
  choices.removeEventListener('click', roshambo);
  playAgainButton.addEventListener('click', handleReload);
}
function handleReload() {
  location.reload();
}
// executable code
new Opponent('Rando Calrissian', [randomThrow(), randomThrow(), randomThrow()], 'You might want to buckle up, baby!');
new Opponent('Billy "The Poet" Wigglespear', ['P', 'P', 'P'], 'He writes brave verses, speaks brave words, swears brave oaths, and breaks them bravely.');
new Opponent('Blaine "The Rock" Johnston', ['R','R','R'], '"Can you smell what The Rock is cooking?"');
new Opponent('Eddie Scissorhands', ['S', 'S', 'S'], '"I thought this was a shish kabob."');
new Opponent('Wolfgang "The Crescendo" Bachtoven', ['P', 'S', 'R'], 'I only get stronger over time!');
new Opponent('Richie "Mr. Moneybags" Pennywise', ['R', 'P', 'R'], 'Sorry, I didn\'t see you there over my huge stacks of cash');
new Opponent('Dane "Denouement" Neuman', ['R', 'S', 'P'], 'We\'re only just hitting the climax!');
new Opponent('Kristine "Paper Snowflake" Kringle', ['P', 'S', 'S'], 'You will hear my slay bells ring!');
new Opponent('Dirk "Knife Sandwich" Hamburg', ['P', 'S', 'P'], 'Knife to meat you!');
new Opponent('Coby Kat', [getLast(), getLast(), getLast()], `You just threw ${getLast()}, didn't you?`);
new Opponent('Walter "The Wall" Wahlenmeier', [getSame(), getSame(), getLast()], 'I don\'t believe in winning and losing!');

if (window.location.pathname === 'index.html') {
  if (!localStorage.getItem('playerArr')) {
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
  } else if (localStorage.getItem('playerArr')) {
    getResults();
  }
}

// console.log(playerArr);
if (window.location.pathname === 'score.html') {
  getResults();
  sortTable();
  renderAllTableData();
}

if (inGameProgress) {
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the game? Your progress will not be saved.';
  };
}


// event listeners
if (form) {
  form.addEventListener('submit', formSubmit);
}
