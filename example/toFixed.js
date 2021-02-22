function toFixed(number, precision) {
  // Figure out a way to work with the string "1.005"
  // Create a new string with the decimal point moved over two places to the right.
  // In other words, you need to turn "1.005" into "100.5" using string manipulation.
  // Include tests that cover the weird cases we saw in the video like 0.615, 10.235, and 1.005.

  // Check if number is not a number, and throw TypeError.
  if (isNaN(number)) {
    throw new TypeError(`toFixed() requires that number be a Number (${number} is not a number).`);
  }

  // Check if precision < 0 or precision > 100, and throw new RangeError. 
  if (precision < 0 || precision > 100) {
    throw new RangeError('toFixed() digits argument must be between 0 and 100');
  }

  var result = '';
  var numberAsString = number.toString();
  var decimalIndex = numberAsString.indexOf('.');
  var powedNumberAsString, holePart, fractionPart, digitsQuantity, newDecimalIndex;
  var zerosToAdd = '';

  if (decimalIndex === -1) {
    holePart = numberAsString;
    fractionPart = '';
  }

  holePart = numberAsString.substring(0, decimalIndex);
  fractionPart = numberAsString.substring(decimalIndex + 1);
  powedNumberAsString = holePart + fractionPart;

  // 1. Precision > fractionPart.len
  // (42.52, 3)
  // digitsQuantity = 4, decimalIndex = 2
  // 42.52 ==> 42520 (42520.0)
  // newQuantity = holePart.lenght + precision
  // number of zeros = precision - fractionPart.length
  // newDecimalIndex = -1 || undefined

  // 2. Precision = fractionPart.len
  // (42.52, 2)
  // digitsQuantity = 4, decimalIndex = 2
  // 42.52 ==> 4252
  // newDecimalIndex = -1 || undefined

  // 3. Precision < fractionPart.len
  // (42.52, 1)
  // digitsQuantity = 4, decimalIndex = 2
  // 42.52 ==> 425.2
  // newDecimalIndex = 3
  // newDecimalIndex = decimalIndex + precision (if decimalIndex)

  if (precision > fractionPart.length) {
    add0times = precision - fractionPart.length;

    for (var i = 0; i < precision - fractionPart.length; i++) {
      zerosToAdd += '0';
    }

    powedNumberAsString = holePart + fractionPart + zerosToAdd;
  }

  if (precision < fractionPart.length) {
    newDecimalIndex = decimalIndex + precision;
  }

  if (newDecimalIndex) {
    powedNumberAsString = powedNumberAsString.splice(newDecimalIndex, 0, '.');
  }

}