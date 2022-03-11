var assert = require("assert");
var { toCelsius, toFahrenheit } = require("../temperature");

// Test unitaire

describe("temperature", () => {
  it("50° Fahrenheit = 10° Celsius ", () => {
    // Given
    const fahrenheit = 50;

    // When
    const celsius = toCelsius(fahrenheit);

    // Then
    assert.equal(celsius, 10);
  });

  it("10° Celsius = 50° Fahrenheit", () => {
    const celsius = 10;

    const fahrenheit = toFahrenheit(celsius);

    assert.equal(fahrenheit, 50);
  });
});
