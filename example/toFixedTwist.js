function toFixedTwist(number, precision) {
  
  if (isNaN(number)) {
    throw new TypeError(`toFixedTwist() requires that number be a Number (${number} is not a number).`);
  }

  if (precision < 0 || precision > 100) {
    throw new RangeError('toFixedTwist() digits argument must be between 0 and 100');
  }

  // Helper function
  function hasDigits(digits) { return digits.length > 0; }
  
  var result = '';

  // If precision === 0, just round number and return as string;
  if (precision === 0) {
    return (Math.round(number)).toString();
  }

  // Get integer and fractional parts, fractional digits
  var [integerPart, fractionalPart] = number.toString().split('.');
  fractionalPart = fractionalPart || '';
  var fractionalDigits = fractionalPart.split('');
  var powedNum = integerPart;
  var i = precision;

  // Move decimal right precision times, pad with '0' if needed
  while (i) {
    powedNum += hasDigits(fractionalDigits) ? fractionalDigits.shift() : '0';
    i--;
  }

  if (hasDigits(fractionalDigits)) {
    powedNum += '.' + fractionalDigits.join('');
  }

  // Add sign and leading zeros to the result
  i = 0;
  while (powedNum[i] === '-' || powedNum[i] === '0') {
    result += powedNum[i];
    i++;
  }

  // Round and add decimal
  var rounded = Math.abs(Math.round(powedNum)).toString();
  result += rounded;

  var digits = result.split('');
  digits.splice(-precision, 0, '.');
  result = digits.join('');

  return result;
}