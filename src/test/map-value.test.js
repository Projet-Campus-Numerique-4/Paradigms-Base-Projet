var assert = require("assert");
var pretty = require("pretty");
var { mapValue, addA } = require("../render-page");

describe("mapValue", () => {
    const data = {
        key1: "value1",
        key2: "value2",
    };

    it("applique la fonction sur chaque valeur de l'objet", () => {
        const res = mapValue(addA, data);
        assert.equal(res["key1"], "value1a");
        assert.equal(res["key2"], "value2a");
    });

});