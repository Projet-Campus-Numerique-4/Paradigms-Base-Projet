var assert = require("assert");
var pretty = require("pretty");
var { renderPage, defineTable } = require("../render-page");



describe("defineTable test", () => {
  before(function () {
    this.jsdom = require("jsdom-global")();
    document.body.innerHTML = `<div id="table"></div>`;
  });

  it("table", () => {
    
    const divTable = document.getElementById("table");
    let table = defineTable(divTable);
    assert.equal(
      pretty(divTable.innerHTML),
      pretty(`<table>
    <thead>
      <tr>
        <th>date</th>
        <th>capteur</th>
        <th>valeur</th>
      </tr>
    </thead>
  </table>`)
    );
  });

  after(function () {
    this.jsdom();
  });
});