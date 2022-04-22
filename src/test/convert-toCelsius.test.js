var assert = require("assert");
var pretty = require("pretty");
var { convert, multiply, isTemperature } = require("../render-page");



describe("convert", () => {
    const data = {
        id: 1,
        valeur: 50,
        type: "temperature",
        timestamp: "2022-02-09T08:30:59",
    };
    it("ne change rien si la 1er fonction renvoie false", () => {
        const res = convert(
            () => false,
            () => 100)(data);
        assert.equal(JSON.stringify(res), JSON.stringify(data));
    });
    it("change valeur si la 1er fonction renvoie vrai", () => {
        const {valeur, id} = convert(
            () => "aa",
            () => 100)(data);
        assert.equal(valeur, 100);
        assert.equal(id, 1);
    });
});