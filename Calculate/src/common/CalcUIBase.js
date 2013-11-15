if (typeof CalcWidget === "undefined" || !CalcWidget) {
    var CalcWidget = {};
}

CalcWidget.UI = (function() {

    // Private variables
    var defaultText = "1+1";
    var maxOutputLines = 100;
    var even = true;
    var nextID = 0;
    var firstMouseUp = true;
    var autoCompleteTimerID = null;
    var completions = null;
    var completionWordStart = 0;
    var firstKey = true;

    function isUnicode() {
        try {
            eval("var \u03c0 = Math.PI");
            return true;
        }
        catch (ex) {
            return false;
        }
    }

    // Help text
    var helpHTML =
        '<b>Calculate</b> is a math expression calculator with persistent memory ' +
        'for variables and functions. Nearly any JavaScript expression can be evaluated.' +

        '<div class="helpHeader">Samples</div>' +
        '<div class="input">2+2</div>' +
        '<div class="answer">4</div>' +
        '<div class="input">2^8</div>' +
        '<div class="answer">256</div>' +
        '<div class="input">(1+sqrt(5))/2</div>' +
        '<div class="answer">1.618033988749895</div>' +
        '<div class="input">r=1/2</div>' +
        '<div class="answer">0.5</div>' +
        '<div class="input">2*pi*r</div>' +
        '<div class="answer">3.141592653589793</div>' +
        '<div class="input">cos(ans)</div>' +
        '<div class="answer">-1</div>' +
        '<div class="input">sqr = function(x) { return x*x }</div>' +
        '<div class="answer">Function defined</div>' +
        '<div class="input">sqr(3)</div>' +
        '<div class="answer">9</div>' +

        '<div class="helpHeader">Previous answer</div>' +
        "ans" +
        
        '<div class="helpHeader">Constants</div>' +
        "pi, e" +

        '<div class="helpHeader">Basic functions</div>' +
        "sqrt pow abs round floor ceil min max random" +

        '<div class="helpHeader">Log functions</div>' +
        "exp ln log2 log10" +

        '<div class="helpHeader">Trig functions</div>' +
        "sin cos tan csc sec cot<br/>" +
        "asin acos atan atan2 acsc asec acot" +

        '<div class="helpHeader">Hyperbolic functions</div>' +
        "sinh cosh tanh csch sech coth<br/>" +
        "asinh acosh atanh acsch asech acoth" +

        '<div class="helpHeader">More info</div>' +
        '<ul>' +
        '<li>Typing an operator (+, -, *, /, %) on an empty line automatically inserts ' +
        '"ans" before it. So typing "+1" expands to "ans+1".</li>' +
        '<li>Click the <b>C</b> button to clear the output window.</li>' +
        '<li>Click the <b>M</b> button to view the list of all constants, ' +
            'variables, and functions.</li>' +
        '<li>To delete a variable or function by name, enter "delete <i>name</i>".</li>' +
        (window.widget ?
            '<li>For more info, <span style="text-decoration: underline;cursor: pointer;" onclick="widget.openURL(\'http://www.brackeen.com/calculate/\');">visit the Calculate home page</span>.</li>' :
            '<li>For more info, <a  style="color:black" href="http://www.brackeen.com/calculate/">visit the Calculate home page</a>.</li>' ) +
        '</ul>' +

        '<div class="helpHeader">Shortcuts</div>' +
        '<table>' +
        '<tr><td>Up/Down</td><td>Browse history</td></tr>' +
        '<tr><td>Tab</td><td>Show autocompletions (type the first few letters of a ' +
        'variable name or function name, then press Tab)</td></tr>' +
                '<tr><td>&#x2318;C</td><td>Copy last answer</td></tr>' +
        '<tr><td>&#x2318;K</td><td>Clear output window</td></tr>' +
        '<tr><td>&#x2318;M</td><td>Show memory</td></tr>' +
        '<tr><td>&#x2318;Up</td><td>Scroll up</td></tr>' +
        '<tr><td>&#x2318;Down</td><td>Scroll down</td></tr>' +
        '</table>';

    // Private methods

    function outputHTML(html) {
        var output = document.getElementById('output');
        var id = "output" + nextID;

        output.innerHTML +=
            '<div id="' + id + '" class="' + (even?'even':'odd') + '">' +
            html + '</div>';
        even = !even;
        nextID++;

        // Trim output
        while (output.childNodes.length > maxOutputLines) {
            var node = output.childNodes[0];
            output.removeChild(node);
        }

        // Scroll to output
        CalcWidget.UI.refreshScrollArea();
        CalcWidget.UI.scrollTo(document.getElementById(id));
    }

    // Public methods

   return {

        scrollTo: function(element) {
            CalcWidget.log("scrollTo(element) not implemented");
        },

        scrollUp: function() {
            CalcWidget.log("scrollUp() not implemented");
        },

        scrollDown: function() {
            CalcWidget.log("scrollDown() not implemented");
        },

        scrollPageUp: function() {
            CalcWidget.log("scrollPageUp() not implemented");
        },

        scrollPageDown: function() {
            CalcWidget.log("scrollPageDown() not implemented");
        },

        scrollHome: function() {
            CalcWidget.log("scrollHome() not implemented");
        },

        scrollEnd: function() {
            CalcWidget.log("scrollEnd() not implemented");
        },

        refreshScrollArea: function() {
            // Do nothing
        },

        setAngleMode: function(v) {
            if (v === undefined) {
                v = "0";
            }
            CalcWidget.Math._angle = (v!=="1")?1:(Math.PI/180);
            CalcWidget.setPref("anglemode", v);
        },

        onLoad: function() {
            CalcWidget.UI.onLoadInternal();
        },

        onLoadInternal: function() {

            // Load angle mode option
            var v = CalcWidget.pref("anglemode");
            if (v === undefined) {
                v = "0";
            }
            CalcWidget.Math._angle = (v!=="1")?1:(Math.PI/180);
            document.getElementById('anglemode').value = v;
         
            // Restore dimensions
            var width = CalcWidget.pref("width");
            var height = CalcWidget.pref("height");
            if (width && height) {
                window.resizeTo(width, height);
            }

            firstMouseUp = true;

            document.addEventListener("mouseup", function(event) {
                if (window.getSelection().toString() === "") {
                    var edit = document.getElementById('edit');
                    edit.focus();
                    if (firstMouseUp) {
                        firstMouseUp = false;
                        edit.select();
                    }
                }
            }, true);

            var edit = document.getElementById('edit');
            edit.value = defaultText;
            edit.focus();
            edit.select();
            
            document.oncopy = function(event) {
                var selection = window.getSelection().toString();
                if (selection.length === 0) {
                    // No selection - copy last answer
                    var lastAnswer = CalcWidget.valueToString(CalcWidget.Calc.getLastAnswer());
                    event.clipboardData.setData("Text", lastAnswer);
                    event.preventDefault();
                }
                event.stopPropagation();
            };
        },

        showBack: function() {
            var front = document.getElementById("front");
            var back = document.getElementById("back");

            if (window.widget) {
                window.widget.prepareForTransition("ToBack");
            }

            front.style.display = "none";
            back.style.display = "block";

            if (window.widget) {
                setTimeout("window.widget.performTransition();", 0);
            }
        },

        showFront: function() {
            var front = document.getElementById("front");
            var back = document.getElementById("back");

            if (window.widget) {
                window.widget.prepareForTransition("ToFront");
            }

            front.style.display="block";
            back.style.display="none";

            if (window.widget) {
                window.setTimeout("window.widget.performTransition();", 0);
            }
            var edit = document.getElementById('edit');
            edit.focus();
        },

        clearOutput: function() {
            var output = document.getElementById('output');
            output.innerHTML = "";
            even = true;
            CalcWidget.UI.refreshScrollArea();
        },

        showHelp: function() {
            outputHTML('<div class="help">' + helpHTML + '</div>');
        },

        showMemory: function() {
            var userVars = CalcWidget.Calc.getUserVars();
            var html =
                '<div class="memory"><b>pi</b> = ' + Math.PI + "</div>" +
                '<div class="memory"><b>e</b> = ' + Math.E + "</div>" +
                '<div class="memory"><b>ans</b> = ' + CalcWidget.Calc.getLastAnswer() + "</div>";

            for (var i in userVars) {
                if (userVars.hasOwnProperty(i)) {
                    var name = userVars[i];
                    var value = window[name];
                    if (typeof window[name] !== "function") {
                        value = CalcWidget.valueToString(window[name]);
                    }
                    html += '<div class="memory"><b>' + name + "</b> = " + value + "</div>";
                }
            }

            outputHTML('<div class="help">' + html + '</div>');
        },

        clearMemory: function() {
            CalcWidget.Calc.clearUserVars();
            CalcWidget.Calc.clearHistory();

            var html = "Memory Cleared";
            outputHTML('<div class="help">' + html + '</div>');
        },

        focusTextField: function() {
            var edit = document.getElementById('edit');
            edit.focus();
        },

        keyPress: function(event) {
            var ch = String.fromCharCode(event.charCode || event.keyCode);

        },

        keyDown: function(event) {
            var tab = "U+0009";
            var edit = document.getElementById('edit');
            var ch = String.fromCharCode(event.charCode);
            //var hadCompletions = (completions !== null);

            if (autoCompleteTimerID !== null) {
                clearTimeout(autoCompleteTimerID);
                autoCompleteTimerID = null;
            }

            if (event.keyIdentifier !== tab) {
                completions = null;
            }

            // History browsing
            if (!event.metaKey && event.keyIdentifier === "Up") {
                var prev = CalcWidget.Calc.getHistoryPrev();
                if (prev !== null) {
                    edit.value = prev;
                    edit.selectionStart = edit.value.length;
                }
            }
            else if (!event.metaKey && event.keyIdentifier === "Down") {
                var next = CalcWidget.Calc.getHistoryNext();
                edit.value = next;
                edit.selectionStart = edit.value.length;
            }

            else if (event.metaKey && event.keyIdentifier === "Up") {
                CalcWidget.UI.scrollUp();
            }
            else if (event.metaKey && event.keyIdentifier === "Down") {
                CalcWidget.UI.scrollDown();
            }
            else if (event.keyIdentifier === "PageUp") {
                CalcWidget.UI.scrollPageUp();
            }
            else if (event.keyIdentifier === "PageDown") {
                CalcWidget.UI.scrollPageDown();
            }
            else if (event.metaKey && event.keyIdentifier === "Home") {
                CalcWidget.UI.scrollHome();
            }
            else if (event.metaKey && event.keyIdentifier === "End") {
                CalcWidget.UI.scrollEnd();
            }

            // Clear key
            else if (event.keyCode === 12) {
                edit.value = "";
                //firstKey = true;

                // Hack: copy-n-pasted code
                if (autoCompleteTimerID !== null) {
                    clearTimeout(autoCompleteTimerID);
                    autoCompleteTimerID = null;
                }

                completions = null;
            }

            // First key handling
            else if (firstKey && edit.value === "" &&
                (ch === '+' || ch === '-' || ch === "*" || ch === "/" || ch === "%" || ch === "&" || ch === "|" || ch === "^")) {
                edit.value = "ans" + ch;
                edit.selectionStart = edit.value.length;
                firstKey = false;
            }

            // Enter expression
            else if (event.keyIdentifier === "Enter") {

                var addToHistory = true;

                if (edit.value === "") {
                    // Use last expression
                    var prevExpression = CalcWidget.Calc.getHistoryPrev();
                    if (prevExpression !== null) {
                        edit.value = prevExpression;
                        addToHistory = false;
                    }
                }

                if (edit.value !== "") {
                    // Calculate
                    var expression = edit.value;
                    var result = CalcWidget.Calc.calc(expression, addToHistory);
                    edit.value = "";
                    firstKey = true;

                    // Output results.
                    var resultClass = CalcWidget.Calc.wasError()?"error":"answer";
                    outputHTML("<div class='input'>" + expression + "</div>" +
                        "<div class='" + resultClass + "'>" + result + "</div>");
                }
            }

            // Toggle completions
            else if (event.keyIdentifier === tab) {
                edit.focus();

                if (completions !== null && completions.length > 1) {
                    var lastCompletion = edit.value.substr(completionWordStart);
                    var offset = (event.shiftKey?completions.length-1:1);
                    for (var i = 0; i < completions.length; i++) {
                        if (lastCompletion === completions[i]) {
                            var s = edit.selectionStart;
                            var j = (i+offset) % completions.length;
                            edit.value = edit.value.substr(0, completionWordStart) +
                                completions[j];
                            break;
                        }
                    }
                }

                if (completions === null) {
                    CalcWidget.UI.autoComplete();
                }
            }

            // Hotkey: clear
            else if (ch === 'k' && event.metaKey) {
                CalcWidget.UI.clearOutput();
            }

            // Hotkey: show mem
            else if (ch === 'm' && event.metaKey) {
                CalcWidget.UI.showMemory();
            }

            // Complete with '('
            // Disabled because it wouldn't allow user to type "a()"
            //else if (hadCompletions && ch == '(') {
            //    edit.value = edit.value + "()";
            //    edit.selectionStart = edit.value.length - 1;
            //    edit.selectionEnd = edit.value.length - 1;
            //}

            // Convert european numpad ',' to '.' (3 == numpad)
            else if (ch === ',' && event.keyLocation === 3) {
                CalcWidget.UI.replaceSelection('.');
            }

            // Normal key handling
            else {
                // Return (don't stop propagation)
                return;
            }

            event.stopPropagation();
            event.preventDefault();
        },

        autoComplete: function() {
            var edit = document.getElementById('edit');
            var length = edit.value.length;
            if (length > 0 && edit.selectionStart === length) {
                // Find the last word, if any
                var word = "";
                var wordStart = 0;
                for (var i = length - 1; i >= 0; i--) {
                    var ch = edit.value.charAt(i);
                    if (ch === '_' || CalcWidget.isAlphaNumeric(ch)) {
                        word = ch + word;
                    }
                    else {
                        wordStart = i + 1;
                        break;
                    }
                }
                if (word.length > 0) {
                    var completions = CalcWidget.UI.getCompletions(edit.value, wordStart);
                    if (completions.length > 0) {
                        var completion = completions[0];
                        // Make the first completion of "e" be "exp", then cycle back to "e"
                        if (edit.value.substr(wordStart) === completion &&
                            completions.length > 1)
                        {
                            completion = completions[1];
                        }
                        edit.value = edit.value.substr(0, wordStart) + completion;
                    }
                }
            }
        },

        replaceSelection: function(text) {
            var edit = document.getElementById('edit');
            var len = edit.selectionStart + text.length;
            edit.value = edit.value.substr(0, edit.selectionStart) + text +
                edit.value.substr(edit.selectionEnd);
            edit.selectionStart = len;
            edit.selectionEnd = len;
        },

        getCompletions: function(text, wordStart) {
            // Get all possible completions
            var possibleCompletions = CalcWidget.Calc.getUserVars();
            for (var i in CalcWidget.Math) {
                if (i.charAt(0) !== '_') {
                    possibleCompletions.push(i);
                }
            }
            possibleCompletions.push("ans");

            // Find completions for this word
            var word = text.substr(wordStart);
            completions = [];
            completionWordStart = wordStart;
            for (var j in possibleCompletions) {
                if (possibleCompletions.hasOwnProperty(j)) {
                    var name = possibleCompletions[j];
                    if (name.indexOf(word) === 0) {
                        completions.push(name);
                    }
                }
            }
            completions.sort();
            return completions;
        }
    };
})();

