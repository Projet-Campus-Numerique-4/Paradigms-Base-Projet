const { timestamp } = require("rxjs");
const createChart = require("./graph");


/**
 * Génère le rendu de la page.
 * @param {import("../types").Mesure[]} data
 * @param {boolean} withGraph Pour les tests
 */
function renderPage(data, withGraph) {
  const divTable = document.getElementById("table");
  if (withGraph && window.chart) {
    window.chart.destroy();
  }
  displayData(data, withGraph, divTable);
}


function displayData(data, withGraph, divTable) {
  createTable(data, divTable);
  if (withGraph) {
    const bruitParHeure = fillBruitParHeure(data);
    displayGraph(bruitParHeure);
  }
}


//CREATE table
function createTable(data, divTable) {
  const table = defineTable(divTable);
  fillTable(table, data);
}


function defineTable(divTable) {
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


function fillTable(table, data) {
  if (data == undefined) data = [];
  for (i = 0; i < data.length; i++) {
    const mesure = data[i];
    let tr = document.createElement("tr");

    tr.setAttribute("data-id", mesure.id);

    createElem(mesure.timestamp, tr);
    createElem(mesure.type, tr);
    createElem(mesure.valeur, tr);

    table.appendChild(tr);
  }
}


function createElem(value, tr) {
  let cell = document.createElement("td");
  cell.innerHTML = value;
  tr.appendChild(cell);
}


function fillBruitParHeure(data) {

  const bruitParHeure = data
    .filter(({type}) => type === "noise")
    .reduce((acc, curr) => {
      const heure = new Date(curr.timestamp).toLocaleTimeString("fr");
      return {
        ...acc,
         [heure]: [...(acc[heure] === undefined ? [] : acc[heure]), curr.valeur]
      }
    }, {});

  return bruitParHeure;
}

function displayGraph(bruitParHeure) {
    const graphData = Object.fromEntries(
      Object.entries(bruitParHeure)
        .map(([key, mesure]) => {
          return [key, sum(mesure) / mesure.length];
        })
    );
    window.chart = createChart("myChart", graphData, "bruit");

}

function sum(table) {
  return table.reduce((acc, i) => acc + i);
}


function lambdaFunction() {
  let bn = [{ "nom": "bob", "age": 12 }, { "nom": "bob", "age": 56 }, { "nom": "alice", "age": 12 }];
  let listbob = bn.filter((elem) => elem.nom == "bob");
  let listvraibob = listbob.map((elem) => { return { "nom": elem.nom, "age": elem.age / 2 }; });
  let ageMoyen = listvraibob.reduce((acc, elem) => { return acc + elem.age }) / listvraibob.length;
}

let timestampObject = {
  id: 2,
  valeur: 10,
  timestamp: 1650371584398
}


function addDateProps({timestamp = Date.now()}) {

  var date = new Date(timestamp);

  let result = {
    frDate: date.toLocaleDateString("fr"),
    jour: date.getDay(),
    mois: date.getMonth() +1,
    année: date.getFullYear(),
    heure: date.getHours()
  }
  
  return result;
}

addDateProps(timestampObject);

const dataKey = {
  key1: "value1",
  key2: "value2",
  };


  /**
   * @param {string} value
   */
function addValue (value) {
  return (x) => x + value; 
}

function mapValue(fnAddString, objet){
     return Object.fromEntries(
      Object.entries(objet).map(([key, value]) => [key, fnAddString(value)])
       )
}

console.log(mapValue(addValue('a'), dataKey));
console.log(mapValue(addValue('b'), dataKey));
module.exports = renderPage;
renderPage.displayData = displayData;
renderPage.createTable = createTable;
renderPage.defineTable = defineTable;
renderPage.fillTable = fillTable;
renderPage.fillBruitParHeure = fillBruitParHeure;
renderPage.displayGraph = displayGraph;
renderPage.addDateProps = addDateProps;

