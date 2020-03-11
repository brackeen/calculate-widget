if (typeof CalcWidget === "undefined" || !CalcWidget) {
    var CalcWidget = {};
}

/*
    Evaluate expressions in a "sandbox" so it doesn't have access to
    the private members of CalcWidget.Calc or CalcWidget.UI, and so the user can't
    override members of CalcWidget.Math.
*/
CalcWidget.evaluate = function(_expression, _answer, _convert) {

    // Global constants and functions
    // Reset each time so they can't be permanantly overridden
    var _pseudoGlobals = { };
    _pseudoGlobals["ans"] = _answer;
    try {
        // Unicode pi character (may not work on all JavaScript implementations)
        _pseudoGlobals["\u03c0"] = Math.PI;
    }
    catch (ex) { }

    // Setup in a separate function so the local variables aren't in this scope
    function _setup() {

        for (var i in CalcWidget.Math) {
            if (i.charAt(0) !== '_') {
                _pseudoGlobals[i] = CalcWidget.Math[i];
            }
        }

        if (_convert) {
            // Apply conversions.
            // a! -> factorial(a)
            // a^b -> pow(a,b)
            try {
                var input = new org.antlr.runtime.ANTLRStringStream(_expression);
                var lexer = new ECMAScript3ExtLexer(input);
                var tokens = new org.antlr.runtime.CommonTokenStream(lexer);
                var parser = new ECMAScript3ExtParser(tokens);
                var t = parser.program().getTree();
                var n = lexer.getNumberOfSyntaxErrors() + parser.getNumberOfSyntaxErrors();

                if (t != null && n == 0) {
                    var emitter = new ECMAScript3ExtEmitter();
                    emitter.includeWhitespace = false;
                    _expression = emitter.emit(t);
                    //CalcWidget.log("Converted to: " + _expression);
                }
            }
            catch (e) {
                //CalcWidget.log("ANTLR error: " + e.toString());
            }
        }
    }

    _setup();

    // Trick: Don't allow resetting of undefined
    var undefined;

    // Evaluate the expression
    with (_pseudoGlobals) {
        return eval(_expression);
    }
};

/**
    Math functions.
    These are always reset before expression evaluation, so they act like constants.
*/
CalcWidget.Math = {
    _angle: 1,

    // Constants
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
    cos:      function(x) {x *= CalcWidget.Math._angle;return Math.cos(x);},
    sin:      function(x) {x *= CalcWidget.Math._angle;return Math.sin(x);},
    tan:      function(x) {x *= CalcWidget.Math._angle;return Math.tan(x);},
    cot:      function(x) {x *= CalcWidget.Math._angle;return 1/Math.tan(x);},
    sec:      function(x) {x *= CalcWidget.Math._angle;return 1/Math.cos(x);},
    csc:      function(x) {x *= CalcWidget.Math._angle;return 1/Math.sin(x);},

    acos:     function(x) {return Math.acos(x) / CalcWidget.Math._angle;},
    asin:     function(x) {return Math.asin(x) / CalcWidget.Math._angle;},
    atan:     function(x) {return Math.atan(x) / CalcWidget.Math._angle;},
    atan2:    function(x,y) {return Math.atan2(x,y) / CalcWidget.Math._angle;},
    acot:     function(x) {return Math.atan(1/x) / CalcWidget.Math._angle;},
    asec:     function(x) {return Math.acos(1/x) / CalcWidget.Math._angle;},
    acsc:     function(x) {return Math.asin(1/x) / CalcWidget.Math._angle;},

    // Hyperbolic functions
    sinh:     function(x) {x *= CalcWidget.Math._angle;return (Math.exp(x)-Math.exp(-x))/2;},
    cosh:     function(x) {x *= CalcWidget.Math._angle;return (Math.exp(x)+Math.exp(-x))/2;},
    tanh:     function(x) {x *= CalcWidget.Math._angle;return this.sinh(x) / this.cosh(x);},
    coth:     function(x) {x *= CalcWidget.Math._angle;return 1 / this.tanh(x);},
    sech:     function(x) {x *= CalcWidget.Math._angle;return 1 / this.cosh(x);},
    csch:     function(x) {x *= CalcWidget.Math._angle;return 1 / this.sinh(x);},

    asinh:    function(x) {return Math.log(x+Math.sqrt(x*x+1)) / CalcWidget.Math._angle;},
    acosh:    function(x) {return Math.log(x+Math.sqrt(x*x-1)) / CalcWidget.Math._angle;},
    atanh:    function(x) {return 0.5*Math.log((1+x)/(1-x)) / CalcWidget.Math._angle;},
    acoth:    function(x) {return 0.5*Math.log((x+1)/(x-1)) / CalcWidget.Math._angle;},
    asech:    function(x) {return Math.log(1/x+Math.sqrt(1/(x*x)+1)) / CalcWidget.Math._angle;},
    acsch:    function(x) {return Math.log(1/x+Math.sqrt(1/(x*x)-1)) / CalcWidget.Math._angle;},

    // Factorial
    // Based on code from http://www.univie.ac.at/future.media/moe/JavaCalc/jcintro.html
    $loggamma: function(x) {
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
    },

    $gamma: function(x) {
        if (x <= 0) {
            if (Math.abs(x) - Math.floor(Math.abs(x)) === 0) {
                return Infinity;
            }
            else {
                return Math.PI / (Math.sin(Math.PI*x) * Math.exp(this.$loggamma(1-x)));
            }
        }
        else {
            return Math.exp(this.$loggamma(x));
        }
    },

    factorial: function(n) {
        if (n < 0) {
            return this.$gamma(n+1);
        }
        else if (n === 0 || n === 1) {
            return 1;
        }
        else if (Math.abs(n) - Math.floor(Math.abs(n)) === 0) {
            var result = 1;
            for (var i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        else {
            return this.$gamma(n+1);
        }
    }
};

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
        
        setAngleMode: function(v) {
            CalcWidget.Math._angle = (v !== 1) ? 1 : (Math.PI / 180);
        },
        
        applyExpression: function(expression) {
            if (typeof expression === "string") {
                try {
                    CalcWidget.evaluate(expression, 0, false);
                }
                catch (ex) {
                    // Do something?
                }
            }
        },

        calc: function(expression) {
            var answer;
            lastError = false;
            try {
                answer = CalcWidget.evaluate(expression, lastAnswer, true);
                if (typeof answer === "function") {
                    lastAnswer = answer;
                    answer = "Function defined";
                }
                else {
                    lastAnswer = answer;
                    answer = CalcWidget.valueToString(answer);
                }
            }
            catch (ex) {
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
