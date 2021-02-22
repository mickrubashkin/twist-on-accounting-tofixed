function toFixed(number, precision) {

  // Check if number is not a number, and throw TypeError.
  if (isNaN(number)) {
    throw new TypeError(`toFixed() requires that number be a Number (${number} is not a number).`);
  }

  // Check if precision < 0 or precision > 100, and throw new RangeError.
  if (precision < 0 || precision > 100) {
    throw new RangeError('toFixed() digits argument must be between 0 and 100');
  }

  // Coerce number to string, get decimal index
  var numberAsString = number.toString();
  var decimalIndex = numberAsString.indexOf('.');
  
  var result, holePart, fractionPart, newDecimalIndex;

  // Get number's holePart, fractionPart
  if (decimalIndex === -1) {
    holePart = numberAsString;
    fractionPart = '';
  } else {
    holePart = numberAsString.substring(0, decimalIndex);
    fractionPart = numberAsString.substring(decimalIndex + 1);
  }

  // Get digits without decimal
  result = numberAsString.replace(/\./, '');

  // Add zeros to the end of the string if needed
  if (precision > fractionPart.length) {
    for (var i = 0; i < precision - fractionPart.length; i++) {
      result += '0';
    }
  }

  // Add '.' if needed
  if (precision < fractionPart.length) {
    newDecimalIndex = decimalIndex + precision;
    result = result.split('');
    result.splice(newDecimalIndex, 0, '.');
    result = result.join('');
  }

  // Round result, coerce to string
  result = Math.round(result).toString();

  // Add zeros to the beginning of the string if needed
  if (holePart === '0' && precision !== 0) {
    result = result.replace(/\./, '');
    result = '0' + result;
  }

  // Add '.' if needed
  if (precision > 0) {
    result = result.split('');
    result.splice(holePart.length, 0, '.');
    result = result.join('');
  }

  return result;
}