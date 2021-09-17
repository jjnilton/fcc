function palindrome(str) {
  let entered = str;
  // trim and convert to lower case
  let cleaned = str.trim();
  cleaned = cleaned.toLowerCase();
  // match only if alphanumeric, no special characters, returns an array
  cleaned = cleaned.match(/[a-z0-9]/g);
  // reverse a copy of the cleaned string
  let reversed = [...cleaned].reverse();
  // join both arrays
  cleaned = cleaned.join("");
  reversed = reversed.join("");
  // logging
  console.log("entered:", `"${entered}"`);
  console.log("cleaned:", `"${cleaned}"`);
  console.log("reversed:", `"${reversed}"`);
  // compare the strings
  return true ? cleaned === reversed : false;
}

palindrome("not a palindrome");
