(function () {
  // Helper object to hold all methods to use in 'chaining' style.
  var helper = {
    getDigits: function (number) {
      this.digits = number.toString().split('');
      return this;
    },

    padWithZeros: function (precision) {
      var numberOfDigitsToPad;
      var decimalIndex = this.digits.findIndex(function (el) {
        return el === '.';
      });

      if (decimalIndex === -1) {
        numberOfDigitsToPad = precision;
      } else {
        var fractionLength = this.digits.length - 1 - decimalIndex;
        numberOfDigitsToPad = precision - fractionLength;
      }

      while (numberOfDigitsToPad > 0) {
        this.digits.push('0');
        numberOfDigitsToPad--;
      }

      return this;
    },

    moveDecimalRight: function (numberOfSteps) {
      var decimalIndex = this.digits.findIndex(function (el) {
        return el === '.';
      });

      if (decimalIndex !== -1) {
        this.digits.splice(decimalIndex, 1);
        this.digits.splice(decimalIndex + numberOfSteps, 0, '.');
      }

      if (this.digits[this.digits.length - 1] === '.') {
        this.digits.pop();
      }

      return this;
    },

    putDecimal: function (numberOfSteps) {
      if (numberOfSteps) {
        this.digits.splice(-numberOfSteps, 0, '.');
      }

      if (this.digits[0] === '.') {
        this.digits.unshift('0');
      }

      return this;
    },

    round: function () {
      var number = this.digits.join('');
      var rounded = Math.round(number);
      this.digits = rounded.toString().split('');

      return this;
    },

    getResult: function () {
      return this.digits.join('');
    }
  };

  // Implementation 1: uses method chaining and array manipulation.
  function toFixed(number, precision) {
    // Check if number is not a number, and throw TypeError.
    if (isNaN(number)) {
      throw new TypeError(`toFixed() requires that number be a Number (${number} is not a number).`);
    }

    // Check if 0 > precision > 100, and throw new RangeError. 
    if (precision < 0 || precision > 100) {
      throw new RangeError('toFixed() digits argument must be between 0 and 100');
    }

    var fixedNumber = helper.getDigits(number).
      padWithZeros(precision).
      moveDecimalRight(precision).
      round().
      putDecimal(precision).
      getResult();

    return fixedNumber;
  }

  window.toFixedWithChaining = toFixed;
})();