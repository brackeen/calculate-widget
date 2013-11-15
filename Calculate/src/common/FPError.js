/* 
 * Floating point precision fixer for simple addition, subtraction, and 
 * multiplication.
 * 
 * Could use real unit tests, but you can test in the widget by copying and 
 * pasting:
 
    0.1+0.2      == 0.3 &&
    1.25-1.245   == 0.005 &&
    1.1-1        == 0.1 &&
    1.1-1.05     == 0.05 &&
    1.1-1.005    == 0.095 &&
    1.1-1.0005   == 0.0995 &&
    1-3          == -2 &&
    1.1-1.01     == 0.09 &&
    1.1-1.001    == 0.099 &&
    1.1-1.0001   == 0.0999 &&
    1.1-1.00001  == 0.09999 &&
    1.05*7       == 7.35 &&
    1.1*7        == 7.7 &&
    true
*/
void function () {
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function precision(x) {
        return (x.toString().match(/\.\d+/) || ['0'])[0].length; 
    }

    function bestPrecision(x, y) {
        return Math.max(precision(x), precision(y));
    }
    
    Math.add = function(x, y) {
        if (isNumber(x) && isNumber(y)) {
            return parseFloat((x + y).toFixed(bestPrecision(x, y)));
        }
        else {
            return x + y;
        }
    };
    
    Math.sub = function(x, y) {
        if (isNumber(x) && isNumber(y)) {
            return parseFloat((x - y).toFixed(bestPrecision(x, y)));
        }
        else {
            return x - y;
        }
    };
    
    Math.mul = function(x, y) {
        if (isNumber(x) && isNumber(y)) {
            return parseFloat((x * y).toFixed(bestPrecision(x, y)));
        }
        else {
            return x * y;
        }
    };
}();