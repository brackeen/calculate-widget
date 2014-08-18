/* 
 * Floating point precision fixer.
 * 
 * Could use real unit tests, but you can test in the widget by copying and 
 * pasting:
 
 [
    Math.fixPrecision(0.1 + 0.2    ) == 0.3 ,
    Math.fixPrecision(1.25 - 1.245 ) == 0.005 ,
    Math.fixPrecision(1.1 - 1      ) == 0.1 ,
    Math.fixPrecision(1.1 - 1.05   ) == 0.05 ,
    Math.fixPrecision(1.1 - 1.005  ) == 0.095 ,
    Math.fixPrecision(1.1 - 1.0005 ) == 0.0995 ,
    Math.fixPrecision(1 - 3        ) == -2 ,
    Math.fixPrecision(1.1 - 1.01   ) == 0.09 ,
    Math.fixPrecision(1.1 - 1.001  ) == 0.099 ,
    Math.fixPrecision(1.1 - 1.0001 ) == 0.0999 ,
    Math.fixPrecision(1.1 - 1.00001) == 0.09999 ,
    Math.fixPrecision(1.05 * 7     ) == 7.35 ,
    Math.fixPrecision(1.1 * 7      ) == 7.7 ,
    Math.fixPrecision(10.35 / 3    ) == 3.45 ,
    Math.fixPrecision(5010-5000.94 ) == 9.06 ,
    Math.fixPrecision(100010-100000.94) == 9.06 ,
]
*/
void function () {
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function getSignificantDigits(n) {
        var s = Math.abs(n).toString().split("e")[0].split('.');
        
        // String before decimal. Remove leading zeroes
        var a = s[0].replace(/^0+/, '');
        // String after decimal. Remove trailing zeroes
        var b = s.length === 1 ? "" : s[1].replace(/0*$/, '');
        
        if (b.length === 0) {
            // Remove trailing zeroes
            return a.replace(/0*$/, '').length;
        }
        else if (a.length === 0) {
            // Remove leading zeroes
            return b.replace(/^0+/, '').length;
        }
        else {
            return a.length + b.length;
        }
    }

    Math.fixPrecision = function(n) {
        if (isNumber(n)) {
            var p = getSignificantDigits(n);
            // If the number has at least 13 significant digits, reduce to 9 significant digits.
            // If the resulting number has much less precision, then use it instead of the original number.
            if (p >= 13) {
                var n2 = parseFloat(n.toPrecision(9));
                if (getSignificantDigits(n2) < 9) {
                    n = n2;
                }
            }
        }
        return n;
    };
}();