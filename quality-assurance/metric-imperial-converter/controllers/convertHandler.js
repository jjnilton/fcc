function ConvertHandler() {

  this.getNum = function(input) {
    let result = input.trim();
    result = result.split(/(?=[A-Za-z])(.+)/g)[0];
    if (result.length == 0) {
      return 1;
    }
    if (result.match(/(\/).*\1/g)) {
      return "Error.";
    }
    if (result.match(/^\d+(\.\d+)?\/\d+(\.\d+)?$/g)) {
      result = result.split("/");
      result = +result[0] / +result[1]
    }
    return result;
  };

  this.getUnit = function(input) {
    let result = input.trim();
    result = result.split(/(?=[A-Za-z])(.+)/g)[1];
    result = result.toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"]
    if (!validUnits.includes(result)) {
      result = "Error.";
    }
    return result === 'l' ? result.toUpperCase() : result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'litres';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms'
        break;
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {

      case 'gal':
        result = +(initNum * galToL).toFixed(5);
        break;
      case 'L':
        result = +(initNum / galToL).toFixed(5);
        break;
      case 'lbs':
        result = +(initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
        result = +(initNum / lbsToKg).toFixed(5);
        break;
      case 'mi':
        result = +(initNum * miToKm).toFixed(5);
        break;
      case 'km':
        result = +(initNum / miToKm).toFixed(5);
        break;
    }


    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };

}

module.exports = ConvertHandler;
