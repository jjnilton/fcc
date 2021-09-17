// create an array of objects to help iterating
const dict = [
  { name: "ONE HUNDRED", value: 100 },
  { name: "TWENTY", value: 20 },
  { name: "TEN", value: 10 },
  { name: "FIVE", value: 5 },
  { name: "ONE", value: 1 },
  { name: "QUARTER", value: 0.25 },
  { name: "DIME", value: 0.1 },
  { name: "NICKEL", value: 0.05 },
  { name: "PENNY", value: 0.01 },
];

function checkCashRegister(price, cash, cid) {
  // set default output object
  let output = { status: null, change: [] };
  // reverse a copy of the cid array
  let reversedCid = [...cid].reverse();
  // calculate the change
  let change = cash - price;
  // assign change to a value that will be subtracted later
  let value = change;
  // calculate the total cash in the register
  let registerTotal = cid.reduce((acc, curr) => acc + curr[1], 0);
  // add quantity to the dict object to keep track of what's removed
  let betterDict = dict.map((item, index) => ({
    ...item,
    quantity: Math.round(reversedCid[index][1] / item.value),
  }));
  // iterate over the "better dict"
  for (let currency of betterDict) {
    // iterate on the same currency unit while
    // value is bigger than the currency value
    // and there's that currency unity available
    while (Math.floor(value / currency.value) > 0 && currency.quantity > 0) {
      // subtract the value
      value = +(value - currency.value).toFixed(2);
      // subtract the quantity
      currency.quantity -= 1;
      // check if there's already an item with name on the output.change array
      if (output.change.some((item) => item[0] == currency.name)) {
        // find the element that's already in the array
        const element = output.change.find((item) => item[0] === currency.name);
        // increment the element found
        element[1] = +(element[1] + currency.value).toFixed(2);
      } else {
        // if there's no element with name, add to the array
        output.change.push([currency.name, currency.value]);
      }
    }
  }

  // calculate the total of the change
  let changeTotal = output.change.reduce((a, b) => a + b[1], 0);
  // check if matches selected conditions
  if (change > registerTotal || changeTotal < change) {
    output.status = "INSUFFICIENT_FUNDS";
    output.change = [];
  } else if (registerTotal === change) {
    output.status = "CLOSED";
    output.change = cid;
  } else {
    output.status = "OPEN";
  }
  // logging
  console.log(output);
  return output;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
