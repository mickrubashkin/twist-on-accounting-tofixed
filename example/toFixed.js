function toFixed(number, precision) {

  // Check if number is not a number, and throw TypeError.
  if (isNaN(number)) {
    throw new TypeError(`toFixed() requires that number be a Number (${number} is not a number).`);
  }

  // Check if precision < 0 or precision > 100, and throw new RangeError.
  if (precision < 0 || precision > 100) {
    throw new RangeError('toFixed() digits argument must be between 0 and 100');
  }

  // Case1: Precision > fractionPart.len
  // with fraction (decimalIndex > 0)        | without fraction (decimalIndex === -1)
  // (42.52, 3)                              | (42, 3)
  // decimalIndex = 2                        | decimalIndex = -1
  // 1. digits(42.52) ==> '4252'             | digits(42) ==> '42'
  // 2. addZero('4252', 1) ==> '42520'       | addZero('42', 3) ==> '42000'
  // 3. SKIP addDecimal('42520') ==> '42520' | SKIP addDecimal('42000') ==> '42000'
  // 4. round('42520').toString() ==> '42520'| round('42000').toString() ==> '42000'
  // 5. addDecimal('42520', 2) ==> '42.520'  | addDecimal('42000', 2) ==> '42.000'

  // Case 2: Precision = fractionPart.len
  // with fraction (decimalIndex > 0)        | without fraction (decimalIndex === -1)
  // (42.52, 2)                              | (42, 0)
  // decimalIndex = 2                        | decimalIndex = -1
  // 1. digits(42.52) ==> '4252'             | digits(42) ==> '42'
  // 2. SKIP addZero('4252', 0) ==> '4252'   | SKIP addZero('42', 0) ==> '42'
  // 3. SKIP addDecimal('4252') ==> '4252'   | SKIP addDecimal('42') ==> '42'
  // 4. round('4252').toString() ==> '42520' | round('42').toString() ==> '42'
  // 5. addDecimal('4252', 2) ==> '42.52'    | SKIP addDecimal('42') ==> '42'

  // Case 3: Precision < fractionPart.len
  // with fraction (decimalIndex > 0)        | without fraction (decimalIndex === -1)
  // (42.52, 1)                              | SKIP impossible case
  // decimalIndex = 2
  // 1. digits(42.52) ==> '4252'
  // 2. SKIP addZero('4252', 0) ==> '4252'
  // 3. addDecimal('4252', 1) ==> '425.2'
  // 4. round('425.2').toString() ==> '425'
  // 5. addDecimal('425', 2) ==> '42.5'

  // precision < fractionPart.length && precision === 0
  // (1.5, 0)
  // 1. digits(1.5) ==> '15'
  // 2. SKIP addZero
  // 3. addDecimal('15', 1) ==> '1.5'
  // 4. round('1.5').toString() ==> '2'
  // 5. SKIP addDecimal

  var numberAsString = number.toString();
  var decimalIndex = numberAsString.indexOf('.');
  var result, holePart, fractionPart, digits, newDecimalIndex;

  if (decimalIndex === -1) {
    holePart = numberAsString;
    fractionPart = '';
  } else {
    holePart = numberAsString.substring(0, decimalIndex);
    fractionPart = numberAsString.substring(decimalIndex + 1);
  }

  // 1. Extract digits
  digits = numberAsString.replace(/\./, '');

  // 2. addZero
  if (precision > fractionPart.length) {
    for (var i = 0; i < precision - fractionPart.length; i++) {
      digits += '0';
    }
  }

  // 3. addDecimal
  if (precision < fractionPart.length) {
    newDecimalIndex = decimalIndex + precision;
    digits = digits.split('');
    digits.splice(newDecimalIndex, 0, '.');
    digits = digits.join('');
  }

  // 4. Math.round(digits).toString()
  result = Math.round(digits).toString();

  // 5. addDecimal()
  if (precision > fractionPart.length ||
    (precision === fractionPart.length && precision > 0) ||
    (precision < fractionPart.length && precision !== 0)) {

    if (holePart === '0') {
      result = result.replace(/\./, '');
      result = '0' + result;
    }

    result = result.split('');
    result.splice(holePart.length, 0, '.');
    result = result.join('');
  }

  return result;
}