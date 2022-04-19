const { timestamp } = require("rxjs");
const createChart = require("./graph");


/**
 * Génère le rendu de la page.
 * @param {import("../types").Mesure[]} data
 * @param {boolean} withGraph Pour les tests
 */
function renderPage(data, withGraph) {
  console.log(data);
  const divTable = document.getElementById("table");
  if (withGraph && window.chart) {
    window.chart.destroy();
  }
  displayData(data, withGraph, divTable);
}


function displayData(data, withGraph, divTable){
  createTable(data, divTable);
  let bruitParHeure = fillBruitParHeure(data, withGraph);
  displayGraph(bruitParHeure, withGraph);
}


//CREATE table
function createTable(data, divTable){
  const table = defineTable(divTable);
  fillTable(table, data);
}


function defineTable(divTable){
  divTable.innerHTML = "";
  let table = document.createElement("table");
  table.innerHTML = `
  <thead>
  <tr>
  <th>date</th>
  <th>capteur</th>
  <th>valeur</th>
  </tr>
  </thead>
  `;
  divTable.appendChild(table);
  return table;
}


function fillTable(table, data){
  if (data == undefined) data = [];
  for (i = 0; i < data.length; i++) {
    const mesure = data[i];
    let tr = document.createElement("tr");

    tr.setAttribute("data-id", mesure.id);

    createElem(mesure.timestamp, tr);
    createElem(mesure.type, tr);
    createElem(mesure.valeur, tr);

/*
    let dateCell = document.createElement("td");
    dateCell.innerHTML = mesure.timestamp;
    tr.appendChild(dateCell);

    let capteurCell = document.createElement("td");
    capteurCell.innerHTML = mesure.type;
    tr.appendChild(capteurCell);

    let valeurCell = document.createElement("td");
    valeurCell.innerHTML = mesure.valeur;
    tr.appendChild(valeurCell);
  */

    table.appendChild(tr);
  }
}


function createElem(value, tr){
  let cell = document.createElement("td");
  cell.innerHTML = value;
  tr.appendChild(cell);
}

function lambdaFunction(){
  let bn = [{"nom" : "bob", "age": 12}, {"nom" : "bob", "age": 56}, {"nom" : "alice", "age": 12}];
  let listbob = bn.filter((elem) => elem.nom == "bob");
  let listvraibob = listbob.map((elem)=> {return {"nom":elem.nom, "age": elem.age/2}; });
  let ageMoyen = listvraibob.reduce((acc, elem)=> {return acc + elem.age})/listvraibob.length;
}


function fillBruitParHeure(data, withGraph){
  let bruitParHeure = {};
  for (i = 0; i < data.length; i++) {
    const mesure = data[i];

    if (withGraph && mesure.type === "noise") {
      var heure = new Date(mesure.timestamp).toLocaleTimeString("fr");
      if (bruitParHeure[heure]) {
        bruitParHeure[heure].push(mesure.valeur);
      } else {
        bruitParHeure[heure] = [mesure.valeur];
      }
    }
  }
  return bruitParHeure;
}


function displayGraph(bruitParHeure, withGraph){
  if (withGraph) {
    var graphData = {};
    for (const key in bruitParHeure) {
      const mesures = bruitParHeure[key];
      let somme = 0;
      for (i = 0; i < mesures.length; i++) {
        somme += mesures[i];
      }
      graphData[key] = somme / mesures.length;
    }
    window.chart = createChart("myChart", graphData, "bruit");
  }
}


module.exports = renderPage;
renderPage.displayData = displayData;
renderPage.createTable = createTable;
renderPage.defineTable = defineTable;
renderPage.fillTable = fillTable;
renderPage.fillBruitParHeure = fillBruitParHeure;
renderPage.displayGraph = displayGraph;
