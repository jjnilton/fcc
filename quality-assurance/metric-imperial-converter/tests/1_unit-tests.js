const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  // Numbers
  test('#isWholeNumber', () => {
    assert.equal(convertHandler.getNum("35L"), "35");
  })
  test('#isDecimal', () => {
    assert.equal(convertHandler.getNum('35.5L'), "35.5");
  })
  test("#isFractional", () => {
    assert.equal(convertHandler.getNum('1/2L'), "0.5");
  })
  test("#isFractionalwithADecimal", () => {
    assert.equal(convertHandler.getNum('1/2.5L'), "0.4");
  })
  test("#isDoubleFraction", () => {
    assert.equal(convertHandler.getNum('1/2/3L'), "Error.");
  })
  test("#isDefaultTo1", () => {
    assert.equal(convertHandler.getNum('L'), "1");
  })
  // Units
  test("#isValidUnit", () => {
    assert.equal(convertHandler.getUnit('1gal'), "gal");
    assert.equal(convertHandler.getUnit('1.5L'), "L", "L to L");
    assert.equal(convertHandler.getUnit('1.5l'), "L", "l to L");
    assert.equal(convertHandler.getUnit('2.67KM'), "km");
    assert.equal(convertHandler.getUnit('100lbs'), "lbs");
    assert.equal(convertHandler.getUnit('50Kg'), "kg");
  })
  test("#isInvalidUnit", () => {
    assert.equal(convertHandler.getUnit('1gallon'), "Error.");
    assert.equal(convertHandler.getUnit('1.5litres'), "Error.");
    assert.equal(convertHandler.getUnit('2.67Db'), "Error.");
    assert.equal(convertHandler.getUnit('100Lbss'), "Error.");
    assert.equal(convertHandler.getUnit('50Kgb'), "Error.");
  })
  test("#isCorrectReturnUnit", () => {
    assert.equal(convertHandler.getReturnUnit('gal'), "L");
    assert.equal(convertHandler.getReturnUnit('L'), "gal");
    assert.equal(convertHandler.getReturnUnit('mi'), "km");
    assert.equal(convertHandler.getReturnUnit('km'), "mi");
    assert.equal(convertHandler.getReturnUnit('lbs'), "kg");
    assert.equal(convertHandler.getReturnUnit('kg'), "lbs");
  })
  test("#isSpellingCorrectly", () => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'litres')
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
  })

  test("isConvertingGalToL", () => {
    assert.equal(convertHandler.convert(1, "gal"), +(1 * 3.78541).toFixed(5), "GalToL")
  })
  test("isConvertingLtoGal", () => {
    assert.equal(convertHandler.convert(1, "L"), +(1 / 3.78541).toFixed(5), "LtoGal")
  })
  test("isConvertingMitoKm", () => {
    assert.equal(convertHandler.convert(1, "mi"),  +(1 * 1.60934).toFixed(5), "MiToKm")
  })
  test("isConvertingKmToMi", () => {
    assert.equal(convertHandler.convert(1, "km"), +(1 / 1.60934).toFixed(5), "KmToMi")
  })
  test("isConvertingLbsToKg", () => {
    assert.equal(convertHandler.convert(1, "lbs"), +(1 * 0.453592).toFixed(5), "LbsToKg")
  })
  test("isConvertingKgToLbs", () => {
    assert.equal(convertHandler.convert(1, "kg"), +(1 / 0.453592).toFixed(5), "KgToLbs")
  })
});