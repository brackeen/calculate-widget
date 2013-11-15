// ECMAScript3ExtEmitter by David Brackeen
// Converts an ANTLR AST back to JavaScript source code.
//
// NOTE: This is NOT ECMAScript.
// It has extentions for the power operator and factorial.
//
// Usage:
// var emitter = new ECMAScript3ExtEmitter();
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
};

IndentingPrintStream.prototype.reset = function(includeWhitespace) {
    this.result = [];
    this.includeWhitespace = includeWhitespace;
    this.indent = 0;
    this.indentPending = false;
};

IndentingPrintStream.prototype.println = function() {
    if (this.includeWhitespace) {
        this.result.push("\n");
        this.indentPending = true;
    }
};

IndentingPrintStream.prototype.increaseIndent = function() {
    this.indent++;
};

IndentingPrintStream.prototype.decreaseIndent = function() {
    this.indent--;
};

IndentingPrintStream.prototype.print = function(s) {
    if (this.indentPending) {
        for (var i = 0; i < this.indent; i++) {
            this.result.push(this.indentString);
        }
        this.indentPending = false;
    }
    this.result.push(s);
};

IndentingPrintStream.prototype.toString = function() {
    return this.result.join('');
};

var ECMAScript3ExtEmitter = function() {
    this.includeWhitespace = true;
    this.out = new IndentingPrintStream();
    this.tokenNames = [];

    // Reserved words
    this.tokenNames[ECMAScript3ExtParser.NULL] = "null";
    this.tokenNames[ECMAScript3ExtParser.TRUE] = "true";
    this.tokenNames[ECMAScript3ExtParser.FALSE] = "false";

    // Keywords
    this.tokenNames[ECMAScript3ExtParser.BREAK] = "break";
    this.tokenNames[ECMAScript3ExtParser.CASE] = "case";
    this.tokenNames[ECMAScript3ExtParser.CATCH] = "catch";
    this.tokenNames[ECMAScript3ExtParser.CONTINUE] = "continue";
    this.tokenNames[ECMAScript3ExtParser.DEFAULT] = "default";
    this.tokenNames[ECMAScript3ExtParser.DELETE] = "delete";
    this.tokenNames[ECMAScript3ExtParser.DO] = "do";
    this.tokenNames[ECMAScript3ExtParser.ELSE] = "else";
    this.tokenNames[ECMAScript3ExtParser.FINALLY] = "finally";
    this.tokenNames[ECMAScript3ExtParser.FOR] = "for";
    this.tokenNames[ECMAScript3ExtParser.FUNCTION] = "function";
    this.tokenNames[ECMAScript3ExtParser.IF] = "if";
    this.tokenNames[ECMAScript3ExtParser.IN] = "in";
    this.tokenNames[ECMAScript3ExtParser.INSTANCEOF] = "instanceof";
    this.tokenNames[ECMAScript3ExtParser.NEW] = "new";
    this.tokenNames[ECMAScript3ExtParser.RETURN] = "return";
    this.tokenNames[ECMAScript3ExtParser.SWITCH] = "switch";
    this.tokenNames[ECMAScript3ExtParser.THIS] = "this";
    this.tokenNames[ECMAScript3ExtParser.THROW] = "throw";
    this.tokenNames[ECMAScript3ExtParser.TRY] = "try";
    this.tokenNames[ECMAScript3ExtParser.TYPEOF] = "typeof";
    this.tokenNames[ECMAScript3ExtParser.VAR] = "var";
    this.tokenNames[ECMAScript3ExtParser.VOID] = "void";
    this.tokenNames[ECMAScript3ExtParser.WHILE] = "while";
    this.tokenNames[ECMAScript3ExtParser.WITH] = "with";

    // Future reserved words
    this.tokenNames[ECMAScript3ExtParser.ABSTRACT] = "abstract";
    this.tokenNames[ECMAScript3ExtParser.BOOLEAN] = "boolean";
    this.tokenNames[ECMAScript3ExtParser.BYTE] = "byte";
    this.tokenNames[ECMAScript3ExtParser.CHAR] = "char";
    this.tokenNames[ECMAScript3ExtParser.CLASS] = "class";
    this.tokenNames[ECMAScript3ExtParser.CONST] = "const";
    this.tokenNames[ECMAScript3ExtParser.DEBUGGER] = "debugger";
    this.tokenNames[ECMAScript3ExtParser.DOUBLE] = "double";
    this.tokenNames[ECMAScript3ExtParser.ENUM] = "enum";
    this.tokenNames[ECMAScript3ExtParser.EXPORT] = "export";
    this.tokenNames[ECMAScript3ExtParser.EXTENDS] = "extends";
    this.tokenNames[ECMAScript3ExtParser.FINAL] = "final";
    this.tokenNames[ECMAScript3ExtParser.FLOAT] = "float";
    this.tokenNames[ECMAScript3ExtParser.GOTO] = "goto";
    this.tokenNames[ECMAScript3ExtParser.IMPLEMENTS] = "implements";
    this.tokenNames[ECMAScript3ExtParser.IMPORT] = "import";
    this.tokenNames[ECMAScript3ExtParser.INT] = "int";
    this.tokenNames[ECMAScript3ExtParser.INTERFACE] = "interface";
    this.tokenNames[ECMAScript3ExtParser.LONG] = "long";
    this.tokenNames[ECMAScript3ExtParser.NATIVE] = "native";
    this.tokenNames[ECMAScript3ExtParser.PACKAGE] = "package";
    this.tokenNames[ECMAScript3ExtParser.PRIVATE] = "private";
    this.tokenNames[ECMAScript3ExtParser.PROTECTED] = "protected";
    this.tokenNames[ECMAScript3ExtParser.PUBLIC] = "public";
    this.tokenNames[ECMAScript3ExtParser.SHORT] = "short";
    this.tokenNames[ECMAScript3ExtParser.STATIC] = "static";
    this.tokenNames[ECMAScript3ExtParser.SUPER] = "super";
    this.tokenNames[ECMAScript3ExtParser.SYNCHRONIZED] = "synchronized";
    this.tokenNames[ECMAScript3ExtParser.THROWS] = "throws";
    this.tokenNames[ECMAScript3ExtParser.TRANSIENT] = "transient";
    this.tokenNames[ECMAScript3ExtParser.VOLATILE] = "volatile";

    // Punctuators
    this.tokenNames[ECMAScript3ExtParser.LBRACE] = "{";
    this.tokenNames[ECMAScript3ExtParser.RBRACE] = "}";
    this.tokenNames[ECMAScript3ExtParser.LPAREN] = "(";
    this.tokenNames[ECMAScript3ExtParser.RPAREN] = ")";
    this.tokenNames[ECMAScript3ExtParser.LBRACK] = "[";
    this.tokenNames[ECMAScript3ExtParser.RBRACK] = "]";
    this.tokenNames[ECMAScript3ExtParser.DOT] = ".";
    this.tokenNames[ECMAScript3ExtParser.SEMIC] = ";";
    this.tokenNames[ECMAScript3ExtParser.COMMA] = ",";
    this.tokenNames[ECMAScript3ExtParser.LT] = "<";
    this.tokenNames[ECMAScript3ExtParser.GT] = ">";
    this.tokenNames[ECMAScript3ExtParser.LTE] = "<=";
    this.tokenNames[ECMAScript3ExtParser.GTE] = ">=";
    this.tokenNames[ECMAScript3ExtParser.EQ] = "==";
    this.tokenNames[ECMAScript3ExtParser.NEQ] = "!=";
    this.tokenNames[ECMAScript3ExtParser.SAME] = "===";
    this.tokenNames[ECMAScript3ExtParser.NSAME] = "!==";
    this.tokenNames[ECMAScript3ExtParser.ADD] = "+";
    this.tokenNames[ECMAScript3ExtParser.SUB] = "-";
    this.tokenNames[ECMAScript3ExtParser.MUL] = "*";
    this.tokenNames[ECMAScript3ExtParser.MOD] = "%";
    this.tokenNames[ECMAScript3ExtParser.INC] = "++";
    this.tokenNames[ECMAScript3ExtParser.DEC] = "--";
    this.tokenNames[ECMAScript3ExtParser.SHL] = "<<";
    this.tokenNames[ECMAScript3ExtParser.SHR] = ">>";
    this.tokenNames[ECMAScript3ExtParser.SHU] = ">>>";
    this.tokenNames[ECMAScript3ExtParser.AND] = "&";
    this.tokenNames[ECMAScript3ExtParser.OR] = "|";
    this.tokenNames[ECMAScript3ExtParser.XOR] = "><";
    this.tokenNames[ECMAScript3ExtParser.NOT] = "!";
    this.tokenNames[ECMAScript3ExtParser.INV] = "~";
    this.tokenNames[ECMAScript3ExtParser.LAND] = "&&";
    this.tokenNames[ECMAScript3ExtParser.LOR] = "||";
    this.tokenNames[ECMAScript3ExtParser.QUE] = "?";
    this.tokenNames[ECMAScript3ExtParser.COLON] = ":";
    this.tokenNames[ECMAScript3ExtParser.ASSIGN] = "=";
    this.tokenNames[ECMAScript3ExtParser.ADDASS] = "+=";
    this.tokenNames[ECMAScript3ExtParser.SUBASS] = "-=";
    this.tokenNames[ECMAScript3ExtParser.MULASS] = "*=";
    this.tokenNames[ECMAScript3ExtParser.MODASS] = "%=";
    this.tokenNames[ECMAScript3ExtParser.SHLASS] = "<<=";
    this.tokenNames[ECMAScript3ExtParser.SHRASS] = ">>=";
    this.tokenNames[ECMAScript3ExtParser.SHUASS] = ">>>=";
    this.tokenNames[ECMAScript3ExtParser.ANDASS] = "&=";
    this.tokenNames[ECMAScript3ExtParser.ORASS] = "|=";
    this.tokenNames[ECMAScript3ExtParser.XORASS] = "><=";
    this.tokenNames[ECMAScript3ExtParser.DIV] = "/";
    this.tokenNames[ECMAScript3ExtParser.DIVASS] = "/=";
    this.tokenNames[ECMAScript3ExtParser.POW] = "**";
    this.tokenNames[ECMAScript3ExtParser.POWASS] = "**=";
    this.tokenNames[ECMAScript3ExtParser.POW] = "^";
    this.tokenNames[ECMAScript3ExtParser.POWASS] = "^=";

    // Imaginary
    this.tokenNames[ECMAScript3ExtParser.ARGS] = null;
    this.tokenNames[ECMAScript3ExtParser.ARRAY] = null;
    this.tokenNames[ECMAScript3ExtParser.BLOCK] = null;
    this.tokenNames[ECMAScript3ExtParser.BYFIELD] = null;
    this.tokenNames[ECMAScript3ExtParser.BYINDEX] = null;
    this.tokenNames[ECMAScript3ExtParser.CALL] = null;
    this.tokenNames[ECMAScript3ExtParser.CEXPR] = null;
    this.tokenNames[ECMAScript3ExtParser.EXPR] = null;
    this.tokenNames[ECMAScript3ExtParser.FORITER] = null;
    this.tokenNames[ECMAScript3ExtParser.FORSTEP] = null;
    this.tokenNames[ECMAScript3ExtParser.ITEM] = null;
    this.tokenNames[ECMAScript3ExtParser.LABELLED] = null;
    this.tokenNames[ECMAScript3ExtParser.NAMEDVALUE] = null;
    this.tokenNames[ECMAScript3ExtParser.OBJECT] = null;
    this.tokenNames[ECMAScript3ExtParser.PAREXPR] = null;
    this.tokenNames[ECMAScript3ExtParser.PDEC] = "--";
    this.tokenNames[ECMAScript3ExtParser.PINC] = "++";
    this.tokenNames[ECMAScript3ExtParser.NEG] = "-";
    this.tokenNames[ECMAScript3ExtParser.POS] = "+";

    // Extentions
    this.tokenNames[ECMAScript3ExtParser.FACTORIAL] = null;
};

ECMAScript3ExtEmitter.prototype.name = function(node) {
    return this.tokenNames[node.getType()];
};

ECMAScript3ExtEmitter.prototype.nameByType = function(nodeType) {
    return this.tokenNames[nodeType];
};

ECMAScript3ExtEmitter.prototype.needsSemicolon = function(node) {
    var type = node.getType();
    return (type !== ECMAScript3ExtParser.BLOCK &&
            type !== ECMAScript3ExtParser.LABELLED &&
            type !== ECMAScript3ExtParser.SEMIC &&
            type !== ECMAScript3ExtParser.IF &&
            type !== ECMAScript3ExtParser.FUNCTION &&
            type !== ECMAScript3ExtParser.FOR &&
            type !== ECMAScript3ExtParser.WITH &&
            type !== ECMAScript3ExtParser.SWITCH &&
            type !== ECMAScript3ExtParser.WHILE &&
            type !== ECMAScript3ExtParser.DO &&
            type !== ECMAScript3ExtParser.TRY);
};

/**
 * Print all of the children of the given AST that are of the given type
 * @param node The AST to print
 * @param separator The separator to use (typically space or newline)
 * @param firstIndex The type of child AST to print
 * @param block if the children should be printed in a block
 * @returns true iff anything was printed
 */
ECMAScript3ExtEmitter.prototype.printChildren = function(node, separator, firstIndex, block) {
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
        if (this.includeWhitespace) {
            this.out.print("{");
            this.out.increaseIndent();
            this.out.println();
        }
        else {
            this.out.print("{ ");
        }
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
                this.out.print("; ");
            }
        }
    }

    if (block) {
        if (this.includeWhitespace) {
            this.out.println();
            this.out.decreaseIndent();
            this.out.print("}");
        }
        else {
            this.out.print("} ");
        }
    }
};

/*
* Prints a binary operator
*/
ECMAScript3ExtEmitter.prototype.printBinaryOperator = function(node) {
    this.printWithParens(node, node.getChild(0));
    this.out.print(" ");
    this.out.print(this.name(node));
    this.out.print(" ");
    this.printWithParens(node, node.getChild(1));
};

/*
* Prints an AST, adding parenthises if they are needed.
* Parens are needed inside an expression when the precendence of the
* parent AST is lower than the child AST.
*/
ECMAScript3ExtEmitter.prototype.printWithParens = function(parent, node) {
    var parensNeeded = (this.getPrecedence(parent) < this.getPrecedence(node));
    if (parensNeeded) {
        this.out.print("(");
    }
    this.print(node);
    if (parensNeeded) {
        this.out.print(")");
    }
};

// Precendence table.
// From http://www.codehouse.com/javascript/precedence/
ECMAScript3ExtEmitter.prototype.getPrecedence = function(node) {
    if (node == null) {
        return -2;
    }
    switch (node.getType()) {
        case ECMAScript3ExtParser.EXPR:
            return this.getPrecedence(node.getChild(0));
        case ECMAScript3ExtParser.CEXPR:
            return 17;
        case ECMAScript3ExtParser.ASSIGN:
        case ECMAScript3ExtParser.ADDASS:
        case ECMAScript3ExtParser.SUBASS:
        case ECMAScript3ExtParser.MULASS:
        case ECMAScript3ExtParser.POWASS:
        case ECMAScript3ExtParser.DIVASS:
        case ECMAScript3ExtParser.MODASS:
        case ECMAScript3ExtParser.SHLASS:
        case ECMAScript3ExtParser.SHRASS:
        case ECMAScript3ExtParser.SHUASS:
        case ECMAScript3ExtParser.ANDASS:
        case ECMAScript3ExtParser.ORASS:
        case ECMAScript3ExtParser.XORASS:
            return 16;
        case ECMAScript3ExtParser.QUE:
            return 15;
        case ECMAScript3ExtParser.LOR:
            return 14;
        case ECMAScript3ExtParser.LAND:
            return 13;
        case ECMAScript3ExtParser.OR:
            return 12;
        case ECMAScript3ExtParser.XOR:
            return 11;
        case ECMAScript3ExtParser.AND:
            return 10;
        case ECMAScript3ExtParser.EQ:
        case ECMAScript3ExtParser.NEQ:
        case ECMAScript3ExtParser.SAME:
        case ECMAScript3ExtParser.NSAME:
            return 9;
        case ECMAScript3ExtParser.LT:
        case ECMAScript3ExtParser.GT:
        case ECMAScript3ExtParser.LTE:
        case ECMAScript3ExtParser.GTE:
        case ECMAScript3ExtParser.IN:
        case ECMAScript3ExtParser.INSTANCEOF:
            return 8;
        case ECMAScript3ExtParser.SHL:
        case ECMAScript3ExtParser.SHR:
        case ECMAScript3ExtParser.SHU:
            return 7;
        case ECMAScript3ExtParser.ADD:
        case ECMAScript3ExtParser.SUB:
            return 6;
        case ECMAScript3ExtParser.MUL:
        case ECMAScript3ExtParser.MOD:
        case ECMAScript3ExtParser.DIV:
            return 5;
        case ECMAScript3ExtParser.POW:
            return 4.5;
        case ECMAScript3ExtParser.DELETE:
        case ECMAScript3ExtParser.VOID:
        case ECMAScript3ExtParser.TYPEOF:
        case ECMAScript3ExtParser.INC:
        case ECMAScript3ExtParser.DEC:
        case ECMAScript3ExtParser.NEG:
        case ECMAScript3ExtParser.POS:
        case ECMAScript3ExtParser.INV:
        case ECMAScript3ExtParser.NOT:
            return 4;
        case ECMAScript3ExtParser.PINC:
        case ECMAScript3ExtParser.PDEC:
        case ECMAScript3ExtParser.FACTORIAL:
            return 3;
        case ECMAScript3ExtParser.DOT:
        case ECMAScript3ExtParser.CALL:
        case ECMAScript3ExtParser.ARRAY:
            return 2;
        case ECMAScript3ExtParser.NEW:
        case ECMAScript3ExtParser.BYFIELD:
        case ECMAScript3ExtParser.BYINDEX:
            return 1;

        default:
            //alert("No precedence: " + this.name(node));
            return -2;
    }
};

// This should be the only public method
ECMAScript3ExtEmitter.prototype.emit = function(node) {
    if (node == null) {
        return "";
    }
    this.out.reset(this.includeWhitespace);
    this.print(node, false);
    return this.out.toString();
};

ECMAScript3ExtEmitter.prototype.print = function(node, forceBlock) {
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
        forceBlock = node.getType() !== ECMAScript3ExtParser.BLOCK;
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

        case ECMAScript3ExtParser.NULL:
        case ECMAScript3ExtParser.TRUE:
        case ECMAScript3ExtParser.FALSE:
        case ECMAScript3ExtParser.ELSE:
        case ECMAScript3ExtParser.THIS:
        case ECMAScript3ExtParser.ABSTRACT:
        case ECMAScript3ExtParser.BOOLEAN:
        case ECMAScript3ExtParser.BYTE:
        case ECMAScript3ExtParser.CHAR:
        case ECMAScript3ExtParser.CLASS:
        case ECMAScript3ExtParser.CONST:
        case ECMAScript3ExtParser.DEBUGGER:
        case ECMAScript3ExtParser.DOUBLE:
        case ECMAScript3ExtParser.ENUM:
        case ECMAScript3ExtParser.EXPORT:
        case ECMAScript3ExtParser.EXTENDS:
        case ECMAScript3ExtParser.FINAL:
        case ECMAScript3ExtParser.FLOAT:
        case ECMAScript3ExtParser.GOTO:
        case ECMAScript3ExtParser.IMPLEMENTS:
        case ECMAScript3ExtParser.IMPORT:
        case ECMAScript3ExtParser.INT:
        case ECMAScript3ExtParser.INTERFACE:
        case ECMAScript3ExtParser.LONG:
        case ECMAScript3ExtParser.NATIVE:
        case ECMAScript3ExtParser.PACKAGE:
        case ECMAScript3ExtParser.PRIVATE:
        case ECMAScript3ExtParser.PROTECTED:
        case ECMAScript3ExtParser.PUBLIC:
        case ECMAScript3ExtParser.SHORT:
        case ECMAScript3ExtParser.STATIC:
        case ECMAScript3ExtParser.SUPER:
        case ECMAScript3ExtParser.SYNCHRONIZED:
        case ECMAScript3ExtParser.THROWS:
        case ECMAScript3ExtParser.TRANSIENT:
        case ECMAScript3ExtParser.VOLATILE:
        case ECMAScript3ExtParser.LBRACE:
        case ECMAScript3ExtParser.RBRACE:
        case ECMAScript3ExtParser.LPAREN:
        case ECMAScript3ExtParser.RPAREN:
        case ECMAScript3ExtParser.LBRACK:
        case ECMAScript3ExtParser.RBRACK:
        case ECMAScript3ExtParser.DOT:
        case ECMAScript3ExtParser.SEMIC:
        case ECMAScript3ExtParser.COMMA:
            this.out.print(this.name(node));
            break;

        case ECMAScript3ExtParser.INSTANCEOF:
        case ECMAScript3ExtParser.IN:
        case ECMAScript3ExtParser.LT:
        case ECMAScript3ExtParser.GT:
        case ECMAScript3ExtParser.LTE:
        case ECMAScript3ExtParser.GTE:
        case ECMAScript3ExtParser.EQ:
        case ECMAScript3ExtParser.NEQ:
        case ECMAScript3ExtParser.SAME:
        case ECMAScript3ExtParser.NSAME:
        case ECMAScript3ExtParser.MOD:
        case ECMAScript3ExtParser.SHL:
        case ECMAScript3ExtParser.SHR:
        case ECMAScript3ExtParser.SHU:
        case ECMAScript3ExtParser.AND:
        case ECMAScript3ExtParser.OR:
        case ECMAScript3ExtParser.LAND:
        case ECMAScript3ExtParser.LOR:
        case ECMAScript3ExtParser.ASSIGN:
        case ECMAScript3ExtParser.MODASS:
        case ECMAScript3ExtParser.SHLASS:
        case ECMAScript3ExtParser.SHRASS:
        case ECMAScript3ExtParser.SHUASS:
        case ECMAScript3ExtParser.ANDASS:
        case ECMAScript3ExtParser.ORASS:
        case ECMAScript3ExtParser.DIV:
        case ECMAScript3ExtParser.DIVASS:
            requiredChildren = 2;
            this.printBinaryOperator(node);
            break;
            
        case ECMAScript3ExtParser.ADD:
            requiredChildren = 2;
            this.out.print("Math.add(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
        
        case ECMAScript3ExtParser.ADDASS:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" = Math.add(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
            
        case ECMAScript3ExtParser.SUB:
            requiredChildren = 2;
            this.out.print("Math.sub(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
        
        case ECMAScript3ExtParser.SUBASS:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" = Math.sub(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
            
        case ECMAScript3ExtParser.MUL:
            requiredChildren = 2;
            this.out.print("Math.mul(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
        
        case ECMAScript3ExtParser.MULASS:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" = Math.mul(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.XOR:
            requiredChildren = 2;
            this.out.print("xor(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.XORASS:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" = xor(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;
            
        case ECMAScript3ExtParser.POW:
        case ECMAScript3ExtParser.CARET:
            requiredChildren = 2;
            this.out.print("pow(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;

         case ECMAScript3ExtParser.POWASS:
         case ECMAScript3ExtParser.CARETASS:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" = pow(");
            this.print(child1);
            this.out.print(",");
            this.print(child2);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.INV:
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

        case ECMAScript3ExtParser.TYPEOF:
        case ECMAScript3ExtParser.DELETE:
            requiredChildren = 1;
            this.out.print(this.name(node));
            this.out.print(" ");
            this.print(child1);
            break;

        case ECMAScript3ExtParser.VOID:
        case ECMAScript3ExtParser.VAR:
            requiredChildren = node.getChildCount();
            this.out.print(this.name(node));
            this.out.print(" ");
            this.printChildren(node, ", ");
            break;

        case ECMAScript3ExtParser.SWITCH:
            requiredChildren = node.getChildCount();
            this.out.print("switch (");
            this.print(child1);
            this.out.print(") ");
            this.printChildren(node, "", 1, true);
            break;

        case ECMAScript3ExtParser.CONTINUE:
        case ECMAScript3ExtParser.BREAK:
        case ECMAScript3ExtParser.RETURN:
            this.out.print(this.name(node));
            if (child1 != null) {
                requiredChildren = 1;
                this.out.print(" ");
                this.print(child1);
            }
            break;

        case ECMAScript3ExtParser.CASE:
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

        case ECMAScript3ExtParser.CATCH:
        case ECMAScript3ExtParser.FOR:
        case ECMAScript3ExtParser.WHILE:
        case ECMAScript3ExtParser.WITH:
            requiredChildren = 2;
            this.out.print(this.name(node));
            this.out.print(" (");
            this.print(child1);
            this.out.print(")");
            if (this.needsSemicolon(child2)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child2);
                this.out.print("; ");
                this.out.decreaseIndent();
                this.out.println();
            }
            else {
                this.out.print(" ");
                this.print(child2);
            }
            break;

        case ECMAScript3ExtParser.DEFAULT:
            requiredChildren = node.getChildCount();
            this.out.print(this.name(node));
            this.out.print(":");
            this.out.println();
            this.out.increaseIndent();
            this.printChildren(node, "\n");
            this.out.decreaseIndent();
            this.out.println();
            break;

        case ECMAScript3ExtParser.DO:
            requiredChildren = 2;
            this.out.print("do ");
            if (this.needsSemicolon(child1)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child1);
                this.out.print("; ");
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

        case ECMAScript3ExtParser.FINALLY:
            requiredChildren = 1;
	    this.out.print(this.name(node));
            this.out.print(" ");
            if (this.needsSemicolon(child1)) {
                this.out.println();
                this.out.increaseIndent();
                this.print(child1);
                this.out.print("; ");
                this.out.decreaseIndent();
                this.out.println();
            }
            else {
                this.print(child1);
            }
            break;

        case ECMAScript3ExtParser.FUNCTION:
            this.out.print(this.name(node));
            if (child1.getType() === ECMAScript3ExtParser.Identifier) {
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

        case ECMAScript3ExtParser.IF:
            requiredChildren = 2;
            this.out.print("if (");
            this.print(child1);
            this.out.print(") ");
            this.print(child2, true);
            if (child3 != null) {
                requiredChildren = 3;
                this.out.println();
                this.out.print("else ");
                this.print(child3, child3.getType() !== ECMAScript3ExtParser.IF);
            }
            break;

        case ECMAScript3ExtParser.NEW:
            requiredChildren = 1;
            this.out.print("new ");
            this.print(child1);
            break;

        case ECMAScript3ExtParser.THROW:
            requiredChildren = 1;
            this.out.print("throw ");
            this.print(child1);
            break;

        case ECMAScript3ExtParser.TRY:
            requiredChildren = node.getChildCount();
            this.out.print("try ");
            this.printChildren(node, " ", 0);
            break;

        case ECMAScript3ExtParser.ARGS:
            requiredChildren = node.getChildCount();
            this.out.print("(");
            this.printChildren(node, ", ", 0);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.PAREXPR:
            requiredChildren = node.getChildCount();
            this.out.print("(");
            this.printChildren(node, ", ", 0);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.ARRAY:
            requiredChildren = node.getChildCount();
            this.out.print("[");
            this.printChildren(node, ",", 0);
            if (requiredChildren > 0 && node.getChild(requiredChildren - 1).getChildCount() === 0) {
                this.out.print(",");
            }
            this.out.print("]");
            break;

        case ECMAScript3ExtParser.BLOCK:
            requiredChildren = node.getChildCount();
            this.printChildren(node, "\n", 0, true);
            break;

        case ECMAScript3ExtParser.BYFIELD:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(".");
            this.print(child2);
            break;

        case ECMAScript3ExtParser.BYINDEX:
            requiredChildren = 2;
            this.print(child1);
            this.out.print("[");
            this.print(child2);
            this.out.print("]");
            break;

        case ECMAScript3ExtParser.CALL:
            requiredChildren = 2;
            this.print(child1);
            this.print(child2);
            break;

        case ECMAScript3ExtParser.OBJECT:
            requiredChildren = node.getChildCount();
            this.printChildren(node, ",\n", 0, true);
            break;

        case ECMAScript3ExtParser.NAMEDVALUE:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(": ");
            this.print(child2);
            break;

        case ECMAScript3ExtParser.LABELLED:
            requiredChildren = node.getChildCount();
            this.print(child1);
            this.out.print(":");
            this.out.println();
            this.printChildren(node, "\n", 1);
            break;

        case ECMAScript3ExtParser.CEXPR:
            requiredChildren = node.getChildCount();
            this.printChildren(node, ", ");
            break;

        case ECMAScript3ExtParser.EXPR:
        case ECMAScript3ExtParser.ITEM:
            requiredChildren = node.getChildCount();
            for (var i = 0; i < requiredChildren; i++) {
                this.print(node.getChild(i));
            }
            break;

        case ECMAScript3ExtParser.FORSTEP:
            requiredChildren = 3;
            this.print(child1);
            this.out.print("; ");
            this.print(child2);
            this.out.print("; ");
            this.print(child3);
            break;

        case ECMAScript3ExtParser.FORITER:
            requiredChildren = 2;
            this.print(child1);
            this.out.print(" in ");
            this.print(child2);
            break;

        case ECMAScript3ExtParser.FACTORIAL:
            requiredChildren = 1;
            this.out.print("factorial(");
            this.print(child1);
            this.out.print(")");
            break;

        case ECMAScript3ExtParser.PINC:
        case ECMAScript3ExtParser.PDEC:
            requiredChildren = 1;
            this.print(child1);
            this.out.print(this.name(node));
            break;

        case ECMAScript3ExtParser.NOT:
        case ECMAScript3ExtParser.INC:
        case ECMAScript3ExtParser.DEC:
        case ECMAScript3ExtParser.POS:
        case ECMAScript3ExtParser.NEG:
            requiredChildren = 1;
            this.out.print(this.name(node));
            // Add a space because two POS/NEG in a row would otherwise create '++' or '--'
            this.out.print(" ");
            this.printWithParens(node, child1);
            break;

        case ECMAScript3ExtParser.QUE:
            requiredChildren = 3;
            this.print(child1);
            this.out.print(" ? ");
            this.print(child2);
            this.out.print(" : ");
            this.print(child3);
            break;

        case ECMAScript3ExtParser.RegularExpressionLiteral:
        case ECMAScript3ExtParser.StringLiteral:
        case ECMAScript3ExtParser.HexIntegerLiteral:
        case ECMAScript3ExtParser.Identifier:
            this.out.print(node.getText());
            break;

        case ECMAScript3ExtParser.DecimalLiteral:
            // Make sure it's not intepreted as octal (remove leading zeros)
            var decimal = node.getText();
            while (decimal.length > 1 && decimal.charAt(0) === "0" &&
                decimal.charAt(1) >= '0' && decimal.charAt(1) <= '9') {
                decimal = decimal.substring(1);
            }
            this.out.print(decimal);
            break;

        case ECMAScript3ExtParser.OctalIntegerLiteral:
            var octalAsDecimal = parseInt(node.getText().substring(2), 8);
            this.out.print(octalAsDecimal);
            break;

        case ECMAScript3ExtParser.BinaryIntegerLiteral:
            var binaryAsDecimal = parseInt(node.getText().substring(2), 2);
            this.out.print(binaryAsDecimal);
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
            this.out.print("; ");
        }
        this.out.decreaseIndent();
    }
};
