/**
 * Beast description from the curriculum.
 *
 * In AccountingJS 13, we looked at accounting.toFixed method.
 * We found that we could improve the function by simulating calculations
 * like 1.005 * 100 with 1.005e2 (using exponential notation).
 *
 * Your job is to rewrite accounting.toFixed so that it does NOT use multiplication or exponential notation.
 * Instead, you will actually move the decimal point using string manipulation.
 *
 * So in the example above, instead of using 1.005e2,
 * you'll need to figure out a way to work with the string "1.005"
 * and then create a new string with the decimal point moved over two places to the right.
 * In other words, you need to turn "1.005" into "100.5" using string manipulation.
 *
 * Include tests that cover the weird cases we saw in the video like 0.615, 10.235, and 1.005.
*/

/**
 * Original toFixed() from accounting.js
 *
  var toFixed = function (value, precision) {
    var power = Math.pow(10, precision);

    // Multiply up by precision, round accurately, then divide and use native toFixed():
    return (Math.round(value * power) / power).toFixed(precision);
  };
*/

/**
 * Better toFixed, using exponential notation.
 * From Watch-and-Code Premium curriculum, Acocuntin.js video 13: toFixed and rounding issues.
 */
// function betterToFixed(value, precision) {
//   var exponentialForm = Number(value + 'e' + precision);
//   var rounded = Math.round(exponentialForm);
//   var finalResult = Number(rounded + 'e-' + precision);
//   return finalResult.toFixed(precision);
// }


/**
 * Function purpose.
 *
 * Formats a number using fixed-point notation.
 * It treats floats like strings than binary,
 * fixing inconsistent precision rounding in JavaScript
 * (where some .05 values round up, while others round down, e.g. (0.615).toFixed(2) ===> "0.61").
*/

/**
 * Demo usage.
  toFixed(0.615, 2); // "0.62"
  toFixed(10.235, 2); // "10.24"
  toFixed(1.005, 2); // "1.01"
*/

(function() {
  // Implementation 2: uses regular expressions, and string manipulation.
  function toFixed(number, precision) {
    // Check if number is not a number, and throw TypeError.
    if (isNaN(number)) {
      throw new TypeError(`toFixed() requires that number be a Number (${number} is not a number).`);
    }

    // Check if 0 > precision > 100, and throw new RangeError. 
    if (precision < 0 || precision > 100) {
      throw new RangeError('toFixed() digits argument must be between 0 and 100');
    }

    // If precision === 0, just round and return.
    if (precision === 0) {
      return Math.round(number).toString();
    }

    var fixedNumber, matches, holePart, fractionPart, decimalIndex;

    // 1. toString()
    fixedNumber = number.toString();
    // Find decimal's position
    decimalIndex = fixedNumber.search(/\./);

    // Get hole and fraction parts
    if (decimalIndex === -1) {
      holePart = fixedNumber;
      fractionPart = '';
    } else {
      matches = fixedNumber.match(/(\d*(?=\.))\.(\d+)/);
      holePart = matches[1];
      fractionPart = matches[2];
    }

    // 2. Pad with zeros
    var numberOfZerosToPad = precision - fractionPart.length;

    while (numberOfZerosToPad > 0) {
      fixedNumber += '0';
      numberOfZerosToPad--;
    }

    // 3. Move decimal right
    fixedNumber = fixedNumber.replace(/\./, '');
    holePart = fixedNumber.substring(0, holePart.length + precision);
    fractionPart = fixedNumber.substring(holePart.length);
    fixedNumber = holePart + '.' + fractionPart;

    // 4. Round
    fixedNumber = Math.round(fixedNumber).toString();

    // 5. Put decimal back
    holePart = fixedNumber.substring(0, fixedNumber.length - precision);
    fractionPart = fixedNumber.substring(fixedNumber.length - precision);
    fixedNumber = holePart + '.' + fractionPart;

    if (fixedNumber[0] === '.') {
      fixedNumber = '0' + fixedNumber;
    }

    return fixedNumber;
  }

  window.toFixed = toFixed;
})();