'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    // console.log(req.query)
    // console.log(convertHandler.getNum(req.query.input));
    // console.log(convertHandler.getUnit(req.query.input))
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    // if (initNum === 'Error.' && initUnit === 'Error.') {
    //   res.send('invalid number and unit')
    // } else if (initNum === 'Error.') {
    //   res.send('invalid number')
    // } else if (inintUnit === 'Error.') {
    //   res.send('invalid unit')
    // }
    if (initNum === 'Error.' && initUnit === 'Error.') {
      console.log(initNum, initUnit)
      res.send('invalid number and unit')
    } else if (initNum === 'Error.') {
      res.send('invalid number');
    } else if (initUnit === 'Error.') {
      res.send('invalid unit')
    } else {
      res.json({initNum, initUnit, returnNum, returnUnit, string})
    }
  })

};
