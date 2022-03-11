var assert = require("assert");
var pretty = require("pretty");var { fillBruitParHeure } = require("../render-page");

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
const dataResult = 10;
describe("defineTable test", () => {
  before(function () {  });  it("fillBruitParHeure", () => {
    let bruitData = fillBruitParHeure(data, true);
    console.log(bruitData);
    assert.equal(bruitData["08:30:59"], dataResult);
  });
});