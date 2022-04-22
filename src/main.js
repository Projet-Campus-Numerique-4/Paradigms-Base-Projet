const fetchData = require("./fetch-data");
const renderPage = require("./render-page");
const { fromEvent, throttleTime, interval, timer, Observable, from, Subject } = require("rxjs");
const { createTable, displayGraph } = require("./render-page");

const contentLoad = fromEvent(document, "DOMContentLoaded");

async function updateData(subscriber) {
  const data = await fetchData();
  subscriber.next(data)
}

const observableData = new Observable(subscriber => {
  updateData(subscriber);
  setInterval(() => { updateData(subscriber) }, 10000)
})

const createTableObserver = {
  next: data => createTable(data),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

const createGraphObserver = {
  next: data => displayGraph(data),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// const result = contentLoad.
//   pipe(timer(0,1000)
//   .observableData.subscribe(createTableObserver)
//   .observableData.subscribe(createGraphObserver));

  document.addEventListener("DOMContentLoaded", function () {
    observableData.subscribe(createTableObserver);
    observableData.subscribe(createGraphObserver);
  });
// const renderTable = contentLoad      
//   .subscribe(createTable)
//   .subscribe(defineTable)
//   .subscribe(fillTable);


// document.addEventListener("DOMContentLoaded", function () {
//   update();
//   setInterval(update, 10000); // Toutes les 10s, on récupère les dernières données et recrée la page.
// });