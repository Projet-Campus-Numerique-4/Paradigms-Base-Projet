const { timestamp } = require("rxjs");
const createChart = require("./graph");
const { toCelsius } = require("./temperature");

/**
 * Génère le rendu de la page.
 * @param {import("../types").Mesure[]} data
 * @param {boolean} withGraph Pour les tests
 */


function renderPage(data, withGraph) {
  //const divTable = document.getElementById("table");
  if (withGraph && window.chart) {
    window.chart.destroy();
  }
  displayData(data, withGraph);
}

function displayData(data, withGraph) {
  createTable(data);
  if (withGraph) {
    const bruitParHeure = fillBruitParHeure(data);
    displayGraph(bruitParHeure);
  }
}

//CREATE table
function createTable(data) {
  const divTable = document.getElementById("table");
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
    .filter(({ type }) => type === "noise")
    .reduce((acc, curr) => {
      const heure = new Date(curr.timestamp).toLocaleTimeString("fr");
      return {
        ...acc,
        [heure]: [...(acc[heure] === undefined ? [] : acc[heure]), curr.valeur]
      }
    }, {});
  return bruitParHeure;
}

function displayGraph(data) {
  const bruitParHeure = fillBruitParHeure(data);
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

let testMapValue = {
  id: 2,
  valeur: 20,
  timestamp: 1650371584398
}
let data = { timestampObject, testMapValue };

function addValue(value) {
  return (elem) => elem + value;
};

function mapValue(fnString, data) {

  let array = Object.entries(data);
  let map = array.map(([key, value]) => [key, fnString(value)]);
  let result = Object.fromEntries(map);

  return result;
}

const dataTemp = {
  id: 1,
  valeur: 50,
  type: "temperature",
  timestamp: "2022-02-09T08:30:59",
};

const isTemperature = type => type === "temperature";

/**
 * 
 * @param {(v: any) => Boolean} fn1 
 * @param {*} fn2 
 * @param {*} data 
 * @returns 
 */


function convert(fn1, fn2) {

  return function (data) {
    const { valeur, type } = data;
    if (fn1(type)) {
      return {
        ...data,
        "valeur": fn2(valeur)
      }
    }
    return data
  }
}

const result = convert(isTemperature, toCelsius)(dataTemp)

function addDateProps({ timestamp = Date.now() }) {

  var date = new Date(timestamp);

  let result = {
    frDate: date.toLocaleDateString("fr"),
    jour: date.getDay(),
    mois: date.getMonth() + 1,
    année: date.getFullYear(),
    heure: date.getHours()
  }

  return result;
}

addDateProps(timestampObject);

// Creer les fonctions map et fliter et reduce

function createMap(array, fn, result = []) {
  if (array.length === 0) {
    return result;
  }
  let value = array.shift();
  let mapResult = fn(value);
  result.push(mapResult);
  return createMap(array, fn, result)
}

const creatTest = createMap([1, 2, 3, 4], addValue(1))

module.exports = renderPage;
renderPage.displayData = displayData;
renderPage.createTable = createTable;
renderPage.defineTable = defineTable;
renderPage.fillTable = fillTable;
renderPage.fillBruitParHeure = fillBruitParHeure;
renderPage.displayGraph = displayGraph;
renderPage.addDateProps = addDateProps;
renderPage.mapValue = mapValue;
renderPage.addValue = addValue;
renderPage.isTemperature = isTemperature;
renderPage.convert = convert;
renderPage.createMap = createMap;
