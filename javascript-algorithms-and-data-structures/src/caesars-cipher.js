function rot13(str) {
  let decryptedString = "";
  for (let char of str) {
    // checks if the character is between A and Z
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
      // subtracts the amount if char code + amount it needs to shift exceeds the limit
      if (char.charCodeAt(0) + 13 > 90) {
        decryptedString += String.fromCharCode(char.charCodeAt(0) - 13);
      } else {
        // adds the amount if char code does not exceed the limit
        decryptedString += String.fromCharCode(char.charCodeAt(0) + 13);
      }
    } else {
      // keep other characters
      decryptedString += char;
    }
  }
  console.log(decryptedString);
  return decryptedString;
}

rot13("SERR PBQR PNZC");
