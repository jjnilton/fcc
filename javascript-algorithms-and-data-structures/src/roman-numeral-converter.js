// create an object to help in the loop
let dict = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const convert = (num) => {
  // empty string that will hold the roman chars
  let result = "";
  // iterate on the keys of the object, (e.g. I, VI, V)
  for (let roman of Object.keys(dict)) {
    // get the quotient of the number to be converted
    // to determine how much to subtract from the number on the next iteration
    // and how many times the roman characters will be repeated
    let quotient = Math.floor(num / dict[roman]);
    // assign new value to number
    // subtracting the quotient * the current bigger decimal equivalent of a roman numeral
    console.log(num);
    console.log(dict[roman]);
    num = num - quotient * dict[roman];
    // append the roman number to the string, repeating according to the quotient
    result = result + roman.repeat(quotient);
  }
  // logging
  console.log(result);
};

convert(2906);
