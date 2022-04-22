const { fromEvent, scan, throttleTime, map} = require("rxjs");

const { Observable } = require("rxjs");
//const _ = require("lodash/fp");


const fetchData = require("./fetch-data");
const renderPage = require("./render-page");

const { renderTable, renderGraph } = require("./render-page");

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => console.log(count));


const observable = new Observable(subscriber => {
  update(subscriber);
  setInterval(() => { update(subscriber) }, 10000)
})


const observer = {
  next: (data) => renderPage(data, true),
  error: undefined,
  complete: undefined
}

const observer1 = {
  next: (data) => renderGraph(data),
  error: undefined,
  complete: undefined
}

const observer2 = {
  next: (data) => renderTable(data),
  error: undefined,
  complete: undefined
}


document.addEventListener("DOMContentLoaded", function () {
  //observable.subscribe(observer);
  observable.subscribe(observer1);
  observable.subscribe(observer2);
});


async function update(subscriber) {
  const dataToSend = await fetchData();
  subscriber.next(dataToSend);
}