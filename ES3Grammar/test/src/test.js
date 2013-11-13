// Test ECMAScript3Parser and ECMAScript3Emitter.
//
// Runs on Rhino.
//
// Parse->Emit->Reparse. Success if the parsed tree is identical to the reparsed tree.
//
// Note, in the Sputnik tests, there are 4 tests that fail. All other tests succeed.

var ECMAScript3Test = function() {

    // Private fields

    /** Print the source code after each test failure. */
    var printErrorSource = false;
    /** Quits after the first failure found */
    var quitAfterFirstError = false;
    /** Prints the source of the first file and quits */
    var printFirstSourceAndQuit = false;
    /** Test js files with ("@" + "negative") in them */
    var testNegativeTests = true;

    var verbose = false;

    var numTests = 0;
    var numPass = 0;
    var numFail = 0;
    var numFalsePositives = 0;
    
    var testFiles = [
        // Sputnik tests. If available, it may take 30 minutes to complete.
        "../../sputniktests-v1/tests",
        "src",
        "build",
        "test/src",
    ];

    // Private methods
    
    function test(file) {
        if (!file.exists()) {
            print("Not found: " + file);
            return;
        }
        else if (file.isDirectory()) {
            var subfiles = file.listFiles();
            for (var i in subfiles) {
                test(subfiles[i]);
            }
        }
        else if (file.isFile() && file.toString().endsWith(".js")) {
            print(file);
            var s = "" + fileUtils.readFileToString(file, "UTF-8");
            testSource(s);
        }
    }

    function parse(source) {
        var input = new org.antlr.runtime.ANTLRStringStream(source);
        var lexer = new ECMAScript3Lexer(input);
        var tokens = new org.antlr.runtime.CommonTokenStream(lexer);
        var parser = new ECMAScript3Parser(tokens);
        var t = parser.program().getTree();
        var n = lexer.getNumberOfSyntaxErrors() + parser.getNumberOfSyntaxErrors();
        return { tree: t, numErrors: n };
    }

    function testSource(source) {
        var success = true;
        var t1 = null;
        var t2 = null;
        var out = null;
        var result = null;
        var shouldSucceed = (source.indexOf("@" + "negative") < 0);

        if (!shouldSucceed && !testNegativeTests) {
            print("Skipped");
            return;
        }
        
        numTests++;
        
        try {
            if (verbose) print("  Parsing");
            result = parse(source);
            t1 = result.tree;

            var emptyFile = (t1 == null && result.numErrors == 0);

            if (!emptyFile && (t1 == null || result.numErrors > 0)) {
                throw new Error(result.numErrors + " syntax errors");
            }

            if (verbose) print("  Validating");
            if (!verify(t1)) {
                throw new Error("Invalid tree");
            }
        }
        catch (e) {
            success = false;
            if (shouldSucceed) {
                print("Parse error: " + e.toString());
            }
        }

        if (!shouldSucceed) {
            success = !success;
            if (success) {
                print("Pass (malformed input detected)");
                numPass++;
            }
            else {
                print("False positive (malformed input not detected)");
                numFalsePositives++;
            }
        }
        else {
            if (success) {
                try {
                    if (verbose) print("  Emiting");
                    var emitter = new ECMAScript3Emitter();
                    out = emitter.emit(t1);
                    if (printFirstSourceAndQuit) {
                        print("//====== Original Source ======");
                        print(source);
                        print("//====== Emitted Tree ======");
                        print(out);
                        throw new Error("Quitting after printing first source");
                    }

                    if (verbose) print("  Re-parsing");
                    result = parse(out);
                    t2 = result.tree;

                    if (verbose) print("  Comparing and validating");
                    success = nodesEqual(t1, t2);
                    if (!verify(t2)) {
                        throw new Error("Re-parsed tree invalid");
                    }
                    if (result.numErrors > 0) {
                        throw new Error("Re-parsed tree syntax errors: " + result.numErrors);
                    }

                    if (success) {
                        if (verbose) print("  Emiting (without whitespace)");
                        emitter.includeWhitespace = false;
                        out = emitter.emit(t1);

                        if (verbose) print("  Re-parsing (without whitespace)");
                        result = parse(out);
                        t2 = result.tree;

                        if (verbose) print("  Comparing and validating");
                        success = nodesEqual(t1, t2);
                        if (!verify(t2)) {
                            throw new Error("Re-parsed tree (without whitespace) invalid");
                        }
                        if (result.numErrors > 0) {
                            throw new Error("Re-parsed tree (without whitespace) syntax errors: " + result.numErrors);
                        }
                    }
                }
                catch (e) {
                    success = false;
                    print("Emit error: " + e.toString());
                }
            }

            if (success) {
                print("Pass");
                numPass++;
            }
            else {
                print("Fail");
                numFail++;
            }
        }

        if (!success) {
            if (printErrorSource) {
                print("//====== Original Source ======");
                print(source);
                print("//====== Original Tree ======");
                print(t1 == null ? "null" : t1.toStringTree());
                if (out != null) {
                    print("//====== Emitted Source ======");
                    print(out);
                    print("//====== Reparsed Tree ======");
                    print(t2 == null ? "null" : t2.toStringTree());
                }
            }
            if (quitAfterFirstError) {
                throw new Error("Quitting after first error");
            }
        }
    }

    function verify(node, isRoot) {
        if (node == null) {
            return true;
        }
        if (isRoot === undefined) {
            isRoot = true;
        }
        if (!isRoot && node.getType() == org.antlr.runtime.Token.INVALID_TOKEN_TYPE) {
            return false;
        }
        var n = node.getChildCount();
        for (var i = 0; i < n; i++) {
            if (!verify(node.getChild(i), false)) {
                return false;
            }
        }
        return true;
    }

    function nodesEqual(node1, node2) {
        if (node1 === node2) {
            return true;
        }
        if (node1.getType() != node2.getType() ||
            node1.getText() != node2.getText() ||
            node1.getChildCount() != node2.getChildCount()) {
            return false;
        }
        var n = node1.getChildCount();
        for (var i = 0; i < n; i++) {
            if (!nodesEqual(node1.getChild(i), node2.getChild(i))) {
                return false;
            }
        }
        return true;
    }
    
    // Public methods

    return {
        run: function() {
            numTests = 0;
            numPass = 0;
            numFail = 0;
            numFalsePositives = 0;
            for (var i in testFiles) {
                test(new java.io.File(testFiles[i]));
            }
            if (numTests == 0) {
                print("No tests found");
            }
            else {
                print("          Tests: " + numTests);
                print("           Pass: " + numPass + " " + (100*numPass/numTests).toFixed(2) + "%");
                print("           Fail: " + numFail + " " + (100*numFail/numTests).toFixed(2) + "%");
                print("False positives: " + numFalsePositives + " " + (100*numFalsePositives/numTests).toFixed(2) + "%");
            }
        }
    }
}

new ECMAScript3Test().run();