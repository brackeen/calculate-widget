// $ANTLR 3.1.2 res/ECMAScript3Ext.g 2010-04-13 19:03:25

var ECMAScript3ExtParser = function(input, state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){


            ECMAScript3ExtParser.prototype.isLeftHandSideAssign = function(lhs, cached) {
        	if (cached.length != 0) {
                    return cached[0];
        	}

        	var result;
        	if (this.isLeftHandSideExpression(lhs)) {
                    switch (this.input.LA(1)) {
                        case ECMAScript3ExtParser.ASSIGN:
                        case ECMAScript3ExtParser.POWASS:
                        case ECMAScript3ExtParser.CARETASS:
                        case ECMAScript3ExtParser.MULASS:
                        case ECMAScript3ExtParser.DIVASS:
                        case ECMAScript3ExtParser.MODASS:
                        case ECMAScript3ExtParser.ADDASS:
                        case ECMAScript3ExtParser.SUBASS:
                        case ECMAScript3ExtParser.SHLASS:
                        case ECMAScript3ExtParser.SHRASS:
                        case ECMAScript3ExtParser.SHUASS:
                        case ECMAScript3ExtParser.ANDASS:
                        case ECMAScript3ExtParser.XORASS:
                        case ECMAScript3ExtParser.ORASS:
                            result = true;
                            break;
                        default:
                            result = false;
                            break;
                    }
        	}
        	else {
                    result = false;
        	}

        	cached[0] = result;
        	return result;
            }

            ECMAScript3ExtParser.prototype.isLeftHandSideExpression = function(lhs) {
        	if (lhs.getTree() == null) { // e.g. during backtracking
                    return true;
        	}
        	else {
                    switch (lhs.getTree().getType()) {
        		// primaryExpression
                            case ECMAScript3ExtParser.THIS:
                            case ECMAScript3ExtParser.Identifier:
                            case ECMAScript3ExtParser.NULL:
                            case ECMAScript3ExtParser.TRUE:
                            case ECMAScript3ExtParser.FALSE:
                            case ECMAScript3ExtParser.DecimalLiteral:
                            case ECMAScript3ExtParser.OctalIntegerLiteral:
                            case ECMAScript3ExtParser.BinaryIntegerLiteral:
                            case ECMAScript3ExtParser.HexIntegerLiteral:
                            case ECMAScript3ExtParser.StringLiteral:
                            case ECMAScript3ExtParser.RegularExpressionLiteral:
                            case ECMAScript3ExtParser.ARRAY:
                            case ECMAScript3ExtParser.OBJECT:
                            case ECMAScript3ExtParser.PAREXPR:
        		// functionExpression
                            case ECMAScript3ExtParser.FUNCTION:
        		// newExpression
                            case ECMAScript3ExtParser.NEW:
        		// leftHandSideExpression
                            case ECMAScript3ExtParser.CALL:
                            case ECMAScript3ExtParser.BYFIELD:
                            case ECMAScript3ExtParser.BYINDEX:
                                return true;

                            default:
                                return false;
                    }
        	}
            }

            ECMAScript3ExtParser.prototype.isLeftHandSideIn = function(lhs, cached) {
        	if (cached.length != 0) {
                    return cached[0];
        	}

        	var result = this.isLeftHandSideExpression(lhs) && (this.input.LA(1) == ECMAScript3ExtParser.IN);
        	cached[0] = result;
        	return result;
            }

            ECMAScript3ExtParser.prototype.promoteEOL = function(rule) {
        	// Get current token and its type (the possibly offending token).
        	var lt = this.input.LT(1);
        	var la = lt.getType();

        	// We only need to promote an EOL when the current token is offending (not a SEMIC, EOF, RBRACE, EOL or MultiLineComment).
        	// EOL and MultiLineComment are not offending as they're already promoted in a previous call to this method.
        	// Promoting an EOL means switching it from off channel to on channel.
        	// A MultiLineComment gets promoted when it contains an EOL.
        	if (!(la == ECMAScript3ExtParser.SEMIC || la == ECMAScript3ExtParser.EOF || la == ECMAScript3ExtParser.RBRACE || la == ECMAScript3ExtParser.EOL || la == ECMAScript3ExtParser.MultiLineComment)) {
                    // Start on the possition before the current token and scan backwards off channel tokens until the previous on channel token.
                    for (var ix = lt.getTokenIndex() - 1; ix > 0; ix--) {
                        lt = this.input.get(ix);
                        if (lt.getChannel() == org.antlr.runtime.Token.DEFAULT_CHANNEL) {
                            // On channel token found: stop scanning.
                            break;
                        }
                        else if (lt.getType() == ECMAScript3ExtParser.EOL || (lt.getType() == ECMAScript3ExtParser.MultiLineComment && lt.getText().matches("/.*\r\n|\r|\n"))) {
                            // We found our EOL: promote the token to on channel, position the input on it and reset the rule start.
                            lt.setChannel(org.antlr.runtime.Token.DEFAULT_CHANNEL);
                            this.input.seek(lt.getTokenIndex());
                            if (rule != null) {
                                rule.start = lt;
                            }
                            break;
                        }
                    }
        	}
            }

    }).call(this);

    ECMAScript3ExtParser.superclass.constructor.call(this, input, state);

    this.dfa47 = new ECMAScript3ExtParser.DFA47(this);
    this.dfa48 = new ECMAScript3ExtParser.DFA48(this);
    this.dfa78 = new ECMAScript3ExtParser.DFA78(this);

         

    /* @todo only create adaptor if output=AST */
    this.adaptor = new org.antlr.runtime.tree.CommonTreeAdaptor();

};

org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    VT: 139,
    LOR: 94,
    FUNCTION: 17,
    PACKAGE: 52,
    SHR: 87,
    RegularExpressionChar: 178,
    LT: 72,
    WHILE: 30,
    MOD: 83,
    SHL: 86,
    CONST: 37,
    BackslashSequence: 176,
    LS: 147,
    CASE: 8,
    CHAR: 35,
    NEW: 21,
    DQUOTE: 136,
    DO: 13,
    NOT: 91,
    DecimalDigit: 157,
    BYFIELD: 112,
    EOF: -1,
    CEXPR: 115,
    BREAK: 7,
    Identifier: 153,
    DIVASS: 108,
    BYINDEX: 113,
    FORSTEP: 118,
    FINAL: 43,
    RPAREN: 66,
    INC: 84,
    IMPORT: 47,
    EOL: 150,
    POW: 129,
    POS: 127,
    OctalDigit: 161,
    CARET: 131,
    THIS: 24,
    RETURN: 22,
    ExponentPart: 163,
    ARGS: 109,
    DOUBLE: 39,
    WhiteSpace: 144,
    VAR: 28,
    EXPORT: 41,
    VOID: 29,
    LABELLED: 120,
    SUPER: 58,
    GOTO: 45,
    EQ: 76,
    XORASS: 134,
    ADDASS: 98,
    ARRAY: 110,
    SHU: 88,
    RBRACK: 68,
    RBRACE: 64,
    PRIVATE: 53,
    STATIC: 57,
    INV: 92,
    SWITCH: 23,
    NULL: 4,
    ELSE: 14,
    NATIVE: 51,
    THROWS: 60,
    INT: 48,
    DELETE: 12,
    MUL: 82,
    IdentifierStartASCII: 156,
    TRY: 26,
    FF: 140,
    SHLASS: 102,
    OctalEscapeSequence: 172,
    USP: 143,
    RegularExpressionFirstChar: 177,
    ANDASS: 105,
    TYPEOF: 27,
    IdentifierNameASCIIStart: 159,
    BinaryDigit: 162,
    QUE: 95,
    OR: 90,
    DEBUGGER: 38,
    GT: 73,
    PDEC: 125,
    CALL: 114,
    CharacterEscapeSequence: 170,
    CARETASS: 132,
    CATCH: 9,
    FALSE: 6,
    BinaryIntegerLiteral: 168,
    EscapeSequence: 175,
    LAND: 93,
    MULASS: 100,
    THROW: 25,
    PINC: 126,
    OctalIntegerLiteral: 167,
    PROTECTED: 54,
    DEC: 85,
    CLASS: 36,
    LBRACK: 67,
    HexEscapeSequence: 173,
    ORASS: 106,
    SingleLineComment: 152,
    NAMEDVALUE: 121,
    LBRACE: 63,
    GTE: 75,
    FOR: 16,
    RegularExpressionLiteral: 160,
    SUB: 81,
    FLOAT: 44,
    ABSTRACT: 32,
    AND: 89,
    DecimalIntegerLiteral: 165,
    HexDigit: 155,
    LTE: 74,
    LPAREN: 65,
    IF: 18,
    SUBASS: 99,
    EXPR: 116,
    BOOLEAN: 33,
    SYNCHRONIZED: 59,
    IN: 19,
    IMPLEMENTS: 46,
    OBJECT: 123,
    CONTINUE: 10,
    COMMA: 71,
    FORITER: 117,
    TRANSIENT: 61,
    SHRASS: 103,
    MODASS: 101,
    PS: 148,
    DOT: 69,
    FACTORIAL: 128,
    IdentifierPart: 158,
    MultiLineComment: 151,
    WITH: 31,
    POWASS: 130,
    ADD: 80,
    BYTE: 34,
    XOR: 133,
    ZeroToThree: 171,
    ITEM: 119,
    VOLATILE: 62,
    UnicodeEscapeSequence: 174,
    SHUASS: 104,
    DEFAULT: 11,
    NSAME: 79,
    TAB: 138,
    SHORT: 56,
    INSTANCEOF: 20,
    SQUOTE: 137,
    DecimalLiteral: 166,
    TRUE: 5,
    SAME: 78,
    StringLiteral: 154,
    COLON: 96,
    PAREXPR: 124,
    NEQ: 77,
    ENUM: 40,
    FINALLY: 15,
    DecimalIntegerLiteralWithoutLeadingZero: 164,
    HexIntegerLiteral: 169,
    NBSP: 142,
    SP: 141,
    BLOCK: 111,
    LineTerminator: 149,
    NEG: 122,
    ASSIGN: 97,
    INTERFACE: 49,
    DIV: 107,
    SEMIC: 70,
    CR: 146,
    LONG: 50,
    EXTENDS: 42,
    PUBLIC: 55,
    BSLASH: 135,
    LF: 145
});

(function(){
// public class variables
var VT= 139,
    LOR= 94,
    FUNCTION= 17,
    PACKAGE= 52,
    SHR= 87,
    RegularExpressionChar= 178,
    LT= 72,
    WHILE= 30,
    MOD= 83,
    SHL= 86,
    CONST= 37,
    BackslashSequence= 176,
    LS= 147,
    CASE= 8,
    CHAR= 35,
    NEW= 21,
    DQUOTE= 136,
    DO= 13,
    NOT= 91,
    DecimalDigit= 157,
    BYFIELD= 112,
    EOF= -1,
    CEXPR= 115,
    BREAK= 7,
    Identifier= 153,
    DIVASS= 108,
    BYINDEX= 113,
    FORSTEP= 118,
    FINAL= 43,
    RPAREN= 66,
    INC= 84,
    IMPORT= 47,
    EOL= 150,
    POW= 129,
    POS= 127,
    OctalDigit= 161,
    CARET= 131,
    THIS= 24,
    RETURN= 22,
    ExponentPart= 163,
    ARGS= 109,
    DOUBLE= 39,
    WhiteSpace= 144,
    VAR= 28,
    EXPORT= 41,
    VOID= 29,
    LABELLED= 120,
    SUPER= 58,
    GOTO= 45,
    EQ= 76,
    XORASS= 134,
    ADDASS= 98,
    ARRAY= 110,
    SHU= 88,
    RBRACK= 68,
    RBRACE= 64,
    PRIVATE= 53,
    STATIC= 57,
    INV= 92,
    SWITCH= 23,
    NULL= 4,
    ELSE= 14,
    NATIVE= 51,
    THROWS= 60,
    INT= 48,
    DELETE= 12,
    MUL= 82,
    IdentifierStartASCII= 156,
    TRY= 26,
    FF= 140,
    SHLASS= 102,
    OctalEscapeSequence= 172,
    USP= 143,
    RegularExpressionFirstChar= 177,
    ANDASS= 105,
    TYPEOF= 27,
    IdentifierNameASCIIStart= 159,
    BinaryDigit= 162,
    QUE= 95,
    OR= 90,
    DEBUGGER= 38,
    GT= 73,
    PDEC= 125,
    CALL= 114,
    CharacterEscapeSequence= 170,
    CARETASS= 132,
    CATCH= 9,
    FALSE= 6,
    BinaryIntegerLiteral= 168,
    EscapeSequence= 175,
    LAND= 93,
    MULASS= 100,
    THROW= 25,
    PINC= 126,
    OctalIntegerLiteral= 167,
    PROTECTED= 54,
    DEC= 85,
    CLASS= 36,
    LBRACK= 67,
    HexEscapeSequence= 173,
    ORASS= 106,
    SingleLineComment= 152,
    NAMEDVALUE= 121,
    LBRACE= 63,
    GTE= 75,
    FOR= 16,
    RegularExpressionLiteral= 160,
    SUB= 81,
    FLOAT= 44,
    ABSTRACT= 32,
    AND= 89,
    DecimalIntegerLiteral= 165,
    HexDigit= 155,
    LTE= 74,
    LPAREN= 65,
    IF= 18,
    SUBASS= 99,
    EXPR= 116,
    BOOLEAN= 33,
    SYNCHRONIZED= 59,
    IN= 19,
    IMPLEMENTS= 46,
    OBJECT= 123,
    CONTINUE= 10,
    COMMA= 71,
    FORITER= 117,
    TRANSIENT= 61,
    SHRASS= 103,
    MODASS= 101,
    PS= 148,
    DOT= 69,
    FACTORIAL= 128,
    IdentifierPart= 158,
    MultiLineComment= 151,
    WITH= 31,
    POWASS= 130,
    ADD= 80,
    BYTE= 34,
    XOR= 133,
    ZeroToThree= 171,
    ITEM= 119,
    VOLATILE= 62,
    UnicodeEscapeSequence= 174,
    SHUASS= 104,
    DEFAULT= 11,
    NSAME= 79,
    TAB= 138,
    SHORT= 56,
    INSTANCEOF= 20,
    SQUOTE= 137,
    DecimalLiteral= 166,
    TRUE= 5,
    SAME= 78,
    StringLiteral= 154,
    COLON= 96,
    PAREXPR= 124,
    NEQ= 77,
    ENUM= 40,
    FINALLY= 15,
    DecimalIntegerLiteralWithoutLeadingZero= 164,
    HexIntegerLiteral= 169,
    NBSP= 142,
    SP= 141,
    BLOCK= 111,
    LineTerminator= 149,
    NEG= 122,
    ASSIGN= 97,
    INTERFACE= 49,
    DIV= 107,
    SEMIC= 70,
    CR= 146,
    LONG= 50,
    EXTENDS= 42,
    PUBLIC= 55,
    BSLASH= 135,
    LF= 145;

// public instance methods/vars
org.antlr.lang.extend(ECMAScript3ExtParser, org.antlr.runtime.Parser, {
        
    setTreeAdaptor: function(adaptor) {
        this.adaptor = adaptor;
    },
    getTreeAdaptor: function() {
        return this.adaptor;
    },

    getTokenNames: function() { return ECMAScript3ExtParser.tokenNames; },
    getGrammarFileName: function() { return "res/ECMAScript3Ext.g"; }
});
org.antlr.lang.augmentObject(ECMAScript3ExtParser.prototype, {

    // inline static return class
    token_return: (function() {
        ECMAScript3ExtParser.token_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.token_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:919:1: token : ( reservedWord | Identifier | punctuator | numericLiteral | StringLiteral );
    // $ANTLR start "token"
    token: function() {
        var retval = new ECMAScript3ExtParser.token_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var Identifier2 = null;
        var StringLiteral5 = null;
         var reservedWord1 = null;
         var punctuator3 = null;
         var numericLiteral4 = null;

        var Identifier2_tree=null;
        var StringLiteral5_tree=null;

        try {
            // res/ECMAScript3Ext.g:920:2: ( reservedWord | Identifier | punctuator | numericLiteral | StringLiteral )
            var alt1=5;
            switch ( this.input.LA(1) ) {
            case NULL:
            case TRUE:
            case FALSE:
            case BREAK:
            case CASE:
            case CATCH:
            case CONTINUE:
            case DEFAULT:
            case DELETE:
            case DO:
            case ELSE:
            case FINALLY:
            case FOR:
            case FUNCTION:
            case IF:
            case IN:
            case INSTANCEOF:
            case NEW:
            case RETURN:
            case SWITCH:
            case THIS:
            case THROW:
            case TRY:
            case TYPEOF:
            case VAR:
            case VOID:
            case WHILE:
            case WITH:
            case ABSTRACT:
            case BOOLEAN:
            case BYTE:
            case CHAR:
            case CLASS:
            case CONST:
            case DEBUGGER:
            case DOUBLE:
            case ENUM:
            case EXPORT:
            case EXTENDS:
            case FINAL:
            case FLOAT:
            case GOTO:
            case IMPLEMENTS:
            case IMPORT:
            case INT:
            case INTERFACE:
            case LONG:
            case NATIVE:
            case PACKAGE:
            case PRIVATE:
            case PROTECTED:
            case PUBLIC:
            case SHORT:
            case STATIC:
            case SUPER:
            case SYNCHRONIZED:
            case THROWS:
            case TRANSIENT:
            case VOLATILE:
                alt1=1;
                break;
            case Identifier:
                alt1=2;
                break;
            case LBRACE:
            case RBRACE:
            case LPAREN:
            case RPAREN:
            case LBRACK:
            case RBRACK:
            case DOT:
            case SEMIC:
            case COMMA:
            case LT:
            case GT:
            case LTE:
            case GTE:
            case EQ:
            case NEQ:
            case SAME:
            case NSAME:
            case ADD:
            case SUB:
            case MUL:
            case MOD:
            case INC:
            case DEC:
            case SHL:
            case SHR:
            case SHU:
            case AND:
            case OR:
            case NOT:
            case INV:
            case LAND:
            case LOR:
            case QUE:
            case COLON:
            case ASSIGN:
            case ADDASS:
            case SUBASS:
            case MULASS:
            case MODASS:
            case SHLASS:
            case SHRASS:
            case SHUASS:
            case ANDASS:
            case ORASS:
            case DIV:
            case DIVASS:
            case POW:
            case POWASS:
            case XOR:
            case XORASS:
                alt1=3;
                break;
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt1=4;
                break;
            case StringLiteral:
                alt1=5;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 1, 0, this.input);

                throw nvae;
            }

            switch (alt1) {
                case 1 :
                    // res/ECMAScript3Ext.g:920:4: reservedWord
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_reservedWord_in_token1843);
                    reservedWord1=this.reservedWord();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, reservedWord1.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:921:4: Identifier
                    root_0 = this.adaptor.nil();

                    Identifier2=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_token1848); 
                    Identifier2_tree = this.adaptor.create(Identifier2);
                    this.adaptor.addChild(root_0, Identifier2_tree);



                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:922:4: punctuator
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_punctuator_in_token1853);
                    punctuator3=this.punctuator();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, punctuator3.getTree());


                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:923:4: numericLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_numericLiteral_in_token1858);
                    numericLiteral4=this.numericLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, numericLiteral4.getTree());


                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:924:4: StringLiteral
                    root_0 = this.adaptor.nil();

                    StringLiteral5=this.match(this.input,StringLiteral,ECMAScript3ExtParser.FOLLOW_StringLiteral_in_token1863); 
                    StringLiteral5_tree = this.adaptor.create(StringLiteral5);
                    this.adaptor.addChild(root_0, StringLiteral5_tree);



                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    reservedWord_return: (function() {
        ECMAScript3ExtParser.reservedWord_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.reservedWord_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:929:1: reservedWord : ( keyword | futureReservedWord | NULL | booleanLiteral );
    // $ANTLR start "reservedWord"
    reservedWord: function() {
        var retval = new ECMAScript3ExtParser.reservedWord_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NULL8 = null;
         var keyword6 = null;
         var futureReservedWord7 = null;
         var booleanLiteral9 = null;

        var NULL8_tree=null;

        try {
            // res/ECMAScript3Ext.g:930:2: ( keyword | futureReservedWord | NULL | booleanLiteral )
            var alt2=4;
            switch ( this.input.LA(1) ) {
            case BREAK:
            case CASE:
            case CATCH:
            case CONTINUE:
            case DEFAULT:
            case DELETE:
            case DO:
            case ELSE:
            case FINALLY:
            case FOR:
            case FUNCTION:
            case IF:
            case IN:
            case INSTANCEOF:
            case NEW:
            case RETURN:
            case SWITCH:
            case THIS:
            case THROW:
            case TRY:
            case TYPEOF:
            case VAR:
            case VOID:
            case WHILE:
            case WITH:
                alt2=1;
                break;
            case ABSTRACT:
            case BOOLEAN:
            case BYTE:
            case CHAR:
            case CLASS:
            case CONST:
            case DEBUGGER:
            case DOUBLE:
            case ENUM:
            case EXPORT:
            case EXTENDS:
            case FINAL:
            case FLOAT:
            case GOTO:
            case IMPLEMENTS:
            case IMPORT:
            case INT:
            case INTERFACE:
            case LONG:
            case NATIVE:
            case PACKAGE:
            case PRIVATE:
            case PROTECTED:
            case PUBLIC:
            case SHORT:
            case STATIC:
            case SUPER:
            case SYNCHRONIZED:
            case THROWS:
            case TRANSIENT:
            case VOLATILE:
                alt2=2;
                break;
            case NULL:
                alt2=3;
                break;
            case TRUE:
            case FALSE:
                alt2=4;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 2, 0, this.input);

                throw nvae;
            }

            switch (alt2) {
                case 1 :
                    // res/ECMAScript3Ext.g:930:4: keyword
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_keyword_in_reservedWord1876);
                    keyword6=this.keyword();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, keyword6.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:931:4: futureReservedWord
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_futureReservedWord_in_reservedWord1881);
                    futureReservedWord7=this.futureReservedWord();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, futureReservedWord7.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:932:4: NULL
                    root_0 = this.adaptor.nil();

                    NULL8=this.match(this.input,NULL,ECMAScript3ExtParser.FOLLOW_NULL_in_reservedWord1886); 
                    NULL8_tree = this.adaptor.create(NULL8);
                    this.adaptor.addChild(root_0, NULL8_tree);



                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:933:4: booleanLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_booleanLiteral_in_reservedWord1891);
                    booleanLiteral9=this.booleanLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, booleanLiteral9.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    keyword_return: (function() {
        ECMAScript3ExtParser.keyword_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.keyword_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:940:1: keyword : ( BREAK | CASE | CATCH | CONTINUE | DEFAULT | DELETE | DO | ELSE | FINALLY | FOR | FUNCTION | IF | IN | INSTANCEOF | NEW | RETURN | SWITCH | THIS | THROW | TRY | TYPEOF | VAR | VOID | WHILE | WITH );
    // $ANTLR start "keyword"
    keyword: function() {
        var retval = new ECMAScript3ExtParser.keyword_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set10 = null;

        var set10_tree=null;

        try {
            // res/ECMAScript3Ext.g:941:2: ( BREAK | CASE | CATCH | CONTINUE | DEFAULT | DELETE | DO | ELSE | FINALLY | FOR | FUNCTION | IF | IN | INSTANCEOF | NEW | RETURN | SWITCH | THIS | THROW | TRY | TYPEOF | VAR | VOID | WHILE | WITH )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set10=this.input.LT(1);
            if ( (this.input.LA(1)>=BREAK && this.input.LA(1)<=WITH) ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set10));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    futureReservedWord_return: (function() {
        ECMAScript3ExtParser.futureReservedWord_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.futureReservedWord_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:972:1: futureReservedWord : ( ABSTRACT | BOOLEAN | BYTE | CHAR | CLASS | CONST | DEBUGGER | DOUBLE | ENUM | EXPORT | EXTENDS | FINAL | FLOAT | GOTO | IMPLEMENTS | IMPORT | INT | INTERFACE | LONG | NATIVE | PACKAGE | PRIVATE | PROTECTED | PUBLIC | SHORT | STATIC | SUPER | SYNCHRONIZED | THROWS | TRANSIENT | VOLATILE );
    // $ANTLR start "futureReservedWord"
    futureReservedWord: function() {
        var retval = new ECMAScript3ExtParser.futureReservedWord_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set11 = null;

        var set11_tree=null;

        try {
            // res/ECMAScript3Ext.g:973:2: ( ABSTRACT | BOOLEAN | BYTE | CHAR | CLASS | CONST | DEBUGGER | DOUBLE | ENUM | EXPORT | EXTENDS | FINAL | FLOAT | GOTO | IMPLEMENTS | IMPORT | INT | INTERFACE | LONG | NATIVE | PACKAGE | PRIVATE | PROTECTED | PUBLIC | SHORT | STATIC | SUPER | SYNCHRONIZED | THROWS | TRANSIENT | VOLATILE )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set11=this.input.LT(1);
            if ( (this.input.LA(1)>=ABSTRACT && this.input.LA(1)<=VOLATILE) ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set11));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    punctuator_return: (function() {
        ECMAScript3ExtParser.punctuator_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.punctuator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1050:1: punctuator : ( LBRACE | RBRACE | LPAREN | RPAREN | LBRACK | RBRACK | DOT | SEMIC | COMMA | LT | GT | LTE | GTE | EQ | NEQ | SAME | NSAME | ADD | SUB | MUL | MOD | INC | DEC | SHL | SHR | SHU | AND | OR | XOR | NOT | INV | LAND | LOR | QUE | COLON | ASSIGN | ADDASS | SUBASS | MULASS | MODASS | SHLASS | SHRASS | SHUASS | ANDASS | ORASS | XORASS | DIV | DIVASS | POW | POWASS );
    // $ANTLR start "punctuator"
    punctuator: function() {
        var retval = new ECMAScript3ExtParser.punctuator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set12 = null;

        var set12_tree=null;

        try {
            // res/ECMAScript3Ext.g:1051:2: ( LBRACE | RBRACE | LPAREN | RPAREN | LBRACK | RBRACK | DOT | SEMIC | COMMA | LT | GT | LTE | GTE | EQ | NEQ | SAME | NSAME | ADD | SUB | MUL | MOD | INC | DEC | SHL | SHR | SHU | AND | OR | XOR | NOT | INV | LAND | LOR | QUE | COLON | ASSIGN | ADDASS | SUBASS | MULASS | MODASS | SHLASS | SHRASS | SHUASS | ANDASS | ORASS | XORASS | DIV | DIVASS | POW | POWASS )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set12=this.input.LT(1);
            if ( (this.input.LA(1)>=LBRACE && this.input.LA(1)<=DIVASS)||(this.input.LA(1)>=POW && this.input.LA(1)<=POWASS)||(this.input.LA(1)>=XOR && this.input.LA(1)<=XORASS) ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set12));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    literal_return: (function() {
        ECMAScript3ExtParser.literal_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.literal_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1107:1: literal : ( NULL | booleanLiteral | numericLiteral | StringLiteral | RegularExpressionLiteral );
    // $ANTLR start "literal"
    literal: function() {
        var retval = new ECMAScript3ExtParser.literal_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NULL13 = null;
        var StringLiteral16 = null;
        var RegularExpressionLiteral17 = null;
         var booleanLiteral14 = null;
         var numericLiteral15 = null;

        var NULL13_tree=null;
        var StringLiteral16_tree=null;
        var RegularExpressionLiteral17_tree=null;

        try {
            // res/ECMAScript3Ext.g:1108:2: ( NULL | booleanLiteral | numericLiteral | StringLiteral | RegularExpressionLiteral )
            var alt3=5;
            switch ( this.input.LA(1) ) {
            case NULL:
                alt3=1;
                break;
            case TRUE:
            case FALSE:
                alt3=2;
                break;
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt3=3;
                break;
            case StringLiteral:
                alt3=4;
                break;
            case RegularExpressionLiteral:
                alt3=5;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 3, 0, this.input);

                throw nvae;
            }

            switch (alt3) {
                case 1 :
                    // res/ECMAScript3Ext.g:1108:4: NULL
                    root_0 = this.adaptor.nil();

                    NULL13=this.match(this.input,NULL,ECMAScript3ExtParser.FOLLOW_NULL_in_literal2594); 
                    NULL13_tree = this.adaptor.create(NULL13);
                    this.adaptor.addChild(root_0, NULL13_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1109:4: booleanLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_booleanLiteral_in_literal2599);
                    booleanLiteral14=this.booleanLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, booleanLiteral14.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1110:4: numericLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_numericLiteral_in_literal2604);
                    numericLiteral15=this.numericLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, numericLiteral15.getTree());


                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:1111:4: StringLiteral
                    root_0 = this.adaptor.nil();

                    StringLiteral16=this.match(this.input,StringLiteral,ECMAScript3ExtParser.FOLLOW_StringLiteral_in_literal2609); 
                    StringLiteral16_tree = this.adaptor.create(StringLiteral16);
                    this.adaptor.addChild(root_0, StringLiteral16_tree);



                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:1112:4: RegularExpressionLiteral
                    root_0 = this.adaptor.nil();

                    RegularExpressionLiteral17=this.match(this.input,RegularExpressionLiteral,ECMAScript3ExtParser.FOLLOW_RegularExpressionLiteral_in_literal2614); 
                    RegularExpressionLiteral17_tree = this.adaptor.create(RegularExpressionLiteral17);
                    this.adaptor.addChild(root_0, RegularExpressionLiteral17_tree);



                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    booleanLiteral_return: (function() {
        ECMAScript3ExtParser.booleanLiteral_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.booleanLiteral_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1115:1: booleanLiteral : ( TRUE | FALSE );
    // $ANTLR start "booleanLiteral"
    booleanLiteral: function() {
        var retval = new ECMAScript3ExtParser.booleanLiteral_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set18 = null;

        var set18_tree=null;

        try {
            // res/ECMAScript3Ext.g:1116:2: ( TRUE | FALSE )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set18=this.input.LT(1);
            if ( (this.input.LA(1)>=TRUE && this.input.LA(1)<=FALSE) ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set18));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    numericLiteral_return: (function() {
        ECMAScript3ExtParser.numericLiteral_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.numericLiteral_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1174:1: numericLiteral : ( DecimalLiteral | OctalIntegerLiteral | BinaryIntegerLiteral | HexIntegerLiteral );
    // $ANTLR start "numericLiteral"
    numericLiteral: function() {
        var retval = new ECMAScript3ExtParser.numericLiteral_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set19 = null;

        var set19_tree=null;

        try {
            // res/ECMAScript3Ext.g:1175:2: ( DecimalLiteral | OctalIntegerLiteral | BinaryIntegerLiteral | HexIntegerLiteral )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set19=this.input.LT(1);
            if ( (this.input.LA(1)>=DecimalLiteral && this.input.LA(1)<=HexIntegerLiteral) ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set19));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    primaryExpression_return: (function() {
        ECMAScript3ExtParser.primaryExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.primaryExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1263:1: primaryExpression : ( THIS | Identifier | literal | arrayLiteral | objectLiteral | lpar= LPAREN expression RPAREN -> ^( PAREXPR[$lpar, \"PAREXPR\"] expression ) );
    // $ANTLR start "primaryExpression"
    primaryExpression: function() {
        var retval = new ECMAScript3ExtParser.primaryExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var lpar = null;
        var THIS20 = null;
        var Identifier21 = null;
        var RPAREN26 = null;
         var literal22 = null;
         var arrayLiteral23 = null;
         var objectLiteral24 = null;
         var expression25 = null;

        var lpar_tree=null;
        var THIS20_tree=null;
        var Identifier21_tree=null;
        var RPAREN26_tree=null;
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // res/ECMAScript3Ext.g:1264:2: ( THIS | Identifier | literal | arrayLiteral | objectLiteral | lpar= LPAREN expression RPAREN -> ^( PAREXPR[$lpar, \"PAREXPR\"] expression ) )
            var alt4=6;
            switch ( this.input.LA(1) ) {
            case THIS:
                alt4=1;
                break;
            case Identifier:
                alt4=2;
                break;
            case NULL:
            case TRUE:
            case FALSE:
            case StringLiteral:
            case RegularExpressionLiteral:
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt4=3;
                break;
            case LBRACK:
                alt4=4;
                break;
            case LBRACE:
                alt4=5;
                break;
            case LPAREN:
                alt4=6;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 4, 0, this.input);

                throw nvae;
            }

            switch (alt4) {
                case 1 :
                    // res/ECMAScript3Ext.g:1264:4: THIS
                    root_0 = this.adaptor.nil();

                    THIS20=this.match(this.input,THIS,ECMAScript3ExtParser.FOLLOW_THIS_in_primaryExpression3294); 
                    THIS20_tree = this.adaptor.create(THIS20);
                    this.adaptor.addChild(root_0, THIS20_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1265:4: Identifier
                    root_0 = this.adaptor.nil();

                    Identifier21=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_primaryExpression3299); 
                    Identifier21_tree = this.adaptor.create(Identifier21);
                    this.adaptor.addChild(root_0, Identifier21_tree);



                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1266:4: literal
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_literal_in_primaryExpression3304);
                    literal22=this.literal();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, literal22.getTree());


                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:1267:4: arrayLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_arrayLiteral_in_primaryExpression3309);
                    arrayLiteral23=this.arrayLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, arrayLiteral23.getTree());


                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:1268:4: objectLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_objectLiteral_in_primaryExpression3314);
                    objectLiteral24=this.objectLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, objectLiteral24.getTree());


                    break;
                case 6 :
                    // res/ECMAScript3Ext.g:1269:4: lpar= LPAREN expression RPAREN
                    lpar=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_primaryExpression3321);  
                    stream_LPAREN.add(lpar);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_primaryExpression3323);
                    expression25=this.expression();

                    this.state._fsp--;

                    stream_expression.add(expression25.getTree());
                    RPAREN26=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_primaryExpression3325);  
                    stream_RPAREN.add(RPAREN26);



                    // AST REWRITE
                    // elements: expression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1269:34: -> ^( PAREXPR[$lpar, \"PAREXPR\"] expression )
                    {
                        // res/ECMAScript3Ext.g:1269:37: ^( PAREXPR[$lpar, \"PAREXPR\"] expression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(PAREXPR, lpar, "PAREXPR"), root_1);

                        this.adaptor.addChild(root_1, stream_expression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;

                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    arrayLiteral_return: (function() {
        ECMAScript3ExtParser.arrayLiteral_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.arrayLiteral_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1272:1: arrayLiteral : lb= LBRACK ( arrayItem )? ( COMMA ( arrayItem )? )* RBRACK -> ^( ARRAY[$lb, \"ARRAY\"] ( arrayItem )* ) ;
    // $ANTLR start "arrayLiteral"
    arrayLiteral: function() {
        var retval = new ECMAScript3ExtParser.arrayLiteral_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var lb = null;
        var COMMA28 = null;
        var RBRACK30 = null;
         var arrayItem27 = null;
         var arrayItem29 = null;

        var lb_tree=null;
        var COMMA28_tree=null;
        var RBRACK30_tree=null;
        var stream_RBRACK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACK");
        var stream_LBRACK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACK");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_arrayItem=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule arrayItem");
        try {
            // res/ECMAScript3Ext.g:1273:2: (lb= LBRACK ( arrayItem )? ( COMMA ( arrayItem )? )* RBRACK -> ^( ARRAY[$lb, \"ARRAY\"] ( arrayItem )* ) )
            // res/ECMAScript3Ext.g:1273:4: lb= LBRACK ( arrayItem )? ( COMMA ( arrayItem )? )* RBRACK
            lb=this.match(this.input,LBRACK,ECMAScript3ExtParser.FOLLOW_LBRACK_in_arrayLiteral3349);  
            stream_LBRACK.add(lb);

            // res/ECMAScript3Ext.g:1273:14: ( arrayItem )?
            var alt5=2;
            switch ( this.input.LA(1) ) {
                case NULL:
                case TRUE:
                case FALSE:
                case DELETE:
                case FUNCTION:
                case NEW:
                case THIS:
                case TYPEOF:
                case VOID:
                case LBRACE:
                case LPAREN:
                case LBRACK:
                case ADD:
                case SUB:
                case INC:
                case DEC:
                case NOT:
                case INV:
                case Identifier:
                case StringLiteral:
                case RegularExpressionLiteral:
                case DecimalLiteral:
                case OctalIntegerLiteral:
                case BinaryIntegerLiteral:
                case HexIntegerLiteral:
                    alt5=1;
                    break;
                case COMMA:
                    var LA5_2 = this.input.LA(2);

                    if ( (( this.input.LA(1) == ECMAScript3ExtParser.COMMA )) ) {
                        alt5=1;
                    }
                    break;
                case RBRACK:
                    var LA5_3 = this.input.LA(2);

                    if ( (( this.input.LA(1) == ECMAScript3ExtParser.COMMA )) ) {
                        alt5=1;
                    }
                    break;
            }

            switch (alt5) {
                case 1 :
                    // res/ECMAScript3Ext.g:1273:14: arrayItem
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_arrayItem_in_arrayLiteral3351);
                    arrayItem27=this.arrayItem();

                    this.state._fsp--;

                    stream_arrayItem.add(arrayItem27.getTree());


                    break;

            }

            // res/ECMAScript3Ext.g:1273:25: ( COMMA ( arrayItem )? )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==COMMA) ) {
                    alt7=1;
                }


                switch (alt7) {
                case 1 :
                    // res/ECMAScript3Ext.g:1273:26: COMMA ( arrayItem )?
                    COMMA28=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_arrayLiteral3355);  
                    stream_COMMA.add(COMMA28);

                    // res/ECMAScript3Ext.g:1273:32: ( arrayItem )?
                    var alt6=2;
                    switch ( this.input.LA(1) ) {
                        case NULL:
                        case TRUE:
                        case FALSE:
                        case DELETE:
                        case FUNCTION:
                        case NEW:
                        case THIS:
                        case TYPEOF:
                        case VOID:
                        case LBRACE:
                        case LPAREN:
                        case LBRACK:
                        case ADD:
                        case SUB:
                        case INC:
                        case DEC:
                        case NOT:
                        case INV:
                        case Identifier:
                        case StringLiteral:
                        case RegularExpressionLiteral:
                        case DecimalLiteral:
                        case OctalIntegerLiteral:
                        case BinaryIntegerLiteral:
                        case HexIntegerLiteral:
                            alt6=1;
                            break;
                        case RBRACK:
                            var LA6_2 = this.input.LA(2);

                            if ( (( this.input.LA(1) == ECMAScript3ExtParser.COMMA )) ) {
                                alt6=1;
                            }
                            break;
                        case COMMA:
                            var LA6_3 = this.input.LA(2);

                            if ( (( this.input.LA(1) == ECMAScript3ExtParser.COMMA )) ) {
                                alt6=1;
                            }
                            break;
                    }

                    switch (alt6) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1273:32: arrayItem
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_arrayItem_in_arrayLiteral3357);
                            arrayItem29=this.arrayItem();

                            this.state._fsp--;

                            stream_arrayItem.add(arrayItem29.getTree());


                            break;

                    }



                    break;

                default :
                    break loop7;
                }
            } while (true);

            RBRACK30=this.match(this.input,RBRACK,ECMAScript3ExtParser.FOLLOW_RBRACK_in_arrayLiteral3362);  
            stream_RBRACK.add(RBRACK30);



            // AST REWRITE
            // elements: arrayItem
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1274:2: -> ^( ARRAY[$lb, \"ARRAY\"] ( arrayItem )* )
            {
                // res/ECMAScript3Ext.g:1274:5: ^( ARRAY[$lb, \"ARRAY\"] ( arrayItem )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARRAY, lb, "ARRAY"), root_1);

                // res/ECMAScript3Ext.g:1274:28: ( arrayItem )*
                while ( stream_arrayItem.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_arrayItem.nextTree());

                }
                stream_arrayItem.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    arrayItem_return: (function() {
        ECMAScript3ExtParser.arrayItem_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.arrayItem_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1277:1: arrayItem : (expr= assignmentExpression | {...}?) -> ^( ITEM ( $expr)? ) ;
    // $ANTLR start "arrayItem"
    arrayItem: function() {
        var retval = new ECMAScript3ExtParser.arrayItem_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expr = null;

        var stream_assignmentExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assignmentExpression");
        try {
            // res/ECMAScript3Ext.g:1278:2: ( (expr= assignmentExpression | {...}?) -> ^( ITEM ( $expr)? ) )
            // res/ECMAScript3Ext.g:1278:4: (expr= assignmentExpression | {...}?)
            // res/ECMAScript3Ext.g:1278:4: (expr= assignmentExpression | {...}?)
            var alt8=2;
            var LA8_0 = this.input.LA(1);

            if ( ((LA8_0>=NULL && LA8_0<=FALSE)||LA8_0==DELETE||LA8_0==FUNCTION||LA8_0==NEW||LA8_0==THIS||LA8_0==TYPEOF||LA8_0==VOID||LA8_0==LBRACE||LA8_0==LPAREN||LA8_0==LBRACK||(LA8_0>=ADD && LA8_0<=SUB)||(LA8_0>=INC && LA8_0<=DEC)||(LA8_0>=NOT && LA8_0<=INV)||(LA8_0>=Identifier && LA8_0<=StringLiteral)||LA8_0==RegularExpressionLiteral||(LA8_0>=DecimalLiteral && LA8_0<=HexIntegerLiteral)) ) {
                alt8=1;
            }
            else if ( (LA8_0==RBRACK||LA8_0==COMMA) ) {
                alt8=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 8, 0, this.input);

                throw nvae;
            }
            switch (alt8) {
                case 1 :
                    // res/ECMAScript3Ext.g:1278:6: expr= assignmentExpression
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_arrayItem3390);
                    expr=this.assignmentExpression();

                    this.state._fsp--;

                    stream_assignmentExpression.add(expr.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1278:34: {...}?
                    if ( !(( this.input.LA(1) == ECMAScript3ExtParser.COMMA )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "arrayItem", " this.input.LA(1) == ECMAScript3ExtParser.COMMA ");
                    }


                    break;

            }



            // AST REWRITE
            // elements: expr
            // token labels: 
            // rule labels: retval, expr
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_expr=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token expr",expr!=null?expr.tree:null);

            root_0 = this.adaptor.nil();
            // 1279:2: -> ^( ITEM ( $expr)? )
            {
                // res/ECMAScript3Ext.g:1279:5: ^( ITEM ( $expr)? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ITEM, "ITEM"), root_1);

                // res/ECMAScript3Ext.g:1279:13: ( $expr)?
                if ( stream_expr.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_expr.nextTree());

                }
                stream_expr.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    objectLiteral_return: (function() {
        ECMAScript3ExtParser.objectLiteral_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.objectLiteral_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1282:1: objectLiteral : lb= LBRACE ( nameValuePair ( COMMA nameValuePair )* ( COMMA )? )? RBRACE -> ^( OBJECT[$lb, \"OBJECT\"] ( nameValuePair )* ) ;
    // $ANTLR start "objectLiteral"
    objectLiteral: function() {
        var retval = new ECMAScript3ExtParser.objectLiteral_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var lb = null;
        var COMMA32 = null;
        var COMMA34 = null;
        var RBRACE35 = null;
         var nameValuePair31 = null;
         var nameValuePair33 = null;

        var lb_tree=null;
        var COMMA32_tree=null;
        var COMMA34_tree=null;
        var RBRACE35_tree=null;
        var stream_RBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACE");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_LBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACE");
        var stream_nameValuePair=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule nameValuePair");
        try {
            // res/ECMAScript3Ext.g:1283:2: (lb= LBRACE ( nameValuePair ( COMMA nameValuePair )* ( COMMA )? )? RBRACE -> ^( OBJECT[$lb, \"OBJECT\"] ( nameValuePair )* ) )
            // res/ECMAScript3Ext.g:1283:4: lb= LBRACE ( nameValuePair ( COMMA nameValuePair )* ( COMMA )? )? RBRACE
            lb=this.match(this.input,LBRACE,ECMAScript3ExtParser.FOLLOW_LBRACE_in_objectLiteral3422);  
            stream_LBRACE.add(lb);

            // res/ECMAScript3Ext.g:1283:14: ( nameValuePair ( COMMA nameValuePair )* ( COMMA )? )?
            var alt11=2;
            var LA11_0 = this.input.LA(1);

            if ( ((LA11_0>=Identifier && LA11_0<=StringLiteral)||(LA11_0>=DecimalLiteral && LA11_0<=HexIntegerLiteral)) ) {
                alt11=1;
            }
            switch (alt11) {
                case 1 :
                    // res/ECMAScript3Ext.g:1283:16: nameValuePair ( COMMA nameValuePair )* ( COMMA )?
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_nameValuePair_in_objectLiteral3426);
                    nameValuePair31=this.nameValuePair();

                    this.state._fsp--;

                    stream_nameValuePair.add(nameValuePair31.getTree());
                    // res/ECMAScript3Ext.g:1283:30: ( COMMA nameValuePair )*
                    loop9:
                    do {
                        var alt9=2;
                        var LA9_0 = this.input.LA(1);

                        if ( (LA9_0==COMMA) ) {
                            var LA9_1 = this.input.LA(2);

                            if ( ((LA9_1>=Identifier && LA9_1<=StringLiteral)||(LA9_1>=DecimalLiteral && LA9_1<=HexIntegerLiteral)) ) {
                                alt9=1;
                            }


                        }


                        switch (alt9) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1283:32: COMMA nameValuePair
                            COMMA32=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_objectLiteral3430);  
                            stream_COMMA.add(COMMA32);

                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_nameValuePair_in_objectLiteral3432);
                            nameValuePair33=this.nameValuePair();

                            this.state._fsp--;

                            stream_nameValuePair.add(nameValuePair33.getTree());


                            break;

                        default :
                            break loop9;
                        }
                    } while (true);

                    // res/ECMAScript3Ext.g:1283:55: ( COMMA )?
                    var alt10=2;
                    var LA10_0 = this.input.LA(1);

                    if ( (LA10_0==COMMA) ) {
                        alt10=1;
                    }
                    switch (alt10) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1283:55: COMMA
                            COMMA34=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_objectLiteral3437);  
                            stream_COMMA.add(COMMA34);



                            break;

                    }



                    break;

            }

            RBRACE35=this.match(this.input,RBRACE,ECMAScript3ExtParser.FOLLOW_RBRACE_in_objectLiteral3443);  
            stream_RBRACE.add(RBRACE35);



            // AST REWRITE
            // elements: nameValuePair
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1284:2: -> ^( OBJECT[$lb, \"OBJECT\"] ( nameValuePair )* )
            {
                // res/ECMAScript3Ext.g:1284:5: ^( OBJECT[$lb, \"OBJECT\"] ( nameValuePair )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(OBJECT, lb, "OBJECT"), root_1);

                // res/ECMAScript3Ext.g:1284:30: ( nameValuePair )*
                while ( stream_nameValuePair.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_nameValuePair.nextTree());

                }
                stream_nameValuePair.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    nameValuePair_return: (function() {
        ECMAScript3ExtParser.nameValuePair_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.nameValuePair_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1287:1: nameValuePair : propertyName COLON assignmentExpression -> ^( NAMEDVALUE propertyName assignmentExpression ) ;
    // $ANTLR start "nameValuePair"
    nameValuePair: function() {
        var retval = new ECMAScript3ExtParser.nameValuePair_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var COLON37 = null;
         var propertyName36 = null;
         var assignmentExpression38 = null;

        var COLON37_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_propertyName=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule propertyName");
        var stream_assignmentExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assignmentExpression");
        try {
            // res/ECMAScript3Ext.g:1288:2: ( propertyName COLON assignmentExpression -> ^( NAMEDVALUE propertyName assignmentExpression ) )
            // res/ECMAScript3Ext.g:1288:4: propertyName COLON assignmentExpression
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_propertyName_in_nameValuePair3467);
            propertyName36=this.propertyName();

            this.state._fsp--;

            stream_propertyName.add(propertyName36.getTree());
            COLON37=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_nameValuePair3469);  
            stream_COLON.add(COLON37);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_nameValuePair3471);
            assignmentExpression38=this.assignmentExpression();

            this.state._fsp--;

            stream_assignmentExpression.add(assignmentExpression38.getTree());


            // AST REWRITE
            // elements: propertyName, assignmentExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1289:2: -> ^( NAMEDVALUE propertyName assignmentExpression )
            {
                // res/ECMAScript3Ext.g:1289:5: ^( NAMEDVALUE propertyName assignmentExpression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(NAMEDVALUE, "NAMEDVALUE"), root_1);

                this.adaptor.addChild(root_1, stream_propertyName.nextTree());
                this.adaptor.addChild(root_1, stream_assignmentExpression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    propertyName_return: (function() {
        ECMAScript3ExtParser.propertyName_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.propertyName_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1292:1: propertyName : ( Identifier | StringLiteral | numericLiteral );
    // $ANTLR start "propertyName"
    propertyName: function() {
        var retval = new ECMAScript3ExtParser.propertyName_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var Identifier39 = null;
        var StringLiteral40 = null;
         var numericLiteral41 = null;

        var Identifier39_tree=null;
        var StringLiteral40_tree=null;

        try {
            // res/ECMAScript3Ext.g:1293:2: ( Identifier | StringLiteral | numericLiteral )
            var alt12=3;
            switch ( this.input.LA(1) ) {
            case Identifier:
                alt12=1;
                break;
            case StringLiteral:
                alt12=2;
                break;
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt12=3;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 12, 0, this.input);

                throw nvae;
            }

            switch (alt12) {
                case 1 :
                    // res/ECMAScript3Ext.g:1293:4: Identifier
                    root_0 = this.adaptor.nil();

                    Identifier39=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_propertyName3495); 
                    Identifier39_tree = this.adaptor.create(Identifier39);
                    this.adaptor.addChild(root_0, Identifier39_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1294:4: StringLiteral
                    root_0 = this.adaptor.nil();

                    StringLiteral40=this.match(this.input,StringLiteral,ECMAScript3ExtParser.FOLLOW_StringLiteral_in_propertyName3500); 
                    StringLiteral40_tree = this.adaptor.create(StringLiteral40);
                    this.adaptor.addChild(root_0, StringLiteral40_tree);



                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1295:4: numericLiteral
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_numericLiteral_in_propertyName3505);
                    numericLiteral41=this.numericLiteral();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, numericLiteral41.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    memberExpression_return: (function() {
        ECMAScript3ExtParser.memberExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.memberExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1307:1: memberExpression : ( primaryExpression | functionExpression | newExpression );
    // $ANTLR start "memberExpression"
    memberExpression: function() {
        var retval = new ECMAScript3ExtParser.memberExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var primaryExpression42 = null;
         var functionExpression43 = null;
         var newExpression44 = null;


        try {
            // res/ECMAScript3Ext.g:1308:2: ( primaryExpression | functionExpression | newExpression )
            var alt13=3;
            switch ( this.input.LA(1) ) {
            case NULL:
            case TRUE:
            case FALSE:
            case THIS:
            case LBRACE:
            case LPAREN:
            case LBRACK:
            case Identifier:
            case StringLiteral:
            case RegularExpressionLiteral:
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt13=1;
                break;
            case FUNCTION:
                alt13=2;
                break;
            case NEW:
                alt13=3;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 13, 0, this.input);

                throw nvae;
            }

            switch (alt13) {
                case 1 :
                    // res/ECMAScript3Ext.g:1308:4: primaryExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_primaryExpression_in_memberExpression3523);
                    primaryExpression42=this.primaryExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, primaryExpression42.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1309:4: functionExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_functionExpression_in_memberExpression3528);
                    functionExpression43=this.functionExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, functionExpression43.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1310:4: newExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_newExpression_in_memberExpression3533);
                    newExpression44=this.newExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, newExpression44.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    newExpression_return: (function() {
        ECMAScript3ExtParser.newExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.newExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1313:1: newExpression : NEW memberExpression ;
    // $ANTLR start "newExpression"
    newExpression: function() {
        var retval = new ECMAScript3ExtParser.newExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var NEW45 = null;
         var memberExpression46 = null;

        var NEW45_tree=null;

        try {
            // res/ECMAScript3Ext.g:1314:2: ( NEW memberExpression )
            // res/ECMAScript3Ext.g:1314:4: NEW memberExpression
            root_0 = this.adaptor.nil();

            NEW45=this.match(this.input,NEW,ECMAScript3ExtParser.FOLLOW_NEW_in_newExpression3544); 
            NEW45_tree = this.adaptor.create(NEW45);
            root_0 = this.adaptor.becomeRoot(NEW45_tree, root_0);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_memberExpression_in_newExpression3547);
            memberExpression46=this.memberExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, memberExpression46.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    arguments_return: (function() {
        ECMAScript3ExtParser.arguments_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.arguments_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1318:1: arguments : LPAREN ( assignmentExpression ( COMMA assignmentExpression )* )? RPAREN -> ^( ARGS ( assignmentExpression )* ) ;
    // $ANTLR start "arguments"
    arguments: function() {
        var retval = new ECMAScript3ExtParser.arguments_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LPAREN47 = null;
        var COMMA49 = null;
        var RPAREN51 = null;
         var assignmentExpression48 = null;
         var assignmentExpression50 = null;

        var LPAREN47_tree=null;
        var COMMA49_tree=null;
        var RPAREN51_tree=null;
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");
        var stream_assignmentExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assignmentExpression");
        try {
            // res/ECMAScript3Ext.g:1319:2: ( LPAREN ( assignmentExpression ( COMMA assignmentExpression )* )? RPAREN -> ^( ARGS ( assignmentExpression )* ) )
            // res/ECMAScript3Ext.g:1319:4: LPAREN ( assignmentExpression ( COMMA assignmentExpression )* )? RPAREN
            LPAREN47=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_arguments3559);  
            stream_LPAREN.add(LPAREN47);

            // res/ECMAScript3Ext.g:1319:11: ( assignmentExpression ( COMMA assignmentExpression )* )?
            var alt15=2;
            var LA15_0 = this.input.LA(1);

            if ( ((LA15_0>=NULL && LA15_0<=FALSE)||LA15_0==DELETE||LA15_0==FUNCTION||LA15_0==NEW||LA15_0==THIS||LA15_0==TYPEOF||LA15_0==VOID||LA15_0==LBRACE||LA15_0==LPAREN||LA15_0==LBRACK||(LA15_0>=ADD && LA15_0<=SUB)||(LA15_0>=INC && LA15_0<=DEC)||(LA15_0>=NOT && LA15_0<=INV)||(LA15_0>=Identifier && LA15_0<=StringLiteral)||LA15_0==RegularExpressionLiteral||(LA15_0>=DecimalLiteral && LA15_0<=HexIntegerLiteral)) ) {
                alt15=1;
            }
            switch (alt15) {
                case 1 :
                    // res/ECMAScript3Ext.g:1319:13: assignmentExpression ( COMMA assignmentExpression )*
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_arguments3563);
                    assignmentExpression48=this.assignmentExpression();

                    this.state._fsp--;

                    stream_assignmentExpression.add(assignmentExpression48.getTree());
                    // res/ECMAScript3Ext.g:1319:34: ( COMMA assignmentExpression )*
                    loop14:
                    do {
                        var alt14=2;
                        var LA14_0 = this.input.LA(1);

                        if ( (LA14_0==COMMA) ) {
                            alt14=1;
                        }


                        switch (alt14) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1319:36: COMMA assignmentExpression
                            COMMA49=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_arguments3567);  
                            stream_COMMA.add(COMMA49);

                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_arguments3569);
                            assignmentExpression50=this.assignmentExpression();

                            this.state._fsp--;

                            stream_assignmentExpression.add(assignmentExpression50.getTree());


                            break;

                        default :
                            break loop14;
                        }
                    } while (true);



                    break;

            }

            RPAREN51=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_arguments3577);  
            stream_RPAREN.add(RPAREN51);



            // AST REWRITE
            // elements: assignmentExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1320:2: -> ^( ARGS ( assignmentExpression )* )
            {
                // res/ECMAScript3Ext.g:1320:5: ^( ARGS ( assignmentExpression )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGS, "ARGS"), root_1);

                // res/ECMAScript3Ext.g:1320:13: ( assignmentExpression )*
                while ( stream_assignmentExpression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_assignmentExpression.nextTree());

                }
                stream_assignmentExpression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    leftHandSideExpression_return: (function() {
        ECMAScript3ExtParser.leftHandSideExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.leftHandSideExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1323:1: leftHandSideExpression : ( memberExpression -> memberExpression ) ( arguments -> ^( CALL $leftHandSideExpression arguments ) | LBRACK expression RBRACK -> ^( BYINDEX $leftHandSideExpression expression ) | DOT Identifier -> ^( BYFIELD $leftHandSideExpression Identifier ) )* ;
    // $ANTLR start "leftHandSideExpression"
    leftHandSideExpression: function() {
        var retval = new ECMAScript3ExtParser.leftHandSideExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LBRACK54 = null;
        var RBRACK56 = null;
        var DOT57 = null;
        var Identifier58 = null;
         var memberExpression52 = null;
         var arguments53 = null;
         var expression55 = null;

        var LBRACK54_tree=null;
        var RBRACK56_tree=null;
        var DOT57_tree=null;
        var Identifier58_tree=null;
        var stream_RBRACK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACK");
        var stream_LBRACK=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACK");
        var stream_DOT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DOT");
        var stream_Identifier=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token Identifier");
        var stream_memberExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule memberExpression");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_arguments=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule arguments");
        try {
            // res/ECMAScript3Ext.g:1324:2: ( ( memberExpression -> memberExpression ) ( arguments -> ^( CALL $leftHandSideExpression arguments ) | LBRACK expression RBRACK -> ^( BYINDEX $leftHandSideExpression expression ) | DOT Identifier -> ^( BYFIELD $leftHandSideExpression Identifier ) )* )
            // res/ECMAScript3Ext.g:1325:2: ( memberExpression -> memberExpression ) ( arguments -> ^( CALL $leftHandSideExpression arguments ) | LBRACK expression RBRACK -> ^( BYINDEX $leftHandSideExpression expression ) | DOT Identifier -> ^( BYFIELD $leftHandSideExpression Identifier ) )*
            // res/ECMAScript3Ext.g:1325:2: ( memberExpression -> memberExpression )
            // res/ECMAScript3Ext.g:1326:3: memberExpression
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_memberExpression_in_leftHandSideExpression3605);
            memberExpression52=this.memberExpression();

            this.state._fsp--;

            stream_memberExpression.add(memberExpression52.getTree());


            // AST REWRITE
            // elements: memberExpression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1326:22: -> memberExpression
            {
                this.adaptor.addChild(root_0, stream_memberExpression.nextTree());

            }

            retval.tree = root_0;


            // res/ECMAScript3Ext.g:1328:2: ( arguments -> ^( CALL $leftHandSideExpression arguments ) | LBRACK expression RBRACK -> ^( BYINDEX $leftHandSideExpression expression ) | DOT Identifier -> ^( BYFIELD $leftHandSideExpression Identifier ) )*
            loop16:
            do {
                var alt16=4;
                switch ( this.input.LA(1) ) {
                case LPAREN:
                    alt16=1;
                    break;
                case LBRACK:
                    alt16=2;
                    break;
                case DOT:
                    alt16=3;
                    break;

                }

                switch (alt16) {
                case 1 :
                    // res/ECMAScript3Ext.g:1329:3: arguments
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_arguments_in_leftHandSideExpression3621);
                    arguments53=this.arguments();

                    this.state._fsp--;

                    stream_arguments.add(arguments53.getTree());


                    // AST REWRITE
                    // elements: leftHandSideExpression, arguments
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1329:15: -> ^( CALL $leftHandSideExpression arguments )
                    {
                        // res/ECMAScript3Ext.g:1329:18: ^( CALL $leftHandSideExpression arguments )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(CALL, "CALL"), root_1);

                        this.adaptor.addChild(root_1, stream_retval.nextTree());
                        this.adaptor.addChild(root_1, stream_arguments.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;

                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1330:5: LBRACK expression RBRACK
                    LBRACK54=this.match(this.input,LBRACK,ECMAScript3ExtParser.FOLLOW_LBRACK_in_leftHandSideExpression3642);  
                    stream_LBRACK.add(LBRACK54);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_leftHandSideExpression3644);
                    expression55=this.expression();

                    this.state._fsp--;

                    stream_expression.add(expression55.getTree());
                    RBRACK56=this.match(this.input,RBRACK,ECMAScript3ExtParser.FOLLOW_RBRACK_in_leftHandSideExpression3646);  
                    stream_RBRACK.add(RBRACK56);



                    // AST REWRITE
                    // elements: expression, leftHandSideExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1330:30: -> ^( BYINDEX $leftHandSideExpression expression )
                    {
                        // res/ECMAScript3Ext.g:1330:33: ^( BYINDEX $leftHandSideExpression expression )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(BYINDEX, "BYINDEX"), root_1);

                        this.adaptor.addChild(root_1, stream_retval.nextTree());
                        this.adaptor.addChild(root_1, stream_expression.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;

                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1331:5: DOT Identifier
                    DOT57=this.match(this.input,DOT,ECMAScript3ExtParser.FOLLOW_DOT_in_leftHandSideExpression3665);  
                    stream_DOT.add(DOT57);

                    Identifier58=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_leftHandSideExpression3667);  
                    stream_Identifier.add(Identifier58);



                    // AST REWRITE
                    // elements: Identifier, leftHandSideExpression
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1331:21: -> ^( BYFIELD $leftHandSideExpression Identifier )
                    {
                        // res/ECMAScript3Ext.g:1331:24: ^( BYFIELD $leftHandSideExpression Identifier )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(BYFIELD, "BYFIELD"), root_1);

                        this.adaptor.addChild(root_1, stream_retval.nextTree());
                        this.adaptor.addChild(root_1, stream_Identifier.nextNode());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;

                    break;

                default :
                    break loop16;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    postfixExpression_return: (function() {
        ECMAScript3ExtParser.postfixExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.postfixExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1345:1: postfixExpression : leftHandSideExpression ( postfixOperator )? ;
    // $ANTLR start "postfixExpression"
    postfixExpression: function() {
        var retval = new ECMAScript3ExtParser.postfixExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var leftHandSideExpression59 = null;
         var postfixOperator60 = null;


        try {
            // res/ECMAScript3Ext.g:1346:2: ( leftHandSideExpression ( postfixOperator )? )
            // res/ECMAScript3Ext.g:1346:4: leftHandSideExpression ( postfixOperator )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_leftHandSideExpression_in_postfixExpression3702);
            leftHandSideExpression59=this.leftHandSideExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, leftHandSideExpression59.getTree());
             if (this.input.LA(1) == INC || this.input.LA(1) == DEC || this.input.LA(1) == NOT) this.promoteEOL(null); 
            // res/ECMAScript3Ext.g:1346:137: ( postfixOperator )?
            var alt17=2;
            var LA17_0 = this.input.LA(1);

            if ( ((LA17_0>=INC && LA17_0<=DEC)||LA17_0==NOT) ) {
                alt17=1;
            }
            switch (alt17) {
                case 1 :
                    // res/ECMAScript3Ext.g:1346:139: postfixOperator
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_postfixOperator_in_postfixExpression3708);
                    postfixOperator60=this.postfixOperator();

                    this.state._fsp--;

                    root_0 = this.adaptor.becomeRoot(postfixOperator60.getTree(), root_0);


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    postfixOperator_return: (function() {
        ECMAScript3ExtParser.postfixOperator_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.postfixOperator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1349:1: postfixOperator : (op= INC | op= DEC | op= NOT );
    // $ANTLR start "postfixOperator"
    postfixOperator: function() {
        var retval = new ECMAScript3ExtParser.postfixOperator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var op = null;

        var op_tree=null;

        try {
            // res/ECMAScript3Ext.g:1350:2: (op= INC | op= DEC | op= NOT )
            var alt18=3;
            switch ( this.input.LA(1) ) {
            case INC:
                alt18=1;
                break;
            case DEC:
                alt18=2;
                break;
            case NOT:
                alt18=3;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 18, 0, this.input);

                throw nvae;
            }

            switch (alt18) {
                case 1 :
                    // res/ECMAScript3Ext.g:1350:4: op= INC
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,INC,ECMAScript3ExtParser.FOLLOW_INC_in_postfixOperator3725); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(PINC); 


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1351:4: op= DEC
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,DEC,ECMAScript3ExtParser.FOLLOW_DEC_in_postfixOperator3734); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(PDEC); 


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1352:11: op= NOT
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,NOT,ECMAScript3ExtParser.FOLLOW_NOT_in_postfixOperator3750); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(FACTORIAL); 


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    powOperator_return: (function() {
        ECMAScript3ExtParser.powOperator_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.powOperator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1357:1: powOperator : ( POW | op= CARET );
    // $ANTLR start "powOperator"
    powOperator: function() {
        var retval = new ECMAScript3ExtParser.powOperator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var op = null;
        var POW61 = null;

        var op_tree=null;
        var POW61_tree=null;

        try {
            // res/ECMAScript3Ext.g:1358:9: ( POW | op= CARET )
            var alt19=2;
            var LA19_0 = this.input.LA(1);

            if ( (LA19_0==POW) ) {
                alt19=1;
            }
            else if ( (LA19_0==CARET) ) {
                alt19=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 19, 0, this.input);

                throw nvae;
            }
            switch (alt19) {
                case 1 :
                    // res/ECMAScript3Ext.g:1358:11: POW
                    root_0 = this.adaptor.nil();

                    POW61=this.match(this.input,POW,ECMAScript3ExtParser.FOLLOW_POW_in_powOperator3772); 
                    POW61_tree = this.adaptor.create(POW61);
                    this.adaptor.addChild(root_0, POW61_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1359:11: op= CARET
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,CARET,ECMAScript3ExtParser.FOLLOW_CARET_in_powOperator3786); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(POW); 


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    powExpression_return: (function() {
        ECMAScript3ExtParser.powExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.powExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1363:1: powExpression : postfixExpression ( options {greedy=true; } : powOperator unaryExpression )? ;
    // $ANTLR start "powExpression"
    powExpression: function() {
        var retval = new ECMAScript3ExtParser.powExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var postfixExpression62 = null;
         var powOperator63 = null;
         var unaryExpression64 = null;


        try {
            // res/ECMAScript3Ext.g:1364:9: ( postfixExpression ( options {greedy=true; } : powOperator unaryExpression )? )
            // res/ECMAScript3Ext.g:1364:11: postfixExpression ( options {greedy=true; } : powOperator unaryExpression )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_postfixExpression_in_powExpression3814);
            postfixExpression62=this.postfixExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, postfixExpression62.getTree());
            // res/ECMAScript3Ext.g:1364:29: ( options {greedy=true; } : powOperator unaryExpression )?
            var alt20=2;
            var LA20_0 = this.input.LA(1);

            if ( (LA20_0==POW||LA20_0==CARET) ) {
                alt20=1;
            }
            switch (alt20) {
                case 1 :
                    // res/ECMAScript3Ext.g:1364:54: powOperator unaryExpression
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_powOperator_in_powExpression3825);
                    powOperator63=this.powOperator();

                    this.state._fsp--;

                    root_0 = this.adaptor.becomeRoot(powOperator63.getTree(), root_0);
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_unaryExpression_in_powExpression3828);
                    unaryExpression64=this.unaryExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, unaryExpression64.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unaryExpression_return: (function() {
        ECMAScript3ExtParser.unaryExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.unaryExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1373:1: unaryExpression : ( unaryOperator unaryExpression | powExpression );
    // $ANTLR start "unaryExpression"
    unaryExpression: function() {
        var retval = new ECMAScript3ExtParser.unaryExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var unaryOperator65 = null;
         var unaryExpression66 = null;
         var powExpression67 = null;


        try {
            // res/ECMAScript3Ext.g:1374:2: ( unaryOperator unaryExpression | powExpression )
            var alt21=2;
            var LA21_0 = this.input.LA(1);

            if ( (LA21_0==DELETE||LA21_0==TYPEOF||LA21_0==VOID||(LA21_0>=ADD && LA21_0<=SUB)||(LA21_0>=INC && LA21_0<=DEC)||(LA21_0>=NOT && LA21_0<=INV)) ) {
                alt21=1;
            }
            else if ( ((LA21_0>=NULL && LA21_0<=FALSE)||LA21_0==FUNCTION||LA21_0==NEW||LA21_0==THIS||LA21_0==LBRACE||LA21_0==LPAREN||LA21_0==LBRACK||(LA21_0>=Identifier && LA21_0<=StringLiteral)||LA21_0==RegularExpressionLiteral||(LA21_0>=DecimalLiteral && LA21_0<=HexIntegerLiteral)) ) {
                alt21=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 21, 0, this.input);

                throw nvae;
            }
            switch (alt21) {
                case 1 :
                    // res/ECMAScript3Ext.g:1374:4: unaryOperator unaryExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_unaryOperator_in_unaryExpression3854);
                    unaryOperator65=this.unaryOperator();

                    this.state._fsp--;

                    root_0 = this.adaptor.becomeRoot(unaryOperator65.getTree(), root_0);
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_unaryExpression_in_unaryExpression3857);
                    unaryExpression66=this.unaryExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, unaryExpression66.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1375:11: powExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_powExpression_in_unaryExpression3869);
                    powExpression67=this.powExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, powExpression67.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    unaryOperator_return: (function() {
        ECMAScript3ExtParser.unaryOperator_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.unaryOperator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1378:1: unaryOperator : ( DELETE | VOID | TYPEOF | INC | DEC | op= ADD | op= SUB | INV | NOT );
    // $ANTLR start "unaryOperator"
    unaryOperator: function() {
        var retval = new ECMAScript3ExtParser.unaryOperator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var op = null;
        var DELETE68 = null;
        var VOID69 = null;
        var TYPEOF70 = null;
        var INC71 = null;
        var DEC72 = null;
        var INV73 = null;
        var NOT74 = null;

        var op_tree=null;
        var DELETE68_tree=null;
        var VOID69_tree=null;
        var TYPEOF70_tree=null;
        var INC71_tree=null;
        var DEC72_tree=null;
        var INV73_tree=null;
        var NOT74_tree=null;

        try {
            // res/ECMAScript3Ext.g:1379:2: ( DELETE | VOID | TYPEOF | INC | DEC | op= ADD | op= SUB | INV | NOT )
            var alt22=9;
            switch ( this.input.LA(1) ) {
            case DELETE:
                alt22=1;
                break;
            case VOID:
                alt22=2;
                break;
            case TYPEOF:
                alt22=3;
                break;
            case INC:
                alt22=4;
                break;
            case DEC:
                alt22=5;
                break;
            case ADD:
                alt22=6;
                break;
            case SUB:
                alt22=7;
                break;
            case INV:
                alt22=8;
                break;
            case NOT:
                alt22=9;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 22, 0, this.input);

                throw nvae;
            }

            switch (alt22) {
                case 1 :
                    // res/ECMAScript3Ext.g:1379:4: DELETE
                    root_0 = this.adaptor.nil();

                    DELETE68=this.match(this.input,DELETE,ECMAScript3ExtParser.FOLLOW_DELETE_in_unaryOperator3880); 
                    DELETE68_tree = this.adaptor.create(DELETE68);
                    this.adaptor.addChild(root_0, DELETE68_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1380:4: VOID
                    root_0 = this.adaptor.nil();

                    VOID69=this.match(this.input,VOID,ECMAScript3ExtParser.FOLLOW_VOID_in_unaryOperator3885); 
                    VOID69_tree = this.adaptor.create(VOID69);
                    this.adaptor.addChild(root_0, VOID69_tree);



                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1381:4: TYPEOF
                    root_0 = this.adaptor.nil();

                    TYPEOF70=this.match(this.input,TYPEOF,ECMAScript3ExtParser.FOLLOW_TYPEOF_in_unaryOperator3890); 
                    TYPEOF70_tree = this.adaptor.create(TYPEOF70);
                    this.adaptor.addChild(root_0, TYPEOF70_tree);



                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:1382:4: INC
                    root_0 = this.adaptor.nil();

                    INC71=this.match(this.input,INC,ECMAScript3ExtParser.FOLLOW_INC_in_unaryOperator3895); 
                    INC71_tree = this.adaptor.create(INC71);
                    this.adaptor.addChild(root_0, INC71_tree);



                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:1383:4: DEC
                    root_0 = this.adaptor.nil();

                    DEC72=this.match(this.input,DEC,ECMAScript3ExtParser.FOLLOW_DEC_in_unaryOperator3900); 
                    DEC72_tree = this.adaptor.create(DEC72);
                    this.adaptor.addChild(root_0, DEC72_tree);



                    break;
                case 6 :
                    // res/ECMAScript3Ext.g:1384:4: op= ADD
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,ADD,ECMAScript3ExtParser.FOLLOW_ADD_in_unaryOperator3907); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(POS); 


                    break;
                case 7 :
                    // res/ECMAScript3Ext.g:1385:4: op= SUB
                    root_0 = this.adaptor.nil();

                    op=this.match(this.input,SUB,ECMAScript3ExtParser.FOLLOW_SUB_in_unaryOperator3916); 
                    op_tree = this.adaptor.create(op);
                    this.adaptor.addChild(root_0, op_tree);

                     op.setType(NEG); 


                    break;
                case 8 :
                    // res/ECMAScript3Ext.g:1386:4: INV
                    root_0 = this.adaptor.nil();

                    INV73=this.match(this.input,INV,ECMAScript3ExtParser.FOLLOW_INV_in_unaryOperator3923); 
                    INV73_tree = this.adaptor.create(INV73);
                    this.adaptor.addChild(root_0, INV73_tree);



                    break;
                case 9 :
                    // res/ECMAScript3Ext.g:1387:4: NOT
                    root_0 = this.adaptor.nil();

                    NOT74=this.match(this.input,NOT,ECMAScript3ExtParser.FOLLOW_NOT_in_unaryOperator3928); 
                    NOT74_tree = this.adaptor.create(NOT74);
                    this.adaptor.addChild(root_0, NOT74_tree);



                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    multiplicativeExpression_return: (function() {
        ECMAScript3ExtParser.multiplicativeExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.multiplicativeExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1394:1: multiplicativeExpression : unaryExpression ( ( MUL | DIV | MOD ) unaryExpression )* ;
    // $ANTLR start "multiplicativeExpression"
    multiplicativeExpression: function() {
        var retval = new ECMAScript3ExtParser.multiplicativeExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set76 = null;
         var unaryExpression75 = null;
         var unaryExpression77 = null;

        var set76_tree=null;

        try {
            // res/ECMAScript3Ext.g:1395:2: ( unaryExpression ( ( MUL | DIV | MOD ) unaryExpression )* )
            // res/ECMAScript3Ext.g:1395:4: unaryExpression ( ( MUL | DIV | MOD ) unaryExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_unaryExpression_in_multiplicativeExpression3943);
            unaryExpression75=this.unaryExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, unaryExpression75.getTree());
            // res/ECMAScript3Ext.g:1395:20: ( ( MUL | DIV | MOD ) unaryExpression )*
            loop23:
            do {
                var alt23=2;
                var LA23_0 = this.input.LA(1);

                if ( ((LA23_0>=MUL && LA23_0<=MOD)||LA23_0==DIV) ) {
                    alt23=1;
                }


                switch (alt23) {
                case 1 :
                    // res/ECMAScript3Ext.g:1395:22: ( MUL | DIV | MOD ) unaryExpression
                    set76=null;
                    set76=this.input.LT(1);
                    if ( (this.input.LA(1)>=MUL && this.input.LA(1)<=MOD)||this.input.LA(1)==DIV ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set76), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_unaryExpression_in_multiplicativeExpression3962);
                    unaryExpression77=this.unaryExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, unaryExpression77.getTree());


                    break;

                default :
                    break loop23;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    additiveExpression_return: (function() {
        ECMAScript3ExtParser.additiveExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.additiveExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1402:1: additiveExpression : multiplicativeExpression ( ( ADD | SUB ) multiplicativeExpression )* ;
    // $ANTLR start "additiveExpression"
    additiveExpression: function() {
        var retval = new ECMAScript3ExtParser.additiveExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set79 = null;
         var multiplicativeExpression78 = null;
         var multiplicativeExpression80 = null;

        var set79_tree=null;

        try {
            // res/ECMAScript3Ext.g:1403:2: ( multiplicativeExpression ( ( ADD | SUB ) multiplicativeExpression )* )
            // res/ECMAScript3Ext.g:1403:4: multiplicativeExpression ( ( ADD | SUB ) multiplicativeExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_multiplicativeExpression_in_additiveExpression3980);
            multiplicativeExpression78=this.multiplicativeExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, multiplicativeExpression78.getTree());
            // res/ECMAScript3Ext.g:1403:29: ( ( ADD | SUB ) multiplicativeExpression )*
            loop24:
            do {
                var alt24=2;
                var LA24_0 = this.input.LA(1);

                if ( ((LA24_0>=ADD && LA24_0<=SUB)) ) {
                    alt24=1;
                }


                switch (alt24) {
                case 1 :
                    // res/ECMAScript3Ext.g:1403:31: ( ADD | SUB ) multiplicativeExpression
                    set79=null;
                    set79=this.input.LT(1);
                    if ( (this.input.LA(1)>=ADD && this.input.LA(1)<=SUB) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set79), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_multiplicativeExpression_in_additiveExpression3995);
                    multiplicativeExpression80=this.multiplicativeExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, multiplicativeExpression80.getTree());


                    break;

                default :
                    break loop24;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    shiftExpression_return: (function() {
        ECMAScript3ExtParser.shiftExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.shiftExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1410:1: shiftExpression : additiveExpression ( ( SHL | SHR | SHU ) additiveExpression )* ;
    // $ANTLR start "shiftExpression"
    shiftExpression: function() {
        var retval = new ECMAScript3ExtParser.shiftExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set82 = null;
         var additiveExpression81 = null;
         var additiveExpression83 = null;

        var set82_tree=null;

        try {
            // res/ECMAScript3Ext.g:1411:2: ( additiveExpression ( ( SHL | SHR | SHU ) additiveExpression )* )
            // res/ECMAScript3Ext.g:1411:4: additiveExpression ( ( SHL | SHR | SHU ) additiveExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_additiveExpression_in_shiftExpression4013);
            additiveExpression81=this.additiveExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, additiveExpression81.getTree());
            // res/ECMAScript3Ext.g:1411:23: ( ( SHL | SHR | SHU ) additiveExpression )*
            loop25:
            do {
                var alt25=2;
                var LA25_0 = this.input.LA(1);

                if ( ((LA25_0>=SHL && LA25_0<=SHU)) ) {
                    alt25=1;
                }


                switch (alt25) {
                case 1 :
                    // res/ECMAScript3Ext.g:1411:25: ( SHL | SHR | SHU ) additiveExpression
                    set82=null;
                    set82=this.input.LT(1);
                    if ( (this.input.LA(1)>=SHL && this.input.LA(1)<=SHU) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set82), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_additiveExpression_in_shiftExpression4032);
                    additiveExpression83=this.additiveExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, additiveExpression83.getTree());


                    break;

                default :
                    break loop25;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    relationalExpression_return: (function() {
        ECMAScript3ExtParser.relationalExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.relationalExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1418:1: relationalExpression : shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF | IN ) shiftExpression )* ;
    // $ANTLR start "relationalExpression"
    relationalExpression: function() {
        var retval = new ECMAScript3ExtParser.relationalExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set85 = null;
         var shiftExpression84 = null;
         var shiftExpression86 = null;

        var set85_tree=null;

        try {
            // res/ECMAScript3Ext.g:1419:2: ( shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF | IN ) shiftExpression )* )
            // res/ECMAScript3Ext.g:1419:4: shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF | IN ) shiftExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_shiftExpression_in_relationalExpression4050);
            shiftExpression84=this.shiftExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, shiftExpression84.getTree());
            // res/ECMAScript3Ext.g:1419:20: ( ( LT | GT | LTE | GTE | INSTANCEOF | IN ) shiftExpression )*
            loop26:
            do {
                var alt26=2;
                var LA26_0 = this.input.LA(1);

                if ( ((LA26_0>=IN && LA26_0<=INSTANCEOF)||(LA26_0>=LT && LA26_0<=GTE)) ) {
                    alt26=1;
                }


                switch (alt26) {
                case 1 :
                    // res/ECMAScript3Ext.g:1419:22: ( LT | GT | LTE | GTE | INSTANCEOF | IN ) shiftExpression
                    set85=null;
                    set85=this.input.LT(1);
                    if ( (this.input.LA(1)>=IN && this.input.LA(1)<=INSTANCEOF)||(this.input.LA(1)>=LT && this.input.LA(1)<=GTE) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set85), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_shiftExpression_in_relationalExpression4081);
                    shiftExpression86=this.shiftExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, shiftExpression86.getTree());


                    break;

                default :
                    break loop26;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    relationalExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.relationalExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.relationalExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1422:1: relationalExpressionNoIn : shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF ) shiftExpression )* ;
    // $ANTLR start "relationalExpressionNoIn"
    relationalExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.relationalExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set88 = null;
         var shiftExpression87 = null;
         var shiftExpression89 = null;

        var set88_tree=null;

        try {
            // res/ECMAScript3Ext.g:1423:2: ( shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF ) shiftExpression )* )
            // res/ECMAScript3Ext.g:1423:4: shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF ) shiftExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_shiftExpression_in_relationalExpressionNoIn4095);
            shiftExpression87=this.shiftExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, shiftExpression87.getTree());
            // res/ECMAScript3Ext.g:1423:20: ( ( LT | GT | LTE | GTE | INSTANCEOF ) shiftExpression )*
            loop27:
            do {
                var alt27=2;
                var LA27_0 = this.input.LA(1);

                if ( (LA27_0==INSTANCEOF||(LA27_0>=LT && LA27_0<=GTE)) ) {
                    alt27=1;
                }


                switch (alt27) {
                case 1 :
                    // res/ECMAScript3Ext.g:1423:22: ( LT | GT | LTE | GTE | INSTANCEOF ) shiftExpression
                    set88=null;
                    set88=this.input.LT(1);
                    if ( this.input.LA(1)==INSTANCEOF||(this.input.LA(1)>=LT && this.input.LA(1)<=GTE) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set88), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_shiftExpression_in_relationalExpressionNoIn4122);
                    shiftExpression89=this.shiftExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, shiftExpression89.getTree());


                    break;

                default :
                    break loop27;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    equalityExpression_return: (function() {
        ECMAScript3ExtParser.equalityExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.equalityExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1430:1: equalityExpression : relationalExpression ( ( EQ | NEQ | SAME | NSAME ) relationalExpression )* ;
    // $ANTLR start "equalityExpression"
    equalityExpression: function() {
        var retval = new ECMAScript3ExtParser.equalityExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set91 = null;
         var relationalExpression90 = null;
         var relationalExpression92 = null;

        var set91_tree=null;

        try {
            // res/ECMAScript3Ext.g:1431:2: ( relationalExpression ( ( EQ | NEQ | SAME | NSAME ) relationalExpression )* )
            // res/ECMAScript3Ext.g:1431:4: relationalExpression ( ( EQ | NEQ | SAME | NSAME ) relationalExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_relationalExpression_in_equalityExpression4140);
            relationalExpression90=this.relationalExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, relationalExpression90.getTree());
            // res/ECMAScript3Ext.g:1431:25: ( ( EQ | NEQ | SAME | NSAME ) relationalExpression )*
            loop28:
            do {
                var alt28=2;
                var LA28_0 = this.input.LA(1);

                if ( ((LA28_0>=EQ && LA28_0<=NSAME)) ) {
                    alt28=1;
                }


                switch (alt28) {
                case 1 :
                    // res/ECMAScript3Ext.g:1431:27: ( EQ | NEQ | SAME | NSAME ) relationalExpression
                    set91=null;
                    set91=this.input.LT(1);
                    if ( (this.input.LA(1)>=EQ && this.input.LA(1)<=NSAME) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set91), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_relationalExpression_in_equalityExpression4163);
                    relationalExpression92=this.relationalExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, relationalExpression92.getTree());


                    break;

                default :
                    break loop28;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    equalityExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.equalityExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.equalityExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1434:1: equalityExpressionNoIn : relationalExpressionNoIn ( ( EQ | NEQ | SAME | NSAME ) relationalExpressionNoIn )* ;
    // $ANTLR start "equalityExpressionNoIn"
    equalityExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.equalityExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set94 = null;
         var relationalExpressionNoIn93 = null;
         var relationalExpressionNoIn95 = null;

        var set94_tree=null;

        try {
            // res/ECMAScript3Ext.g:1435:2: ( relationalExpressionNoIn ( ( EQ | NEQ | SAME | NSAME ) relationalExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1435:4: relationalExpressionNoIn ( ( EQ | NEQ | SAME | NSAME ) relationalExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_relationalExpressionNoIn_in_equalityExpressionNoIn4177);
            relationalExpressionNoIn93=this.relationalExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, relationalExpressionNoIn93.getTree());
            // res/ECMAScript3Ext.g:1435:29: ( ( EQ | NEQ | SAME | NSAME ) relationalExpressionNoIn )*
            loop29:
            do {
                var alt29=2;
                var LA29_0 = this.input.LA(1);

                if ( ((LA29_0>=EQ && LA29_0<=NSAME)) ) {
                    alt29=1;
                }


                switch (alt29) {
                case 1 :
                    // res/ECMAScript3Ext.g:1435:31: ( EQ | NEQ | SAME | NSAME ) relationalExpressionNoIn
                    set94=null;
                    set94=this.input.LT(1);
                    if ( (this.input.LA(1)>=EQ && this.input.LA(1)<=NSAME) ) {
                        this.input.consume();
                        root_0 = this.adaptor.becomeRoot(this.adaptor.create(set94), root_0);
                        this.state.errorRecovery=false;
                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_relationalExpressionNoIn_in_equalityExpressionNoIn4200);
                    relationalExpressionNoIn95=this.relationalExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, relationalExpressionNoIn95.getTree());


                    break;

                default :
                    break loop29;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseANDExpression_return: (function() {
        ECMAScript3ExtParser.bitwiseANDExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseANDExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1442:1: bitwiseANDExpression : equalityExpression ( AND equalityExpression )* ;
    // $ANTLR start "bitwiseANDExpression"
    bitwiseANDExpression: function() {
        var retval = new ECMAScript3ExtParser.bitwiseANDExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var AND97 = null;
         var equalityExpression96 = null;
         var equalityExpression98 = null;

        var AND97_tree=null;

        try {
            // res/ECMAScript3Ext.g:1443:2: ( equalityExpression ( AND equalityExpression )* )
            // res/ECMAScript3Ext.g:1443:4: equalityExpression ( AND equalityExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_equalityExpression_in_bitwiseANDExpression4218);
            equalityExpression96=this.equalityExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, equalityExpression96.getTree());
            // res/ECMAScript3Ext.g:1443:23: ( AND equalityExpression )*
            loop30:
            do {
                var alt30=2;
                var LA30_0 = this.input.LA(1);

                if ( (LA30_0==AND) ) {
                    alt30=1;
                }


                switch (alt30) {
                case 1 :
                    // res/ECMAScript3Ext.g:1443:25: AND equalityExpression
                    AND97=this.match(this.input,AND,ECMAScript3ExtParser.FOLLOW_AND_in_bitwiseANDExpression4222); 
                    AND97_tree = this.adaptor.create(AND97);
                    root_0 = this.adaptor.becomeRoot(AND97_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_equalityExpression_in_bitwiseANDExpression4225);
                    equalityExpression98=this.equalityExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, equalityExpression98.getTree());


                    break;

                default :
                    break loop30;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseANDExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.bitwiseANDExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseANDExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1446:1: bitwiseANDExpressionNoIn : equalityExpressionNoIn ( AND equalityExpressionNoIn )* ;
    // $ANTLR start "bitwiseANDExpressionNoIn"
    bitwiseANDExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.bitwiseANDExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var AND100 = null;
         var equalityExpressionNoIn99 = null;
         var equalityExpressionNoIn101 = null;

        var AND100_tree=null;

        try {
            // res/ECMAScript3Ext.g:1447:2: ( equalityExpressionNoIn ( AND equalityExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1447:4: equalityExpressionNoIn ( AND equalityExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_equalityExpressionNoIn_in_bitwiseANDExpressionNoIn4239);
            equalityExpressionNoIn99=this.equalityExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, equalityExpressionNoIn99.getTree());
            // res/ECMAScript3Ext.g:1447:27: ( AND equalityExpressionNoIn )*
            loop31:
            do {
                var alt31=2;
                var LA31_0 = this.input.LA(1);

                if ( (LA31_0==AND) ) {
                    alt31=1;
                }


                switch (alt31) {
                case 1 :
                    // res/ECMAScript3Ext.g:1447:29: AND equalityExpressionNoIn
                    AND100=this.match(this.input,AND,ECMAScript3ExtParser.FOLLOW_AND_in_bitwiseANDExpressionNoIn4243); 
                    AND100_tree = this.adaptor.create(AND100);
                    root_0 = this.adaptor.becomeRoot(AND100_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_equalityExpressionNoIn_in_bitwiseANDExpressionNoIn4246);
                    equalityExpressionNoIn101=this.equalityExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, equalityExpressionNoIn101.getTree());


                    break;

                default :
                    break loop31;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseXORExpression_return: (function() {
        ECMAScript3ExtParser.bitwiseXORExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseXORExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1450:1: bitwiseXORExpression : bitwiseANDExpression ( XOR bitwiseANDExpression )* ;
    // $ANTLR start "bitwiseXORExpression"
    bitwiseXORExpression: function() {
        var retval = new ECMAScript3ExtParser.bitwiseXORExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var XOR103 = null;
         var bitwiseANDExpression102 = null;
         var bitwiseANDExpression104 = null;

        var XOR103_tree=null;

        try {
            // res/ECMAScript3Ext.g:1451:2: ( bitwiseANDExpression ( XOR bitwiseANDExpression )* )
            // res/ECMAScript3Ext.g:1451:4: bitwiseANDExpression ( XOR bitwiseANDExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseANDExpression_in_bitwiseXORExpression4260);
            bitwiseANDExpression102=this.bitwiseANDExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseANDExpression102.getTree());
            // res/ECMAScript3Ext.g:1451:25: ( XOR bitwiseANDExpression )*
            loop32:
            do {
                var alt32=2;
                var LA32_0 = this.input.LA(1);

                if ( (LA32_0==XOR) ) {
                    alt32=1;
                }


                switch (alt32) {
                case 1 :
                    // res/ECMAScript3Ext.g:1451:27: XOR bitwiseANDExpression
                    XOR103=this.match(this.input,XOR,ECMAScript3ExtParser.FOLLOW_XOR_in_bitwiseXORExpression4264); 
                    XOR103_tree = this.adaptor.create(XOR103);
                    root_0 = this.adaptor.becomeRoot(XOR103_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseANDExpression_in_bitwiseXORExpression4267);
                    bitwiseANDExpression104=this.bitwiseANDExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseANDExpression104.getTree());


                    break;

                default :
                    break loop32;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseXORExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.bitwiseXORExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseXORExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1454:1: bitwiseXORExpressionNoIn : bitwiseANDExpressionNoIn ( XOR bitwiseANDExpressionNoIn )* ;
    // $ANTLR start "bitwiseXORExpressionNoIn"
    bitwiseXORExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.bitwiseXORExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var XOR106 = null;
         var bitwiseANDExpressionNoIn105 = null;
         var bitwiseANDExpressionNoIn107 = null;

        var XOR106_tree=null;

        try {
            // res/ECMAScript3Ext.g:1455:2: ( bitwiseANDExpressionNoIn ( XOR bitwiseANDExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1455:4: bitwiseANDExpressionNoIn ( XOR bitwiseANDExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseANDExpressionNoIn_in_bitwiseXORExpressionNoIn4281);
            bitwiseANDExpressionNoIn105=this.bitwiseANDExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseANDExpressionNoIn105.getTree());
            // res/ECMAScript3Ext.g:1455:29: ( XOR bitwiseANDExpressionNoIn )*
            loop33:
            do {
                var alt33=2;
                var LA33_0 = this.input.LA(1);

                if ( (LA33_0==XOR) ) {
                    alt33=1;
                }


                switch (alt33) {
                case 1 :
                    // res/ECMAScript3Ext.g:1455:31: XOR bitwiseANDExpressionNoIn
                    XOR106=this.match(this.input,XOR,ECMAScript3ExtParser.FOLLOW_XOR_in_bitwiseXORExpressionNoIn4285); 
                    XOR106_tree = this.adaptor.create(XOR106);
                    root_0 = this.adaptor.becomeRoot(XOR106_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseANDExpressionNoIn_in_bitwiseXORExpressionNoIn4288);
                    bitwiseANDExpressionNoIn107=this.bitwiseANDExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseANDExpressionNoIn107.getTree());


                    break;

                default :
                    break loop33;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseORExpression_return: (function() {
        ECMAScript3ExtParser.bitwiseORExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseORExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1458:1: bitwiseORExpression : bitwiseXORExpression ( OR bitwiseXORExpression )* ;
    // $ANTLR start "bitwiseORExpression"
    bitwiseORExpression: function() {
        var retval = new ECMAScript3ExtParser.bitwiseORExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var OR109 = null;
         var bitwiseXORExpression108 = null;
         var bitwiseXORExpression110 = null;

        var OR109_tree=null;

        try {
            // res/ECMAScript3Ext.g:1459:2: ( bitwiseXORExpression ( OR bitwiseXORExpression )* )
            // res/ECMAScript3Ext.g:1459:4: bitwiseXORExpression ( OR bitwiseXORExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseXORExpression_in_bitwiseORExpression4302);
            bitwiseXORExpression108=this.bitwiseXORExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseXORExpression108.getTree());
            // res/ECMAScript3Ext.g:1459:25: ( OR bitwiseXORExpression )*
            loop34:
            do {
                var alt34=2;
                var LA34_0 = this.input.LA(1);

                if ( (LA34_0==OR) ) {
                    alt34=1;
                }


                switch (alt34) {
                case 1 :
                    // res/ECMAScript3Ext.g:1459:27: OR bitwiseXORExpression
                    OR109=this.match(this.input,OR,ECMAScript3ExtParser.FOLLOW_OR_in_bitwiseORExpression4306); 
                    OR109_tree = this.adaptor.create(OR109);
                    root_0 = this.adaptor.becomeRoot(OR109_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseXORExpression_in_bitwiseORExpression4309);
                    bitwiseXORExpression110=this.bitwiseXORExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseXORExpression110.getTree());


                    break;

                default :
                    break loop34;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    bitwiseORExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.bitwiseORExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.bitwiseORExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1462:1: bitwiseORExpressionNoIn : bitwiseXORExpressionNoIn ( OR bitwiseXORExpressionNoIn )* ;
    // $ANTLR start "bitwiseORExpressionNoIn"
    bitwiseORExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.bitwiseORExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var OR112 = null;
         var bitwiseXORExpressionNoIn111 = null;
         var bitwiseXORExpressionNoIn113 = null;

        var OR112_tree=null;

        try {
            // res/ECMAScript3Ext.g:1463:2: ( bitwiseXORExpressionNoIn ( OR bitwiseXORExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1463:4: bitwiseXORExpressionNoIn ( OR bitwiseXORExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseXORExpressionNoIn_in_bitwiseORExpressionNoIn4323);
            bitwiseXORExpressionNoIn111=this.bitwiseXORExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseXORExpressionNoIn111.getTree());
            // res/ECMAScript3Ext.g:1463:29: ( OR bitwiseXORExpressionNoIn )*
            loop35:
            do {
                var alt35=2;
                var LA35_0 = this.input.LA(1);

                if ( (LA35_0==OR) ) {
                    alt35=1;
                }


                switch (alt35) {
                case 1 :
                    // res/ECMAScript3Ext.g:1463:31: OR bitwiseXORExpressionNoIn
                    OR112=this.match(this.input,OR,ECMAScript3ExtParser.FOLLOW_OR_in_bitwiseORExpressionNoIn4327); 
                    OR112_tree = this.adaptor.create(OR112);
                    root_0 = this.adaptor.becomeRoot(OR112_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseXORExpressionNoIn_in_bitwiseORExpressionNoIn4330);
                    bitwiseXORExpressionNoIn113=this.bitwiseXORExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseXORExpressionNoIn113.getTree());


                    break;

                default :
                    break loop35;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    logicalANDExpression_return: (function() {
        ECMAScript3ExtParser.logicalANDExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.logicalANDExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1470:1: logicalANDExpression : bitwiseORExpression ( LAND bitwiseORExpression )* ;
    // $ANTLR start "logicalANDExpression"
    logicalANDExpression: function() {
        var retval = new ECMAScript3ExtParser.logicalANDExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LAND115 = null;
         var bitwiseORExpression114 = null;
         var bitwiseORExpression116 = null;

        var LAND115_tree=null;

        try {
            // res/ECMAScript3Ext.g:1471:2: ( bitwiseORExpression ( LAND bitwiseORExpression )* )
            // res/ECMAScript3Ext.g:1471:4: bitwiseORExpression ( LAND bitwiseORExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseORExpression_in_logicalANDExpression4348);
            bitwiseORExpression114=this.bitwiseORExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseORExpression114.getTree());
            // res/ECMAScript3Ext.g:1471:24: ( LAND bitwiseORExpression )*
            loop36:
            do {
                var alt36=2;
                var LA36_0 = this.input.LA(1);

                if ( (LA36_0==LAND) ) {
                    alt36=1;
                }


                switch (alt36) {
                case 1 :
                    // res/ECMAScript3Ext.g:1471:26: LAND bitwiseORExpression
                    LAND115=this.match(this.input,LAND,ECMAScript3ExtParser.FOLLOW_LAND_in_logicalANDExpression4352); 
                    LAND115_tree = this.adaptor.create(LAND115);
                    root_0 = this.adaptor.becomeRoot(LAND115_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseORExpression_in_logicalANDExpression4355);
                    bitwiseORExpression116=this.bitwiseORExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseORExpression116.getTree());


                    break;

                default :
                    break loop36;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    logicalANDExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.logicalANDExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.logicalANDExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1474:1: logicalANDExpressionNoIn : bitwiseORExpressionNoIn ( LAND bitwiseORExpressionNoIn )* ;
    // $ANTLR start "logicalANDExpressionNoIn"
    logicalANDExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.logicalANDExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LAND118 = null;
         var bitwiseORExpressionNoIn117 = null;
         var bitwiseORExpressionNoIn119 = null;

        var LAND118_tree=null;

        try {
            // res/ECMAScript3Ext.g:1475:2: ( bitwiseORExpressionNoIn ( LAND bitwiseORExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1475:4: bitwiseORExpressionNoIn ( LAND bitwiseORExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseORExpressionNoIn_in_logicalANDExpressionNoIn4369);
            bitwiseORExpressionNoIn117=this.bitwiseORExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, bitwiseORExpressionNoIn117.getTree());
            // res/ECMAScript3Ext.g:1475:28: ( LAND bitwiseORExpressionNoIn )*
            loop37:
            do {
                var alt37=2;
                var LA37_0 = this.input.LA(1);

                if ( (LA37_0==LAND) ) {
                    alt37=1;
                }


                switch (alt37) {
                case 1 :
                    // res/ECMAScript3Ext.g:1475:30: LAND bitwiseORExpressionNoIn
                    LAND118=this.match(this.input,LAND,ECMAScript3ExtParser.FOLLOW_LAND_in_logicalANDExpressionNoIn4373); 
                    LAND118_tree = this.adaptor.create(LAND118);
                    root_0 = this.adaptor.becomeRoot(LAND118_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_bitwiseORExpressionNoIn_in_logicalANDExpressionNoIn4376);
                    bitwiseORExpressionNoIn119=this.bitwiseORExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, bitwiseORExpressionNoIn119.getTree());


                    break;

                default :
                    break loop37;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    logicalORExpression_return: (function() {
        ECMAScript3ExtParser.logicalORExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.logicalORExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1478:1: logicalORExpression : logicalANDExpression ( LOR logicalANDExpression )* ;
    // $ANTLR start "logicalORExpression"
    logicalORExpression: function() {
        var retval = new ECMAScript3ExtParser.logicalORExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LOR121 = null;
         var logicalANDExpression120 = null;
         var logicalANDExpression122 = null;

        var LOR121_tree=null;

        try {
            // res/ECMAScript3Ext.g:1479:2: ( logicalANDExpression ( LOR logicalANDExpression )* )
            // res/ECMAScript3Ext.g:1479:4: logicalANDExpression ( LOR logicalANDExpression )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalANDExpression_in_logicalORExpression4390);
            logicalANDExpression120=this.logicalANDExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, logicalANDExpression120.getTree());
            // res/ECMAScript3Ext.g:1479:25: ( LOR logicalANDExpression )*
            loop38:
            do {
                var alt38=2;
                var LA38_0 = this.input.LA(1);

                if ( (LA38_0==LOR) ) {
                    alt38=1;
                }


                switch (alt38) {
                case 1 :
                    // res/ECMAScript3Ext.g:1479:27: LOR logicalANDExpression
                    LOR121=this.match(this.input,LOR,ECMAScript3ExtParser.FOLLOW_LOR_in_logicalORExpression4394); 
                    LOR121_tree = this.adaptor.create(LOR121);
                    root_0 = this.adaptor.becomeRoot(LOR121_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalANDExpression_in_logicalORExpression4397);
                    logicalANDExpression122=this.logicalANDExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, logicalANDExpression122.getTree());


                    break;

                default :
                    break loop38;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    logicalORExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.logicalORExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.logicalORExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1482:1: logicalORExpressionNoIn : logicalANDExpressionNoIn ( LOR logicalANDExpressionNoIn )* ;
    // $ANTLR start "logicalORExpressionNoIn"
    logicalORExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.logicalORExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LOR124 = null;
         var logicalANDExpressionNoIn123 = null;
         var logicalANDExpressionNoIn125 = null;

        var LOR124_tree=null;

        try {
            // res/ECMAScript3Ext.g:1483:2: ( logicalANDExpressionNoIn ( LOR logicalANDExpressionNoIn )* )
            // res/ECMAScript3Ext.g:1483:4: logicalANDExpressionNoIn ( LOR logicalANDExpressionNoIn )*
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalANDExpressionNoIn_in_logicalORExpressionNoIn4411);
            logicalANDExpressionNoIn123=this.logicalANDExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, logicalANDExpressionNoIn123.getTree());
            // res/ECMAScript3Ext.g:1483:29: ( LOR logicalANDExpressionNoIn )*
            loop39:
            do {
                var alt39=2;
                var LA39_0 = this.input.LA(1);

                if ( (LA39_0==LOR) ) {
                    alt39=1;
                }


                switch (alt39) {
                case 1 :
                    // res/ECMAScript3Ext.g:1483:31: LOR logicalANDExpressionNoIn
                    LOR124=this.match(this.input,LOR,ECMAScript3ExtParser.FOLLOW_LOR_in_logicalORExpressionNoIn4415); 
                    LOR124_tree = this.adaptor.create(LOR124);
                    root_0 = this.adaptor.becomeRoot(LOR124_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalANDExpressionNoIn_in_logicalORExpressionNoIn4418);
                    logicalANDExpressionNoIn125=this.logicalANDExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, logicalANDExpressionNoIn125.getTree());


                    break;

                default :
                    break loop39;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    conditionalExpression_return: (function() {
        ECMAScript3ExtParser.conditionalExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.conditionalExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1490:1: conditionalExpression : logicalORExpression ( QUE assignmentExpression COLON assignmentExpression )? ;
    // $ANTLR start "conditionalExpression"
    conditionalExpression: function() {
        var retval = new ECMAScript3ExtParser.conditionalExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var QUE127 = null;
        var COLON129 = null;
         var logicalORExpression126 = null;
         var assignmentExpression128 = null;
         var assignmentExpression130 = null;

        var QUE127_tree=null;
        var COLON129_tree=null;

        try {
            // res/ECMAScript3Ext.g:1491:2: ( logicalORExpression ( QUE assignmentExpression COLON assignmentExpression )? )
            // res/ECMAScript3Ext.g:1491:4: logicalORExpression ( QUE assignmentExpression COLON assignmentExpression )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalORExpression_in_conditionalExpression4436);
            logicalORExpression126=this.logicalORExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, logicalORExpression126.getTree());
            // res/ECMAScript3Ext.g:1491:24: ( QUE assignmentExpression COLON assignmentExpression )?
            var alt40=2;
            var LA40_0 = this.input.LA(1);

            if ( (LA40_0==QUE) ) {
                alt40=1;
            }
            switch (alt40) {
                case 1 :
                    // res/ECMAScript3Ext.g:1491:26: QUE assignmentExpression COLON assignmentExpression
                    QUE127=this.match(this.input,QUE,ECMAScript3ExtParser.FOLLOW_QUE_in_conditionalExpression4440); 
                    QUE127_tree = this.adaptor.create(QUE127);
                    root_0 = this.adaptor.becomeRoot(QUE127_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_conditionalExpression4443);
                    assignmentExpression128=this.assignmentExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpression128.getTree());
                    COLON129=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_conditionalExpression4445); 
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_conditionalExpression4448);
                    assignmentExpression130=this.assignmentExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpression130.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    conditionalExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.conditionalExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.conditionalExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1494:1: conditionalExpressionNoIn : logicalORExpressionNoIn ( QUE assignmentExpressionNoIn COLON assignmentExpressionNoIn )? ;
    // $ANTLR start "conditionalExpressionNoIn"
    conditionalExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.conditionalExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var QUE132 = null;
        var COLON134 = null;
         var logicalORExpressionNoIn131 = null;
         var assignmentExpressionNoIn133 = null;
         var assignmentExpressionNoIn135 = null;

        var QUE132_tree=null;
        var COLON134_tree=null;

        try {
            // res/ECMAScript3Ext.g:1495:2: ( logicalORExpressionNoIn ( QUE assignmentExpressionNoIn COLON assignmentExpressionNoIn )? )
            // res/ECMAScript3Ext.g:1495:4: logicalORExpressionNoIn ( QUE assignmentExpressionNoIn COLON assignmentExpressionNoIn )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_logicalORExpressionNoIn_in_conditionalExpressionNoIn4462);
            logicalORExpressionNoIn131=this.logicalORExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, logicalORExpressionNoIn131.getTree());
            // res/ECMAScript3Ext.g:1495:28: ( QUE assignmentExpressionNoIn COLON assignmentExpressionNoIn )?
            var alt41=2;
            var LA41_0 = this.input.LA(1);

            if ( (LA41_0==QUE) ) {
                alt41=1;
            }
            switch (alt41) {
                case 1 :
                    // res/ECMAScript3Ext.g:1495:30: QUE assignmentExpressionNoIn COLON assignmentExpressionNoIn
                    QUE132=this.match(this.input,QUE,ECMAScript3ExtParser.FOLLOW_QUE_in_conditionalExpressionNoIn4466); 
                    QUE132_tree = this.adaptor.create(QUE132);
                    root_0 = this.adaptor.becomeRoot(QUE132_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_conditionalExpressionNoIn4469);
                    assignmentExpressionNoIn133=this.assignmentExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpressionNoIn133.getTree());
                    COLON134=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_conditionalExpressionNoIn4471); 
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_conditionalExpressionNoIn4474);
                    assignmentExpressionNoIn135=this.assignmentExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpressionNoIn135.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    assignmentExpression_return: (function() {
        ECMAScript3ExtParser.assignmentExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.assignmentExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1525:1: assignmentExpression : lhs= conditionalExpression ({...}? assignmentOperator assignmentExpression )? ;
    // $ANTLR start "assignmentExpression"
    assignmentExpression: function() {
        var retval = new ECMAScript3ExtParser.assignmentExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var lhs = null;
         var assignmentOperator136 = null;
         var assignmentExpression137 = null;



        	var isLhs = [];

        try {
            // res/ECMAScript3Ext.g:1530:2: (lhs= conditionalExpression ({...}? assignmentOperator assignmentExpression )? )
            // res/ECMAScript3Ext.g:1530:4: lhs= conditionalExpression ({...}? assignmentOperator assignmentExpression )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_conditionalExpression_in_assignmentExpression4501);
            lhs=this.conditionalExpression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, lhs.getTree());
            // res/ECMAScript3Ext.g:1531:2: ({...}? assignmentOperator assignmentExpression )?
            var alt42=2;
            var LA42_0 = this.input.LA(1);

            if ( ((LA42_0>=ASSIGN && LA42_0<=ORASS)||LA42_0==DIVASS||LA42_0==POWASS||LA42_0==CARETASS||LA42_0==XORASS) ) {
                var LA42_1 = this.input.LA(2);

                if ( (( this.isLeftHandSideAssign(lhs, isLhs) )) ) {
                    alt42=1;
                }
            }
            switch (alt42) {
                case 1 :
                    // res/ECMAScript3Ext.g:1531:4: {...}? assignmentOperator assignmentExpression
                    if ( !(( this.isLeftHandSideAssign(lhs, isLhs) )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "assignmentExpression", " this.isLeftHandSideAssign(lhs, isLhs) ");
                    }
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentOperator_in_assignmentExpression4508);
                    assignmentOperator136=this.assignmentOperator();

                    this.state._fsp--;

                    root_0 = this.adaptor.becomeRoot(assignmentOperator136.getTree(), root_0);
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_assignmentExpression4511);
                    assignmentExpression137=this.assignmentExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpression137.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    assignmentOperator_return: (function() {
        ECMAScript3ExtParser.assignmentOperator_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.assignmentOperator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1534:1: assignmentOperator : ( ASSIGN | POWASS | CARETASS | MULASS | DIVASS | MODASS | ADDASS | SUBASS | SHLASS | SHRASS | SHUASS | ANDASS | XORASS | ORASS );
    // $ANTLR start "assignmentOperator"
    assignmentOperator: function() {
        var retval = new ECMAScript3ExtParser.assignmentOperator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set138 = null;

        var set138_tree=null;

        try {
            // res/ECMAScript3Ext.g:1535:2: ( ASSIGN | POWASS | CARETASS | MULASS | DIVASS | MODASS | ADDASS | SUBASS | SHLASS | SHRASS | SHUASS | ANDASS | XORASS | ORASS )
            // res/ECMAScript3Ext.g:
            root_0 = this.adaptor.nil();

            set138=this.input.LT(1);
            if ( (this.input.LA(1)>=ASSIGN && this.input.LA(1)<=ORASS)||this.input.LA(1)==DIVASS||this.input.LA(1)==POWASS||this.input.LA(1)==CARETASS||this.input.LA(1)==XORASS ) {
                this.input.consume();
                this.adaptor.addChild(root_0, this.adaptor.create(set138));
                this.state.errorRecovery=false;
            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    assignmentExpressionNoIn_return: (function() {
        ECMAScript3ExtParser.assignmentExpressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.assignmentExpressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1538:1: assignmentExpressionNoIn : lhs= conditionalExpressionNoIn ({...}? assignmentOperator assignmentExpressionNoIn )? ;
    // $ANTLR start "assignmentExpressionNoIn"
    assignmentExpressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.assignmentExpressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var lhs = null;
         var assignmentOperator139 = null;
         var assignmentExpressionNoIn140 = null;



        	var isLhs = [];

        try {
            // res/ECMAScript3Ext.g:1543:2: (lhs= conditionalExpressionNoIn ({...}? assignmentOperator assignmentExpressionNoIn )? )
            // res/ECMAScript3Ext.g:1543:4: lhs= conditionalExpressionNoIn ({...}? assignmentOperator assignmentExpressionNoIn )?
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_conditionalExpressionNoIn_in_assignmentExpressionNoIn4595);
            lhs=this.conditionalExpressionNoIn();

            this.state._fsp--;

            this.adaptor.addChild(root_0, lhs.getTree());
            // res/ECMAScript3Ext.g:1544:2: ({...}? assignmentOperator assignmentExpressionNoIn )?
            var alt43=2;
            var LA43_0 = this.input.LA(1);

            if ( ((LA43_0>=ASSIGN && LA43_0<=ORASS)||LA43_0==DIVASS||LA43_0==POWASS||LA43_0==CARETASS||LA43_0==XORASS) ) {
                var LA43_1 = this.input.LA(2);

                if ( (( this.isLeftHandSideAssign(lhs, isLhs) )) ) {
                    alt43=1;
                }
            }
            switch (alt43) {
                case 1 :
                    // res/ECMAScript3Ext.g:1544:4: {...}? assignmentOperator assignmentExpressionNoIn
                    if ( !(( this.isLeftHandSideAssign(lhs, isLhs) )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "assignmentExpressionNoIn", " this.isLeftHandSideAssign(lhs, isLhs) ");
                    }
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentOperator_in_assignmentExpressionNoIn4602);
                    assignmentOperator139=this.assignmentOperator();

                    this.state._fsp--;

                    root_0 = this.adaptor.becomeRoot(assignmentOperator139.getTree(), root_0);
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_assignmentExpressionNoIn4605);
                    assignmentExpressionNoIn140=this.assignmentExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpressionNoIn140.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expression_return: (function() {
        ECMAScript3ExtParser.expression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1551:1: expression : exprs+= assignmentExpression ( COMMA exprs+= assignmentExpression )* -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ ) -> $exprs;
    // $ANTLR start "expression"
    expression: function() {
        var retval = new ECMAScript3ExtParser.expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var COMMA141 = null;
        var list_exprs=null;
        var exprs = null;
        var COMMA141_tree=null;
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_assignmentExpression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assignmentExpression");
        try {
            // res/ECMAScript3Ext.g:1552:2: (exprs+= assignmentExpression ( COMMA exprs+= assignmentExpression )* -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ ) -> $exprs)
            // res/ECMAScript3Ext.g:1552:4: exprs+= assignmentExpression ( COMMA exprs+= assignmentExpression )*
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_expression4625);
            exprs=this.assignmentExpression();

            this.state._fsp--;

            stream_assignmentExpression.add(exprs.getTree());
            if (org.antlr.lang.isNull(list_exprs)) list_exprs = [];
            list_exprs.push(exprs.getTree());

            // res/ECMAScript3Ext.g:1552:32: ( COMMA exprs+= assignmentExpression )*
            loop44:
            do {
                var alt44=2;
                var LA44_0 = this.input.LA(1);

                if ( (LA44_0==COMMA) ) {
                    alt44=1;
                }


                switch (alt44) {
                case 1 :
                    // res/ECMAScript3Ext.g:1552:34: COMMA exprs+= assignmentExpression
                    COMMA141=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_expression4629);  
                    stream_COMMA.add(COMMA141);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_expression4633);
                    exprs=this.assignmentExpression();

                    this.state._fsp--;

                    stream_assignmentExpression.add(exprs.getTree());
                    if (org.antlr.lang.isNull(list_exprs)) list_exprs = [];
                    list_exprs.push(exprs.getTree());



                    break;

                default :
                    break loop44;
                }
            } while (true);



            // AST REWRITE
            // elements: exprs, exprs
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: exprs
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_exprs=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token exprs",list_exprs);
            root_0 = this.adaptor.nil();
            // 1553:2: -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ )
            if ( list_exprs.length > 1 ) {
                // res/ECMAScript3Ext.g:1553:28: ^( CEXPR ( $exprs)+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(CEXPR, "CEXPR"), root_1);

                if ( !(stream_exprs.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_exprs.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_exprs.nextTree());

                }
                stream_exprs.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }
            else // 1554:2: -> $exprs
            {
                this.adaptor.addChild(root_0, stream_exprs.nextTree());

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expressionNoIn_return: (function() {
        ECMAScript3ExtParser.expressionNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.expressionNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1557:1: expressionNoIn : exprs+= assignmentExpressionNoIn ( COMMA exprs+= assignmentExpressionNoIn )* -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ ) -> $exprs;
    // $ANTLR start "expressionNoIn"
    expressionNoIn: function() {
        var retval = new ECMAScript3ExtParser.expressionNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var COMMA142 = null;
        var list_exprs=null;
        var exprs = null;
        var COMMA142_tree=null;
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_assignmentExpressionNoIn=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule assignmentExpressionNoIn");
        try {
            // res/ECMAScript3Ext.g:1558:2: (exprs+= assignmentExpressionNoIn ( COMMA exprs+= assignmentExpressionNoIn )* -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ ) -> $exprs)
            // res/ECMAScript3Ext.g:1558:4: exprs+= assignmentExpressionNoIn ( COMMA exprs+= assignmentExpressionNoIn )*
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_expressionNoIn4670);
            exprs=this.assignmentExpressionNoIn();

            this.state._fsp--;

            stream_assignmentExpressionNoIn.add(exprs.getTree());
            if (org.antlr.lang.isNull(list_exprs)) list_exprs = [];
            list_exprs.push(exprs.getTree());

            // res/ECMAScript3Ext.g:1558:36: ( COMMA exprs+= assignmentExpressionNoIn )*
            loop45:
            do {
                var alt45=2;
                var LA45_0 = this.input.LA(1);

                if ( (LA45_0==COMMA) ) {
                    alt45=1;
                }


                switch (alt45) {
                case 1 :
                    // res/ECMAScript3Ext.g:1558:38: COMMA exprs+= assignmentExpressionNoIn
                    COMMA142=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_expressionNoIn4674);  
                    stream_COMMA.add(COMMA142);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_expressionNoIn4678);
                    exprs=this.assignmentExpressionNoIn();

                    this.state._fsp--;

                    stream_assignmentExpressionNoIn.add(exprs.getTree());
                    if (org.antlr.lang.isNull(list_exprs)) list_exprs = [];
                    list_exprs.push(exprs.getTree());



                    break;

                default :
                    break loop45;
                }
            } while (true);



            // AST REWRITE
            // elements: exprs, exprs
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: exprs
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_exprs=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token exprs",list_exprs);
            root_0 = this.adaptor.nil();
            // 1559:2: -> { $exprs.length > 1 }? ^( CEXPR ( $exprs)+ )
            if ( list_exprs.length > 1 ) {
                // res/ECMAScript3Ext.g:1559:28: ^( CEXPR ( $exprs)+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(CEXPR, "CEXPR"), root_1);

                if ( !(stream_exprs.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_exprs.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_exprs.nextTree());

                }
                stream_exprs.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }
            else // 1560:2: -> $exprs
            {
                this.adaptor.addChild(root_0, stream_exprs.nextTree());

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    semic_return: (function() {
        ECMAScript3ExtParser.semic_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.semic_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1585:1: semic : ( SEMIC | EOF | RBRACE | EOL | MultiLineComment );
    // $ANTLR start "semic"
    semic: function() {
        var retval = new ECMAScript3ExtParser.semic_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var SEMIC143 = null;
        var EOF144 = null;
        var RBRACE145 = null;
        var EOL146 = null;
        var MultiLineComment147 = null;

        var SEMIC143_tree=null;
        var EOF144_tree=null;
        var RBRACE145_tree=null;
        var EOL146_tree=null;
        var MultiLineComment147_tree=null;


        	// Mark current position so we can unconsume a RBRACE.
        	var marker = this.input.mark();
        	// Promote EOL if appropriate
        	this.promoteEOL(retval);

        try {
            // res/ECMAScript3Ext.g:1593:2: ( SEMIC | EOF | RBRACE | EOL | MultiLineComment )
            var alt46=5;
            switch ( this.input.LA(1) ) {
            case SEMIC:
                alt46=1;
                break;
            case EOF:
                alt46=2;
                break;
            case RBRACE:
                alt46=3;
                break;
            case EOL:
                alt46=4;
                break;
            case MultiLineComment:
                alt46=5;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 46, 0, this.input);

                throw nvae;
            }

            switch (alt46) {
                case 1 :
                    // res/ECMAScript3Ext.g:1593:4: SEMIC
                    root_0 = this.adaptor.nil();

                    SEMIC143=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_semic4728); 
                    SEMIC143_tree = this.adaptor.create(SEMIC143);
                    this.adaptor.addChild(root_0, SEMIC143_tree);



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1594:4: EOF
                    root_0 = this.adaptor.nil();

                    EOF144=this.match(this.input,EOF,ECMAScript3ExtParser.FOLLOW_EOF_in_semic4733); 
                    EOF144_tree = this.adaptor.create(EOF144);
                    this.adaptor.addChild(root_0, EOF144_tree);



                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1595:4: RBRACE
                    root_0 = this.adaptor.nil();

                    RBRACE145=this.match(this.input,RBRACE,ECMAScript3ExtParser.FOLLOW_RBRACE_in_semic4738); 
                    RBRACE145_tree = this.adaptor.create(RBRACE145);
                    this.adaptor.addChild(root_0, RBRACE145_tree);

                     this.input.rewind(marker); 


                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:1596:4: EOL
                    root_0 = this.adaptor.nil();

                    EOL146=this.match(this.input,EOL,ECMAScript3ExtParser.FOLLOW_EOL_in_semic4745); 
                    EOL146_tree = this.adaptor.create(EOL146);
                    this.adaptor.addChild(root_0, EOL146_tree);



                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:1596:10: MultiLineComment
                    root_0 = this.adaptor.nil();

                    MultiLineComment147=this.match(this.input,MultiLineComment,ECMAScript3ExtParser.FOLLOW_MultiLineComment_in_semic4749); 
                    MultiLineComment147_tree = this.adaptor.create(MultiLineComment147);
                    this.adaptor.addChild(root_0, MultiLineComment147_tree);



                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    statement_return: (function() {
        ECMAScript3ExtParser.statement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1604:1: statement options {k=1; } : ({...}? block | statementTail );
    // $ANTLR start "statement"
    statement: function() {
        var retval = new ECMAScript3ExtParser.statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var block148 = null;
         var statementTail149 = null;


        try {
            // res/ECMAScript3Ext.g:1609:2: ({...}? block | statementTail )
            var alt47=2;
            alt47 = this.dfa47.predict(this.input);
            switch (alt47) {
                case 1 :
                    // res/ECMAScript3Ext.g:1609:4: {...}? block
                    root_0 = this.adaptor.nil();

                    if ( !(( this.input.LA(1) == ECMAScript3ExtParser.LBRACE )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "statement", " this.input.LA(1) == ECMAScript3ExtParser.LBRACE ");
                    }
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_block_in_statement4778);
                    block148=this.block();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, block148.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1610:4: statementTail
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_statementTail_in_statement4783);
                    statementTail149=this.statementTail();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, statementTail149.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    statementTail_return: (function() {
        ECMAScript3ExtParser.statementTail_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.statementTail_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1613:1: statementTail : ( variableStatement | emptyStatement | expressionStatement | ifStatement | iterationStatement | continueStatement | breakStatement | returnStatement | withStatement | labelledStatement | switchStatement | throwStatement | tryStatement );
    // $ANTLR start "statementTail"
    statementTail: function() {
        var retval = new ECMAScript3ExtParser.statementTail_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var variableStatement150 = null;
         var emptyStatement151 = null;
         var expressionStatement152 = null;
         var ifStatement153 = null;
         var iterationStatement154 = null;
         var continueStatement155 = null;
         var breakStatement156 = null;
         var returnStatement157 = null;
         var withStatement158 = null;
         var labelledStatement159 = null;
         var switchStatement160 = null;
         var throwStatement161 = null;
         var tryStatement162 = null;


        try {
            // res/ECMAScript3Ext.g:1614:2: ( variableStatement | emptyStatement | expressionStatement | ifStatement | iterationStatement | continueStatement | breakStatement | returnStatement | withStatement | labelledStatement | switchStatement | throwStatement | tryStatement )
            var alt48=13;
            alt48 = this.dfa48.predict(this.input);
            switch (alt48) {
                case 1 :
                    // res/ECMAScript3Ext.g:1614:4: variableStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_variableStatement_in_statementTail4794);
                    variableStatement150=this.variableStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, variableStatement150.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1615:4: emptyStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_emptyStatement_in_statementTail4799);
                    emptyStatement151=this.emptyStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, emptyStatement151.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1616:4: expressionStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expressionStatement_in_statementTail4804);
                    expressionStatement152=this.expressionStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, expressionStatement152.getTree());


                    break;
                case 4 :
                    // res/ECMAScript3Ext.g:1617:4: ifStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_ifStatement_in_statementTail4809);
                    ifStatement153=this.ifStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, ifStatement153.getTree());


                    break;
                case 5 :
                    // res/ECMAScript3Ext.g:1618:4: iterationStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_iterationStatement_in_statementTail4814);
                    iterationStatement154=this.iterationStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, iterationStatement154.getTree());


                    break;
                case 6 :
                    // res/ECMAScript3Ext.g:1619:4: continueStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_continueStatement_in_statementTail4819);
                    continueStatement155=this.continueStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, continueStatement155.getTree());


                    break;
                case 7 :
                    // res/ECMAScript3Ext.g:1620:4: breakStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_breakStatement_in_statementTail4824);
                    breakStatement156=this.breakStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, breakStatement156.getTree());


                    break;
                case 8 :
                    // res/ECMAScript3Ext.g:1621:4: returnStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_returnStatement_in_statementTail4829);
                    returnStatement157=this.returnStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, returnStatement157.getTree());


                    break;
                case 9 :
                    // res/ECMAScript3Ext.g:1622:4: withStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_withStatement_in_statementTail4834);
                    withStatement158=this.withStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, withStatement158.getTree());


                    break;
                case 10 :
                    // res/ECMAScript3Ext.g:1623:4: labelledStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_labelledStatement_in_statementTail4839);
                    labelledStatement159=this.labelledStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, labelledStatement159.getTree());


                    break;
                case 11 :
                    // res/ECMAScript3Ext.g:1624:4: switchStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_switchStatement_in_statementTail4844);
                    switchStatement160=this.switchStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, switchStatement160.getTree());


                    break;
                case 12 :
                    // res/ECMAScript3Ext.g:1625:4: throwStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_throwStatement_in_statementTail4849);
                    throwStatement161=this.throwStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, throwStatement161.getTree());


                    break;
                case 13 :
                    // res/ECMAScript3Ext.g:1626:4: tryStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_tryStatement_in_statementTail4854);
                    tryStatement162=this.tryStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, tryStatement162.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    block_return: (function() {
        ECMAScript3ExtParser.block_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.block_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1632:1: block : lb= LBRACE ( sourceElement )* RBRACE -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* ) ;
    // $ANTLR start "block"
    block: function() {
        var retval = new ECMAScript3ExtParser.block_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var lb = null;
        var RBRACE164 = null;
         var sourceElement163 = null;

        var lb_tree=null;
        var RBRACE164_tree=null;
        var stream_RBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACE");
        var stream_LBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACE");
        var stream_sourceElement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule sourceElement");
        try {
            // res/ECMAScript3Ext.g:1633:2: (lb= LBRACE ( sourceElement )* RBRACE -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* ) )
            // res/ECMAScript3Ext.g:1633:4: lb= LBRACE ( sourceElement )* RBRACE
            lb=this.match(this.input,LBRACE,ECMAScript3ExtParser.FOLLOW_LBRACE_in_block4870);  
            stream_LBRACE.add(lb);

            // res/ECMAScript3Ext.g:1633:14: ( sourceElement )*
            loop49:
            do {
                var alt49=2;
                var LA49_0 = this.input.LA(1);

                if ( ((LA49_0>=NULL && LA49_0<=BREAK)||LA49_0==CONTINUE||(LA49_0>=DELETE && LA49_0<=DO)||(LA49_0>=FOR && LA49_0<=IF)||(LA49_0>=NEW && LA49_0<=WITH)||LA49_0==LBRACE||LA49_0==LPAREN||LA49_0==LBRACK||LA49_0==SEMIC||(LA49_0>=ADD && LA49_0<=SUB)||(LA49_0>=INC && LA49_0<=DEC)||(LA49_0>=NOT && LA49_0<=INV)||(LA49_0>=Identifier && LA49_0<=StringLiteral)||LA49_0==RegularExpressionLiteral||(LA49_0>=DecimalLiteral && LA49_0<=HexIntegerLiteral)) ) {
                    alt49=1;
                }


                switch (alt49) {
                case 1 :
                    // res/ECMAScript3Ext.g:1633:14: sourceElement
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_sourceElement_in_block4872);
                    sourceElement163=this.sourceElement();

                    this.state._fsp--;

                    stream_sourceElement.add(sourceElement163.getTree());


                    break;

                default :
                    break loop49;
                }
            } while (true);

            RBRACE164=this.match(this.input,RBRACE,ECMAScript3ExtParser.FOLLOW_RBRACE_in_block4875);  
            stream_RBRACE.add(RBRACE164);



            // AST REWRITE
            // elements: sourceElement
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1634:2: -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* )
            {
                // res/ECMAScript3Ext.g:1634:5: ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BLOCK, lb, "BLOCK"), root_1);

                // res/ECMAScript3Ext.g:1634:28: ( sourceElement )*
                while ( stream_sourceElement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_sourceElement.nextTree());

                }
                stream_sourceElement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    variableStatement_return: (function() {
        ECMAScript3ExtParser.variableStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.variableStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1641:1: variableStatement : VAR variableDeclaration ( COMMA variableDeclaration )* semic -> ^( VAR ( variableDeclaration )+ ) ;
    // $ANTLR start "variableStatement"
    variableStatement: function() {
        var retval = new ECMAScript3ExtParser.variableStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var VAR165 = null;
        var COMMA167 = null;
         var variableDeclaration166 = null;
         var variableDeclaration168 = null;
         var semic169 = null;

        var VAR165_tree=null;
        var COMMA167_tree=null;
        var stream_VAR=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token VAR");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_variableDeclaration=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule variableDeclaration");
        var stream_semic=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule semic");
        try {
            // res/ECMAScript3Ext.g:1642:2: ( VAR variableDeclaration ( COMMA variableDeclaration )* semic -> ^( VAR ( variableDeclaration )+ ) )
            // res/ECMAScript3Ext.g:1642:4: VAR variableDeclaration ( COMMA variableDeclaration )* semic
            VAR165=this.match(this.input,VAR,ECMAScript3ExtParser.FOLLOW_VAR_in_variableStatement4903);  
            stream_VAR.add(VAR165);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_variableDeclaration_in_variableStatement4905);
            variableDeclaration166=this.variableDeclaration();

            this.state._fsp--;

            stream_variableDeclaration.add(variableDeclaration166.getTree());
            // res/ECMAScript3Ext.g:1642:28: ( COMMA variableDeclaration )*
            loop50:
            do {
                var alt50=2;
                var LA50_0 = this.input.LA(1);

                if ( (LA50_0==COMMA) ) {
                    alt50=1;
                }


                switch (alt50) {
                case 1 :
                    // res/ECMAScript3Ext.g:1642:30: COMMA variableDeclaration
                    COMMA167=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_variableStatement4909);  
                    stream_COMMA.add(COMMA167);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_variableDeclaration_in_variableStatement4911);
                    variableDeclaration168=this.variableDeclaration();

                    this.state._fsp--;

                    stream_variableDeclaration.add(variableDeclaration168.getTree());


                    break;

                default :
                    break loop50;
                }
            } while (true);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_variableStatement4916);
            semic169=this.semic();

            this.state._fsp--;

            stream_semic.add(semic169.getTree());


            // AST REWRITE
            // elements: variableDeclaration, VAR
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1643:2: -> ^( VAR ( variableDeclaration )+ )
            {
                // res/ECMAScript3Ext.g:1643:5: ^( VAR ( variableDeclaration )+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_VAR.nextNode(), root_1);

                if ( !(stream_variableDeclaration.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_variableDeclaration.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_variableDeclaration.nextTree());

                }
                stream_variableDeclaration.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    variableDeclaration_return: (function() {
        ECMAScript3ExtParser.variableDeclaration_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.variableDeclaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1646:1: variableDeclaration : Identifier ( ASSIGN assignmentExpression )? ;
    // $ANTLR start "variableDeclaration"
    variableDeclaration: function() {
        var retval = new ECMAScript3ExtParser.variableDeclaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var Identifier170 = null;
        var ASSIGN171 = null;
         var assignmentExpression172 = null;

        var Identifier170_tree=null;
        var ASSIGN171_tree=null;

        try {
            // res/ECMAScript3Ext.g:1647:2: ( Identifier ( ASSIGN assignmentExpression )? )
            // res/ECMAScript3Ext.g:1647:4: Identifier ( ASSIGN assignmentExpression )?
            root_0 = this.adaptor.nil();

            Identifier170=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_variableDeclaration4939); 
            Identifier170_tree = this.adaptor.create(Identifier170);
            this.adaptor.addChild(root_0, Identifier170_tree);

            // res/ECMAScript3Ext.g:1647:15: ( ASSIGN assignmentExpression )?
            var alt51=2;
            var LA51_0 = this.input.LA(1);

            if ( (LA51_0==ASSIGN) ) {
                alt51=1;
            }
            switch (alt51) {
                case 1 :
                    // res/ECMAScript3Ext.g:1647:17: ASSIGN assignmentExpression
                    ASSIGN171=this.match(this.input,ASSIGN,ECMAScript3ExtParser.FOLLOW_ASSIGN_in_variableDeclaration4943); 
                    ASSIGN171_tree = this.adaptor.create(ASSIGN171);
                    root_0 = this.adaptor.becomeRoot(ASSIGN171_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpression_in_variableDeclaration4946);
                    assignmentExpression172=this.assignmentExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpression172.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    variableDeclarationNoIn_return: (function() {
        ECMAScript3ExtParser.variableDeclarationNoIn_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.variableDeclarationNoIn_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1650:1: variableDeclarationNoIn : Identifier ( ASSIGN assignmentExpressionNoIn )? ;
    // $ANTLR start "variableDeclarationNoIn"
    variableDeclarationNoIn: function() {
        var retval = new ECMAScript3ExtParser.variableDeclarationNoIn_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var Identifier173 = null;
        var ASSIGN174 = null;
         var assignmentExpressionNoIn175 = null;

        var Identifier173_tree=null;
        var ASSIGN174_tree=null;

        try {
            // res/ECMAScript3Ext.g:1651:2: ( Identifier ( ASSIGN assignmentExpressionNoIn )? )
            // res/ECMAScript3Ext.g:1651:4: Identifier ( ASSIGN assignmentExpressionNoIn )?
            root_0 = this.adaptor.nil();

            Identifier173=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_variableDeclarationNoIn4960); 
            Identifier173_tree = this.adaptor.create(Identifier173);
            this.adaptor.addChild(root_0, Identifier173_tree);

            // res/ECMAScript3Ext.g:1651:15: ( ASSIGN assignmentExpressionNoIn )?
            var alt52=2;
            var LA52_0 = this.input.LA(1);

            if ( (LA52_0==ASSIGN) ) {
                alt52=1;
            }
            switch (alt52) {
                case 1 :
                    // res/ECMAScript3Ext.g:1651:17: ASSIGN assignmentExpressionNoIn
                    ASSIGN174=this.match(this.input,ASSIGN,ECMAScript3ExtParser.FOLLOW_ASSIGN_in_variableDeclarationNoIn4964); 
                    ASSIGN174_tree = this.adaptor.create(ASSIGN174);
                    root_0 = this.adaptor.becomeRoot(ASSIGN174_tree, root_0);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_assignmentExpressionNoIn_in_variableDeclarationNoIn4967);
                    assignmentExpressionNoIn175=this.assignmentExpressionNoIn();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, assignmentExpressionNoIn175.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    emptyStatement_return: (function() {
        ECMAScript3ExtParser.emptyStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.emptyStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1658:1: emptyStatement : SEMIC ;
    // $ANTLR start "emptyStatement"
    emptyStatement: function() {
        var retval = new ECMAScript3ExtParser.emptyStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var SEMIC176 = null;

        var SEMIC176_tree=null;

        try {
            // res/ECMAScript3Ext.g:1659:2: ( SEMIC )
            // res/ECMAScript3Ext.g:1659:4: SEMIC
            root_0 = this.adaptor.nil();

            SEMIC176=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_emptyStatement4985); 
            SEMIC176_tree = this.adaptor.create(SEMIC176);
            this.adaptor.addChild(root_0, SEMIC176_tree);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expressionStatement_return: (function() {
        ECMAScript3ExtParser.expressionStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.expressionStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1672:1: expressionStatement : expression semic ;
    // $ANTLR start "expressionStatement"
    expressionStatement: function() {
        var retval = new ECMAScript3ExtParser.expressionStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expression177 = null;
         var semic178 = null;


        try {
            // res/ECMAScript3Ext.g:1673:2: ( expression semic )
            // res/ECMAScript3Ext.g:1673:4: expression semic
            root_0 = this.adaptor.nil();

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_expressionStatement5002);
            expression177=this.expression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, expression177.getTree());
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_expressionStatement5004);
            semic178=this.semic();

            this.state._fsp--;




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    ifStatement_return: (function() {
        ECMAScript3ExtParser.ifStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.ifStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1680:1: ifStatement : IF LPAREN expression RPAREN statement ({...}? ELSE statement )? -> ^( IF expression ( statement )+ ) ;
    // $ANTLR start "ifStatement"
    ifStatement: function() {
        var retval = new ECMAScript3ExtParser.ifStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IF179 = null;
        var LPAREN180 = null;
        var RPAREN182 = null;
        var ELSE184 = null;
         var expression181 = null;
         var statement183 = null;
         var statement185 = null;

        var IF179_tree=null;
        var LPAREN180_tree=null;
        var RPAREN182_tree=null;
        var ELSE184_tree=null;
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");
        var stream_IF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IF");
        var stream_ELSE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ELSE");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        try {
            // res/ECMAScript3Ext.g:1682:2: ( IF LPAREN expression RPAREN statement ({...}? ELSE statement )? -> ^( IF expression ( statement )+ ) )
            // res/ECMAScript3Ext.g:1682:4: IF LPAREN expression RPAREN statement ({...}? ELSE statement )?
            IF179=this.match(this.input,IF,ECMAScript3ExtParser.FOLLOW_IF_in_ifStatement5021);  
            stream_IF.add(IF179);

            LPAREN180=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_ifStatement5023);  
            stream_LPAREN.add(LPAREN180);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_ifStatement5025);
            expression181=this.expression();

            this.state._fsp--;

            stream_expression.add(expression181.getTree());
            RPAREN182=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_ifStatement5027);  
            stream_RPAREN.add(RPAREN182);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_ifStatement5029);
            statement183=this.statement();

            this.state._fsp--;

            stream_statement.add(statement183.getTree());
            // res/ECMAScript3Ext.g:1682:42: ({...}? ELSE statement )?
            var alt53=2;
            var LA53_0 = this.input.LA(1);

            if ( (LA53_0==ELSE) ) {
                var LA53_1 = this.input.LA(2);

                if ( (( this.input.LA(1) == ECMAScript3ExtParser.ELSE )) ) {
                    alt53=1;
                }
            }
            switch (alt53) {
                case 1 :
                    // res/ECMAScript3Ext.g:1682:44: {...}? ELSE statement
                    if ( !(( this.input.LA(1) == ECMAScript3ExtParser.ELSE )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "ifStatement", " this.input.LA(1) == ECMAScript3ExtParser.ELSE ");
                    }
                    ELSE184=this.match(this.input,ELSE,ECMAScript3ExtParser.FOLLOW_ELSE_in_ifStatement5035);  
                    stream_ELSE.add(ELSE184);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_ifStatement5037);
                    statement185=this.statement();

                    this.state._fsp--;

                    stream_statement.add(statement185.getTree());


                    break;

            }



            // AST REWRITE
            // elements: expression, statement, IF
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1683:2: -> ^( IF expression ( statement )+ )
            {
                // res/ECMAScript3Ext.g:1683:5: ^( IF expression ( statement )+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_IF.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());
                if ( !(stream_statement.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_statement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_statement.nextTree());

                }
                stream_statement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    iterationStatement_return: (function() {
        ECMAScript3ExtParser.iterationStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.iterationStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1690:1: iterationStatement : ( doStatement | whileStatement | forStatement );
    // $ANTLR start "iterationStatement"
    iterationStatement: function() {
        var retval = new ECMAScript3ExtParser.iterationStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var doStatement186 = null;
         var whileStatement187 = null;
         var forStatement188 = null;


        try {
            // res/ECMAScript3Ext.g:1691:2: ( doStatement | whileStatement | forStatement )
            var alt54=3;
            switch ( this.input.LA(1) ) {
            case DO:
                alt54=1;
                break;
            case WHILE:
                alt54=2;
                break;
            case FOR:
                alt54=3;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 54, 0, this.input);

                throw nvae;
            }

            switch (alt54) {
                case 1 :
                    // res/ECMAScript3Ext.g:1691:4: doStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_doStatement_in_iterationStatement5069);
                    doStatement186=this.doStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, doStatement186.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1692:4: whileStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_whileStatement_in_iterationStatement5074);
                    whileStatement187=this.whileStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, whileStatement187.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1693:4: forStatement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_forStatement_in_iterationStatement5079);
                    forStatement188=this.forStatement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, forStatement188.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    doStatement_return: (function() {
        ECMAScript3ExtParser.doStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.doStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1696:1: doStatement : DO statement WHILE LPAREN expression RPAREN semic -> ^( DO statement expression ) ;
    // $ANTLR start "doStatement"
    doStatement: function() {
        var retval = new ECMAScript3ExtParser.doStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var DO189 = null;
        var WHILE191 = null;
        var LPAREN192 = null;
        var RPAREN194 = null;
         var statement190 = null;
         var expression193 = null;
         var semic195 = null;

        var DO189_tree=null;
        var WHILE191_tree=null;
        var LPAREN192_tree=null;
        var RPAREN194_tree=null;
        var stream_DO=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DO");
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_WHILE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token WHILE");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_semic=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule semic");
        try {
            // res/ECMAScript3Ext.g:1697:2: ( DO statement WHILE LPAREN expression RPAREN semic -> ^( DO statement expression ) )
            // res/ECMAScript3Ext.g:1697:4: DO statement WHILE LPAREN expression RPAREN semic
            DO189=this.match(this.input,DO,ECMAScript3ExtParser.FOLLOW_DO_in_doStatement5090);  
            stream_DO.add(DO189);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_doStatement5092);
            statement190=this.statement();

            this.state._fsp--;

            stream_statement.add(statement190.getTree());
            WHILE191=this.match(this.input,WHILE,ECMAScript3ExtParser.FOLLOW_WHILE_in_doStatement5094);  
            stream_WHILE.add(WHILE191);

            LPAREN192=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_doStatement5096);  
            stream_LPAREN.add(LPAREN192);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_doStatement5098);
            expression193=this.expression();

            this.state._fsp--;

            stream_expression.add(expression193.getTree());
            RPAREN194=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_doStatement5100);  
            stream_RPAREN.add(RPAREN194);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_doStatement5102);
            semic195=this.semic();

            this.state._fsp--;

            stream_semic.add(semic195.getTree());


            // AST REWRITE
            // elements: expression, statement, DO
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1698:2: -> ^( DO statement expression )
            {
                // res/ECMAScript3Ext.g:1698:5: ^( DO statement expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_DO.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_statement.nextTree());
                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    whileStatement_return: (function() {
        ECMAScript3ExtParser.whileStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.whileStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1701:1: whileStatement : WHILE LPAREN expression RPAREN statement ;
    // $ANTLR start "whileStatement"
    whileStatement: function() {
        var retval = new ECMAScript3ExtParser.whileStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var WHILE196 = null;
        var LPAREN197 = null;
        var RPAREN199 = null;
         var expression198 = null;
         var statement200 = null;

        var WHILE196_tree=null;
        var LPAREN197_tree=null;
        var RPAREN199_tree=null;

        try {
            // res/ECMAScript3Ext.g:1702:2: ( WHILE LPAREN expression RPAREN statement )
            // res/ECMAScript3Ext.g:1702:4: WHILE LPAREN expression RPAREN statement
            root_0 = this.adaptor.nil();

            WHILE196=this.match(this.input,WHILE,ECMAScript3ExtParser.FOLLOW_WHILE_in_whileStatement5126); 
            WHILE196_tree = this.adaptor.create(WHILE196);
            root_0 = this.adaptor.becomeRoot(WHILE196_tree, root_0);

            LPAREN197=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_whileStatement5129); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_whileStatement5132);
            expression198=this.expression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, expression198.getTree());
            RPAREN199=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_whileStatement5134); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_whileStatement5137);
            statement200=this.statement();

            this.state._fsp--;

            this.adaptor.addChild(root_0, statement200.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forStatement_return: (function() {
        ECMAScript3ExtParser.forStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.forStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1746:1: forStatement : FOR LPAREN forControl RPAREN statement ;
    // $ANTLR start "forStatement"
    forStatement: function() {
        var retval = new ECMAScript3ExtParser.forStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FOR201 = null;
        var LPAREN202 = null;
        var RPAREN204 = null;
         var forControl203 = null;
         var statement205 = null;

        var FOR201_tree=null;
        var LPAREN202_tree=null;
        var RPAREN204_tree=null;

        try {
            // res/ECMAScript3Ext.g:1747:2: ( FOR LPAREN forControl RPAREN statement )
            // res/ECMAScript3Ext.g:1747:4: FOR LPAREN forControl RPAREN statement
            root_0 = this.adaptor.nil();

            FOR201=this.match(this.input,FOR,ECMAScript3ExtParser.FOLLOW_FOR_in_forStatement5150); 
            FOR201_tree = this.adaptor.create(FOR201);
            root_0 = this.adaptor.becomeRoot(FOR201_tree, root_0);

            LPAREN202=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_forStatement5153); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_forControl_in_forStatement5156);
            forControl203=this.forControl();

            this.state._fsp--;

            this.adaptor.addChild(root_0, forControl203.getTree());
            RPAREN204=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_forStatement5158); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_forStatement5161);
            statement205=this.statement();

            this.state._fsp--;

            this.adaptor.addChild(root_0, statement205.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forControl_return: (function() {
        ECMAScript3ExtParser.forControl_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.forControl_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1750:1: forControl : ( forControlVar | forControlExpression | forControlSemic );
    // $ANTLR start "forControl"
    forControl: function() {
        var retval = new ECMAScript3ExtParser.forControl_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var forControlVar206 = null;
         var forControlExpression207 = null;
         var forControlSemic208 = null;


        try {
            // res/ECMAScript3Ext.g:1751:2: ( forControlVar | forControlExpression | forControlSemic )
            var alt55=3;
            switch ( this.input.LA(1) ) {
            case VAR:
                alt55=1;
                break;
            case NULL:
            case TRUE:
            case FALSE:
            case DELETE:
            case FUNCTION:
            case NEW:
            case THIS:
            case TYPEOF:
            case VOID:
            case LBRACE:
            case LPAREN:
            case LBRACK:
            case ADD:
            case SUB:
            case INC:
            case DEC:
            case NOT:
            case INV:
            case Identifier:
            case StringLiteral:
            case RegularExpressionLiteral:
            case DecimalLiteral:
            case OctalIntegerLiteral:
            case BinaryIntegerLiteral:
            case HexIntegerLiteral:
                alt55=2;
                break;
            case SEMIC:
                alt55=3;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 55, 0, this.input);

                throw nvae;
            }

            switch (alt55) {
                case 1 :
                    // res/ECMAScript3Ext.g:1751:4: forControlVar
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_forControlVar_in_forControl5172);
                    forControlVar206=this.forControlVar();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, forControlVar206.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1752:4: forControlExpression
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_forControlExpression_in_forControl5177);
                    forControlExpression207=this.forControlExpression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, forControlExpression207.getTree());


                    break;
                case 3 :
                    // res/ECMAScript3Ext.g:1753:4: forControlSemic
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_forControlSemic_in_forControl5182);
                    forControlSemic208=this.forControlSemic();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, forControlSemic208.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forControlVar_return: (function() {
        ECMAScript3ExtParser.forControlVar_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.forControlVar_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1756:1: forControlVar : VAR variableDeclarationNoIn ( ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) ) | ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) ) ) ;
    // $ANTLR start "forControlVar"
    forControlVar: function() {
        var retval = new ECMAScript3ExtParser.forControlVar_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var VAR209 = null;
        var IN211 = null;
        var COMMA213 = null;
        var SEMIC215 = null;
        var SEMIC216 = null;
         var ex1 = null;
         var ex2 = null;
         var variableDeclarationNoIn210 = null;
         var expression212 = null;
         var variableDeclarationNoIn214 = null;

        var VAR209_tree=null;
        var IN211_tree=null;
        var COMMA213_tree=null;
        var SEMIC215_tree=null;
        var SEMIC216_tree=null;
        var stream_VAR=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token VAR");
        var stream_IN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IN");
        var stream_SEMIC=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SEMIC");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_variableDeclarationNoIn=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule variableDeclarationNoIn");
        try {
            // res/ECMAScript3Ext.g:1757:2: ( VAR variableDeclarationNoIn ( ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) ) | ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) ) ) )
            // res/ECMAScript3Ext.g:1757:4: VAR variableDeclarationNoIn ( ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) ) | ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) ) )
            VAR209=this.match(this.input,VAR,ECMAScript3ExtParser.FOLLOW_VAR_in_forControlVar5193);  
            stream_VAR.add(VAR209);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_variableDeclarationNoIn_in_forControlVar5195);
            variableDeclarationNoIn210=this.variableDeclarationNoIn();

            this.state._fsp--;

            stream_variableDeclarationNoIn.add(variableDeclarationNoIn210.getTree());
            // res/ECMAScript3Ext.g:1758:2: ( ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) ) | ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) ) )
            var alt59=2;
            var LA59_0 = this.input.LA(1);

            if ( (LA59_0==IN) ) {
                alt59=1;
            }
            else if ( ((LA59_0>=SEMIC && LA59_0<=COMMA)) ) {
                alt59=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 59, 0, this.input);

                throw nvae;
            }
            switch (alt59) {
                case 1 :
                    // res/ECMAScript3Ext.g:1759:3: ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) )
                    // res/ECMAScript3Ext.g:1759:3: ( IN expression -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) ) )
                    // res/ECMAScript3Ext.g:1760:4: IN expression
                    IN211=this.match(this.input,IN,ECMAScript3ExtParser.FOLLOW_IN_in_forControlVar5207);  
                    stream_IN.add(IN211);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlVar5209);
                    expression212=this.expression();

                    this.state._fsp--;

                    stream_expression.add(expression212.getTree());


                    // AST REWRITE
                    // elements: variableDeclarationNoIn, expression, VAR
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1761:4: -> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) )
                    {
                        // res/ECMAScript3Ext.g:1761:7: ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORITER, "FORITER"), root_1);

                        // res/ECMAScript3Ext.g:1761:18: ^( VAR variableDeclarationNoIn )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(stream_VAR.nextNode(), root_2);

                        this.adaptor.addChild(root_2, stream_variableDeclarationNoIn.nextTree());

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1761:51: ^( EXPR expression )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        this.adaptor.addChild(root_2, stream_expression.nextTree());

                        this.adaptor.addChild(root_1, root_2);
                        }

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;




                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1764:3: ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) )
                    // res/ECMAScript3Ext.g:1764:3: ( ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) )
                    // res/ECMAScript3Ext.g:1765:4: ( COMMA variableDeclarationNoIn )* SEMIC (ex1= expression )? SEMIC (ex2= expression )?
                    // res/ECMAScript3Ext.g:1765:4: ( COMMA variableDeclarationNoIn )*
                    loop56:
                    do {
                        var alt56=2;
                        var LA56_0 = this.input.LA(1);

                        if ( (LA56_0==COMMA) ) {
                            alt56=1;
                        }


                        switch (alt56) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1765:6: COMMA variableDeclarationNoIn
                            COMMA213=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_forControlVar5255);  
                            stream_COMMA.add(COMMA213);

                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_variableDeclarationNoIn_in_forControlVar5257);
                            variableDeclarationNoIn214=this.variableDeclarationNoIn();

                            this.state._fsp--;

                            stream_variableDeclarationNoIn.add(variableDeclarationNoIn214.getTree());


                            break;

                        default :
                            break loop56;
                        }
                    } while (true);

                    SEMIC215=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlVar5262);  
                    stream_SEMIC.add(SEMIC215);

                    // res/ECMAScript3Ext.g:1765:48: (ex1= expression )?
                    var alt57=2;
                    var LA57_0 = this.input.LA(1);

                    if ( ((LA57_0>=NULL && LA57_0<=FALSE)||LA57_0==DELETE||LA57_0==FUNCTION||LA57_0==NEW||LA57_0==THIS||LA57_0==TYPEOF||LA57_0==VOID||LA57_0==LBRACE||LA57_0==LPAREN||LA57_0==LBRACK||(LA57_0>=ADD && LA57_0<=SUB)||(LA57_0>=INC && LA57_0<=DEC)||(LA57_0>=NOT && LA57_0<=INV)||(LA57_0>=Identifier && LA57_0<=StringLiteral)||LA57_0==RegularExpressionLiteral||(LA57_0>=DecimalLiteral && LA57_0<=HexIntegerLiteral)) ) {
                        alt57=1;
                    }
                    switch (alt57) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1765:48: ex1= expression
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlVar5266);
                            ex1=this.expression();

                            this.state._fsp--;

                            stream_expression.add(ex1.getTree());


                            break;

                    }

                    SEMIC216=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlVar5269);  
                    stream_SEMIC.add(SEMIC216);

                    // res/ECMAScript3Ext.g:1765:70: (ex2= expression )?
                    var alt58=2;
                    var LA58_0 = this.input.LA(1);

                    if ( ((LA58_0>=NULL && LA58_0<=FALSE)||LA58_0==DELETE||LA58_0==FUNCTION||LA58_0==NEW||LA58_0==THIS||LA58_0==TYPEOF||LA58_0==VOID||LA58_0==LBRACE||LA58_0==LPAREN||LA58_0==LBRACK||(LA58_0>=ADD && LA58_0<=SUB)||(LA58_0>=INC && LA58_0<=DEC)||(LA58_0>=NOT && LA58_0<=INV)||(LA58_0>=Identifier && LA58_0<=StringLiteral)||LA58_0==RegularExpressionLiteral||(LA58_0>=DecimalLiteral && LA58_0<=HexIntegerLiteral)) ) {
                        alt58=1;
                    }
                    switch (alt58) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1765:70: ex2= expression
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlVar5273);
                            ex2=this.expression();

                            this.state._fsp--;

                            stream_expression.add(ex2.getTree());


                            break;

                    }



                    // AST REWRITE
                    // elements: variableDeclarationNoIn, ex2, VAR, ex1
                    // token labels: 
                    // rule labels: retval, ex2, ex1
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_ex2=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex2",ex2!=null?ex2.tree:null);
                    var stream_ex1=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex1",ex1!=null?ex1.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1766:4: -> ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) )
                    {
                        // res/ECMAScript3Ext.g:1766:7: ^( FORSTEP ^( VAR ( variableDeclarationNoIn )+ ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORSTEP, "FORSTEP"), root_1);

                        // res/ECMAScript3Ext.g:1766:18: ^( VAR ( variableDeclarationNoIn )+ )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(stream_VAR.nextNode(), root_2);

                        if ( !(stream_variableDeclarationNoIn.hasNext()) ) {
                            throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                        }
                        while ( stream_variableDeclarationNoIn.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_variableDeclarationNoIn.nextTree());

                        }
                        stream_variableDeclarationNoIn.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1766:52: ^( EXPR ( $ex1)? )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        // res/ECMAScript3Ext.g:1766:60: ( $ex1)?
                        if ( stream_ex1.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_ex1.nextTree());

                        }
                        stream_ex1.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1766:68: ^( EXPR ( $ex2)? )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        // res/ECMAScript3Ext.g:1766:76: ( $ex2)?
                        if ( stream_ex2.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_ex2.nextTree());

                        }
                        stream_ex2.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;




                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forControlExpression_return: (function() {
        ECMAScript3ExtParser.forControlExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.forControlExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1771:1: forControlExpression : ex1= expressionNoIn ({...}? ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) ) | ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) ) ) ;
    // $ANTLR start "forControlExpression"
    forControlExpression: function() {
        var retval = new ECMAScript3ExtParser.forControlExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IN217 = null;
        var SEMIC218 = null;
        var SEMIC219 = null;
         var ex1 = null;
         var ex2 = null;
         var ex3 = null;

        var IN217_tree=null;
        var SEMIC218_tree=null;
        var SEMIC219_tree=null;
        var stream_IN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IN");
        var stream_SEMIC=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SEMIC");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_expressionNoIn=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expressionNoIn");

        	var isLhs = [];

        try {
            // res/ECMAScript3Ext.g:1776:2: (ex1= expressionNoIn ({...}? ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) ) | ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) ) ) )
            // res/ECMAScript3Ext.g:1776:4: ex1= expressionNoIn ({...}? ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) ) | ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) ) )
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expressionNoIn_in_forControlExpression5339);
            ex1=this.expressionNoIn();

            this.state._fsp--;

            stream_expressionNoIn.add(ex1.getTree());
            // res/ECMAScript3Ext.g:1777:2: ({...}? ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) ) | ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) ) )
            var alt62=2;
            var LA62_0 = this.input.LA(1);

            if ( (LA62_0==IN) ) {
                alt62=1;
            }
            else if ( (LA62_0==SEMIC) ) {
                alt62=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 62, 0, this.input);

                throw nvae;
            }
            switch (alt62) {
                case 1 :
                    // res/ECMAScript3Ext.g:1778:3: {...}? ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) )
                    if ( !(( this.isLeftHandSideIn(ex1, isLhs) )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "forControlExpression", " this.isLeftHandSideIn(ex1, isLhs) ");
                    }
                    // res/ECMAScript3Ext.g:1778:42: ( IN ex2= expression -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) ) )
                    // res/ECMAScript3Ext.g:1779:4: IN ex2= expression
                    IN217=this.match(this.input,IN,ECMAScript3ExtParser.FOLLOW_IN_in_forControlExpression5353);  
                    stream_IN.add(IN217);

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlExpression5357);
                    ex2=this.expression();

                    this.state._fsp--;

                    stream_expression.add(ex2.getTree());


                    // AST REWRITE
                    // elements: ex1, ex2
                    // token labels: 
                    // rule labels: retval, ex2, ex1
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_ex2=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex2",ex2!=null?ex2.tree:null);
                    var stream_ex1=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex1",ex1!=null?ex1.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1780:4: -> ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) )
                    {
                        // res/ECMAScript3Ext.g:1780:7: ^( FORITER ^( EXPR $ex1) ^( EXPR $ex2) )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORITER, "FORITER"), root_1);

                        // res/ECMAScript3Ext.g:1780:18: ^( EXPR $ex1)
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        this.adaptor.addChild(root_2, stream_ex1.nextTree());

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1780:33: ^( EXPR $ex2)
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        this.adaptor.addChild(root_2, stream_ex2.nextTree());

                        this.adaptor.addChild(root_1, root_2);
                        }

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;




                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1783:3: ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) )
                    // res/ECMAScript3Ext.g:1783:3: ( SEMIC (ex2= expression )? SEMIC (ex3= expression )? -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) ) )
                    // res/ECMAScript3Ext.g:1784:4: SEMIC (ex2= expression )? SEMIC (ex3= expression )?
                    SEMIC218=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlExpression5403);  
                    stream_SEMIC.add(SEMIC218);

                    // res/ECMAScript3Ext.g:1784:13: (ex2= expression )?
                    var alt60=2;
                    var LA60_0 = this.input.LA(1);

                    if ( ((LA60_0>=NULL && LA60_0<=FALSE)||LA60_0==DELETE||LA60_0==FUNCTION||LA60_0==NEW||LA60_0==THIS||LA60_0==TYPEOF||LA60_0==VOID||LA60_0==LBRACE||LA60_0==LPAREN||LA60_0==LBRACK||(LA60_0>=ADD && LA60_0<=SUB)||(LA60_0>=INC && LA60_0<=DEC)||(LA60_0>=NOT && LA60_0<=INV)||(LA60_0>=Identifier && LA60_0<=StringLiteral)||LA60_0==RegularExpressionLiteral||(LA60_0>=DecimalLiteral && LA60_0<=HexIntegerLiteral)) ) {
                        alt60=1;
                    }
                    switch (alt60) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1784:13: ex2= expression
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlExpression5407);
                            ex2=this.expression();

                            this.state._fsp--;

                            stream_expression.add(ex2.getTree());


                            break;

                    }

                    SEMIC219=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlExpression5410);  
                    stream_SEMIC.add(SEMIC219);

                    // res/ECMAScript3Ext.g:1784:35: (ex3= expression )?
                    var alt61=2;
                    var LA61_0 = this.input.LA(1);

                    if ( ((LA61_0>=NULL && LA61_0<=FALSE)||LA61_0==DELETE||LA61_0==FUNCTION||LA61_0==NEW||LA61_0==THIS||LA61_0==TYPEOF||LA61_0==VOID||LA61_0==LBRACE||LA61_0==LPAREN||LA61_0==LBRACK||(LA61_0>=ADD && LA61_0<=SUB)||(LA61_0>=INC && LA61_0<=DEC)||(LA61_0>=NOT && LA61_0<=INV)||(LA61_0>=Identifier && LA61_0<=StringLiteral)||LA61_0==RegularExpressionLiteral||(LA61_0>=DecimalLiteral && LA61_0<=HexIntegerLiteral)) ) {
                        alt61=1;
                    }
                    switch (alt61) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1784:35: ex3= expression
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlExpression5414);
                            ex3=this.expression();

                            this.state._fsp--;

                            stream_expression.add(ex3.getTree());


                            break;

                    }



                    // AST REWRITE
                    // elements: ex1, ex3, ex2
                    // token labels: 
                    // rule labels: retval, ex3, ex2, ex1
                    // token list labels: 
                    // rule list labels: 
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_ex3=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex3",ex3!=null?ex3.tree:null);
                    var stream_ex2=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex2",ex2!=null?ex2.tree:null);
                    var stream_ex1=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex1",ex1!=null?ex1.tree:null);

                    root_0 = this.adaptor.nil();
                    // 1785:4: -> ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) )
                    {
                        // res/ECMAScript3Ext.g:1785:7: ^( FORSTEP ^( EXPR $ex1) ^( EXPR ( $ex2)? ) ^( EXPR ( $ex3)? ) )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORSTEP, "FORSTEP"), root_1);

                        // res/ECMAScript3Ext.g:1785:18: ^( EXPR $ex1)
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        this.adaptor.addChild(root_2, stream_ex1.nextTree());

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1785:33: ^( EXPR ( $ex2)? )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        // res/ECMAScript3Ext.g:1785:41: ( $ex2)?
                        if ( stream_ex2.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_ex2.nextTree());

                        }
                        stream_ex2.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // res/ECMAScript3Ext.g:1785:49: ^( EXPR ( $ex3)? )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        // res/ECMAScript3Ext.g:1785:57: ( $ex3)?
                        if ( stream_ex3.hasNext() ) {
                            this.adaptor.addChild(root_2, stream_ex3.nextTree());

                        }
                        stream_ex3.reset();

                        this.adaptor.addChild(root_1, root_2);
                        }

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;




                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    forControlSemic_return: (function() {
        ECMAScript3ExtParser.forControlSemic_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.forControlSemic_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1790:1: forControlSemic : SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( EXPR ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) ;
    // $ANTLR start "forControlSemic"
    forControlSemic: function() {
        var retval = new ECMAScript3ExtParser.forControlSemic_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var SEMIC220 = null;
        var SEMIC221 = null;
         var ex1 = null;
         var ex2 = null;

        var SEMIC220_tree=null;
        var SEMIC221_tree=null;
        var stream_SEMIC=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SEMIC");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // res/ECMAScript3Ext.g:1791:2: ( SEMIC (ex1= expression )? SEMIC (ex2= expression )? -> ^( FORSTEP ^( EXPR ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) ) )
            // res/ECMAScript3Ext.g:1791:4: SEMIC (ex1= expression )? SEMIC (ex2= expression )?
            SEMIC220=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlSemic5473);  
            stream_SEMIC.add(SEMIC220);

            // res/ECMAScript3Ext.g:1791:13: (ex1= expression )?
            var alt63=2;
            var LA63_0 = this.input.LA(1);

            if ( ((LA63_0>=NULL && LA63_0<=FALSE)||LA63_0==DELETE||LA63_0==FUNCTION||LA63_0==NEW||LA63_0==THIS||LA63_0==TYPEOF||LA63_0==VOID||LA63_0==LBRACE||LA63_0==LPAREN||LA63_0==LBRACK||(LA63_0>=ADD && LA63_0<=SUB)||(LA63_0>=INC && LA63_0<=DEC)||(LA63_0>=NOT && LA63_0<=INV)||(LA63_0>=Identifier && LA63_0<=StringLiteral)||LA63_0==RegularExpressionLiteral||(LA63_0>=DecimalLiteral && LA63_0<=HexIntegerLiteral)) ) {
                alt63=1;
            }
            switch (alt63) {
                case 1 :
                    // res/ECMAScript3Ext.g:1791:13: ex1= expression
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlSemic5477);
                    ex1=this.expression();

                    this.state._fsp--;

                    stream_expression.add(ex1.getTree());


                    break;

            }

            SEMIC221=this.match(this.input,SEMIC,ECMAScript3ExtParser.FOLLOW_SEMIC_in_forControlSemic5480);  
            stream_SEMIC.add(SEMIC221);

            // res/ECMAScript3Ext.g:1791:35: (ex2= expression )?
            var alt64=2;
            var LA64_0 = this.input.LA(1);

            if ( ((LA64_0>=NULL && LA64_0<=FALSE)||LA64_0==DELETE||LA64_0==FUNCTION||LA64_0==NEW||LA64_0==THIS||LA64_0==TYPEOF||LA64_0==VOID||LA64_0==LBRACE||LA64_0==LPAREN||LA64_0==LBRACK||(LA64_0>=ADD && LA64_0<=SUB)||(LA64_0>=INC && LA64_0<=DEC)||(LA64_0>=NOT && LA64_0<=INV)||(LA64_0>=Identifier && LA64_0<=StringLiteral)||LA64_0==RegularExpressionLiteral||(LA64_0>=DecimalLiteral && LA64_0<=HexIntegerLiteral)) ) {
                alt64=1;
            }
            switch (alt64) {
                case 1 :
                    // res/ECMAScript3Ext.g:1791:35: ex2= expression
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_forControlSemic5484);
                    ex2=this.expression();

                    this.state._fsp--;

                    stream_expression.add(ex2.getTree());


                    break;

            }



            // AST REWRITE
            // elements: ex2, ex1
            // token labels: 
            // rule labels: retval, ex2, ex1
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_ex2=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex2",ex2!=null?ex2.tree:null);
            var stream_ex1=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token ex1",ex1!=null?ex1.tree:null);

            root_0 = this.adaptor.nil();
            // 1792:2: -> ^( FORSTEP ^( EXPR ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) )
            {
                // res/ECMAScript3Ext.g:1792:5: ^( FORSTEP ^( EXPR ) ^( EXPR ( $ex1)? ) ^( EXPR ( $ex2)? ) )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FORSTEP, "FORSTEP"), root_1);

                // res/ECMAScript3Ext.g:1792:16: ^( EXPR )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                this.adaptor.addChild(root_1, root_2);
                }
                // res/ECMAScript3Ext.g:1792:26: ^( EXPR ( $ex1)? )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                // res/ECMAScript3Ext.g:1792:34: ( $ex1)?
                if ( stream_ex1.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_ex1.nextTree());

                }
                stream_ex1.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // res/ECMAScript3Ext.g:1792:42: ^( EXPR ( $ex2)? )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                // res/ECMAScript3Ext.g:1792:50: ( $ex2)?
                if ( stream_ex2.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_ex2.nextTree());

                }
                stream_ex2.reset();

                this.adaptor.addChild(root_1, root_2);
                }

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    continueStatement_return: (function() {
        ECMAScript3ExtParser.continueStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.continueStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1804:1: continueStatement : CONTINUE ( Identifier )? semic ;
    // $ANTLR start "continueStatement"
    continueStatement: function() {
        var retval = new ECMAScript3ExtParser.continueStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CONTINUE222 = null;
        var Identifier223 = null;
         var semic224 = null;

        var CONTINUE222_tree=null;
        var Identifier223_tree=null;

        try {
            // res/ECMAScript3Ext.g:1805:2: ( CONTINUE ( Identifier )? semic )
            // res/ECMAScript3Ext.g:1805:4: CONTINUE ( Identifier )? semic
            root_0 = this.adaptor.nil();

            CONTINUE222=this.match(this.input,CONTINUE,ECMAScript3ExtParser.FOLLOW_CONTINUE_in_continueStatement5537); 
            CONTINUE222_tree = this.adaptor.create(CONTINUE222);
            root_0 = this.adaptor.becomeRoot(CONTINUE222_tree, root_0);

             if (this.input.LA(1) == ECMAScript3ExtLexer.Identifier) this.promoteEOL(null); 
            // res/ECMAScript3Ext.g:1805:97: ( Identifier )?
            var alt65=2;
            var LA65_0 = this.input.LA(1);

            if ( (LA65_0==Identifier) ) {
                alt65=1;
            }
            switch (alt65) {
                case 1 :
                    // res/ECMAScript3Ext.g:1805:97: Identifier
                    Identifier223=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_continueStatement5542); 
                    Identifier223_tree = this.adaptor.create(Identifier223);
                    this.adaptor.addChild(root_0, Identifier223_tree);



                    break;

            }

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_continueStatement5545);
            semic224=this.semic();

            this.state._fsp--;




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    breakStatement_return: (function() {
        ECMAScript3ExtParser.breakStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.breakStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1817:1: breakStatement : BREAK ( Identifier )? semic ;
    // $ANTLR start "breakStatement"
    breakStatement: function() {
        var retval = new ECMAScript3ExtParser.breakStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var BREAK225 = null;
        var Identifier226 = null;
         var semic227 = null;

        var BREAK225_tree=null;
        var Identifier226_tree=null;

        try {
            // res/ECMAScript3Ext.g:1818:2: ( BREAK ( Identifier )? semic )
            // res/ECMAScript3Ext.g:1818:4: BREAK ( Identifier )? semic
            root_0 = this.adaptor.nil();

            BREAK225=this.match(this.input,BREAK,ECMAScript3ExtParser.FOLLOW_BREAK_in_breakStatement5563); 
            BREAK225_tree = this.adaptor.create(BREAK225);
            root_0 = this.adaptor.becomeRoot(BREAK225_tree, root_0);

             if (this.input.LA(1) == ECMAScript3ExtLexer.Identifier) this.promoteEOL(null); 
            // res/ECMAScript3Ext.g:1818:94: ( Identifier )?
            var alt66=2;
            var LA66_0 = this.input.LA(1);

            if ( (LA66_0==Identifier) ) {
                alt66=1;
            }
            switch (alt66) {
                case 1 :
                    // res/ECMAScript3Ext.g:1818:94: Identifier
                    Identifier226=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_breakStatement5568); 
                    Identifier226_tree = this.adaptor.create(Identifier226);
                    this.adaptor.addChild(root_0, Identifier226_tree);



                    break;

            }

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_breakStatement5571);
            semic227=this.semic();

            this.state._fsp--;




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    returnStatement_return: (function() {
        ECMAScript3ExtParser.returnStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.returnStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1838:1: returnStatement : RETURN ( expression )? semic ;
    // $ANTLR start "returnStatement"
    returnStatement: function() {
        var retval = new ECMAScript3ExtParser.returnStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var RETURN228 = null;
         var expression229 = null;
         var semic230 = null;

        var RETURN228_tree=null;

        try {
            // res/ECMAScript3Ext.g:1839:2: ( RETURN ( expression )? semic )
            // res/ECMAScript3Ext.g:1839:4: RETURN ( expression )? semic
            root_0 = this.adaptor.nil();

            RETURN228=this.match(this.input,RETURN,ECMAScript3ExtParser.FOLLOW_RETURN_in_returnStatement5589); 
            RETURN228_tree = this.adaptor.create(RETURN228);
            root_0 = this.adaptor.becomeRoot(RETURN228_tree, root_0);

             this.promoteEOL(null); 
            // res/ECMAScript3Ext.g:1839:39: ( expression )?
            var alt67=2;
            var LA67_0 = this.input.LA(1);

            if ( ((LA67_0>=NULL && LA67_0<=FALSE)||LA67_0==DELETE||LA67_0==FUNCTION||LA67_0==NEW||LA67_0==THIS||LA67_0==TYPEOF||LA67_0==VOID||LA67_0==LBRACE||LA67_0==LPAREN||LA67_0==LBRACK||(LA67_0>=ADD && LA67_0<=SUB)||(LA67_0>=INC && LA67_0<=DEC)||(LA67_0>=NOT && LA67_0<=INV)||(LA67_0>=Identifier && LA67_0<=StringLiteral)||LA67_0==RegularExpressionLiteral||(LA67_0>=DecimalLiteral && LA67_0<=HexIntegerLiteral)) ) {
                alt67=1;
            }
            switch (alt67) {
                case 1 :
                    // res/ECMAScript3Ext.g:1839:39: expression
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_returnStatement5594);
                    expression229=this.expression();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, expression229.getTree());


                    break;

            }

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_returnStatement5597);
            semic230=this.semic();

            this.state._fsp--;




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    withStatement_return: (function() {
        ECMAScript3ExtParser.withStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.withStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1846:1: withStatement : WITH LPAREN expression RPAREN statement ;
    // $ANTLR start "withStatement"
    withStatement: function() {
        var retval = new ECMAScript3ExtParser.withStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var WITH231 = null;
        var LPAREN232 = null;
        var RPAREN234 = null;
         var expression233 = null;
         var statement235 = null;

        var WITH231_tree=null;
        var LPAREN232_tree=null;
        var RPAREN234_tree=null;

        try {
            // res/ECMAScript3Ext.g:1847:2: ( WITH LPAREN expression RPAREN statement )
            // res/ECMAScript3Ext.g:1847:4: WITH LPAREN expression RPAREN statement
            root_0 = this.adaptor.nil();

            WITH231=this.match(this.input,WITH,ECMAScript3ExtParser.FOLLOW_WITH_in_withStatement5613); 
            WITH231_tree = this.adaptor.create(WITH231);
            root_0 = this.adaptor.becomeRoot(WITH231_tree, root_0);

            LPAREN232=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_withStatement5616); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_withStatement5619);
            expression233=this.expression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, expression233.getTree());
            RPAREN234=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_withStatement5621); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_withStatement5624);
            statement235=this.statement();

            this.state._fsp--;

            this.adaptor.addChild(root_0, statement235.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    switchStatement_return: (function() {
        ECMAScript3ExtParser.switchStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.switchStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1854:1: switchStatement : SWITCH LPAREN expression RPAREN LBRACE ({...}? => defaultClause | caseClause )* RBRACE -> ^( SWITCH expression ( defaultClause )? ( caseClause )* ) ;
    // $ANTLR start "switchStatement"
    switchStatement: function() {
        var retval = new ECMAScript3ExtParser.switchStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var SWITCH236 = null;
        var LPAREN237 = null;
        var RPAREN239 = null;
        var LBRACE240 = null;
        var RBRACE243 = null;
         var expression238 = null;
         var defaultClause241 = null;
         var caseClause242 = null;

        var SWITCH236_tree=null;
        var LPAREN237_tree=null;
        var RPAREN239_tree=null;
        var LBRACE240_tree=null;
        var RBRACE243_tree=null;
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_RBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACE");
        var stream_SWITCH=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SWITCH");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");
        var stream_LBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACE");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_caseClause=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule caseClause");
        var stream_defaultClause=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule defaultClause");

        	var defaultClauseCount = 0;

        try {
            // res/ECMAScript3Ext.g:1859:2: ( SWITCH LPAREN expression RPAREN LBRACE ({...}? => defaultClause | caseClause )* RBRACE -> ^( SWITCH expression ( defaultClause )? ( caseClause )* ) )
            // res/ECMAScript3Ext.g:1859:4: SWITCH LPAREN expression RPAREN LBRACE ({...}? => defaultClause | caseClause )* RBRACE
            SWITCH236=this.match(this.input,SWITCH,ECMAScript3ExtParser.FOLLOW_SWITCH_in_switchStatement5644);  
            stream_SWITCH.add(SWITCH236);

            LPAREN237=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_switchStatement5646);  
            stream_LPAREN.add(LPAREN237);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_switchStatement5648);
            expression238=this.expression();

            this.state._fsp--;

            stream_expression.add(expression238.getTree());
            RPAREN239=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_switchStatement5650);  
            stream_RPAREN.add(RPAREN239);

            LBRACE240=this.match(this.input,LBRACE,ECMAScript3ExtParser.FOLLOW_LBRACE_in_switchStatement5652);  
            stream_LBRACE.add(LBRACE240);

            // res/ECMAScript3Ext.g:1859:43: ({...}? => defaultClause | caseClause )*
            loop68:
            do {
                var alt68=3;
                var LA68_0 = this.input.LA(1);

                if ( (LA68_0==DEFAULT) && (( defaultClauseCount == 0 ))) {
                    alt68=1;
                }
                else if ( (LA68_0==CASE) ) {
                    alt68=2;
                }


                switch (alt68) {
                case 1 :
                    // res/ECMAScript3Ext.g:1859:45: {...}? => defaultClause
                    if ( !(( defaultClauseCount == 0 )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "switchStatement", " defaultClauseCount == 0 ");
                    }
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_defaultClause_in_switchStatement5659);
                    defaultClause241=this.defaultClause();

                    this.state._fsp--;

                    stream_defaultClause.add(defaultClause241.getTree());
                     defaultClauseCount++; 


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1859:118: caseClause
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_caseClause_in_switchStatement5665);
                    caseClause242=this.caseClause();

                    this.state._fsp--;

                    stream_caseClause.add(caseClause242.getTree());


                    break;

                default :
                    break loop68;
                }
            } while (true);

            RBRACE243=this.match(this.input,RBRACE,ECMAScript3ExtParser.FOLLOW_RBRACE_in_switchStatement5670);  
            stream_RBRACE.add(RBRACE243);



            // AST REWRITE
            // elements: caseClause, defaultClause, SWITCH, expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1860:2: -> ^( SWITCH expression ( defaultClause )? ( caseClause )* )
            {
                // res/ECMAScript3Ext.g:1860:5: ^( SWITCH expression ( defaultClause )? ( caseClause )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_SWITCH.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());
                // res/ECMAScript3Ext.g:1860:26: ( defaultClause )?
                if ( stream_defaultClause.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_defaultClause.nextTree());

                }
                stream_defaultClause.reset();
                // res/ECMAScript3Ext.g:1860:41: ( caseClause )*
                while ( stream_caseClause.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_caseClause.nextTree());

                }
                stream_caseClause.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    caseClause_return: (function() {
        ECMAScript3ExtParser.caseClause_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.caseClause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1863:1: caseClause : CASE expression COLON ( statement )* ;
    // $ANTLR start "caseClause"
    caseClause: function() {
        var retval = new ECMAScript3ExtParser.caseClause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CASE244 = null;
        var COLON246 = null;
         var expression245 = null;
         var statement247 = null;

        var CASE244_tree=null;
        var COLON246_tree=null;

        try {
            // res/ECMAScript3Ext.g:1864:2: ( CASE expression COLON ( statement )* )
            // res/ECMAScript3Ext.g:1864:4: CASE expression COLON ( statement )*
            root_0 = this.adaptor.nil();

            CASE244=this.match(this.input,CASE,ECMAScript3ExtParser.FOLLOW_CASE_in_caseClause5698); 
            CASE244_tree = this.adaptor.create(CASE244);
            root_0 = this.adaptor.becomeRoot(CASE244_tree, root_0);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_caseClause5701);
            expression245=this.expression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, expression245.getTree());
            COLON246=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_caseClause5703); 
            // res/ECMAScript3Ext.g:1864:28: ( statement )*
            loop69:
            do {
                var alt69=2;
                var LA69_0 = this.input.LA(1);

                if ( ((LA69_0>=NULL && LA69_0<=BREAK)||LA69_0==CONTINUE||(LA69_0>=DELETE && LA69_0<=DO)||(LA69_0>=FOR && LA69_0<=IF)||(LA69_0>=NEW && LA69_0<=WITH)||LA69_0==LBRACE||LA69_0==LPAREN||LA69_0==LBRACK||LA69_0==SEMIC||(LA69_0>=ADD && LA69_0<=SUB)||(LA69_0>=INC && LA69_0<=DEC)||(LA69_0>=NOT && LA69_0<=INV)||(LA69_0>=Identifier && LA69_0<=StringLiteral)||LA69_0==RegularExpressionLiteral||(LA69_0>=DecimalLiteral && LA69_0<=HexIntegerLiteral)) ) {
                    alt69=1;
                }


                switch (alt69) {
                case 1 :
                    // res/ECMAScript3Ext.g:1864:28: statement
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_caseClause5706);
                    statement247=this.statement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, statement247.getTree());


                    break;

                default :
                    break loop69;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    defaultClause_return: (function() {
        ECMAScript3ExtParser.defaultClause_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.defaultClause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1867:1: defaultClause : DEFAULT COLON ( statement )* ;
    // $ANTLR start "defaultClause"
    defaultClause: function() {
        var retval = new ECMAScript3ExtParser.defaultClause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var DEFAULT248 = null;
        var COLON249 = null;
         var statement250 = null;

        var DEFAULT248_tree=null;
        var COLON249_tree=null;

        try {
            // res/ECMAScript3Ext.g:1868:2: ( DEFAULT COLON ( statement )* )
            // res/ECMAScript3Ext.g:1868:4: DEFAULT COLON ( statement )*
            root_0 = this.adaptor.nil();

            DEFAULT248=this.match(this.input,DEFAULT,ECMAScript3ExtParser.FOLLOW_DEFAULT_in_defaultClause5718); 
            DEFAULT248_tree = this.adaptor.create(DEFAULT248);
            root_0 = this.adaptor.becomeRoot(DEFAULT248_tree, root_0);

            COLON249=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_defaultClause5721); 
            // res/ECMAScript3Ext.g:1868:20: ( statement )*
            loop70:
            do {
                var alt70=2;
                var LA70_0 = this.input.LA(1);

                if ( ((LA70_0>=NULL && LA70_0<=BREAK)||LA70_0==CONTINUE||(LA70_0>=DELETE && LA70_0<=DO)||(LA70_0>=FOR && LA70_0<=IF)||(LA70_0>=NEW && LA70_0<=WITH)||LA70_0==LBRACE||LA70_0==LPAREN||LA70_0==LBRACK||LA70_0==SEMIC||(LA70_0>=ADD && LA70_0<=SUB)||(LA70_0>=INC && LA70_0<=DEC)||(LA70_0>=NOT && LA70_0<=INV)||(LA70_0>=Identifier && LA70_0<=StringLiteral)||LA70_0==RegularExpressionLiteral||(LA70_0>=DecimalLiteral && LA70_0<=HexIntegerLiteral)) ) {
                    alt70=1;
                }


                switch (alt70) {
                case 1 :
                    // res/ECMAScript3Ext.g:1868:20: statement
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_defaultClause5724);
                    statement250=this.statement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, statement250.getTree());


                    break;

                default :
                    break loop70;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    labelledStatement_return: (function() {
        ECMAScript3ExtParser.labelledStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.labelledStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1875:1: labelledStatement : Identifier COLON statement -> ^( LABELLED Identifier statement ) ;
    // $ANTLR start "labelledStatement"
    labelledStatement: function() {
        var retval = new ECMAScript3ExtParser.labelledStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var Identifier251 = null;
        var COLON252 = null;
         var statement253 = null;

        var Identifier251_tree=null;
        var COLON252_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_Identifier=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token Identifier");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        try {
            // res/ECMAScript3Ext.g:1876:2: ( Identifier COLON statement -> ^( LABELLED Identifier statement ) )
            // res/ECMAScript3Ext.g:1876:4: Identifier COLON statement
            Identifier251=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_labelledStatement5740);  
            stream_Identifier.add(Identifier251);

            COLON252=this.match(this.input,COLON,ECMAScript3ExtParser.FOLLOW_COLON_in_labelledStatement5742);  
            stream_COLON.add(COLON252);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_labelledStatement5744);
            statement253=this.statement();

            this.state._fsp--;

            stream_statement.add(statement253.getTree());


            // AST REWRITE
            // elements: Identifier, statement
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1877:2: -> ^( LABELLED Identifier statement )
            {
                // res/ECMAScript3Ext.g:1877:5: ^( LABELLED Identifier statement )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LABELLED, "LABELLED"), root_1);

                this.adaptor.addChild(root_1, stream_Identifier.nextNode());
                this.adaptor.addChild(root_1, stream_statement.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    throwStatement_return: (function() {
        ECMAScript3ExtParser.throwStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.throwStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1899:1: throwStatement : THROW expression semic ;
    // $ANTLR start "throwStatement"
    throwStatement: function() {
        var retval = new ECMAScript3ExtParser.throwStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var THROW254 = null;
         var expression255 = null;
         var semic256 = null;

        var THROW254_tree=null;

        try {
            // res/ECMAScript3Ext.g:1900:2: ( THROW expression semic )
            // res/ECMAScript3Ext.g:1900:4: THROW expression semic
            root_0 = this.adaptor.nil();

            THROW254=this.match(this.input,THROW,ECMAScript3ExtParser.FOLLOW_THROW_in_throwStatement5774); 
            THROW254_tree = this.adaptor.create(THROW254);
            root_0 = this.adaptor.becomeRoot(THROW254_tree, root_0);

             this.promoteEOL(null); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_expression_in_throwStatement5779);
            expression255=this.expression();

            this.state._fsp--;

            this.adaptor.addChild(root_0, expression255.getTree());
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_semic_in_throwStatement5781);
            semic256=this.semic();

            this.state._fsp--;




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    tryStatement_return: (function() {
        ECMAScript3ExtParser.tryStatement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.tryStatement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1907:1: tryStatement : TRY block ( catchClause ( finallyClause )? | finallyClause ) ;
    // $ANTLR start "tryStatement"
    tryStatement: function() {
        var retval = new ECMAScript3ExtParser.tryStatement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var TRY257 = null;
         var block258 = null;
         var catchClause259 = null;
         var finallyClause260 = null;
         var finallyClause261 = null;

        var TRY257_tree=null;

        try {
            // res/ECMAScript3Ext.g:1908:2: ( TRY block ( catchClause ( finallyClause )? | finallyClause ) )
            // res/ECMAScript3Ext.g:1908:4: TRY block ( catchClause ( finallyClause )? | finallyClause )
            root_0 = this.adaptor.nil();

            TRY257=this.match(this.input,TRY,ECMAScript3ExtParser.FOLLOW_TRY_in_tryStatement5797); 
            TRY257_tree = this.adaptor.create(TRY257);
            root_0 = this.adaptor.becomeRoot(TRY257_tree, root_0);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_block_in_tryStatement5800);
            block258=this.block();

            this.state._fsp--;

            this.adaptor.addChild(root_0, block258.getTree());
            // res/ECMAScript3Ext.g:1908:15: ( catchClause ( finallyClause )? | finallyClause )
            var alt72=2;
            var LA72_0 = this.input.LA(1);

            if ( (LA72_0==CATCH) ) {
                alt72=1;
            }
            else if ( (LA72_0==FINALLY) ) {
                alt72=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 72, 0, this.input);

                throw nvae;
            }
            switch (alt72) {
                case 1 :
                    // res/ECMAScript3Ext.g:1908:17: catchClause ( finallyClause )?
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_catchClause_in_tryStatement5804);
                    catchClause259=this.catchClause();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, catchClause259.getTree());
                    // res/ECMAScript3Ext.g:1908:29: ( finallyClause )?
                    var alt71=2;
                    var LA71_0 = this.input.LA(1);

                    if ( (LA71_0==FINALLY) ) {
                        alt71=1;
                    }
                    switch (alt71) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1908:29: finallyClause
                            this.pushFollow(ECMAScript3ExtParser.FOLLOW_finallyClause_in_tryStatement5806);
                            finallyClause260=this.finallyClause();

                            this.state._fsp--;

                            this.adaptor.addChild(root_0, finallyClause260.getTree());


                            break;

                    }



                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1908:46: finallyClause
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_finallyClause_in_tryStatement5811);
                    finallyClause261=this.finallyClause();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, finallyClause261.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    catchClause_return: (function() {
        ECMAScript3ExtParser.catchClause_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.catchClause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1911:1: catchClause : CATCH LPAREN Identifier RPAREN block ;
    // $ANTLR start "catchClause"
    catchClause: function() {
        var retval = new ECMAScript3ExtParser.catchClause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CATCH262 = null;
        var LPAREN263 = null;
        var Identifier264 = null;
        var RPAREN265 = null;
         var block266 = null;

        var CATCH262_tree=null;
        var LPAREN263_tree=null;
        var Identifier264_tree=null;
        var RPAREN265_tree=null;

        try {
            // res/ECMAScript3Ext.g:1912:2: ( CATCH LPAREN Identifier RPAREN block )
            // res/ECMAScript3Ext.g:1912:4: CATCH LPAREN Identifier RPAREN block
            root_0 = this.adaptor.nil();

            CATCH262=this.match(this.input,CATCH,ECMAScript3ExtParser.FOLLOW_CATCH_in_catchClause5824); 
            CATCH262_tree = this.adaptor.create(CATCH262);
            root_0 = this.adaptor.becomeRoot(CATCH262_tree, root_0);

            LPAREN263=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_catchClause5827); 
            Identifier264=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_catchClause5830); 
            Identifier264_tree = this.adaptor.create(Identifier264);
            this.adaptor.addChild(root_0, Identifier264_tree);

            RPAREN265=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_catchClause5832); 
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_block_in_catchClause5835);
            block266=this.block();

            this.state._fsp--;

            this.adaptor.addChild(root_0, block266.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    finallyClause_return: (function() {
        ECMAScript3ExtParser.finallyClause_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.finallyClause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1915:1: finallyClause : FINALLY block ;
    // $ANTLR start "finallyClause"
    finallyClause: function() {
        var retval = new ECMAScript3ExtParser.finallyClause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FINALLY267 = null;
         var block268 = null;

        var FINALLY267_tree=null;

        try {
            // res/ECMAScript3Ext.g:1916:2: ( FINALLY block )
            // res/ECMAScript3Ext.g:1916:4: FINALLY block
            root_0 = this.adaptor.nil();

            FINALLY267=this.match(this.input,FINALLY,ECMAScript3ExtParser.FOLLOW_FINALLY_in_finallyClause5846); 
            FINALLY267_tree = this.adaptor.create(FINALLY267);
            root_0 = this.adaptor.becomeRoot(FINALLY267_tree, root_0);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_block_in_finallyClause5849);
            block268=this.block();

            this.state._fsp--;

            this.adaptor.addChild(root_0, block268.getTree());



            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    functionDeclaration_return: (function() {
        ECMAScript3ExtParser.functionDeclaration_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.functionDeclaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1929:1: functionDeclaration : FUNCTION name= Identifier formalParameterList functionBody -> ^( FUNCTION $name formalParameterList functionBody ) ;
    // $ANTLR start "functionDeclaration"
    functionDeclaration: function() {
        var retval = new ECMAScript3ExtParser.functionDeclaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var name = null;
        var FUNCTION269 = null;
         var formalParameterList270 = null;
         var functionBody271 = null;

        var name_tree=null;
        var FUNCTION269_tree=null;
        var stream_FUNCTION=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FUNCTION");
        var stream_Identifier=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token Identifier");
        var stream_functionBody=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule functionBody");
        var stream_formalParameterList=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule formalParameterList");
        try {
            // res/ECMAScript3Ext.g:1930:2: ( FUNCTION name= Identifier formalParameterList functionBody -> ^( FUNCTION $name formalParameterList functionBody ) )
            // res/ECMAScript3Ext.g:1930:4: FUNCTION name= Identifier formalParameterList functionBody
            FUNCTION269=this.match(this.input,FUNCTION,ECMAScript3ExtParser.FOLLOW_FUNCTION_in_functionDeclaration5870);  
            stream_FUNCTION.add(FUNCTION269);

            name=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_functionDeclaration5874);  
            stream_Identifier.add(name);

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_formalParameterList_in_functionDeclaration5876);
            formalParameterList270=this.formalParameterList();

            this.state._fsp--;

            stream_formalParameterList.add(formalParameterList270.getTree());
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_functionBody_in_functionDeclaration5878);
            functionBody271=this.functionBody();

            this.state._fsp--;

            stream_functionBody.add(functionBody271.getTree());


            // AST REWRITE
            // elements: FUNCTION, functionBody, name, formalParameterList
            // token labels: name
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_name=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token name",name);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1931:2: -> ^( FUNCTION $name formalParameterList functionBody )
            {
                // res/ECMAScript3Ext.g:1931:5: ^( FUNCTION $name formalParameterList functionBody )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_FUNCTION.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_name.nextNode());
                this.adaptor.addChild(root_1, stream_formalParameterList.nextTree());
                this.adaptor.addChild(root_1, stream_functionBody.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    functionExpression_return: (function() {
        ECMAScript3ExtParser.functionExpression_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.functionExpression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1934:1: functionExpression : FUNCTION (name= Identifier )? formalParameterList functionBody -> ^( FUNCTION ( $name)? formalParameterList functionBody ) ;
    // $ANTLR start "functionExpression"
    functionExpression: function() {
        var retval = new ECMAScript3ExtParser.functionExpression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var name = null;
        var FUNCTION272 = null;
         var formalParameterList273 = null;
         var functionBody274 = null;

        var name_tree=null;
        var FUNCTION272_tree=null;
        var stream_FUNCTION=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token FUNCTION");
        var stream_Identifier=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token Identifier");
        var stream_functionBody=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule functionBody");
        var stream_formalParameterList=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule formalParameterList");
        try {
            // res/ECMAScript3Ext.g:1935:2: ( FUNCTION (name= Identifier )? formalParameterList functionBody -> ^( FUNCTION ( $name)? formalParameterList functionBody ) )
            // res/ECMAScript3Ext.g:1935:4: FUNCTION (name= Identifier )? formalParameterList functionBody
            FUNCTION272=this.match(this.input,FUNCTION,ECMAScript3ExtParser.FOLLOW_FUNCTION_in_functionExpression5905);  
            stream_FUNCTION.add(FUNCTION272);

            // res/ECMAScript3Ext.g:1935:17: (name= Identifier )?
            var alt73=2;
            var LA73_0 = this.input.LA(1);

            if ( (LA73_0==Identifier) ) {
                alt73=1;
            }
            switch (alt73) {
                case 1 :
                    // res/ECMAScript3Ext.g:1935:17: name= Identifier
                    name=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_functionExpression5909);  
                    stream_Identifier.add(name);



                    break;

            }

            this.pushFollow(ECMAScript3ExtParser.FOLLOW_formalParameterList_in_functionExpression5912);
            formalParameterList273=this.formalParameterList();

            this.state._fsp--;

            stream_formalParameterList.add(formalParameterList273.getTree());
            this.pushFollow(ECMAScript3ExtParser.FOLLOW_functionBody_in_functionExpression5914);
            functionBody274=this.functionBody();

            this.state._fsp--;

            stream_functionBody.add(functionBody274.getTree());


            // AST REWRITE
            // elements: FUNCTION, formalParameterList, name, functionBody
            // token labels: name
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_name=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token name",name);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1936:2: -> ^( FUNCTION ( $name)? formalParameterList functionBody )
            {
                // res/ECMAScript3Ext.g:1936:5: ^( FUNCTION ( $name)? formalParameterList functionBody )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_FUNCTION.nextNode(), root_1);

                // res/ECMAScript3Ext.g:1936:17: ( $name)?
                if ( stream_name.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_name.nextNode());

                }
                stream_name.reset();
                this.adaptor.addChild(root_1, stream_formalParameterList.nextTree());
                this.adaptor.addChild(root_1, stream_functionBody.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    formalParameterList_return: (function() {
        ECMAScript3ExtParser.formalParameterList_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.formalParameterList_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1939:1: formalParameterList : LPAREN ( Identifier ( COMMA Identifier )* )? RPAREN -> ^( ARGS ( Identifier )* ) ;
    // $ANTLR start "formalParameterList"
    formalParameterList: function() {
        var retval = new ECMAScript3ExtParser.formalParameterList_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var LPAREN275 = null;
        var Identifier276 = null;
        var COMMA277 = null;
        var Identifier278 = null;
        var RPAREN279 = null;

        var LPAREN275_tree=null;
        var Identifier276_tree=null;
        var COMMA277_tree=null;
        var Identifier278_tree=null;
        var RPAREN279_tree=null;
        var stream_RPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RPAREN");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_Identifier=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token Identifier");
        var stream_LPAREN=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LPAREN");

        try {
            // res/ECMAScript3Ext.g:1940:2: ( LPAREN ( Identifier ( COMMA Identifier )* )? RPAREN -> ^( ARGS ( Identifier )* ) )
            // res/ECMAScript3Ext.g:1940:4: LPAREN ( Identifier ( COMMA Identifier )* )? RPAREN
            LPAREN275=this.match(this.input,LPAREN,ECMAScript3ExtParser.FOLLOW_LPAREN_in_formalParameterList5942);  
            stream_LPAREN.add(LPAREN275);

            // res/ECMAScript3Ext.g:1940:11: ( Identifier ( COMMA Identifier )* )?
            var alt75=2;
            var LA75_0 = this.input.LA(1);

            if ( (LA75_0==Identifier) ) {
                alt75=1;
            }
            switch (alt75) {
                case 1 :
                    // res/ECMAScript3Ext.g:1940:13: Identifier ( COMMA Identifier )*
                    Identifier276=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_formalParameterList5946);  
                    stream_Identifier.add(Identifier276);

                    // res/ECMAScript3Ext.g:1940:24: ( COMMA Identifier )*
                    loop74:
                    do {
                        var alt74=2;
                        var LA74_0 = this.input.LA(1);

                        if ( (LA74_0==COMMA) ) {
                            alt74=1;
                        }


                        switch (alt74) {
                        case 1 :
                            // res/ECMAScript3Ext.g:1940:26: COMMA Identifier
                            COMMA277=this.match(this.input,COMMA,ECMAScript3ExtParser.FOLLOW_COMMA_in_formalParameterList5950);  
                            stream_COMMA.add(COMMA277);

                            Identifier278=this.match(this.input,Identifier,ECMAScript3ExtParser.FOLLOW_Identifier_in_formalParameterList5952);  
                            stream_Identifier.add(Identifier278);



                            break;

                        default :
                            break loop74;
                        }
                    } while (true);



                    break;

            }

            RPAREN279=this.match(this.input,RPAREN,ECMAScript3ExtParser.FOLLOW_RPAREN_in_formalParameterList5960);  
            stream_RPAREN.add(RPAREN279);



            // AST REWRITE
            // elements: Identifier
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1941:2: -> ^( ARGS ( Identifier )* )
            {
                // res/ECMAScript3Ext.g:1941:5: ^( ARGS ( Identifier )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGS, "ARGS"), root_1);

                // res/ECMAScript3Ext.g:1941:13: ( Identifier )*
                while ( stream_Identifier.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_Identifier.nextNode());

                }
                stream_Identifier.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    functionBody_return: (function() {
        ECMAScript3ExtParser.functionBody_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.functionBody_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1944:1: functionBody : lb= LBRACE ( sourceElement )* RBRACE -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* ) ;
    // $ANTLR start "functionBody"
    functionBody: function() {
        var retval = new ECMAScript3ExtParser.functionBody_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var lb = null;
        var RBRACE281 = null;
         var sourceElement280 = null;

        var lb_tree=null;
        var RBRACE281_tree=null;
        var stream_RBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token RBRACE");
        var stream_LBRACE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token LBRACE");
        var stream_sourceElement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule sourceElement");
        try {
            // res/ECMAScript3Ext.g:1945:2: (lb= LBRACE ( sourceElement )* RBRACE -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* ) )
            // res/ECMAScript3Ext.g:1945:4: lb= LBRACE ( sourceElement )* RBRACE
            lb=this.match(this.input,LBRACE,ECMAScript3ExtParser.FOLLOW_LBRACE_in_functionBody5985);  
            stream_LBRACE.add(lb);

            // res/ECMAScript3Ext.g:1945:14: ( sourceElement )*
            loop76:
            do {
                var alt76=2;
                var LA76_0 = this.input.LA(1);

                if ( ((LA76_0>=NULL && LA76_0<=BREAK)||LA76_0==CONTINUE||(LA76_0>=DELETE && LA76_0<=DO)||(LA76_0>=FOR && LA76_0<=IF)||(LA76_0>=NEW && LA76_0<=WITH)||LA76_0==LBRACE||LA76_0==LPAREN||LA76_0==LBRACK||LA76_0==SEMIC||(LA76_0>=ADD && LA76_0<=SUB)||(LA76_0>=INC && LA76_0<=DEC)||(LA76_0>=NOT && LA76_0<=INV)||(LA76_0>=Identifier && LA76_0<=StringLiteral)||LA76_0==RegularExpressionLiteral||(LA76_0>=DecimalLiteral && LA76_0<=HexIntegerLiteral)) ) {
                    alt76=1;
                }


                switch (alt76) {
                case 1 :
                    // res/ECMAScript3Ext.g:1945:14: sourceElement
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_sourceElement_in_functionBody5987);
                    sourceElement280=this.sourceElement();

                    this.state._fsp--;

                    stream_sourceElement.add(sourceElement280.getTree());


                    break;

                default :
                    break loop76;
                }
            } while (true);

            RBRACE281=this.match(this.input,RBRACE,ECMAScript3ExtParser.FOLLOW_RBRACE_in_functionBody5990);  
            stream_RBRACE.add(RBRACE281);



            // AST REWRITE
            // elements: sourceElement
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 1946:2: -> ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* )
            {
                // res/ECMAScript3Ext.g:1946:5: ^( BLOCK[$lb, \"BLOCK\"] ( sourceElement )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BLOCK, lb, "BLOCK"), root_1);

                // res/ECMAScript3Ext.g:1946:28: ( sourceElement )*
                while ( stream_sourceElement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_sourceElement.nextTree());

                }
                stream_sourceElement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;


            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    program_return: (function() {
        ECMAScript3ExtParser.program_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.program_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1953:1: program : ( sourceElement )* ;
    // $ANTLR start "program"
    program: function() {
        var retval = new ECMAScript3ExtParser.program_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var sourceElement282 = null;


        try {
            // res/ECMAScript3Ext.g:1954:2: ( ( sourceElement )* )
            // res/ECMAScript3Ext.g:1954:4: ( sourceElement )*
            root_0 = this.adaptor.nil();

            // res/ECMAScript3Ext.g:1954:4: ( sourceElement )*
            loop77:
            do {
                var alt77=2;
                var LA77_0 = this.input.LA(1);

                if ( ((LA77_0>=NULL && LA77_0<=BREAK)||LA77_0==CONTINUE||(LA77_0>=DELETE && LA77_0<=DO)||(LA77_0>=FOR && LA77_0<=IF)||(LA77_0>=NEW && LA77_0<=WITH)||LA77_0==LBRACE||LA77_0==LPAREN||LA77_0==LBRACK||LA77_0==SEMIC||(LA77_0>=ADD && LA77_0<=SUB)||(LA77_0>=INC && LA77_0<=DEC)||(LA77_0>=NOT && LA77_0<=INV)||(LA77_0>=Identifier && LA77_0<=StringLiteral)||LA77_0==RegularExpressionLiteral||(LA77_0>=DecimalLiteral && LA77_0<=HexIntegerLiteral)) ) {
                    alt77=1;
                }


                switch (alt77) {
                case 1 :
                    // res/ECMAScript3Ext.g:1954:4: sourceElement
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_sourceElement_in_program6018);
                    sourceElement282=this.sourceElement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, sourceElement282.getTree());


                    break;

                default :
                    break loop77;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    sourceElement_return: (function() {
        ECMAScript3ExtParser.sourceElement_return = function(){};
        org.antlr.lang.extend(ECMAScript3ExtParser.sourceElement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // res/ECMAScript3Ext.g:1962:1: sourceElement options {k=1; } : ({...}? functionDeclaration | statement );
    // $ANTLR start "sourceElement"
    sourceElement: function() {
        var retval = new ECMAScript3ExtParser.sourceElement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var functionDeclaration283 = null;
         var statement284 = null;


        try {
            // res/ECMAScript3Ext.g:1967:2: ({...}? functionDeclaration | statement )
            var alt78=2;
            alt78 = this.dfa78.predict(this.input);
            switch (alt78) {
                case 1 :
                    // res/ECMAScript3Ext.g:1967:4: {...}? functionDeclaration
                    root_0 = this.adaptor.nil();

                    if ( !(( this.input.LA(1) == ECMAScript3ExtLexer.FUNCTION )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "sourceElement", " this.input.LA(1) == ECMAScript3ExtLexer.FUNCTION ");
                    }
                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_functionDeclaration_in_sourceElement6047);
                    functionDeclaration283=this.functionDeclaration();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, functionDeclaration283.getTree());


                    break;
                case 2 :
                    // res/ECMAScript3Ext.g:1968:4: statement
                    root_0 = this.adaptor.nil();

                    this.pushFollow(ECMAScript3ExtParser.FOLLOW_statement_in_sourceElement6052);
                    statement284=this.statement();

                    this.state._fsp--;

                    this.adaptor.addChild(root_0, statement284.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);

        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    }

    // Delegated rules




}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA47_eotS:
        "\u0024\uffff",
    DFA47_eofS:
        "\u0024\uffff",
    DFA47_minS:
        "\u0001\u0004\u0001\u0000\u0022\uffff",
    DFA47_maxS:
        "\u0001\u00a9\u0001\u0000\u0022\uffff",
    DFA47_acceptS:
        "\u0002\uffff\u0001\u0002\u0020\uffff\u0001\u0001",
    DFA47_specialS:
        "\u0001\uffff\u0001\u0000\u0022\uffff}>",
    DFA47_transitionS: [
            "\u0004\u0002\u0002\uffff\u0001\u0002\u0001\uffff\u0002\u0002"+
            "\u0002\uffff\u0003\u0002\u0002\uffff\u000b\u0002\u001f\uffff"+
            "\u0001\u0001\u0001\uffff\u0001\u0002\u0001\uffff\u0001\u0002"+
            "\u0002\uffff\u0001\u0002\u0009\uffff\u0002\u0002\u0002\uffff"+
            "\u0002\u0002\u0005\uffff\u0002\u0002\u003c\uffff\u0002\u0002"+
            "\u0005\uffff\u0001\u0002\u0005\uffff\u0004\u0002",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA47_eot:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA47_eotS),
    DFA47_eof:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA47_eofS),
    DFA47_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA47_minS),
    DFA47_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA47_maxS),
    DFA47_accept:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA47_acceptS),
    DFA47_special:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA47_specialS),
    DFA47_transition: (function() {
        var a = [],
            i,
            numStates = ECMAScript3ExtParser.DFA47_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA47_transitionS[i]));
        }
        return a;
    })()
});

ECMAScript3ExtParser.DFA47 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 47;
    this.eot = ECMAScript3ExtParser.DFA47_eot;
    this.eof = ECMAScript3ExtParser.DFA47_eof;
    this.min = ECMAScript3ExtParser.DFA47_min;
    this.max = ECMAScript3ExtParser.DFA47_max;
    this.accept = ECMAScript3ExtParser.DFA47_accept;
    this.special = ECMAScript3ExtParser.DFA47_special;
    this.transition = ECMAScript3ExtParser.DFA47_transition;
};

org.antlr.lang.extend(ECMAScript3ExtParser.DFA47, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1604:1: statement options {k=1; } : ({...}? block | statementTail );";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA47_1 = input.LA(1);

                             
                            var index47_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (( this.input.LA(1) == ECMAScript3ExtParser.LBRACE )) ) {s = 35;}

                            else if ( (true) ) {s = 2;}

                             
                            input.seek(index47_1);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 47, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA48_eotS:
        "\u000f\uffff",
    DFA48_eofS:
        "\u0004\uffff\u0001\u0003\u000a\uffff",
    DFA48_minS:
        "\u0001\u0004\u0003\uffff\u0001\u0013\u000a\uffff",
    DFA48_maxS:
        "\u0001\u00a9\u0003\uffff\u0001\u0097\u000a\uffff",
    DFA48_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\uffff\u0001"+
    "\u0004\u0001\u0005\u0001\u0006\u0001\u0007\u0001\u0008\u0001\u0009\u0001"+
    "\u000b\u0001\u000c\u0001\u000d\u0001\u000a",
    DFA48_specialS:
        "\u000f\uffff}>",
    DFA48_transitionS: [
            "\u0003\u0003\u0001\u0008\u0002\uffff\u0001\u0007\u0001\uffff"+
            "\u0001\u0003\u0001\u0006\u0002\uffff\u0001\u0006\u0001\u0003"+
            "\u0001\u0005\u0002\uffff\u0001\u0003\u0001\u0009\u0001\u000b"+
            "\u0001\u0003\u0001\u000c\u0001\u000d\u0001\u0003\u0001\u0001"+
            "\u0001\u0003\u0001\u0006\u0001\u000a\u001f\uffff\u0001\u0003"+
            "\u0001\uffff\u0001\u0003\u0001\uffff\u0001\u0003\u0002\uffff"+
            "\u0001\u0002\u0009\uffff\u0002\u0003\u0002\uffff\u0002\u0003"+
            "\u0005\uffff\u0002\u0003\u003c\uffff\u0001\u0004\u0001\u0003"+
            "\u0005\uffff\u0001\u0003\u0005\uffff\u0004\u0003",
            "",
            "",
            "",
            "\u0002\u0003\u002b\uffff\u0002\u0003\u0001\uffff\u0001\u0003"+
            "\u0001\uffff\u0017\u0003\u0001\uffff\u0003\u0003\u0001\u000e"+
            "\u000c\u0003\u0014\uffff\u0006\u0003\u000f\uffff\u0002\u0003",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA48_eot:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA48_eotS),
    DFA48_eof:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA48_eofS),
    DFA48_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA48_minS),
    DFA48_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA48_maxS),
    DFA48_accept:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA48_acceptS),
    DFA48_special:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA48_specialS),
    DFA48_transition: (function() {
        var a = [],
            i,
            numStates = ECMAScript3ExtParser.DFA48_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA48_transitionS[i]));
        }
        return a;
    })()
});

ECMAScript3ExtParser.DFA48 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 48;
    this.eot = ECMAScript3ExtParser.DFA48_eot;
    this.eof = ECMAScript3ExtParser.DFA48_eof;
    this.min = ECMAScript3ExtParser.DFA48_min;
    this.max = ECMAScript3ExtParser.DFA48_max;
    this.accept = ECMAScript3ExtParser.DFA48_accept;
    this.special = ECMAScript3ExtParser.DFA48_special;
    this.transition = ECMAScript3ExtParser.DFA48_transition;
};

org.antlr.lang.extend(ECMAScript3ExtParser.DFA48, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1613:1: statementTail : ( variableStatement | emptyStatement | expressionStatement | ifStatement | iterationStatement | continueStatement | breakStatement | returnStatement | withStatement | labelledStatement | switchStatement | throwStatement | tryStatement );";
    },
    dummy: null
});
org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA78_eotS:
        "\u0024\uffff",
    DFA78_eofS:
        "\u0024\uffff",
    DFA78_minS:
        "\u0001\u0004\u0001\u0000\u0022\uffff",
    DFA78_maxS:
        "\u0001\u00a9\u0001\u0000\u0022\uffff",
    DFA78_acceptS:
        "\u0002\uffff\u0001\u0002\u0020\uffff\u0001\u0001",
    DFA78_specialS:
        "\u0001\uffff\u0001\u0000\u0022\uffff}>",
    DFA78_transitionS: [
            "\u0004\u0002\u0002\uffff\u0001\u0002\u0001\uffff\u0002\u0002"+
            "\u0002\uffff\u0001\u0002\u0001\u0001\u0001\u0002\u0002\uffff"+
            "\u000b\u0002\u001f\uffff\u0001\u0002\u0001\uffff\u0001\u0002"+
            "\u0001\uffff\u0001\u0002\u0002\uffff\u0001\u0002\u0009\uffff"+
            "\u0002\u0002\u0002\uffff\u0002\u0002\u0005\uffff\u0002\u0002"+
            "\u003c\uffff\u0002\u0002\u0005\uffff\u0001\u0002\u0005\uffff"+
            "\u0004\u0002",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    DFA78_eot:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA78_eotS),
    DFA78_eof:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA78_eofS),
    DFA78_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA78_minS),
    DFA78_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtParser.DFA78_maxS),
    DFA78_accept:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA78_acceptS),
    DFA78_special:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA78_specialS),
    DFA78_transition: (function() {
        var a = [],
            i,
            numStates = ECMAScript3ExtParser.DFA78_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtParser.DFA78_transitionS[i]));
        }
        return a;
    })()
});

ECMAScript3ExtParser.DFA78 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 78;
    this.eot = ECMAScript3ExtParser.DFA78_eot;
    this.eof = ECMAScript3ExtParser.DFA78_eof;
    this.min = ECMAScript3ExtParser.DFA78_min;
    this.max = ECMAScript3ExtParser.DFA78_max;
    this.accept = ECMAScript3ExtParser.DFA78_accept;
    this.special = ECMAScript3ExtParser.DFA78_special;
    this.transition = ECMAScript3ExtParser.DFA78_transition;
};

org.antlr.lang.extend(ECMAScript3ExtParser.DFA78, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1962:1: sourceElement options {k=1; } : ({...}? functionDeclaration | statement );";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA78_1 = input.LA(1);

                             
                            var index78_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (( this.input.LA(1) == ECMAScript3ExtLexer.FUNCTION )) ) {s = 35;}

                            else if ( (true) ) {s = 2;}

                             
                            input.seek(index78_1);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 78, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
 

// public class variables
org.antlr.lang.augmentObject(ECMAScript3ExtParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "NULL", "TRUE", "FALSE", "BREAK", "CASE", "CATCH", "CONTINUE", "DEFAULT", "DELETE", "DO", "ELSE", "FINALLY", "FOR", "FUNCTION", "IF", "IN", "INSTANCEOF", "NEW", "RETURN", "SWITCH", "THIS", "THROW", "TRY", "TYPEOF", "VAR", "VOID", "WHILE", "WITH", "ABSTRACT", "BOOLEAN", "BYTE", "CHAR", "CLASS", "CONST", "DEBUGGER", "DOUBLE", "ENUM", "EXPORT", "EXTENDS", "FINAL", "FLOAT", "GOTO", "IMPLEMENTS", "IMPORT", "INT", "INTERFACE", "LONG", "NATIVE", "PACKAGE", "PRIVATE", "PROTECTED", "PUBLIC", "SHORT", "STATIC", "SUPER", "SYNCHRONIZED", "THROWS", "TRANSIENT", "VOLATILE", "LBRACE", "RBRACE", "LPAREN", "RPAREN", "LBRACK", "RBRACK", "DOT", "SEMIC", "COMMA", "LT", "GT", "LTE", "GTE", "EQ", "NEQ", "SAME", "NSAME", "ADD", "SUB", "MUL", "MOD", "INC", "DEC", "SHL", "SHR", "SHU", "AND", "OR", "NOT", "INV", "LAND", "LOR", "QUE", "COLON", "ASSIGN", "ADDASS", "SUBASS", "MULASS", "MODASS", "SHLASS", "SHRASS", "SHUASS", "ANDASS", "ORASS", "DIV", "DIVASS", "ARGS", "ARRAY", "BLOCK", "BYFIELD", "BYINDEX", "CALL", "CEXPR", "EXPR", "FORITER", "FORSTEP", "ITEM", "LABELLED", "NAMEDVALUE", "NEG", "OBJECT", "PAREXPR", "PDEC", "PINC", "POS", "FACTORIAL", "POW", "POWASS", "CARET", "CARETASS", "XOR", "XORASS", "BSLASH", "DQUOTE", "SQUOTE", "TAB", "VT", "FF", "SP", "NBSP", "USP", "WhiteSpace", "LF", "CR", "LS", "PS", "LineTerminator", "EOL", "MultiLineComment", "SingleLineComment", "Identifier", "StringLiteral", "HexDigit", "IdentifierStartASCII", "DecimalDigit", "IdentifierPart", "IdentifierNameASCIIStart", "RegularExpressionLiteral", "OctalDigit", "BinaryDigit", "ExponentPart", "DecimalIntegerLiteralWithoutLeadingZero", "DecimalIntegerLiteral", "DecimalLiteral", "OctalIntegerLiteral", "BinaryIntegerLiteral", "HexIntegerLiteral", "CharacterEscapeSequence", "ZeroToThree", "OctalEscapeSequence", "HexEscapeSequence", "UnicodeEscapeSequence", "EscapeSequence", "BackslashSequence", "RegularExpressionFirstChar", "RegularExpressionChar"],
    FOLLOW_reservedWord_in_token1843: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_Identifier_in_token1848: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_punctuator_in_token1853: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_numericLiteral_in_token1858: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_StringLiteral_in_token1863: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_keyword_in_reservedWord1876: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_futureReservedWord_in_reservedWord1881: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NULL_in_reservedWord1886: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_booleanLiteral_in_reservedWord1891: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_keyword0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_futureReservedWord0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_punctuator0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NULL_in_literal2594: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_booleanLiteral_in_literal2599: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_numericLiteral_in_literal2604: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_StringLiteral_in_literal2609: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_RegularExpressionLiteral_in_literal2614: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_booleanLiteral0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_numericLiteral0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_THIS_in_primaryExpression3294: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_Identifier_in_primaryExpression3299: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_literal_in_primaryExpression3304: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_arrayLiteral_in_primaryExpression3309: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_objectLiteral_in_primaryExpression3314: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_primaryExpression3321: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_primaryExpression3323: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_primaryExpression3325: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LBRACK_in_arrayLiteral3349: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833009A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_arrayItem_in_arrayLiteral3351: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000090, 0x00000000]),
    FOLLOW_COMMA_in_arrayLiteral3355: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833009A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_arrayItem_in_arrayLiteral3357: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000090, 0x00000000]),
    FOLLOW_RBRACK_in_arrayLiteral3362: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_assignmentExpression_in_arrayItem3390: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LBRACE_in_objectLiteral3422: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000001, 0x00000000,0x06000000, 0x000003C0]),
    FOLLOW_nameValuePair_in_objectLiteral3426: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000081, 0x00000000]),
    FOLLOW_COMMA_in_objectLiteral3430: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x06000000, 0x000003C0]),
    FOLLOW_nameValuePair_in_objectLiteral3432: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000081, 0x00000000]),
    FOLLOW_COMMA_in_objectLiteral3437: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000001, 0x00000000]),
    FOLLOW_RBRACE_in_objectLiteral3443: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_propertyName_in_nameValuePair3467: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_nameValuePair3469: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_nameValuePair3471: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_Identifier_in_propertyName3495: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_StringLiteral_in_propertyName3500: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_numericLiteral_in_propertyName3505: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_primaryExpression_in_memberExpression3523: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_functionExpression_in_memberExpression3528: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_newExpression_in_memberExpression3533: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NEW_in_newExpression3544: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_memberExpression_in_newExpression3547: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_arguments3559: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000E, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_arguments3563: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000084, 0x00000000]),
    FOLLOW_COMMA_in_arguments3567: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_arguments3569: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000084, 0x00000000]),
    FOLLOW_RPAREN_in_arguments3577: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_memberExpression_in_leftHandSideExpression3605: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000002A, 0x00000000]),
    FOLLOW_arguments_in_leftHandSideExpression3621: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000002A, 0x00000000]),
    FOLLOW_LBRACK_in_leftHandSideExpression3642: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_leftHandSideExpression3644: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000010, 0x00000000]),
    FOLLOW_RBRACK_in_leftHandSideExpression3646: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000002A, 0x00000000]),
    FOLLOW_DOT_in_leftHandSideExpression3665: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_leftHandSideExpression3667: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000002A, 0x00000000]),
    FOLLOW_leftHandSideExpression_in_postfixExpression3702: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x08300000, 0x00000000]),
    FOLLOW_postfixOperator_in_postfixExpression3708: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_INC_in_postfixOperator3725: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DEC_in_postfixOperator3734: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NOT_in_postfixOperator3750: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POW_in_powOperator3772: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CARET_in_powOperator3786: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_postfixExpression_in_powExpression3814: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000000,0x0000000A, 0x00000000]),
    FOLLOW_powOperator_in_powExpression3825: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_unaryExpression_in_powExpression3828: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unaryOperator_in_unaryExpression3854: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_unaryExpression_in_unaryExpression3857: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_powExpression_in_unaryExpression3869: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DELETE_in_unaryOperator3880: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_VOID_in_unaryOperator3885: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_TYPEOF_in_unaryOperator3890: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_INC_in_unaryOperator3895: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DEC_in_unaryOperator3900: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ADD_in_unaryOperator3907: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SUB_in_unaryOperator3916: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_INV_in_unaryOperator3923: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_NOT_in_unaryOperator3928: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_unaryExpression_in_multiplicativeExpression3943: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x000C0000, 0x00000800]),
    FOLLOW_set_in_multiplicativeExpression3947: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_unaryExpression_in_multiplicativeExpression3962: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x000C0000, 0x00000800]),
    FOLLOW_multiplicativeExpression_in_additiveExpression3980: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00030000, 0x00000000]),
    FOLLOW_set_in_additiveExpression3984: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_multiplicativeExpression_in_additiveExpression3995: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00030000, 0x00000000]),
    FOLLOW_additiveExpression_in_shiftExpression4013: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x01C00000, 0x00000000]),
    FOLLOW_set_in_shiftExpression4017: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_additiveExpression_in_shiftExpression4032: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x01C00000, 0x00000000]),
    FOLLOW_shiftExpression_in_relationalExpression4050: new org.antlr.runtime.BitSet([0x00180002, 0x00000000,0x00000F00, 0x00000000]),
    FOLLOW_set_in_relationalExpression4054: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_shiftExpression_in_relationalExpression4081: new org.antlr.runtime.BitSet([0x00180002, 0x00000000,0x00000F00, 0x00000000]),
    FOLLOW_shiftExpression_in_relationalExpressionNoIn4095: new org.antlr.runtime.BitSet([0x00100002, 0x00000000,0x00000F00, 0x00000000]),
    FOLLOW_set_in_relationalExpressionNoIn4099: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_shiftExpression_in_relationalExpressionNoIn4122: new org.antlr.runtime.BitSet([0x00100002, 0x00000000,0x00000F00, 0x00000000]),
    FOLLOW_relationalExpression_in_equalityExpression4140: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000F000, 0x00000000]),
    FOLLOW_set_in_equalityExpression4144: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_relationalExpression_in_equalityExpression4163: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000F000, 0x00000000]),
    FOLLOW_relationalExpressionNoIn_in_equalityExpressionNoIn4177: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000F000, 0x00000000]),
    FOLLOW_set_in_equalityExpressionNoIn4181: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_relationalExpressionNoIn_in_equalityExpressionNoIn4200: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x0000F000, 0x00000000]),
    FOLLOW_equalityExpression_in_bitwiseANDExpression4218: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_AND_in_bitwiseANDExpression4222: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_equalityExpression_in_bitwiseANDExpression4225: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_equalityExpressionNoIn_in_bitwiseANDExpressionNoIn4239: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_AND_in_bitwiseANDExpressionNoIn4243: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_equalityExpressionNoIn_in_bitwiseANDExpressionNoIn4246: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_bitwiseANDExpression_in_bitwiseXORExpression4260: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_XOR_in_bitwiseXORExpression4264: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseANDExpression_in_bitwiseXORExpression4267: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_bitwiseANDExpressionNoIn_in_bitwiseXORExpressionNoIn4281: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_XOR_in_bitwiseXORExpressionNoIn4285: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseANDExpressionNoIn_in_bitwiseXORExpressionNoIn4288: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_bitwiseXORExpression_in_bitwiseORExpression4302: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x04000000, 0x00000000]),
    FOLLOW_OR_in_bitwiseORExpression4306: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseXORExpression_in_bitwiseORExpression4309: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x04000000, 0x00000000]),
    FOLLOW_bitwiseXORExpressionNoIn_in_bitwiseORExpressionNoIn4323: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x04000000, 0x00000000]),
    FOLLOW_OR_in_bitwiseORExpressionNoIn4327: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseXORExpressionNoIn_in_bitwiseORExpressionNoIn4330: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x04000000, 0x00000000]),
    FOLLOW_bitwiseORExpression_in_logicalANDExpression4348: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x20000000, 0x00000000]),
    FOLLOW_LAND_in_logicalANDExpression4352: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseORExpression_in_logicalANDExpression4355: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x20000000, 0x00000000]),
    FOLLOW_bitwiseORExpressionNoIn_in_logicalANDExpressionNoIn4369: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x20000000, 0x00000000]),
    FOLLOW_LAND_in_logicalANDExpressionNoIn4373: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_bitwiseORExpressionNoIn_in_logicalANDExpressionNoIn4376: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x20000000, 0x00000000]),
    FOLLOW_logicalANDExpression_in_logicalORExpression4390: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x40000000, 0x00000000]),
    FOLLOW_LOR_in_logicalORExpression4394: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_logicalANDExpression_in_logicalORExpression4397: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x40000000, 0x00000000]),
    FOLLOW_logicalANDExpressionNoIn_in_logicalORExpressionNoIn4411: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x40000000, 0x00000000]),
    FOLLOW_LOR_in_logicalORExpressionNoIn4415: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_logicalANDExpressionNoIn_in_logicalORExpressionNoIn4418: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x40000000, 0x00000000]),
    FOLLOW_logicalORExpression_in_conditionalExpression4436: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x80000000, 0x00000000]),
    FOLLOW_QUE_in_conditionalExpression4440: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_conditionalExpression4443: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_conditionalExpression4445: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_conditionalExpression4448: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_logicalORExpressionNoIn_in_conditionalExpressionNoIn4462: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x80000000, 0x00000000]),
    FOLLOW_QUE_in_conditionalExpressionNoIn4466: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpressionNoIn_in_conditionalExpressionNoIn4469: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_conditionalExpressionNoIn4471: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpressionNoIn_in_conditionalExpressionNoIn4474: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_conditionalExpression_in_assignmentExpression4501: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000017FE,0x00000054, 0x00000000]),
    FOLLOW_assignmentOperator_in_assignmentExpression4508: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_assignmentExpression4511: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_assignmentOperator0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_conditionalExpressionNoIn_in_assignmentExpressionNoIn4595: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000017FE,0x00000054, 0x00000000]),
    FOLLOW_assignmentOperator_in_assignmentExpressionNoIn4602: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpressionNoIn_in_assignmentExpressionNoIn4605: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_assignmentExpression_in_expression4625: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000080, 0x00000000]),
    FOLLOW_COMMA_in_expression4629: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_expression4633: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000080, 0x00000000]),
    FOLLOW_assignmentExpressionNoIn_in_expressionNoIn4670: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000080, 0x00000000]),
    FOLLOW_COMMA_in_expressionNoIn4674: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpressionNoIn_in_expressionNoIn4678: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000080, 0x00000000]),
    FOLLOW_SEMIC_in_semic4728: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_EOF_in_semic4733: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_RBRACE_in_semic4738: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_EOL_in_semic4745: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_MultiLineComment_in_semic4749: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_block_in_statement4778: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_statementTail_in_statement4783: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_variableStatement_in_statementTail4794: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_emptyStatement_in_statementTail4799: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expressionStatement_in_statementTail4804: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ifStatement_in_statementTail4809: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_iterationStatement_in_statementTail4814: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_continueStatement_in_statementTail4819: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_breakStatement_in_statementTail4824: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_returnStatement_in_statementTail4829: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_withStatement_in_statementTail4834: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_labelledStatement_in_statementTail4839: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_switchStatement_in_statementTail4844: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_throwStatement_in_statementTail4849: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_tryStatement_in_statementTail4854: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LBRACE_in_block4870: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004B, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_sourceElement_in_block4872: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004B, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_RBRACE_in_block4875: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_VAR_in_variableStatement4903: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_variableDeclaration_in_variableStatement4905: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_COMMA_in_variableStatement4909: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_variableDeclaration_in_variableStatement4911: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_variableStatement4916: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_Identifier_in_variableDeclaration4939: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000002]),
    FOLLOW_ASSIGN_in_variableDeclaration4943: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpression_in_variableDeclaration4946: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_Identifier_in_variableDeclarationNoIn4960: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000002]),
    FOLLOW_ASSIGN_in_variableDeclarationNoIn4964: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_assignmentExpressionNoIn_in_variableDeclarationNoIn4967: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SEMIC_in_emptyStatement4985: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_expressionStatement5002: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_expressionStatement5004: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IF_in_ifStatement5021: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_ifStatement5023: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_ifStatement5025: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_ifStatement5027: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_ifStatement5029: new org.antlr.runtime.BitSet([0x00004002, 0x00000000]),
    FOLLOW_ELSE_in_ifStatement5035: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_ifStatement5037: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_doStatement_in_iterationStatement5069: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_whileStatement_in_iterationStatement5074: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forStatement_in_iterationStatement5079: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DO_in_doStatement5090: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_doStatement5092: new org.antlr.runtime.BitSet([0x40000000, 0x00000000]),
    FOLLOW_WHILE_in_doStatement5094: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_doStatement5096: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_doStatement5098: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_doStatement5100: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_doStatement5102: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_WHILE_in_whileStatement5126: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_whileStatement5129: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_whileStatement5132: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_whileStatement5134: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_whileStatement5137: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FOR_in_forStatement5150: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_forStatement5153: new org.antlr.runtime.BitSet([0x39221070, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_forControl_in_forStatement5156: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_forStatement5158: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_forStatement5161: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forControlVar_in_forControl5172: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forControlExpression_in_forControl5177: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_forControlSemic_in_forControl5182: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_VAR_in_forControlVar5193: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_variableDeclarationNoIn_in_forControlVar5195: new org.antlr.runtime.BitSet([0x00080000, 0x00000000,0x000000C0, 0x00000000]),
    FOLLOW_IN_in_forControlVar5207: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlVar5209: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_COMMA_in_forControlVar5255: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_variableDeclarationNoIn_in_forControlVar5257: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C0, 0x00000000]),
    FOLLOW_SEMIC_in_forControlVar5262: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlVar5266: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_SEMIC_in_forControlVar5269: new org.antlr.runtime.BitSet([0x29221072, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlVar5273: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expressionNoIn_in_forControlExpression5339: new org.antlr.runtime.BitSet([0x00080000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_IN_in_forControlExpression5353: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlExpression5357: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SEMIC_in_forControlExpression5403: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlExpression5407: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_SEMIC_in_forControlExpression5410: new org.antlr.runtime.BitSet([0x29221072, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlExpression5414: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SEMIC_in_forControlSemic5473: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlSemic5477: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_SEMIC_in_forControlSemic5480: new org.antlr.runtime.BitSet([0x29221072, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_forControlSemic5484: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CONTINUE_in_continueStatement5537: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x02C00000, 0x00000000]),
    FOLLOW_Identifier_in_continueStatement5542: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_continueStatement5545: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_BREAK_in_breakStatement5563: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x02C00000, 0x00000000]),
    FOLLOW_Identifier_in_breakStatement5568: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_breakStatement5571: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_RETURN_in_returnStatement5589: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x183300CB, 0x00000000,0x06C00000, 0x000003C1]),
    FOLLOW_expression_in_returnStatement5594: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_returnStatement5597: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_WITH_in_withStatement5613: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_withStatement5616: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_withStatement5619: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_withStatement5621: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_withStatement5624: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SWITCH_in_switchStatement5644: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_switchStatement5646: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_switchStatement5648: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_switchStatement5650: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_LBRACE_in_switchStatement5652: new org.antlr.runtime.BitSet([0x00000900, 0x00000000,0x00000001, 0x00000000]),
    FOLLOW_defaultClause_in_switchStatement5659: new org.antlr.runtime.BitSet([0x00000900, 0x00000000,0x00000001, 0x00000000]),
    FOLLOW_caseClause_in_switchStatement5665: new org.antlr.runtime.BitSet([0x00000900, 0x00000000,0x00000001, 0x00000000]),
    FOLLOW_RBRACE_in_switchStatement5670: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CASE_in_caseClause5698: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_caseClause5701: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_caseClause5703: new org.antlr.runtime.BitSet([0xFFE734F2, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_caseClause5706: new org.antlr.runtime.BitSet([0xFFE734F2, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_DEFAULT_in_defaultClause5718: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_defaultClause5721: new org.antlr.runtime.BitSet([0xFFE734F2, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_defaultClause5724: new org.antlr.runtime.BitSet([0xFFE734F2, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_Identifier_in_labelledStatement5740: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000001]),
    FOLLOW_COLON_in_labelledStatement5742: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_statement_in_labelledStatement5744: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_THROW_in_throwStatement5774: new org.antlr.runtime.BitSet([0x29221070, 0x80000000,0x1833000A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_expression_in_throwStatement5779: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x000000C1, 0x00000000,0x00C00000, 0x00000000]),
    FOLLOW_semic_in_throwStatement5781: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_TRY_in_tryStatement5797: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_block_in_tryStatement5800: new org.antlr.runtime.BitSet([0x00008200, 0x00000000]),
    FOLLOW_catchClause_in_tryStatement5804: new org.antlr.runtime.BitSet([0x00008202, 0x00000000]),
    FOLLOW_finallyClause_in_tryStatement5806: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_finallyClause_in_tryStatement5811: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CATCH_in_catchClause5824: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_catchClause5827: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_catchClause5830: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000]),
    FOLLOW_RPAREN_in_catchClause5832: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_block_in_catchClause5835: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FINALLY_in_finallyClause5846: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_block_in_finallyClause5849: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FUNCTION_in_functionDeclaration5870: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_functionDeclaration5874: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_formalParameterList_in_functionDeclaration5876: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_functionBody_in_functionDeclaration5878: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FUNCTION_in_functionExpression5905: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_functionExpression5909: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000002, 0x00000000]),
    FOLLOW_formalParameterList_in_functionExpression5912: new org.antlr.runtime.BitSet([0x00000000, 0x80000000]),
    FOLLOW_functionBody_in_functionExpression5914: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LPAREN_in_formalParameterList5942: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000004, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_formalParameterList5946: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000084, 0x00000000]),
    FOLLOW_COMMA_in_formalParameterList5950: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000000,0x02000000, 0x00000000]),
    FOLLOW_Identifier_in_formalParameterList5952: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000084, 0x00000000]),
    FOLLOW_RPAREN_in_formalParameterList5960: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_LBRACE_in_functionBody5985: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004B, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_sourceElement_in_functionBody5987: new org.antlr.runtime.BitSet([0xFFE734F0, 0x80000000,0x1833004B, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_RBRACE_in_functionBody5990: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_sourceElement_in_program6018: new org.antlr.runtime.BitSet([0xFFE734F2, 0x80000000,0x1833004A, 0x00000000,0x06000000, 0x000003C1]),
    FOLLOW_functionDeclaration_in_sourceElement6047: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_statement_in_sourceElement6052: new org.antlr.runtime.BitSet([0x00000002, 0x00000000])
});

})();