'use strict';

// global variables

let scoreTable = document.querySelector('tbody');

let rank = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

let playerArr = [];

// constructor function

function Player(name, score) {
  this.name = name;
  this.score = score;
  playerArr.push(this);
}

// functions

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

// executable code

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

if (inGameProgress) {
  window.onbeforeunload = function () {
    return 'Are you sure you want to leave the game? Your progress will not be saved.';
  };
}

// event listeners
