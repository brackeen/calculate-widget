// ECMAScript3Emitter by David Brackeen
// Converts an ANTLR AST back to JavaScript source code.
// Tested on ANTLR 3.1.2 using the ECMAScript3Parser by Patrick Hulsmeijer
//
// Tested against all Sputnik tests.
// Passes on every test that ECMAScript3Parser passes.
//
// Usage:
// var emitter = new ECMAScript3Emitter();
// emitter.includeWhitespace = true;
// var source = emitter.emit(astNode
//
// Setting "emitter.includeWhitespace = false" removes indentation and newlines.
// It doesn't optimize to the smallest whitespace.
// 
// Based on JavaEmitter by Andy Tripp
// http://web.archive.org/web/20080624135219/http://www.jazillian.com/antlr/emitter.html

var IndentingPrintStream = function() {
    this.indentString = "    ";
    this.reset(true);
}

IndentingPrintStream.prototype.reset = function(includeWhitespace) {
    this.result = [];
    this.includeWhitespace = includeWhitespace;
    this.indent = 0;
    this.indentPending = false;
}

IndentingPrintStream.prototype.println = function() {
    if (this.includeWhitespace) {
        this.result.push("\n");
        this.indentPending = true;
    }
}

IndentingPrintStream.prototype.increaseIndent = function() {
    this.indent++;
}

IndentingPrintStream.prototype.decreaseIndent = function() {
    this.indent--;
}

IndentingPrintStream.prototype.print = function(s) {
    if (this.indentPending) {
        for (var i = 0; i < this.indent; i++) {
            this.result.push(this.indentString);
        }
        this.indentPending = false;
    }
    this.result.push(s);
}

IndentingPrintStream.prototype.toString = function() {
    return this.result.join('');
}

var ECMAScript3Emitter = function() {
    this.includeWhitespace = true;
    this.out = new IndentingPrintStream();
    this.tokenNames = [];

    // Reserved words
    this.tokenNames[ECMAScript3Parser.NULL] = "null";
    this.tokenNames[ECMAScript3Parser.TRUE] = "true";
    this.tokenNames[ECMAScript3Parser.FALSE] = "false";

    // Keywords
    this.tokenNames[ECMAScript3Parser.BREAK] = "break";
    this.tokenNames[ECMAScript3Parser.CASE] = "case";
    this.tokenNames[ECMAScript3Parser.CATCH] = "catch";
    this.tokenNames[ECMAScript3Parser.CONTINUE] = "continue";
    this.tokenNames[ECMAScript3Parser.DEFAULT] = "default";
    this.tokenNames[ECMAScript3Parser.DELETE] = "delete";
    this.tokenNames[ECMAScript3Parser.DO] = "do";
    this.tokenNames[ECMAScript3Parser.ELSE] = "else";
    this.tokenNames[ECMAScript3Parser.FINALLY] = "finally";
    this.tokenNames[ECMAScript3Parser.FOR] = "for";
    this.tokenNames[ECMAScript3Parser.FUNCTION] = "function";
    this.tokenNames[ECMAScript3Parser.IF] = "if";
    this.tokenNames[ECMAScript3Parser.IN] = "in";
    this.tokenNames[ECMAScript3Parser.INSTANCEOF] = "instanceof";
    this.tokenNames[ECMAScript3Parser.NEW] = "new";
    this.tokenNames[ECMAScript3Parser.RETURN] = "return";
    this.tokenNames[ECMAScript3Parser.SWITCH] = "switch";
    this.tokenNames[ECMAScript3Parser.THIS] = "this";
    this.tokenNames[ECMAScript3Parser.THROW] = "throw";
    this.tokenNames[ECMAScript3Parser.TRY] = "try";
    this.tokenNames[ECMAScript3Parser.TYPEOF] = "typeof";
    this.tokenNames[ECMAScript3Parser.VAR] = "var";
    this.tokenNames[ECMAScript3Parser.VOID] = "void";
    this.tokenNames[ECMAScript3Parser.WHILE] = "while";
    this.tokenNames[ECMAScript3Parser.WITH] = "with";

    // Future reserved words
    this.tokenNames[ECMAScript3Parser.ABSTRACT] = "abstract";
    this.tokenNames[ECMAScript3Parser.BOOLEAN] = "boolean";
    this.tokenNames[ECMAScript3Parser.BYTE] = "byte";
    this.tokenNames[ECMAScript3Parser.CHAR] = "char";
    this.tokenNames[ECMAScript3Parser.CLASS] = "class";
    this.tokenNames[ECMAScript3Parser.CONST] = "const";
    this.tokenNames[ECMAScript3Parser.DEBUGGER] = "debugger";
    this.tokenNames[ECMAScript3Parser.DOUBLE] = "double";
    this.tokenNames[ECMAScript3Parser.ENUM] = "enum";
    this.tokenNames[ECMAScript3Parser.EXPORT] = "export";
    this.tokenNames[ECMAScript3Parser.EXTENDS] = "extends";
    this.tokenNames[ECMAScript3Parser.FINAL] = "final";
    this.tokenNames[ECMAScript3Parser.FLOAT] = "float";
    this.tokenNames[ECMAScript3Parser.GOTO] = "goto";
    this.tokenNames[ECMAScript3Parser.IMPLEMENTS] = "implements";
    this.tokenNames[ECMAScript3Parser.IMPORT] = "import";
    this.tokenNames[ECMAScript3Parser.INT] = "int";
    this.tokenNames[ECMAScript3Parser.INTERFACE] = "interface";
    this.tokenNames[ECMAScript3Parser.LONG] = "long";
    this.tokenNames[ECMAScript3Parser.NATIVE] = "native";
    this.tokenNames[ECMAScript3Parser.PACKAGE] = "package";
    this.tokenNames[ECMAScript3Parser.PRIVATE] = "private";
    this.tokenNames[ECMAScript3Parser.PROTECTED] = "protected";
    this.tokenNames[ECMAScript3Parser.PUBLIC] = "public";
    this.tokenNames[ECMAScript3Parser.SHORT] = "short";
    this.tokenNames[ECMAScript3Parser.STATIC] = "static";
    this.tokenNames[ECMAScript3Parser.SUPER] = "super";
    this.tokenNames[ECMAScript3Parser.SYNCHRONIZED] = "synchronized";
    this.tokenNames[ECMAScript3Parser.THROWS] = "throws";
    this.tokenNames[ECMAScript3Parser.TRANSIENT] = "transient";
    this.tokenNames[ECMAScript3Parser.VOLATILE] = "volatile";

    // Punctuators
    this.tokenNames[ECMAScript3Parser.LBRACE] = "{";
    this.tokenNames[ECMAScript3Parser.RBRACE] = "}";
    this.tokenNames[ECMAScript3Parser.LPAREN] = "(";
    this.tokenNames[ECMAScript3Parser.RPAREN] = ")";
    this.tokenNames[ECMAScript3Parser.LBRACK] = "[";
    this.tokenNames[ECMAScript3Parser.RBRACK] = "]";
    this.tokenNames[ECMAScript3Parser.DOT] = ".";
    this.tokenNames[ECMAScript3Parser.SEMIC] = ";";
    this.tokenNames[ECMAScript3Parser.COMMA] = ",";
    this.tokenNames[ECMAScript3Parser.LT] = "<";
    this.tokenNames[ECMAScript3Parser.GT] = ">";
    this.tokenNames[ECMAScript3Parser.LTE] = "<=";
    this.tokenNames[ECMAScript3Parser.GTE] = ">=";
    this.tokenNames[ECMAScript3Parser.EQ] = "==";
    this.tokenNames[ECMAScript3Parser.NEQ] = "!=";
    this.tokenNames[ECMAScript3Parser.SAME] = "===";
    this.tokenNames[ECMAScript3Parser.NSAME] = "!==";
    this.tokenNames[ECMAScript3Parser.ADD] = "+";
    this.tokenNames[ECMAScript3Parser.SUB] = "-";
    this.tokenNames[ECMAScript3Parser.MUL] = "*";
    this.tokenNames[ECMAScript3Parser.MOD] = "%";
    this.tokenNames[ECMAScript3Parser.INC] = "++";
    this.tokenNames[ECMAScript3Parser.DEC] = "--";
    this.tokenNames[ECMAScript3Parser.SHL] = "<<";
    this.tokenNames[ECMAScript3Parser.SHR] = ">>";
    this.tokenNames[ECMAScript3Parser.SHU] = ">>>";
    this.tokenNames[ECMAScript3Parser.AND] = "&";
    this.tokenNames[ECMAScript3Parser.OR] = "|";
    this.tokenNames[ECMAScript3Parser.XOR] = "^";
    this.tokenNames[ECMAScript3Parser.NOT] = "!";
    this.tokenNames[ECMAScript3Parser.INV] = "~";
    this.tokenNames[ECMAScript3Parser.LAND] = "&&";
    this.tokenNames[ECMAScript3Parser.LOR] = "||";
    this.tokenNames[ECMAScript3Parser.QUE] = "?";
    this.tokenNames[ECMAScript3Parser.COLON] = ":";
    this.tokenNames[ECMAScript3Parser.ASSIGN] = "=";
    this.tokenNames[ECMAScript3Parser.ADDASS] = "+=";
    this.tokenNames[ECMAScript3Parser.SUBASS] = "-=";
    this.tokenNames[ECMAScript3Parser.MULASS] = "*=";
    this.tokenNames[ECMAScript3Parser.MODASS] = "%=";
    this.tokenNames[ECMAScript3Parser.SHLASS] = "<<=";
    this.tokenNames[ECMAScript3Parser.SHRASS] = ">>=";
    this.tokenNames[ECMAScript3Parser.SHUASS] = ">>>=";
    this.tokenNames[ECMAScript3Parser.ANDASS] = "&=";
    this.tokenNames[ECMAScript3Parser.ORASS] = "|=";
    this.tokenNames[ECMAScript3Parser.XORASS] = "^=";
    this.tokenNames[ECMAScript3Parser.DIV] = "/";
    this.tokenNames[ECMAScript3Parser.DIVASS] = "/=";

    // Imaginary
    this.tokenNames[ECMAScript3Parser.ARGS] = null;
    this.tokenNames[ECMAScript3Parser.ARRAY] = null;
    this.tokenNames[ECMAScript3Parser.BLOCK] = null;
    this.tokenNames[ECMAScript3Parser.BYFIELD] = null;
    this.tokenNames[ECMAScript3Parser.BYINDEX] = null;
    this.tokenNames[ECMAScript3Parser.CALL] = null;
    this.tokenNames[ECMAScript3Parser.CEXPR] = null;
    this.tokenNames[ECMAScript3Parser.EXPR] = null;
    this.tokenNames[ECMAScript3Parser.FORITER] = null;
    this.tokenNames[ECMAScript3Parser.FORSTEP] = null;
    this.tokenNames[ECMAScript3Parser.ITEM] = null;
    this.tokenNames[ECMAScript3Parser.LABELLED] = null;
    this.tokenNames[ECMAScript3Parser.NAMEDVALUE] = null;
    this.tokenNames[ECMAScript3Parser.OBJECT] = null;
    this.tokenNames[ECMAScript3Parser.PAREXPR] = null;
    this.tokenNames[ECMAScript3Parser.PDEC] = "--";
    this.tokenNames[ECMAScript3Parser.PINC] = "++";
    this.tokenNames[ECMAScript3Parser.NEG] = "-";
    this.tokenNames[ECMAScript3Parser.POS] = "+";
}

ECMAScript3Emitter.prototype.name = function(node) {
    return this.tokenNames[node.getType()];
}

ECMAScript3Emitter.prototype.nameByType = function(nodeType) {
    return this.tokenNames[nodeType];
}

ECMAScript3Emitter.prototype.needsSemicolon = function(node) {
    var type = node.getType();
    return (type !== ECMAScript3Parser.BLOCK &&
            type !== ECMAScript3Parser.LABELLED &&
            type !== ECMAScript3Parser.SEMIC &&
            type !== ECMAScript3Parser.IF &&
            type !== ECMAScript3Parser.FUNCTION &&
            type !== ECMAScript3Parser.FOR &&
            type !== ECMAScript3Parser.WITH &&
            type !== ECMAScript3Parser.SWITCH &&
            type !== ECMAScript3Parser.WHILE &&
            type !== ECMAScript3Parser.DO &&
            type !== ECMAScript3Parser.TRY);
}

/**
 * Print all of the children of the given AST that are of the given type
 * @param node The AST to print
 * @param separator The separator to use (typically space or newline)
 * @param firstIndex The type of child AST to print
 * @param block if the children should be printed in a block
 * @returns true iff anything was printed
 */
ECMAScript3Emitter.prototype.printChildren = function(node, separator, firstIndex, block) {
    if (firstIndex === undefined) {
        firstIndex = 0;
    }
    if (block === undefined) {
        block = false;
    }
    var numChildren = node.getChildCount();
    var willPrintChildren = numChildren > firstIndex;
    if (!willPrintChildren) {
        if (block) {
            this.out.print("{ }");
        }
        return;
    }

    if (block) {
        this.out.print("{");
        this.out.increaseIndent();
        this.out.println();
    }

    for (var index = 0; index < numChildren; index++) {
        var child = node.getChild(index);
        // print a separator before each printed child (except first)
        if (index >= firstIndex) {
            if (index > firstIndex) {
                if (separator === "\n") {
                    this.out.println();
                }
                else if (separator === ",\n") {
                    this.out.print(",");
                    this.out.println();
                }
                else {
                    this.out.print(separator);
                }
            }
            this.print(child);
            if (separator === "\n" && this.needsSemicolon(child)) {
                this.out.print(";");
            }
        }
    }

    if (block) {
        this.out.println();
        this.out.decreaseIndent();
        this.out.print("}");
    }
}

/**
* Prints a binary operator
*/
ECMAScript3Emitter.prototype.printBinaryOperator = function(node) {
    this.printWithParens(node, node.getChild(0));
    this.out.print(" ");
    this.out.print(this.name(node));
    this.out.print(" ");
    this.printWithParens(node, node.getChild(1));
}

/**
* Prints an AST, adding parenthises if they are needed.
* Parens are needed inside an expression when the precendence of the
* parent AST is lower than the child AST.
*/
ECMAScript3Emitter.prototype.printWithParens = function(parent, node) {
    var parensNeeded = (this.getPrecedence(parent) < this.getPrecedence(node));
    if (parensNeeded) {
        this.out.print("(");
    }
    this.print(node);
    if (parensNeeded) {
        this.out.print(")");
    }
}

// Precendence table.
// From http://www.codehouse.com/javascript/precedence/
ECMAScript3Emitter.prototype.getPrecedence = function(node) {
    if (node == null) {
        return -2;
    }
    switch (node.getType()) {
        case ECMAScript3Parser.EXPR:
            return this.getPrecedence(node.getChild(0));
        case ECMAScript3Parser.CEXPR:
            return 17;
        case ECMAScript3Parser.ASSIGN:
        case ECMAScript3Parser.ADDASS:
        case ECMAScript3Parser.SUBASS:
        case ECMAScript3Parser.MULASS:
        case ECMAScript3Parser.DIVASS:
        case ECMAScript3Parser.MODASS:
        case ECMAScript3Parser.SHLASS:
        case ECMAScript3Parser.SHRASS:
        case ECMAScript3Parser.SHUASS:
        case ECMAScript3Parser.ANDASS:
        case ECMAScript3Parser.ORASS:
        case ECMAScript3Parser.XORASS:
            return 16;
        case ECMAScript3Parser.QUE:
            return 15;
        case ECMAScript3Parser.LOR:
            return 14;
        case ECMAScript3Parser.LAND:
            return 13;
        case ECMAScript3Parser.OR:
            return 12;
        case ECMAScript3Parser.XOR:
            return 11;
        case ECMAScript3Parser.AND:
            return 10;
        case ECMAScript3Parser.EQ:
        case ECMAScript3Parser.NEQ:
        case ECMAScript3Parser.SAME:
        case ECMAScript3Parser.NSAME:
            return 9;
        case ECMAScript3Parser.LT:
        case ECMAScript3Parser.GT:
        case ECMAScript3Parser.LTE:
        case ECMAScript3Parser.GTE:
        case ECMAScript3Parser.IN:
        case ECMAScript3Parser.INSTANCEOF:
            return 8;
        case ECMAScript3Parser.SHL:
        case ECMAScript3Parser.SHR:
        case ECMAScript3Parser.SHU:
            return 7;
        case ECMAScript3Parser.ADD:
        case ECMAScript3Parser.SUB:
            return 6;
        case ECMAScript3Parser.MUL:
        case ECMAScript3Parser.MOD:
        case ECMAScript3Parser.DIV:
            return 5;
        case ECMAScript3Parser.DELETE:
        case ECMAScript3Parser.VOID:
        case ECMAScript3Parser.TYPEOF:
        case ECMAScript3Parser.INC:
        case ECMAScript3Parser.DEC:
        case ECMAScript3Parser.NEG:
        case ECMAScript3Parser.POS:
        case ECMAScript3Parser.INV:
        case ECMAScript3Parser.NOT:
            return 4;
        case ECMAScript3Parser.PINC:
        case ECMAScript3Parser.PDEC:
            return 3;
        case ECMAScript3Parser.DOT:
        case ECMAScript3Parser.CALL:
        case ECMAScript3Parser.ARRAY:
            return 2;
        case ECMAScript3Parser.NEW:
        case ECMAScript3Parser.BYFIELD:
        case ECMAScript3Parser.BYINDEX:
            return 1;

        default:
            //alert("No precedence: " + this.name(node));
            return -2;
    }
}

// This should be the only public method
ECMAScript3Emitter.prototype.emit = function(node) {
    if (node == null) {
        return "";
    }
    this.out.reset(this.includeWhitespace);
    this.print(node, false)
    return this.out.toString();
}

ECMAScript3Emitter.prototype.print = function(node, forceBlock) {
    if (node == null) {
        return;
    }
    if (forceBlock === undefined) {
        forceBlock = false;
    }

    var child1 = node.getChild(0);
    var child2 = node.getChild(1);
    var child3 = node.getChild(2);
    var requiredChildren = 0;

    if (forceBlock) {
        forceBlock = node.getType() !== ECMAScript3Parser.BLOCK;
    }

    if (forceBlock) {
        this.out.increaseIndent();
        this.out.println();
    }

    switch (node.getType()) {
        case 0:
            requiredChildren = node.getChildCount();
            this.printChildren(node, "\n", 0);
            break;

        case ECMAScript3Parser.NULL:
        case ECMAScript3Parser.TRUE:
        case ECMAScript3Parser.FALSE:
        case ECMAScript3Parser.ELSE:
        case ECMAScript3Parser.THIS:
        case ECMAScript3Parser.ABSTRACT:
        case ECMAScript3Parser.BOOLEAN:
        case ECMAScript3Parser.BYTE:
        case ECMAScript3Parser.CHAR:
        case ECMAScript3Parser.CLASS:
        case ECMAScript3Parser.CONST:
        case ECMAScript3Parser.DEBUGGER:
        case ECMAScript3Parser.DOUBLE:
        case ECMAScript3Parser.ENUM:
        case ECMAScript3Parser.EXPORT:
        case ECMAScript3Parser.EXTENDS:
        case ECMAScript3Parser.FINAL:
        case ECMAScript3Parser.FLOAT:
        case ECMAScript3Parser.GOTO:
        case ECMAScript3Parser.IMPLEMENTS:
        case ECMAScript3Parser.IMPORT:
        case ECMAScript3Parser.INT:
        case ECMAScript3Parser.INTERFACE:
        case ECMAScript3Parser.LONG:
        case ECMAScript3Parser.NATIVE:
        case ECMAScript3Parser.PACKAGE:
        case ECMAScript3Parser.PRIVATE:
        case ECMAScript3Parser.PROTECTED:
        case ECMAScript3Parser.PUBLIC:
        case ECMAScript3Parser.SHORT:
        case ECMAScript3Parser.STATIC:
        case ECMAScript3Parser.SUPER:
        case ECMAScript3Parser.SYNCHRONIZED:
        case ECMAScript3Parser.THROWS:
        case ECMAScript3Parser.TRANSIENT:
        case ECMAScript3Parser.VOLATILE:
        case ECMAScript3Parser.LBRACE:
        case ECMAScript3Parser.RBRACE:
        case ECMAScript3Parser.LPAREN:
        case ECMAScript3Parser.RPAREN:
        case ECMAScript3Parser.LBRACK:
        case ECMAScript3Parser.RBRACK:
        case ECMAScript3Parser.DOT:
        case ECMAScript3Parser.SEMIC:
        case ECMAScript3Parser.COMMA:
            this.out.print(this.name(node));
            break;

        case ECMAScript3Parser.INSTANCEOF:
        case ECMAScript3Parser.IN:
        case ECMAScript3Parser.LT:
        case ECMAScript3Parser.GT:
        case ECMAScript3Parser.LTE:
        case ECMAScript3Parser.GTE:
        case ECMAScript3Parser.EQ:
        case ECMAScript3Parser.NEQ:
        case ECMAScript3Parser.SAME:
        case ECMAScript3Parser.NSAME:
        case ECMAScript3Parser.ADD:
        case ECMAScript3Parser.SUB:
        case ECMAScript3Parser.MUL:
        case ECMAScript3Parser.MOD:
        case ECMAScript3Parser.SHL:
        case ECMAScript3Parser.SHR:
        case ECMAScript3Parser.SHU:
        case ECMAScript3Parser.AND:
        case ECMAScript3Parser.OR:
        case ECMAScript3Parser.XOR:
        case ECMAScript3Parser.LAND:
        case ECMAScript3Parser.LOR:
        case ECMAScript3Parser.ASSIGN:
        case ECMAScript3Parser.ADDASS:
        case ECMAScript3Parser.SUBASS:
        case ECMAScript3Parser.MULASS:
        case ECMAScript3Parser.MODASS:
        case ECMAScript3Parser.SHLASS:
        case ECMAScript3Parser.SHRASS:
        case ECMAScript3Parser.SHUASS:
        case ECMAScript3Parser.ANDASS:
        case ECMAScript3Parser.ORASS:
        case ECMAScript3Parser.XORASS:
        case ECMAScript3Parser.DIV:
        case ECMAScript3Parser.DIVASS:
            requiredChildren = 2;
            this.printBinaryOperator(node);
            break;

        case ECMAScript3Parser.INV:
            if (node.getChildCount() === 1) {
                requiredChildren = 1;
                this.out.print(this.name(node));
                this.print(child1);
            }
            else {
                requiredChildren = 2;
                this.printBinaryOperator(node);
            }
            break;

        case ECMAScript3Parser.TYPEOF:
        case ECMAScript3Parser.DELETE:
            requiredChildren = 1;
            this.out.print(this.name(node));
            this.out.print(" ");
            this.print(child1);
            break;

        case ECMAScript3Parser.VOID:
        case ECMAScript3Parser.VAR:
            requiredChildren = node.getChildCount();
            this.out.print(this.name(node));
            this.out.print(" ");
            this.printChildren(node, ", ");
            break;

        case ECMAScript3Parser.SWITCH:
            requiredChildren = node.getChildCount();
            this.out.print("switch (");
            this.print(child1);
            this.out.print(") ");
            this.printChildren(node, "", 1, true);
            break;

        case ECMAScript3Parser.CONTINUE:
        case ECMAScript3Parser.BREAK:
        case ECMAScript3Parser.RETURN:
            this.out.print(this.name(node));
            if (child1 != null) {
                requiredChildren = 1;
                this.out.print(" ");
                this.print(child1);
            }
            break;

        case ECMAScript3Parser.CASE:
            requiredChildren = node.getChildCount();
            this.out.print(this.name(node));
            this.out.print(" ");
            this.print(child1);
            this.out.print(":");
            this.out.println();
            this.out.increaseIndent();
            this.printChildren(node, "\n", 1);
            this.out.decreaseIndent();
            this.out.println();
            break;

        case ECMAScript3Parser.CATCH:
        case ECMAScript3Parser.FOR:
        case ECMAScript3Parser.WHILE:
        case ECMAScript3Parser.WITH:
            requiredChildren = 2;
            this.out.print(this.name(node));
            this.out.print(" (");
            this.print(child1);
            this.out.print(")");
            if (this.needsSemicolon(child2)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child2);
                this.out.print(";");
                this.out.decreaseIndent();
                this.out.println();
            }
            else {
                this.out.print(" ");
                this.print(child2);
            }
            break;

        case ECMAScript3Parser.DEFAULT:
            requiredChildren = node.getChildCount();
            this.out.print(this.name(node));
            this.out.print(":");
            this.out.println();
            this.out.increaseIndent();
            this.printChildren(node, "\n");
            this.out.decreaseIndent();
            this.out.println();
            break;
        
        case ECMAScript3Parser.DO:
            requiredChildren = 2;
            this.out.print("do ");
            if (this.needsSemicolon(child1)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child1);
                this.out.print(";");
                this.out.decreaseIndent();
                this.out.println();
            }
            else {
                this.print(child1);
            }
            this.out.print(" while (");
            this.print(child2);
            this.out.print(");");
            break;

        case ECMAScript3Parser.FINALLY:
            requiredChildren = 1;
	    this.out.print(this.name(node));
            this.out.print(" ");
            if (this.needsSemicolon(child1)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child1);
                this.out.print(";");
                this.out.decreaseIndent();
                this.out.println();
            }
            else {
                this.print(child1);
            }
            break;

        case ECMAScript3Parser.FUNCTION:
            this.out.print(this.name(node));
            if (child1.getType() === ECMAScript3Parser.Identifier) {
                requiredChildren = 3;
                this.out.print(" ");
                this.print(child1);
                this.print(child2); // ARGS
                this.out.print(" ");
                this.print(child3); // BLOCK
            }
            else {
                requiredChildren = 2;
                this.print(child1); // ARGS
                this.out.print(" ");
                this.print(child2); // BLOCK
            }
            break;

        case ECMAScript3Parser.IF:
            requiredChildren = 2;
            this.out.print("if (");
            this.print(child1);
            this.out.print(") ");
            this.print(child2, true);
            if (child3 != null) {
                requiredChildren = 3;
                this.out.println();
                this.out.print("else ");
                this.print(child3, child3.getType() !== ECMAScript3Parser.IF);
            }
            break;
        
        case ECMAScript3Parser.NEW:
            requiredChildren = 1;
            this.out.print("new ");
            this.print(child1);
            break;
                
        case ECMAScript3Parser.THROW:
            requiredChildren = 1;
            this.out.print("throw ");
            this.print(child1);
            break;

        case ECMAScript3Parser.TRY:
            requiredChildren = node.getChildCount();
            this.out.print("try ");
            this.printChildren(node, " ", 0);
            break;
        
        case ECMAScript3Parser.ARGS:
            requiredChildren = node.getChildCount();
            this.out.print("(");
            this.printChildren(node, ", ", 0);
            this.out.print(")");
            break;

        case ECMAScript3Parser.PAREXPR:
            requiredChildren = node.getChildCount();
            this.out.print("(");
            this.printChildren(node, ", ", 0);
            this.out.print(")");
            break;

        case ECMAScript3Parser.ARRAY:
            requiredChildren = node.getChildCount();
            this.out.print("[");
            this.printChildren(node, ",", 0);
            if (requiredChildren > 0 && node.getChild(requiredChildren - 1).getChildCount() === 0) {
                this.out.print(",");
            }
            this.out.print("]");
            break;

        case ECMAScript3Parser.BLOCK:
            requiredChildren = node.getChildCount();
            this.printChildren(node, "\n", 0, true);
            break;

        case ECMAScript3Parser.BYFIELD:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(".");
            this.print(child2);
            break;

        case ECMAScript3Parser.BYINDEX:
            requiredChildren = 2;
            this.print(child1);
            this.out.print("[");
            this.print(child2);
            this.out.print("]");
            break;

        case ECMAScript3Parser.CALL:
            requiredChildren = 2;
            this.print(child1);
            this.print(child2);
            break;

        case ECMAScript3Parser.OBJECT:
            requiredChildren = node.getChildCount();
            this.printChildren(node, ",\n", 0, true);
            break;

        case ECMAScript3Parser.NAMEDVALUE:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(": ");
            this.print(child2);
            break;

        case ECMAScript3Parser.LABELLED:
            requiredChildren = node.getChildCount();
            this.print(child1);
            this.out.print(":");
            this.out.println();
            this.printChildren(node, "\n", 1);
            break;

        case ECMAScript3Parser.CEXPR:
            requiredChildren = node.getChildCount();
            this.printChildren(node, ", ");
            break;

        case ECMAScript3Parser.EXPR:
        case ECMAScript3Parser.ITEM:
            requiredChildren = node.getChildCount();
            for (var i = 0; i < requiredChildren; i++) {
                this.print(node.getChild(i));
            }
            break;

        case ECMAScript3Parser.FORSTEP:
            requiredChildren = 3;
            this.print(child1);
            this.out.print("; ");
            this.print(child2);
            this.out.print("; ");
            this.print(child3);
            break;

        case ECMAScript3Parser.FORITER:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" in ");
            this.print(child2);
            break;

        case ECMAScript3Parser.PINC:
        case ECMAScript3Parser.PDEC:
            requiredChildren = 1;
            this.print(child1);
            this.out.print(this.name(node));
            break;

        case ECMAScript3Parser.NOT:
        case ECMAScript3Parser.INC:
        case ECMAScript3Parser.DEC:
        case ECMAScript3Parser.POS:
        case ECMAScript3Parser.NEG:
            requiredChildren = 1;
            this.out.print(this.name(node));
            // Add a space because two POS/NEG in a row would otherwise create '++' or '--'
            this.out.print(" ");
            this.printWithParens(node, child1);
            break;

        case ECMAScript3Parser.QUE:
            requiredChildren = 3;
            this.print(child1);
            this.out.print(" ? ");
            this.print(child2);
            this.out.print(" : ");
            this.print(child3);
            break;

        case ECMAScript3Parser.DecimalIntegerLiteral:
        case ECMAScript3Parser.RegularExpressionLiteral:
        case ECMAScript3Parser.DecimalLiteral:
        case ECMAScript3Parser.StringLiteral:
        case ECMAScript3Parser.HexIntegerLiteral:
        case ECMAScript3Parser.OctalIntegerLiteral:
        case ECMAScript3Parser.Identifier:
            this.out.print(node.getText());
            break;

        default:
            requiredChildren = node.getChildCount();
            alert("Error: Invalid type: " + node.getType() + " name: " + this.name(node));
            break;
    }
    if (node.getChildCount() !== requiredChildren) {
        alert("Error: Wrong children for " + node.getType() + " name: " + this.name(node) + ". Should be " + requiredChildren + " " + node.toStringTree());
    }

    if (forceBlock) {
        if (this.needsSemicolon(node)) {
            this.out.print(";");
        }
        this.out.decreaseIndent();
    }
}
