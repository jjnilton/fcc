function telephoneCheck(str) {
  // check if the string matches one of these four expressions
  if (
    str.match(
      /^[0-9]{10}$|^(1 )?[0-9]{3}-[0-9]{3}-[0-9]{4}$|^(1 |1)?\([0-9]{3}\)( |)[0-9]{3}-[0-9]{4}$|^(1 )?[0-9]{3} [0-9]{3} [0-9]{4}$/g
    )
  ) {
    return true;
  } else {
    return false;
  }
}

telephoneCheck("555-555-5555");
