const encodeString = (inputString) => {
  let outputString = '';
  let count = 1;

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === inputString[i+1]) {
      count++;
    } else {
      outputString += inputString[i] + count;
      count = 1;
    }
  }

  return outputString;
}

module.exports = function encoder (req, res) {
  const { stringToEncode } = req.body

  if (stringToEncode) {
    const encodedString = encodeString(stringToEncode);
    return res.send({ encodedString })
  }

  return res.status(404).send('String is required.')
}