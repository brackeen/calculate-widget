/* 
 * Floating point precision fixer.
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
