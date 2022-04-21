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


//describe("convert")
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