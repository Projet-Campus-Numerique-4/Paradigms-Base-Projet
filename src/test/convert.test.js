var assert = require("assert");
var { convert } = require("../render-page");


//convert((data) => data.type === "temperature", (valeur) => toCelsius(valeur))(data);

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
        const { valeur } = convert(
            () => true,
            () => 100)(data);
        assert.equal(valeur, 100);
    });
});