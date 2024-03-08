/*
 * 48-57 NUMEROS 10
 * 65-90 UPPERCASE 26
 * 97-122 LOWERCASE 26
 */
module.exports.generateToken = (lenght) => {
  let token = "";
  for (let i = 0; i < lenght; i++) {
    let rand = Math.round(Math.random() * 61) + 48;
    /* Salto */
    let idx = rand;
    if (rand > 57 && rand < 84) {
      idx += 7;
    } else if (rand >= 84) {
      idx += 13;
    }
    const character = String.fromCharCode(idx);
    token += character;
  }
  return token;
};

module.exports.generateTempToken = (lenght) => {
  const opts = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let token = "";
  for (let i = 0; i < lenght; i++) {
    const rand = Math.round(Math.random() * opts.length);
    token += opts[rand];
  }
  return token;
};
