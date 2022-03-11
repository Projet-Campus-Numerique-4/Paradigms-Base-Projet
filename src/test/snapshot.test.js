var assert = require("assert");
var pretty = require("pretty");
const renderPage = require("../render-page");

const data = [
  {
    id: 1,
    valeur: 1.11,
    type: "cod",
    timestamp: "2022-02-09T08:30:59",
  },
  {
    id: 2,
    valeur: 50,
    type: "temperature",
    timestamp: "2022-02-09T08:30:59",
  },
  {
    id: 3,
    valeur: 10,
    type: "noise",
    timestamp: "2022-02-09T08:30:59",
  },
];

// integration test

describe("snapshot", () => {
  before(function () {
    this.jsdom = require("jsdom-global")();
    document.body.innerHTML = `<div id="table"></div>`;
  });

  it("table ", () => {
    renderPage(data, false);

    const table = document.getElementById("table");

    assert.equal(
      pretty(table.innerHTML),
      pretty(`<table>
    <thead>
      <tr>
        <th>date</th>
        <th>capteur</th>
        <th>valeur</th>
      </tr>
    </thead>
    <tr data-id="1">
      <td>2022-02-09T08:30:59</td>
      <td>cod</td>
      <td>1.11</td>
    </tr>
    <tr data-id="2">
      <td>2022-02-09T08:30:59</td>
      <td>temperature</td>
      <td>50</td>
    </tr>
    <tr data-id="3">
      <td>2022-02-09T08:30:59</td>
      <td>noise</td>
      <td>10</td>
    </tr>
  </table>`)
    );
  });

  after(function () {
    this.jsdom();
  });
});
