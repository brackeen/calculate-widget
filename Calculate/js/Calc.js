if (typeof CalcWidget === "undefined" || !CalcWidget) {
    var CalcWidget = {};
}

CalcWidget.angleScale = 1

CalcWidget.evaluate = function(__input__, ans) {
    // Wrap in anonymous function so "this" is the global object, not CalcWidget
    return function() {
       with (CalcWidget.Math) {
           return eval(__input__)
       }
    }();
};

/**
    Math functions.
*/
CalcWidget.Math = Object.freeze({
    // Constants
    \u03c0:   Math.PI,
    pi:       Math.PI,
    e:        Math.E,

    // Constants in case user likes the JavaScript Math class.
    PI:       Math.PI,
    E:        Math.E,

    // Basic Math
    abs:      Math.abs,
    ceil:     Math.ceil,
    floor:    Math.floor,
    max:      Math.max,
    min:      Math.min,
    pow:      Math.pow,
    random:   Math.random,
    round:    Math.round,
    sqrt:     Math.sqrt,

    // Bitwise
    // Because ^ is used as power, and having the emitter convert to ^ would
    // be confusing for people who expect that to be the power operator.
    xor:    function(a,b) { return a ^ b; },

    // Log functions
    exp:      Math.exp,
    log:      Math.log,
    ln:       Math.log,
    log10:    function(x) {return Math.log(x) / Math.log(10);},
    log2:     function(x) {return Math.log(x) / Math.log(2);},

    // Trig
    cos:      function(x) {x *= CalcWidget.angleScale;return Math.cos(x);},
    sin:      function(x) {x *= CalcWidget.angleScale;return Math.sin(x);},
    tan:      function(x) {x *= CalcWidget.angleScale;return Math.tan(x);},
    cot:      function(x) {x *= CalcWidget.angleScale;return 1/Math.tan(x);},
    sec:      function(x) {x *= CalcWidget.angleScale;return 1/Math.cos(x);},
    csc:      function(x) {x *= CalcWidget.angleScale;return 1/Math.sin(x);},

    acos:     function(x) {return Math.acos(x) / CalcWidget.angleScale;},
    asin:     function(x) {return Math.asin(x) / CalcWidget.angleScale;},
    atan:     function(x) {return Math.atan(x) / CalcWidget.angleScale;},
    atan2:    function(x,y) {return Math.atan2(x,y) / CalcWidget.angleScale;},
    acot:     function(x) {return Math.atan(1/x) / CalcWidget.angleScale;},
    asec:     function(x) {return Math.acos(1/x) / CalcWidget.angleScale;},
    acsc:     function(x) {return Math.asin(1/x) / CalcWidget.angleScale;},

    // Hyperbolic functions
    sinh:     function(x) {x *= CalcWidget.angleScale;return (Math.exp(x)-Math.exp(-x))/2;},
    cosh:     function(x) {x *= CalcWidget.angleScale;return (Math.exp(x)+Math.exp(-x))/2;},
    tanh:     function(x) {x *= CalcWidget.angleScale;return this.sinh(x) / this.cosh(x);},
    coth:     function(x) {x *= CalcWidget.angleScale;return 1 / this.tanh(x);},
    sech:     function(x) {x *= CalcWidget.angleScale;return 1 / this.cosh(x);},
    csch:     function(x) {x *= CalcWidget.angleScale;return 1 / this.sinh(x);},

    asinh:    function(x) {return Math.log(x+Math.sqrt(x*x+1)) / CalcWidget.angleScale;},
    acosh:    function(x) {return Math.log(x+Math.sqrt(x*x-1)) / CalcWidget.angleScale;},
    atanh:    function(x) {return 0.5*Math.log((1+x)/(1-x)) / CalcWidget.angleScale;},
    acoth:    function(x) {return 0.5*Math.log((x+1)/(x-1)) / CalcWidget.angleScale;},
    asech:    function(x) {return Math.log(1/x+Math.sqrt(1/(x*x)+1)) / CalcWidget.angleScale;},
    acsch:    function(x) {return Math.log(1/x+Math.sqrt(1/(x*x)-1)) / CalcWidget.angleScale;},
    
    factorial: function(n) {
        // Factorial based on code from http://www.univie.ac.at/future.media/moe/JavaCalc/jcintro.html
        
        function loggamma(x) {
            var v = 1;
            while (x < 8) {
                v*=x;
                x++;
            }
            var w = 1/(x*x);
            return ((((((((-3617/122400)*w + 7/1092)*w
                -691/360360)*w + 5/5940)*w
                -1/1680)*w + 1/1260)*w
                -1/360)*w + 1/12)/x + 0.5 * Math.log(2*Math.PI) -
                Math.log(v)-x+(x-0.5)*Math.log(x);
        }
        
        function gamma(x) {
            if (x <= 0) {
                if (Math.abs(x) - Math.floor(Math.abs(x)) === 0) {
                    return Infinity;
                } else {
                    return Math.PI / (Math.sin(Math.PI*x) * Math.exp(loggamma(1-x)));
                }
            } else {
                return Math.exp(loggamma(x));
            }
        }
        
        if (n < 0) {
            return gamma(n+1);
        } else if (n === 0 || n === 1) {
            return 1;
        } else if (Math.abs(n) - Math.floor(Math.abs(n)) === 0) {
            var result = 1;
            for (var i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        } else {
            return gamma(n+1);
        }
    }
});

CalcWidget.Calc = (function() {

    // Private

    var lastAnswer = 0;
    var lastError = false;

    var knownMembers = [];

    function init() {
        // List of known variables at startup. Other variables will be considered "user variables"
        for (var i in globalThis) {
            if (globalThis.hasOwnProperty(i)) {
                knownMembers.push(i);
            }
        }
    }

    // Constructor
    init();

    // Public methods

    return {

        getLastAnswer: function() {
            return lastAnswer;
        },

        getUserVars: function() {
            var userVars = [];

            for (var i in globalThis) {
                if (globalThis.hasOwnProperty(i)) {
                    var isKnown = false;
                    for (var j in knownMembers) {
                        if (i === knownMembers[j]) {
                            isKnown = true;
                            break;
                        }
                    }
                    if (!isKnown) {
                        userVars.push(i);
                    }
                }
            }

            return userVars;
        },

        getMemory: function() {
            var userVars = CalcWidget.Calc.getUserVars();
            var memory = "";
            for (var i in userVars) {
                if (userVars.hasOwnProperty(i)) {
                    var name = userVars[i];
                    if (globalThis[name] !== undefined) {
                        var value = globalThis[name];
                        if (typeof globalThis[name] !== "function") {
                            value = CalcWidget.valueToString(globalThis[name]);
                        }

                        memory += name + "=" + value + ";";
                    }
                }
            }
            memory = memory.replace(/\n/g, ' ');
            return memory
        },

        clearUserVars: function() {
            lastAnswer = 0;
            lastError = false;

            var userVars = CalcWidget.Calc.getUserVars();
            for (var i in userVars) {
                if (userVars.hasOwnProperty(i)) {
                    var name = userVars[i];
                    try {
                        eval("delete " + name);
                    }
                    catch (ex) {
                        // Ignore
                    }
                }
            }
        },
        
        getPossibleCompletions: function() {
            var possibleCompletions = CalcWidget.Calc.getUserVars();
            for (var i in CalcWidget.Math) {
                if (i.charAt(0) !== '_') {
                    possibleCompletions.push(i);
                }
            }
            possibleCompletions.push("ans");
            return possibleCompletions;
        },
        
        setAngleMode: function(v) {
            CalcWidget.angleScale = (v !== 1) ? 1 : (Math.PI / 180);
        },
        
        applyExpression: function(expression) {
            if (typeof expression === "string") {
                try {
                    CalcWidget.evaluate(expression, 0);
                } catch (ex) {
                    // Do something?
                }
            }
        },

        calc: function(expression) {
            var answer;
            lastError = false;
                                                      
            // Apply conversions.
            // a! -> factorial(a)
            // a^b -> pow(a,b)
            try {
                var input = new org.antlr.runtime.ANTLRStringStream(expression);
                var lexer = new ECMAScript3ExtLexer(input);
                var tokens = new org.antlr.runtime.CommonTokenStream(lexer);
                var parser = new ECMAScript3ExtParser(tokens);
                var t = parser.program().getTree();
                var n = lexer.getNumberOfSyntaxErrors() + parser.getNumberOfSyntaxErrors();

                if (t != null && n == 0) {
                    var emitter = new ECMAScript3ExtEmitter();
                    emitter.includeWhitespace = false;
                    expression = emitter.emit(t);
                    //CalcWidget.log("Converted to: " + expression);
                }
            } catch (e) {
                //CalcWidget.log("ANTLR error: " + e.toString());
            }
        
            try {
                answer = CalcWidget.evaluate(expression, lastAnswer);
                if (typeof answer === "function") {
                    lastAnswer = answer;
                    answer = "Function defined";
                } else {
                    lastAnswer = answer;
                    answer = CalcWidget.valueToString(answer);
                }
            } catch (ex) {
                answer = ex;
                lastError = true;
            }

            return answer;
        },

        // Returns true if the last calculation in calc() resulted in an error
        wasError: function() {
            return lastError;
        }
    };
})();
