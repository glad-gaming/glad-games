'use stict';

if (!localStorage.getItem('playerArr')) {
  new Player('Coby Kat', 10);
  new Player('Rando Calrissian', 9);
  new Player('Eddie Scissorhands', 3);
  new Player('Dirk "Knife Sandwich" Hamburg', 8);
  new Player('Richie "Moneybags" Pennywise', 5);
  new Player('Kristine "Paper Snowflake" Kringle', 7);
  new Player('Dane "Denouement" Neuman', 6);
  new Player('Wolfgang "The Cresendo" Bachtoven', 4);
  new Player('Blaine "The Rock" Johnston', 2);
  new Player('Billy "The Poet" Wigglespear', 1);
} else if (localStorage.getItem('playerArr')) {
  getResults();
}

function getResults() {
  let savedResults = localStorage.getItem('playerArr');
  if(savedResults) {
    let parsedResult = JSON.parse(savedResults);
    for (let i = 0; i < parsedResult.length; i++) {
      new Player(parsedResult[i].name, parsedResult[i].score);
    }
  }
}
