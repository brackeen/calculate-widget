if (typeof Calculate === "undefined" || !Calculate) {
    var Calculate = {};
}

Calculate.angleScale = 1;

Calculate.evaluate = function(__input__, ans) {
    // Wrap in anonymous function so "this" is the global object, not Calculate
    return (function() {
        with (Calculate.Math) {
            return eval(__input__);
        }
    })();
};

/**
    Math functions.
*/
Calculate.Math = Object.freeze({
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
    xor:      function(a,b) { return a ^ b; },

    // Log functions
    exp:      Math.exp,
    log:      Math.log,
    ln:       Math.log,
    log10:    function(x) { return Math.log(x) / Math.log(10); },
    log2:     function(x) { return Math.log(x) / Math.log(2); },

    // Trig
    cos:      function(x) { x *= Calculate.angleScale; return Math.cos(x); },
    sin:      function(x) { x *= Calculate.angleScale; return Math.sin(x); },
    tan:      function(x) { x *= Calculate.angleScale; return Math.tan(x); },
    cot:      function(x) { x *= Calculate.angleScale; return 1 / Math.tan(x); },
    sec:      function(x) { x *= Calculate.angleScale; return 1 / Math.cos(x); },
    csc:      function(x) { x *= Calculate.angleScale; return 1 / Math.sin(x); },

    acos:     function(x) { return Math.acos(x) / Calculate.angleScale; },
    asin:     function(x) { return Math.asin(x) / Calculate.angleScale; },
    atan:     function(x) { return Math.atan(x) / Calculate.angleScale; },
    atan2:    function(y, x) { return Math.atan2(y, x) / Calculate.angleScale; },
    acot:     function(x) { return Math.atan(1 / x) / Calculate.angleScale; },
    asec:     function(x) { return Math.acos(1 / x) / Calculate.angleScale; },
    acsc:     function(x) { return Math.asin(1 / x) / Calculate.angleScale; },

    // Hyperbolic functions
    sinh:     function(x) { x *= Calculate.angleScale; return (Math.exp(x) - Math.exp(-x)) / 2; },
    cosh:     function(x) { x *= Calculate.angleScale; return (Math.exp(x) + Math.exp(-x)) / 2; },
    tanh:     function(x) { x *= Calculate.angleScale; return this.sinh(x) / this.cosh(x); },
    coth:     function(x) { x *= Calculate.angleScale; return 1 / this.tanh(x); },
    sech:     function(x) { x *= Calculate.angleScale; return 1 / this.cosh(x); },
    csch:     function(x) { x *= Calculate.angleScale; return 1 / this.sinh(x); },

    asinh:    function(x) { return Math.log(x + Math.sqrt(x * x + 1)) / Calculate.angleScale; },
    acosh:    function(x) { return Math.log(x + Math.sqrt(x * x - 1)) / Calculate.angleScale; },
    atanh:    function(x) { return 0.5 * Math.log((1 + x) / (1 - x)) / Calculate.angleScale; },
    acoth:    function(x) { return 0.5 * Math.log((x + 1) / (x - 1)) / Calculate.angleScale; },
    asech:    function(x) { return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1)) / Calculate.angleScale; },
    acsch:    function(x) { return Math.log(1 / x + Math.sqrt(1 / (x * x) - 1)) / Calculate.angleScale; },
    
    factorial: function(n) {
        // Factorial based on code from http://www.univie.ac.at/future.media/moe/JavaCalc/jcintro.html

        function loggamma(x) {
            let v = 1;
            while (x < 8) {
                v *= x;
                x++;
            }
            let w = 1 / (x * x);
            return ((((((((-3617 / 122400) * w + 7 / 1092) * w
                -691 / 360360) * w + 5 / 5940) * w
                -1 / 1680) * w + 1 / 1260) * w
                -1 / 360) * w + 1 / 12) / x + 0.5 * Math.log(2 * Math.PI) -
                Math.log(v) - x + (x - 0.5) * Math.log(x);
        }

        function gamma(x) {
            if (x <= 0) {
                if (Math.abs(x) - Math.floor(Math.abs(x)) === 0) {
                    return Infinity;
                } else {
                    return Math.PI / (Math.sin(Math.PI * x) * Math.exp(loggamma(1 - x)));
                }
            } else {
                return Math.exp(loggamma(x));
            }
        }

        if (n < 0) {
            return gamma(n + 1);
        } else if (n === 0 || n === 1) {
            return 1;
        } else if (Math.abs(n) - Math.floor(Math.abs(n)) === 0) {
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        } else {
            return gamma(n + 1);
        }
    }
});

Object.assign(Calculate, (function() {
    // Private

    var lastAnswer = 0;
    var lastError = false;

    var knownMembers = [];

    // List of known variables at startup. Other variables will be considered "user variables"
    for (const i in globalThis) {
        if (globalThis.hasOwnProperty(i)) {
            knownMembers.push(i);
        }
    }

    // Public methods

    return {
        getLastAnswer: function() {
            return lastAnswer;
        },

        getUserVars: function() {
            var userVars = [];

            for (const i in globalThis) {
                if (globalThis.hasOwnProperty(i)) {
                    var isKnown = false;
                    for (const j in knownMembers) {
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

        // Returns an array of tuples, like: [[name, value], [name, value]]
        getMemoryVars: function() {
            const userVars = Calculate.getUserVars();
            let memory = [];
            for (const i in userVars) {
                if (userVars.hasOwnProperty(i)) {
                    const name = userVars[i];
                    const value = globalThis[name];
                    if (!Calculate.isNativeFunction(value)) {
                        memory.push([name, Calculate.valueToString(value)])
                    }
                }
            }
            return memory;
        },

        clearUserVars: function() {
            lastAnswer = 0;
            lastError = false;

            const userVars = Calculate.getUserVars();
            for (const i in userVars) {
                if (userVars.hasOwnProperty(i)) {
                    const name = userVars[i];
                    try {
                        delete name;
                    } catch (ex) {
                        // Ignore
                    }
                }
            }
        },

        getPossibleCompletions: function() {
            const possibleCompletions = Calculate.getUserVars();
            for (const i in Calculate.Math) {
                if (Calculate.Math.hasOwnProperty(i)) {
                    possibleCompletions.push(i);
                }
            }
            possibleCompletions.push("ans");
            return possibleCompletions;
        },

        setAngleMode: function(v) {
            Calculate.angleScale = (v !== 1) ? 1 : (Math.PI / 180);
        },

        applyMemoryVar: function(name, value) {
            if (typeof name === "string" && typeof value == "string") {
                Calculate.evaluate(name + "=" + value, 0);
            }
        },

        calc: function(expression) {
            let answer;
            lastError = false;

            // Apply conversions.
            // a! -> factorial(a)
            // a^b -> pow(a,b)
            try {
                const input = new org.antlr.runtime.ANTLRStringStream(expression);
                const lexer = new ECMAScript3ExtLexer(input);
                const tokens = new org.antlr.runtime.CommonTokenStream(lexer);
                const parser = new ECMAScript3ExtParser(tokens);
                const t = parser.program().getTree();
                const n = lexer.getNumberOfSyntaxErrors() + parser.getNumberOfSyntaxErrors();

                if (t != null && n == 0) {
                    const emitter = new ECMAScript3ExtEmitter();
                    emitter.includeWhitespace = false;
                    expression = emitter.emit(t);
                    //Calculate.log("Converted to: " + expression);
                }

                answer = Calculate.evaluate(expression, lastAnswer);
                if (typeof answer === "function") {
                    lastAnswer = answer;
                    answer = "Function defined";
                } else {
                    lastAnswer = answer;
                    answer = Calculate.valueToString(answer);
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
})());
