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


const addA = elem => elem + "a";

function addString(string) {
  return (elem) => elem + string;
}

function mapValue(fn, data) {
  let array = Object.entries(data);
  let map = array.map(([key, value]) => [key, fn(value)]);
  let result = Object.fromEntries(map);

  return result;
}


function convert(fn1, fn2) {
  return function (data) {
    if (fn1(data) === false)
      return data;
    else {
      const { valeur, ...rest } = data;
      return {
        ...rest,
        "valeur": fn2(valeur)
      };
    }
  }
}

//const groupBy = () => group(x => x.valeur).by(y => `${y.date.heure}h`);


function mapRecursive(array, result = []) {
  if (array.length === 0) return result;
  const shift = array.shift() + 1; // map transformation 
  result.push(shift);
  return mapRecursive(array, result);
}


function mapRecursive2([first, ...rest], fn) {
  
  if (rest.length === 1) {
    return [fn(first), fn(rest[0])];
  } 
  return [fn(first), ...(mapRecursive2(rest, fn))];
}

function addNumber(number = 0) {
  return (elem) => elem + number;
}

const maptest = mapRecursive2([1, 2, 3], addNumber(3));


function filterRecursive(array, result = []) {
  if (array.length === 0) return result;
  const shift = array.shift();
  if (shift > 5) // filter condition
    result.push(shift);
  return filterRecursive(array, result);
}

const filtertest = filterRecursive([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const reduceRecursive = (array) => {
  if (array.length === 0) return 0;
  return array.shift() + reduceRecursive(array.shift());
}


module.exports = renderPage;
renderPage.displayData = displayData;
renderPage.createTable = createTable;
renderPage.defineTable = defineTable;
renderPage.fillTable = fillTable;
renderPage.fillBruitParHeure = fillBruitParHeure;
renderPage.displayGraph = displayGraph;
renderPage.addDateProps = addDateProps;
renderPage.mapValue = mapValue;
renderPage.addA = addA;
renderPage.addString = addString;
renderPage.convert = convert;
renderPage.mapRecursive = mapRecursive;
renderPage.filterRecursive = filterRecursive;
renderPage.reduceRecursive = reduceRecursive;
renderPage.mapRecursive2 = mapRecursive2;
renderPage.addNumber = addNumber;





