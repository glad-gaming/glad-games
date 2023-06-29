'use strict';

function getResults() {
  let savedResults = localStorage.getItem('playerArr');
  if (savedResults) {
    let parsedResult = JSON.parse(savedResults);
    for (let i = 0; i < parsedResult.length; i++) {
      new Player(parsedResult[i].name, parsedResult[i].score);
    }
  } else {
    renderAllTableData();
  }
}
getResults();
sortTable();
renderAllTableData();
