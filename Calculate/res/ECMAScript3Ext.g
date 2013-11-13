/*

Copyrights 2008-2009 Xebic Reasearch BV. All rights reserved (see license.txt).
Original work by Patrick Hulsmeijer.

http://research.xebic.com/es3/

NOTE: This is NOT ECMAScript - it is a modification of Patrick's work.
It has extentions for the power operator and factorial. Complete changes from
the original ES3.g:

- Added trailing comma in object literal [In the 5th edition, but not in the 3rd edition]
    point = {x: 0, y: 1, }
- Added trailing comma in array literal
    [0,1,2,]
    [,]
- Include empty statements in the tree
    if (true) ; else print("hi");
- 'new' on functions and other newExpressions
    a = new function f() { this.prop = 1; };
    new new RegExp
- Functions declarations inside blocks. [Not in the 3rd edition or 5th edition spec]
    {function a() {}var b = 1;}

Language Extentions:
- Factorial. Example: 5!==120
- Power operator. Examples: 2**8;a = 2;a**=8;2^8;a^=8
- Binary Literals. Example: 0b101010
- Octal Literals. Example: 0o52
- Xor uses the >< operator. Example: 2><8;a=2;a><8;

*/

grammar ECMAScript3Ext;

options
{
	output = AST;
	language = JavaScript;
}

tokens
{
// Reserved words
	NULL		= 'null' ;
	TRUE		= 'true' ;
	FALSE		= 'false' ;

// Keywords
	BREAK		= 'break' ;
	CASE		= 'case' ;
	CATCH 		= 'catch' ;
	CONTINUE 	= 'continue' ;
	DEFAULT		= 'default' ;
	DELETE		= 'delete' ;
	DO 		= 'do' ;
	ELSE 		= 'else' ;
	FINALLY 	= 'finally' ;
	FOR 		= 'for' ;
	FUNCTION 	= 'function' ;
	IF 		= 'if' ;
	IN 		= 'in' ;
	INSTANCEOF 	= 'instanceof' ;
	NEW 		= 'new' ;
	RETURN 		= 'return' ;
	SWITCH 		= 'switch' ;
	THIS 		= 'this' ;
	THROW 		= 'throw' ;
	TRY 		= 'try' ;
	TYPEOF 		= 'typeof' ;
	VAR 		= 'var' ;
	VOID 		= 'void' ;
	WHILE 		= 'while' ;
	WITH 		= 'with' ;

// Future reserved words
	ABSTRACT	= 'abstract' ;
	BOOLEAN 	= 'boolean' ;
	BYTE 		= 'byte' ;
	CHAR 		= 'char' ;
	CLASS 		= 'class' ;
	CONST 		= 'const' ;
	DEBUGGER 	= 'debugger' ;
	DOUBLE		= 'double' ;
	ENUM 		= 'enum' ;
	EXPORT 		= 'export' ;
	EXTENDS		= 'extends' ;
	FINAL 		= 'final' ;
	FLOAT 		= 'float' ;
	GOTO 		= 'goto' ;
	IMPLEMENTS 	= 'implements' ;
	IMPORT		= 'import' ;
	INT 		= 'int' ;
	INTERFACE 	= 'interface' ;
	LONG 		= 'long' ;
	NATIVE 		= 'native' ;
	PACKAGE 	= 'package' ;
	PRIVATE 	= 'private' ;
	PROTECTED 	= 'protected' ;
	PUBLIC		= 'public' ;
	SHORT 		= 'short' ;
	STATIC 		= 'static' ;
	SUPER 		= 'super' ;
	SYNCHRONIZED 	= 'synchronized' ;
	THROWS 		= 'throws' ;
	TRANSIENT 	= 'transient' ;
	VOLATILE 	= 'volatile' ;

// Punctuators
	LBRACE		= '{' ;
	RBRACE		= '}' ;
	LPAREN		= '(' ;
	RPAREN		= ')' ;
	LBRACK		= '[' ;
	RBRACK		= ']' ;
	DOT		= '.' ;
	SEMIC		= ';' ;
	COMMA		= ',' ;
	LT		= '<' ;
	GT		= '>' ;
	LTE		= '<=' ;
	GTE		= '>=' ;
	EQ		= '==' ;
	NEQ		= '!=' ;
	SAME		= '===' ;
	NSAME		= '!==' ;
	ADD		= '+' ;
	SUB		= '-' ;
	MUL		= '*' ;
	MOD		= '%' ;
	INC		= '++' ;
	DEC		= '--' ;
	SHL		= '<<' ;
	SHR		= '>>' ;
	SHU		= '>>>' ;
	AND		= '&' ;
	OR		= '|' ;
	NOT		= '!' ;
	INV		= '~' ;
	LAND		= '&&' ;
	LOR		= '||' ;
	QUE		= '?' ;
	COLON		= ':' ;
	ASSIGN		= '=' ;
	ADDASS		= '+=' ;
	SUBASS		= '-=' ;
	MULASS		= '*=' ;
	MODASS		= '%=' ;
	SHLASS		= '<<=' ;
	SHRASS		= '>>=' ;
	SHUASS		= '>>>=' ;
	ANDASS		= '&=' ;
	ORASS		= '|=' ;
	DIV		= '/' ;
	DIVASS		= '/=' ;

// Imaginary
	ARGS ;
	ARRAY ;
	BLOCK ;
	BYFIELD ;
	BYINDEX ;
	CALL ;
	CEXPR ;
	EXPR ;
	FORITER ;
	FORSTEP ;
	ITEM ;
	LABELLED ;
	NAMEDVALUE ;
	NEG ;
	OBJECT ;
	PAREXPR ;
	PDEC ;
	PINC ;
	POS ;

// Extentions
        FACTORIAL ;
        POW             = '**' ;
        POWASS          = '**=' ;
        CARET           = '^' ;
        CARETASS        = '^=' ;
	XOR		= '><' ;
	XORASS		= '><=' ;
}

@lexer::members
{

    var last;

    ECMAScript3ExtLexer.prototype.areRegularExpressionsEnabled = function() {
        if (last == null) {
            return true;
        }
	switch (last.getType())
	{
	// identifier
		case ECMAScript3ExtLexer.Identifier:
	// literals
		case ECMAScript3ExtLexer.NULL:
		case ECMAScript3ExtLexer.TRUE:
		case ECMAScript3ExtLexer.FALSE:
		case ECMAScript3ExtLexer.THIS:
		case ECMAScript3ExtLexer.OctalIntegerLiteral:
                case ECMAScript3ExtLexer.BinaryIntegerLiteral:
		case ECMAScript3ExtLexer.DecimalLiteral:
		case ECMAScript3ExtLexer.HexIntegerLiteral:
		case ECMAScript3ExtLexer.StringLiteral:
	// member access ending
		case ECMAScript3ExtLexer.RBRACK:
	// function call or nested expression ending
		case ECMAScript3ExtLexer.RPAREN:
			return false;
	// otherwise OK
		default:
			return true;
	}
    }

    ECMAScript3ExtLexer.prototype.consumeIdentifierUnicodeStart = function() {
        var ch = this.input.LA(1);
	if (this.isIdentifierStartUnicode(ch)) {
            this.matchAny();
            do {
                ch = this.input.LA(1);
                if (this.isIdentifierPartUnicode(ch)) {
                    this.mIdentifierPart();
                }
                else {
                    return;
		}
            }
            while (true);
	}
	else {
            throw new org.antlr.runtime.NoViableAltException();
	}
    }

    ECMAScript3ExtLexer.prototype.nextToken = function() {
	var result = ECMAScript3ExtLexer.superclass.nextToken.call(this);
	if (result.getChannel() == org.antlr.runtime.Token.DEFAULT_CHANNEL) {
            last = result;
	}
	return result;
    }

    ECMAScript3ExtLexer.prototype.isIdentifierPartUnicode = function(ch) {
        return this.isIdentifierStartUnicode(ch) ||
            this.isUnicodeDigit(ch) ||
            this.isUnicodeCombiningMark(ch) ||
            this.isUnicodeConnectorPunctuation(ch);
    }

    ECMAScript3ExtLexer.prototype.isIdentifierStartUnicode = function(ch) {
        return ch == '$' || ch == '_' || this.isUnicodeLetter(ch);
    }

    // Any character in the Unicode categories "Uppercase letter (Lu)",
    // "Lowercase letter (Ll)", "Titlecase letter (Lt)",
    // "Modifier letter (Lm)", "Other letter (Lo)", or "Letter number (Nl)".
    ECMAScript3ExtLexer.prototype.isUnicodeLetter = function(ch) {
        if ((ch >= '\u0041' && ch <= '\u005A') ||
            (ch >= '\u0061' && ch <= '\u007A') ||
            (ch == '\u00AA') ||
            (ch == '\u00B5') ||
            (ch == '\u00BA') ||
            (ch >= '\u00C0' && ch <= '\u00D6') ||
            (ch >= '\u00D8' && ch <= '\u00F6') ||
            (ch >= '\u00F8' && ch <= '\u021F')) {
            return true;
        }
        else if (ch < '\u0222') {
            return false;
        }
        else {
            return (ch >= '\u0222' && ch <= '\u0233') ||
                (ch >= '\u0250' && ch <= '\u02AD') ||
                (ch >= '\u02B0' && ch <= '\u02B8') ||
                (ch >= '\u02BB' && ch <= '\u02C1') ||
                (ch >= '\u02D0' && ch <= '\u02D1') ||
                (ch >= '\u02E0' && ch <= '\u02E4') ||
                (ch == '\u02EE') ||
                (ch == '\u037A') ||
                (ch == '\u0386') ||
                (ch >= '\u0388' && ch <= '\u038A') ||
                (ch == '\u038C') ||
                (ch >= '\u038E' && ch <= '\u03A1') ||
                (ch >= '\u03A3' && ch <= '\u03CE') ||
                (ch >= '\u03D0' && ch <= '\u03D7') ||
                (ch >= '\u03DA' && ch <= '\u03F3') ||
                (ch >= '\u0400' && ch <= '\u0481') ||
                (ch >= '\u048C' && ch <= '\u04C4') ||
                (ch >= '\u04C7' && ch <= '\u04C8') ||
                (ch >= '\u04CB' && ch <= '\u04CC') ||
                (ch >= '\u04D0' && ch <= '\u04F5') ||
                (ch >= '\u04F8' && ch <= '\u04F9') ||
                (ch >= '\u0531' && ch <= '\u0556') ||
                (ch == '\u0559') ||
                (ch >= '\u0561' && ch <= '\u0587') ||
                (ch >= '\u05D0' && ch <= '\u05EA') ||
                (ch >= '\u05F0' && ch <= '\u05F2') ||
                (ch >= '\u0621' && ch <= '\u063A') ||
                (ch >= '\u0640' && ch <= '\u064A') ||
                (ch >= '\u0671' && ch <= '\u06D3') ||
                (ch == '\u06D5') ||
                (ch >= '\u06E5' && ch <= '\u06E6') ||
                (ch >= '\u06FA' && ch <= '\u06FC') ||
                (ch == '\u0710') ||
                (ch >= '\u0712' && ch <= '\u072C') ||
                (ch >= '\u0780' && ch <= '\u07A5') ||
                (ch >= '\u0905' && ch <= '\u0939') ||
                (ch == '\u093D') ||
                (ch == '\u0950') ||
                (ch >= '\u0958' && ch <= '\u0961') ||
                (ch >= '\u0985' && ch <= '\u098C') ||
                (ch >= '\u098F' && ch <= '\u0990') ||
                (ch >= '\u0993' && ch <= '\u09A8') ||
                (ch >= '\u09AA' && ch <= '\u09B0') ||
                (ch == '\u09B2') ||
                (ch >= '\u09B6' && ch <= '\u09B9') ||
                (ch >= '\u09DC' && ch <= '\u09DD') ||
                (ch >= '\u09DF' && ch <= '\u09E1') ||
                (ch >= '\u09F0' && ch <= '\u09F1') ||
                (ch >= '\u0A05' && ch <= '\u0A0A') ||
                (ch >= '\u0A0F' && ch <= '\u0A10') ||
                (ch >= '\u0A13' && ch <= '\u0A28') ||
                (ch >= '\u0A2A' && ch <= '\u0A30') ||
                (ch >= '\u0A32' && ch <= '\u0A33') ||
                (ch >= '\u0A35' && ch <= '\u0A36') ||
                (ch >= '\u0A38' && ch <= '\u0A39') ||
                (ch >= '\u0A59' && ch <= '\u0A5C') ||
                (ch == '\u0A5E') ||
                (ch >= '\u0A72' && ch <= '\u0A74') ||
                (ch >= '\u0A85' && ch <= '\u0A8B') ||
                (ch == '\u0A8D') ||
                (ch >= '\u0A8F' && ch <= '\u0A91') ||
                (ch >= '\u0A93' && ch <= '\u0AA8') ||
                (ch >= '\u0AAA' && ch <= '\u0AB0') ||
                (ch >= '\u0AB2' && ch <= '\u0AB3') ||
                (ch >= '\u0AB5' && ch <= '\u0AB9') ||
                (ch == '\u0ABD') ||
                (ch == '\u0AD0') ||
                (ch == '\u0AE0') ||
                (ch >= '\u0B05' && ch <= '\u0B0C') ||
                (ch >= '\u0B0F' && ch <= '\u0B10') ||
                (ch >= '\u0B13' && ch <= '\u0B28') ||
                (ch >= '\u0B2A' && ch <= '\u0B30') ||
                (ch >= '\u0B32' && ch <= '\u0B33') ||
                (ch >= '\u0B36' && ch <= '\u0B39') ||
                (ch == '\u0B3D') ||
                (ch >= '\u0B5C' && ch <= '\u0B5D') ||
                (ch >= '\u0B5F' && ch <= '\u0B61') ||
                (ch >= '\u0B85' && ch <= '\u0B8A') ||
                (ch >= '\u0B8E' && ch <= '\u0B90') ||
                (ch >= '\u0B92' && ch <= '\u0B95') ||
                (ch >= '\u0B99' && ch <= '\u0B9A') ||
                (ch == '\u0B9C') ||
                (ch >= '\u0B9E' && ch <= '\u0B9F') ||
                (ch >= '\u0BA3' && ch <= '\u0BA4') ||
                (ch >= '\u0BA8' && ch <= '\u0BAA') ||
                (ch >= '\u0BAE' && ch <= '\u0BB5') ||
                (ch >= '\u0BB7' && ch <= '\u0BB9') ||
                (ch >= '\u0C05' && ch <= '\u0C0C') ||
                (ch >= '\u0C0E' && ch <= '\u0C10') ||
                (ch >= '\u0C12' && ch <= '\u0C28') ||
                (ch >= '\u0C2A' && ch <= '\u0C33') ||
                (ch >= '\u0C35' && ch <= '\u0C39') ||
                (ch >= '\u0C60' && ch <= '\u0C61') ||
                (ch >= '\u0C85' && ch <= '\u0C8C') ||
                (ch >= '\u0C8E' && ch <= '\u0C90') ||
                (ch >= '\u0C92' && ch <= '\u0CA8') ||
                (ch >= '\u0CAA' && ch <= '\u0CB3') ||
                (ch >= '\u0CB5' && ch <= '\u0CB9') ||
                (ch == '\u0CDE') ||
                (ch >= '\u0CE0' && ch <= '\u0CE1') ||
                (ch >= '\u0D05' && ch <= '\u0D0C') ||
                (ch >= '\u0D0E' && ch <= '\u0D10') ||
                (ch >= '\u0D12' && ch <= '\u0D28') ||
                (ch >= '\u0D2A' && ch <= '\u0D39') ||
                (ch >= '\u0D60' && ch <= '\u0D61') ||
                (ch >= '\u0D85' && ch <= '\u0D96') ||
                (ch >= '\u0D9A' && ch <= '\u0DB1') ||
                (ch >= '\u0DB3' && ch <= '\u0DBB') ||
                (ch == '\u0DBD') ||
                (ch >= '\u0DC0' && ch <= '\u0DC6') ||
                (ch >= '\u0E01' && ch <= '\u0E30') ||
                (ch >= '\u0E32' && ch <= '\u0E33') ||
                (ch >= '\u0E40' && ch <= '\u0E46') ||
                (ch >= '\u0E81' && ch <= '\u0E82') ||
                (ch == '\u0E84') ||
                (ch >= '\u0E87' && ch <= '\u0E88') ||
                (ch == '\u0E8A') ||
                (ch == '\u0E8D') ||
                (ch >= '\u0E94' && ch <= '\u0E97') ||
                (ch >= '\u0E99' && ch <= '\u0E9F') ||
                (ch >= '\u0EA1' && ch <= '\u0EA3') ||
                (ch == '\u0EA5') ||
                (ch == '\u0EA7') ||
                (ch >= '\u0EAA' && ch <= '\u0EAB') ||
                (ch >= '\u0EAD' && ch <= '\u0EB0') ||
                (ch >= '\u0EB2' && ch <= '\u0EB3') ||
                (ch >= '\u0EBD' && ch <= '\u0EC4') ||
                (ch == '\u0EC6') ||
                (ch >= '\u0EDC' && ch <= '\u0EDD') ||
                (ch == '\u0F00') ||
                (ch >= '\u0F40' && ch <= '\u0F6A') ||
                (ch >= '\u0F88' && ch <= '\u0F8B') ||
                (ch >= '\u1000' && ch <= '\u1021') ||
                (ch >= '\u1023' && ch <= '\u1027') ||
                (ch >= '\u1029' && ch <= '\u102A') ||
                (ch >= '\u1050' && ch <= '\u1055') ||
                (ch >= '\u10A0' && ch <= '\u10C5') ||
                (ch >= '\u10D0' && ch <= '\u10F6') ||
                (ch >= '\u1100' && ch <= '\u1159') ||
                (ch >= '\u115F' && ch <= '\u11A2') ||
                (ch >= '\u11A8' && ch <= '\u11F9') ||
                (ch >= '\u1200' && ch <= '\u1206') ||
                (ch >= '\u1208' && ch <= '\u1246') ||
                (ch == '\u1248') ||
                (ch >= '\u124A' && ch <= '\u124D') ||
                (ch >= '\u1250' && ch <= '\u1256') ||
                (ch == '\u1258') ||
                (ch >= '\u125A' && ch <= '\u125D') ||
                (ch >= '\u1260' && ch <= '\u1286') ||
                (ch == '\u1288') ||
                (ch >= '\u128A' && ch <= '\u128D') ||
                (ch >= '\u1290' && ch <= '\u12AE') ||
                (ch == '\u12B0') ||
                (ch >= '\u12B2' && ch <= '\u12B5') ||
                (ch >= '\u12B8' && ch <= '\u12BE') ||
                (ch == '\u12C0') ||
                (ch >= '\u12C2' && ch <= '\u12C5') ||
                (ch >= '\u12C8' && ch <= '\u12CE') ||
                (ch >= '\u12D0' && ch <= '\u12D6') ||
                (ch >= '\u12D8' && ch <= '\u12EE') ||
                (ch >= '\u12F0' && ch <= '\u130E') ||
                (ch == '\u1310') ||
                (ch >= '\u1312' && ch <= '\u1315') ||
                (ch >= '\u1318' && ch <= '\u131E') ||
                (ch >= '\u1320' && ch <= '\u1346') ||
                (ch >= '\u1348' && ch <= '\u135A') ||
                (ch >= '\u13A0' && ch <= '\u13B0') ||
                (ch >= '\u13B1' && ch <= '\u13F4') ||
                (ch >= '\u1401' && ch <= '\u1676') ||
                (ch >= '\u1681' && ch <= '\u169A') ||
                (ch >= '\u16A0' && ch <= '\u16EA') ||
                (ch >= '\u1780' && ch <= '\u17B3') ||
                (ch >= '\u1820' && ch <= '\u1877') ||
                (ch >= '\u1880' && ch <= '\u18A8') ||
                (ch >= '\u1E00' && ch <= '\u1E9B') ||
                (ch >= '\u1EA0' && ch <= '\u1EE0') ||
                (ch >= '\u1EE1' && ch <= '\u1EF9') ||
                (ch >= '\u1F00' && ch <= '\u1F15') ||
                (ch >= '\u1F18' && ch <= '\u1F1D') ||
                (ch >= '\u1F20' && ch <= '\u1F39') ||
                (ch >= '\u1F3A' && ch <= '\u1F45') ||
                (ch >= '\u1F48' && ch <= '\u1F4D') ||
                (ch >= '\u1F50' && ch <= '\u1F57') ||
                (ch == '\u1F59') ||
                (ch == '\u1F5B') ||
                (ch == '\u1F5D') ||
                (ch >= '\u1F5F' && ch <= '\u1F7D') ||
                (ch >= '\u1F80' && ch <= '\u1FB4') ||
                (ch >= '\u1FB6' && ch <= '\u1FBC') ||
                (ch == '\u1FBE') ||
                (ch >= '\u1FC2' && ch <= '\u1FC4') ||
                (ch >= '\u1FC6' && ch <= '\u1FCC') ||
                (ch >= '\u1FD0' && ch <= '\u1FD3') ||
                (ch >= '\u1FD6' && ch <= '\u1FDB') ||
                (ch >= '\u1FE0' && ch <= '\u1FEC') ||
                (ch >= '\u1FF2' && ch <= '\u1FF4') ||
                (ch >= '\u1FF6' && ch <= '\u1FFC') ||
                (ch == '\u207F') ||
                (ch == '\u2102') ||
                (ch == '\u2107') ||
                (ch >= '\u210A' && ch <= '\u2113') ||
                (ch == '\u2115') ||
                (ch >= '\u2119' && ch <= '\u211D') ||
                (ch == '\u2124') ||
                (ch == '\u2126') ||
                (ch == '\u2128') ||
                (ch >= '\u212A' && ch <= '\u212D') ||
                (ch >= '\u212F' && ch <= '\u2131') ||
                (ch >= '\u2133' && ch <= '\u2139') ||
                (ch >= '\u2160' && ch <= '\u2183') ||
                (ch >= '\u3005' && ch <= '\u3007') ||
                (ch >= '\u3021' && ch <= '\u3029') ||
                (ch >= '\u3031' && ch <= '\u3035') ||
                (ch >= '\u3038' && ch <= '\u303A') ||
                (ch >= '\u3041' && ch <= '\u3094') ||
                (ch >= '\u309D' && ch <= '\u309E') ||
                (ch >= '\u30A1' && ch <= '\u30FA') ||
                (ch >= '\u30FC' && ch <= '\u30FE') ||
                (ch >= '\u3105' && ch <= '\u312C') ||
                (ch >= '\u3131' && ch <= '\u318E') ||
                (ch >= '\u31A0' && ch <= '\u31B7') ||
                (ch == '\u3400') ||
                (ch == '\u4DB5') ||
                (ch == '\u4E00') ||
                (ch == '\u9FA5') ||
                (ch >= '\uA000' && ch <= '\uA48C') ||
                (ch == '\uAC00') ||
                (ch == '\uD7A3') ||
                (ch >= '\uF900' && ch <= '\uFA2D') ||
                (ch >= '\uFB00' && ch <= '\uFB06') ||
                (ch >= '\uFB13' && ch <= '\uFB17') ||
                (ch == '\uFB1D') ||
                (ch >= '\uFB1F' && ch <= '\uFB28') ||
                (ch >= '\uFB2A' && ch <= '\uFB36') ||
                (ch >= '\uFB38' && ch <= '\uFB3C') ||
                (ch == '\uFB3E') ||
                (ch >= '\uFB40' && ch <= '\uFB41') ||
                (ch >= '\uFB43' && ch <= '\uFB44') ||
                (ch >= '\uFB46' && ch <= '\uFBB1') ||
                (ch >= '\uFBD3' && ch <= '\uFD3D') ||
                (ch >= '\uFD50' && ch <= '\uFD8F') ||
                (ch >= '\uFD92' && ch <= '\uFDC7') ||
                (ch >= '\uFDF0' && ch <= '\uFDFB') ||
                (ch >= '\uFE70' && ch <= '\uFE72') ||
                (ch == '\uFE74') ||
                (ch >= '\uFE76' && ch <= '\uFEFC') ||
                (ch >= '\uFF21' && ch <= '\uFF3A') ||
                (ch >= '\uFF41' && ch <= '\uFF5A') ||
                (ch >= '\uFF66' && ch <= '\uFFBE') ||
                (ch >= '\uFFC2' && ch <= '\uFFC7') ||
                (ch >= '\uFFCA' && ch <= '\uFFCF') ||
                (ch >= '\uFFD2' && ch <= '\uFFD7') ||
                (ch >= '\uFFDA' && ch <= '\uFFDC');
        }
    }

    // Any character in the Unicode categories "Non-spacing mark (Mn)"
    // or "Combining spacing mark (Mc)".
    ECMAScript3ExtLexer.prototype.isUnicodeCombiningMark = function(ch) {
        if (ch < '\u0300') {
            return false;
        }
        else {
            return (ch >= '\u0300' && ch <= '\u034E') ||
                (ch >= '\u0360' && ch <= '\u0362') ||
                (ch >= '\u0483' && ch <= '\u0486') ||
                (ch >= '\u0591' && ch <= '\u05A1') ||
                (ch >= '\u05A3' && ch <= '\u05B9') ||
                (ch >= '\u05BB' && ch <= '\u05BD') ||
                (ch == '\u05BF') ||
                (ch >= '\u05C1' && ch <= '\u05C2') ||
                (ch == '\u05C4') ||
                (ch >= '\u064B' && ch <= '\u0655') ||
                (ch == '\u0670') ||
                (ch >= '\u06D6' && ch <= '\u06DC') ||
                (ch >= '\u06DF' && ch <= '\u06E4') ||
                (ch >= '\u06E7' && ch <= '\u06E8') ||
                (ch >= '\u06EA' && ch <= '\u06ED') ||
                (ch == '\u0711') ||
                (ch >= '\u0730' && ch <= '\u074A') ||
                (ch >= '\u07A6' && ch <= '\u07B0') ||
                (ch >= '\u0901' && ch <= '\u0903') ||
                (ch == '\u093C') ||
                (ch >= '\u093E' && ch <= '\u094D') ||
                (ch >= '\u0951' && ch <= '\u0954') ||
                (ch >= '\u0962' && ch <= '\u0963') ||
                (ch >= '\u0981' && ch <= '\u0983') ||
                (ch >= '\u09BC' && ch <= '\u09C4') ||
                (ch >= '\u09C7' && ch <= '\u09C8') ||
                (ch >= '\u09CB' && ch <= '\u09CD') ||
                (ch == '\u09D7') ||
                (ch >= '\u09E2' && ch <= '\u09E3') ||
                (ch == '\u0A02') ||
                (ch == '\u0A3C') ||
                (ch >= '\u0A3E' && ch <= '\u0A42') ||
                (ch >= '\u0A47' && ch <= '\u0A48') ||
                (ch >= '\u0A4B' && ch <= '\u0A4D') ||
                (ch >= '\u0A70' && ch <= '\u0A71') ||
                (ch >= '\u0A81' && ch <= '\u0A83') ||
                (ch == '\u0ABC') ||
                (ch >= '\u0ABE' && ch <= '\u0AC5') ||
                (ch >= '\u0AC7' && ch <= '\u0AC9') ||
                (ch >= '\u0ACB' && ch <= '\u0ACD') ||
                (ch >= '\u0B01' && ch <= '\u0B03') ||
                (ch == '\u0B3C') ||
                (ch >= '\u0B3E' && ch <= '\u0B43') ||
                (ch >= '\u0B47' && ch <= '\u0B48') ||
                (ch >= '\u0B4B' && ch <= '\u0B4D') ||
                (ch >= '\u0B56' && ch <= '\u0B57') ||
                (ch >= '\u0B82' && ch <= '\u0B83') ||
                (ch >= '\u0BBE' && ch <= '\u0BC2') ||
                (ch >= '\u0BC6' && ch <= '\u0BC8') ||
                (ch >= '\u0BCA' && ch <= '\u0BCD') ||
                (ch == '\u0BD7') ||
                (ch >= '\u0C01' && ch <= '\u0C03') ||
                (ch >= '\u0C3E' && ch <= '\u0C44') ||
                (ch >= '\u0C46' && ch <= '\u0C48') ||
                (ch >= '\u0C4A' && ch <= '\u0C4D') ||
                (ch >= '\u0C55' && ch <= '\u0C56') ||
                (ch >= '\u0C82' && ch <= '\u0C83') ||
                (ch >= '\u0CBE' && ch <= '\u0CC4') ||
                (ch >= '\u0CC6' && ch <= '\u0CC8') ||
                (ch >= '\u0CCA' && ch <= '\u0CCD') ||
                (ch >= '\u0CD5' && ch <= '\u0CD6') ||
                (ch >= '\u0D02' && ch <= '\u0D03') ||
                (ch >= '\u0D3E' && ch <= '\u0D43') ||
                (ch >= '\u0D46' && ch <= '\u0D48') ||
                (ch >= '\u0D4A' && ch <= '\u0D4D') ||
                (ch == '\u0D57') ||
                (ch >= '\u0D82' && ch <= '\u0D83') ||
                (ch == '\u0DCA') ||
                (ch >= '\u0DCF' && ch <= '\u0DD4') ||
                (ch == '\u0DD6') ||
                (ch >= '\u0DD8' && ch <= '\u0DDF') ||
                (ch >= '\u0DF2' && ch <= '\u0DF3') ||
                (ch == '\u0E31') ||
                (ch >= '\u0E34' && ch <= '\u0E3A') ||
                (ch >= '\u0E47' && ch <= '\u0E4E') ||
                (ch == '\u0EB1') ||
                (ch >= '\u0EB4' && ch <= '\u0EB9') ||
                (ch >= '\u0EBB' && ch <= '\u0EBC') ||
                (ch >= '\u0EC8' && ch <= '\u0ECD') ||
                (ch >= '\u0F18' && ch <= '\u0F19') ||
                (ch == '\u0F35') ||
                (ch == '\u0F37') ||
                (ch == '\u0F39') ||
                (ch >= '\u0F3E' && ch <= '\u0F3F') ||
                (ch >= '\u0F71' && ch <= '\u0F84') ||
                (ch >= '\u0F86' && ch <= '\u0F87') ||
                (ch >= '\u0F90' && ch <= '\u0F97') ||
                (ch >= '\u0F99' && ch <= '\u0FBC') ||
                (ch == '\u0FC6') ||
                (ch >= '\u102C' && ch <= '\u1032') ||
                (ch >= '\u1036' && ch <= '\u1039') ||
                (ch >= '\u1056' && ch <= '\u1059') ||
                (ch >= '\u17B4' && ch <= '\u17D3') ||
                (ch == '\u18A9') ||
                (ch >= '\u20D0' && ch <= '\u20DC') ||
                (ch == '\u20E1') ||
                (ch >= '\u302A' && ch <= '\u302F') ||
                (ch >= '\u3099' && ch <= '\u309A') ||
                (ch == '\uFB1E') ||
                (ch >= '\uFE20' && ch <= '\uFE23');
        }
    }

    // Any character in the Unicode category "Decimal number (Nd)".
    ECMAScript3ExtLexer.prototype.isUnicodeDigit = function(ch) {
        if (ch >= '\u0030' && ch <= '\u0039') {
            return true;
        }
        else if (ch < '\u0660') {
            return false;
        }
        else {
            return (ch >= '\u0660' && ch <= '\u0669') ||
                (ch >= '\u06F0' && ch <= '\u06F9') ||
                (ch >= '\u0966' && ch <= '\u096F') ||
                (ch >= '\u09E6' && ch <= '\u09EF') ||
                (ch >= '\u0A66' && ch <= '\u0A6F') ||
                (ch >= '\u0AE6' && ch <= '\u0AEF') ||
                (ch >= '\u0B66' && ch <= '\u0B6F') ||
                (ch >= '\u0BE7' && ch <= '\u0BEF') ||
                (ch >= '\u0C66' && ch <= '\u0C6F') ||
                (ch >= '\u0CE6' && ch <= '\u0CEF') ||
                (ch >= '\u0D66' && ch <= '\u0D6F') ||
                (ch >= '\u0E50' && ch <= '\u0E59') ||
                (ch >= '\u0ED0' && ch <= '\u0ED9') ||
                (ch >= '\u0F20' && ch <= '\u0F29') ||
                (ch >= '\u1040' && ch <= '\u1049') ||
                (ch >= '\u1369' && ch <= '\u1371') ||
                (ch >= '\u17E0' && ch <= '\u17E9') ||
                (ch >= '\u1810' && ch <= '\u1819') ||
                (ch >= '\uFF10' && ch <= '\uFF19');
        }
    }

    // Any character in the Unicode category "Connector punctuation (Pc)".
    ECMAScript3ExtLexer.prototype.isUnicodeConnectorPunctuation = function(ch) {
        if (ch == '\u005F') {
            return true;
        }
        else if (ch < '\u203F') {
            return false;
        }
        else {
            return (ch >= '\u203F' && ch <= '\u2040') ||
                (ch == '\u30FB') ||
                (ch >= '\uFE33' && ch <= '\uFE34') ||
                (ch >= '\uFE4D' && ch <= '\uFE4F') ||
                (ch == '\uFF3F') ||
                (ch == '\uFF65');
        }
    }
}

@parser::members
{

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
}

//
// $<	A.1 Lexical Grammar (7)
//

// Added for lexing purposes

fragment BSLASH
	: '\\'
	;

fragment DQUOTE
	: '"'
	;

fragment SQUOTE
	: '\''
	;

// $<	Whitespace (7.2)

fragment TAB
	: '\u0009'
	;

fragment VT // Vertical TAB
	: '\u000b'
	;

fragment FF // Form Feed
	: '\u000c'
	;

fragment SP // Space
	: '\u0020'
	;

fragment NBSP // Non-Breaking Space
	: '\u00a0'
	;

fragment USP // Unicode Space Separator (rest of Unicode category Zs)
	: '\u1680'  // OGHAM SPACE MARK
	| '\u180E'  // MONGOLIAN VOWEL SEPARATOR
	| '\u2000'  // EN QUAD
	| '\u2001'  // EM QUAD
	| '\u2002'  // EN SPACE
	| '\u2003'  // EM SPACE
	| '\u2004'  // THREE-PER-EM SPACE
	| '\u2005'  // FOUR-PER-EM SPACE
	| '\u2006'  // SIX-PER-EM SPACE
	| '\u2007'  // FIGURE SPACE
	| '\u2008'  // PUNCTUATION SPACE
	| '\u2009'  // THIN SPACE
	| '\u200A'  // HAIR SPACE
	| '\u202F'  // NARROW NO-BREAK SPACE
	| '\u205F'  // MEDIUM MATHEMATICAL SPACE
	| '\u3000'  // IDEOGRAPHIC SPACE
	;

WhiteSpace
	: ( TAB | VT | FF | SP | NBSP | USP )+ { $channel = HIDDEN; }
	;

// $>

// $<	Line terminators (7.3)

fragment LF // Line Feed
	: '\n'
	;

fragment CR // Carriage Return
	: '\r'
	;

fragment LS // Line Separator
	: '\u2028'
	;

fragment PS // Paragraph Separator
	: '\u2029'
	;

fragment LineTerminator
	: CR | LF | LS | PS
	;

EOL
	: ( ( CR LF? ) | LF | LS | PS ) { $channel = HIDDEN; }
	;
// $>

// $<	Comments (7.4)

MultiLineComment
	: '/*' ( options { greedy = false; } : . )* '*/' { $channel = HIDDEN; }
	;

SingleLineComment
	: '//' ( ~( LineTerminator ) )* { $channel = HIDDEN; }
	;

// $>

// $<	Tokens (7.5)

token
	: reservedWord
	| Identifier
	| punctuator
	| numericLiteral
	| StringLiteral
	;

// $<	Reserved words (7.5.1)

reservedWord
	: keyword
	| futureReservedWord
	| NULL
	| booleanLiteral
	;

// $>

// $<	Keywords (7.5.2)

keyword
	: BREAK
	| CASE
	| CATCH
	| CONTINUE
	| DEFAULT
	| DELETE
	| DO
	| ELSE
	| FINALLY
	| FOR
	| FUNCTION
	| IF
	| IN
	| INSTANCEOF
	| NEW
	| RETURN
	| SWITCH
	| THIS
	| THROW
	| TRY
	| TYPEOF
	| VAR
	| VOID
	| WHILE
	| WITH
	;

// $>

// $<	Future reserved words (7.5.3)

futureReservedWord
	: ABSTRACT
	| BOOLEAN
	| BYTE
	| CHAR
	| CLASS
	| CONST
	| DEBUGGER
	| DOUBLE
	| ENUM
	| EXPORT
	| EXTENDS
	| FINAL
	| FLOAT
	| GOTO
	| IMPLEMENTS
	| IMPORT
	| INT
	| INTERFACE
	| LONG
	| NATIVE
	| PACKAGE
	| PRIVATE
	| PROTECTED
	| PUBLIC
	| SHORT
	| STATIC
	| SUPER
	| SYNCHRONIZED
	| THROWS
	| TRANSIENT
	| VOLATILE
	;

// $>

// $>

// $<	Identifiers (7.6)

fragment IdentifierStartASCII
	: 'a'..'z' | 'A'..'Z'
	| '$'
	| '_'
	| BSLASH 'u' HexDigit HexDigit HexDigit HexDigit // UnicodeEscapeSequence
	;

/*
The first two alternatives define how ANTLR can match ASCII characters which can be considered as part of an identifier.
The last alternative matches other characters in the unicode range that can be sonsidered as part of an identifier.
*/
fragment IdentifierPart
	: DecimalDigit
	| IdentifierStartASCII
	| { this.isIdentifierPartUnicode(this.input.LA(1)) }? { this.matchAny(); }
	;

fragment IdentifierNameASCIIStart
	: IdentifierStartASCII IdentifierPart*
	;

/*
The second alternative acts as an action driven fallback to evaluate other characters in the unicode range than the ones in the ASCII subset.
Due to the first alternative this grammar defines enough so that ANTLR can generate a lexer that correctly predicts identifiers with characters in the ASCII range.
In that way keywords, other reserved words and ASCII identifiers are recognized with standard ANTLR driven logic. When the first character for an identifier fails to
match this ASCII definition, the lexer calls consumeIdentifierUnicodeStart because of the action in the alternative. This method checks whether the character matches
as first character in ranges other than ASCII and consumes further characters belonging to the identifier with help of mIdentifierPart generated out of the
IdentifierPart rule above.
*/
Identifier
	: IdentifierNameASCIIStart
	| { this.consumeIdentifierUnicodeStart(); }
	;

// $>

// $<	Punctuators (7.7)

punctuator
	: LBRACE
	| RBRACE
	| LPAREN
	| RPAREN
	| LBRACK
	| RBRACK
	| DOT
	| SEMIC
	| COMMA
	| LT
	| GT
	| LTE
	| GTE
	| EQ
	| NEQ
	| SAME
	| NSAME
	| ADD
	| SUB
	| MUL
	| MOD
	| INC
	| DEC
	| SHL
	| SHR
	| SHU
	| AND
	| OR
	| XOR
	| NOT
	| INV
	| LAND
	| LOR
	| QUE
	| COLON
	| ASSIGN
	| ADDASS
	| SUBASS
	| MULASS
	| MODASS
	| SHLASS
	| SHRASS
	| SHUASS
	| ANDASS
	| ORASS
	| XORASS
	| DIV
	| DIVASS
        | POW
        | POWASS
	;

// $>

// $<	Literals (7.8)

literal
	: NULL
	| booleanLiteral
	| numericLiteral
	| StringLiteral
	| RegularExpressionLiteral
	;

booleanLiteral
	: TRUE
	| FALSE
	;

// $<	Numeric literals (7.8.3)

/*
Note: octal literals are described in the B Compatibility section.
These are removed from the standards but are here for backwards compatibility with earlier ECMAScript definitions.
*/

fragment DecimalDigit
	: '0'..'9'
	;

fragment HexDigit
	: DecimalDigit | 'a'..'f' | 'A'..'F'
	;

fragment OctalDigit
	: '0'..'7'
	;

fragment BinaryDigit
	: '0' | '1'
	;

fragment ExponentPart
	: ( 'e' | 'E' ) ( '+' | '-' )? DecimalDigit+
	;

fragment DecimalIntegerLiteralWithoutLeadingZero
	: '0'
	| '1'..'9' DecimalDigit*
	;

fragment DecimalIntegerLiteral
	: DecimalDigit+
	;

DecimalLiteral
	: DecimalIntegerLiteral '.' DecimalDigit* ExponentPart?
	| '.' DecimalDigit+ ExponentPart?
	| DecimalIntegerLiteral ExponentPart?
	;

OctalIntegerLiteral
	: ( '0o' | '0O' ) OctalDigit+
	;

BinaryIntegerLiteral
	: ( '0b' | '0B' ) BinaryDigit+
	;

HexIntegerLiteral
	: ( '0x' | '0X' ) HexDigit+
	;

numericLiteral
	: DecimalLiteral
	| OctalIntegerLiteral
        | BinaryIntegerLiteral
	| HexIntegerLiteral
	;

// $>

// $<	String literals (7.8.4)

/*
Note: octal escape sequences are described in the B Compatibility section.
These are removed from the standards but are here for backwards compatibility with earlier ECMAScript definitions.
*/

fragment CharacterEscapeSequence
	: ~( DecimalDigit | 'x' | 'u' | LineTerminator ) // Concatenation of SingleEscapeCharacter and NonEscapeCharacter
	;

fragment ZeroToThree
	: '0'..'3'
	;

fragment OctalEscapeSequence
	: OctalDigit
	| ZeroToThree OctalDigit
	| '4'..'7' OctalDigit
	| ZeroToThree OctalDigit OctalDigit
	;

fragment HexEscapeSequence
	: 'x' HexDigit HexDigit
	;

fragment UnicodeEscapeSequence
	: 'u' HexDigit HexDigit HexDigit HexDigit
	;

fragment EscapeSequence
	:
	BSLASH
	(
		CharacterEscapeSequence
		| OctalEscapeSequence
		| HexEscapeSequence
		| UnicodeEscapeSequence
	)
	;

StringLiteral
	: SQUOTE ( ~( SQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* SQUOTE
	| DQUOTE ( ~( DQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* DQUOTE
	;

// $>

// $<	Regular expression literals (7.8.5)

fragment BackslashSequence
	: BSLASH ~( LineTerminator )
	;

fragment RegularExpressionFirstChar
	: ~ ( LineTerminator | MUL | BSLASH | DIV )
	| BackslashSequence
	;

fragment RegularExpressionChar
	: ~ ( LineTerminator | BSLASH | DIV )
	| BackslashSequence
	;

RegularExpressionLiteral
	: { this.areRegularExpressionsEnabled() }?=> DIV RegularExpressionFirstChar RegularExpressionChar* DIV IdentifierPart*
	;

// $>

// $>

// $>

//
// $<	A.3 Expressions (11)
//

// $<Primary expressions (11.1)

primaryExpression
	: THIS
	| Identifier
	| literal
	| arrayLiteral
	| objectLiteral
	| lpar=LPAREN expression RPAREN -> ^( PAREXPR[$lpar, "PAREXPR"] expression )
	;

arrayLiteral
	: lb=LBRACK arrayItem? (COMMA arrayItem?)* RBRACK
	-> ^( ARRAY[$lb, "ARRAY"] arrayItem* )
	;

arrayItem
	: ( expr=assignmentExpression | { this.input.LA(1) == ECMAScript3ExtParser.COMMA }? )
	-> ^( ITEM $expr? )
	;

objectLiteral
	: lb=LBRACE ( nameValuePair ( COMMA nameValuePair )* COMMA? )? RBRACE
	-> ^( OBJECT[$lb, "OBJECT"] nameValuePair* )
	;

nameValuePair
	: propertyName COLON assignmentExpression
	-> ^( NAMEDVALUE propertyName assignmentExpression )
	;

propertyName
	: Identifier
	| StringLiteral
	| numericLiteral
	;

// $>

// $<Left-hand-side expressions (11.2)

/*
Refactored some rules to make them LL(*) compliant:
all the expressions surrounding member selection and calls have been moved to leftHandSideExpression to make them right recursive
*/

memberExpression
	: primaryExpression
	| functionExpression
	| newExpression
	;

newExpression
	: NEW^ memberExpression
	;


arguments
	: LPAREN ( assignmentExpression ( COMMA assignmentExpression )* )? RPAREN
	-> ^( ARGS assignmentExpression* )
	;

leftHandSideExpression
	:
	(
		memberExpression 		-> memberExpression
	)
	(
		arguments			-> ^( CALL $leftHandSideExpression arguments )
		| LBRACK expression RBRACK	-> ^( BYINDEX $leftHandSideExpression expression )
		| DOT Identifier		-> ^( BYFIELD $leftHandSideExpression Identifier )
	)*
	;

// $>

// $<Postfix expressions (11.3)

/*
The specification states that there are no line terminators allowed before the postfix operators.
This is enforced by the call to promoteEOL in the action before ( INC | DEC ).
We only must promote EOLs when the la is INC or DEC because this production is chained as all expression rules.
In other words: only promote EOL when we are really in a postfix expression. A check on the la will ensure this.
*/
postfixExpression
	: leftHandSideExpression { if (this.input.LA(1) == INC || this.input.LA(1) == DEC || this.input.LA(1) == NOT) this.promoteEOL(null); } ( postfixOperator^ )?
	;

postfixOperator
	: op=INC { $op.setType(PINC); }
	| op=DEC { $op.setType(PDEC); }
        | op=NOT { $op.setType(FACTORIAL); }
	;

// $>

powOperator
        : POW
        | op=CARET { $op.setType(POW); }
        ;

// Mostly copied from the Python grammar
powExpression
        : postfixExpression (options {greedy=true;}: powOperator^ unaryExpression)?
        ;


// $<Unary operators (11.4)

// Without pow:
//unaryExpression : postfixExpression | unaryOperator^ unaryExpression;

unaryExpression
	: unaryOperator^ unaryExpression
        | powExpression
	;

unaryOperator
	: DELETE
	| VOID
	| TYPEOF
	| INC
	| DEC
	| op=ADD { $op.setType(POS); }
	| op=SUB { $op.setType(NEG); }
	| INV
	| NOT
	;

// $>

// $<Multiplicative operators (11.5)

multiplicativeExpression
	: unaryExpression ( ( MUL | DIV | MOD )^ unaryExpression )*
	;

// $>

// $<Additive operators (11.6)

additiveExpression
	: multiplicativeExpression ( ( ADD | SUB )^ multiplicativeExpression )*
	;

// $>

// $<Bitwise shift operators (11.7)

shiftExpression
	: additiveExpression ( ( SHL | SHR | SHU )^ additiveExpression )*
	;

// $>

// $<Relational operators (11.8)

relationalExpression
	: shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF | IN )^ shiftExpression )*
	;

relationalExpressionNoIn
	: shiftExpression ( ( LT | GT | LTE | GTE | INSTANCEOF )^ shiftExpression )*
	;

// $>

// $<Equality operators (11.9)

equalityExpression
	: relationalExpression ( ( EQ | NEQ | SAME | NSAME )^ relationalExpression )*
	;

equalityExpressionNoIn
	: relationalExpressionNoIn ( ( EQ | NEQ | SAME | NSAME )^ relationalExpressionNoIn )*
	;

// $>

// $<Binary bitwise operators (11.10)

bitwiseANDExpression
	: equalityExpression ( AND^ equalityExpression )*
	;

bitwiseANDExpressionNoIn
	: equalityExpressionNoIn ( AND^ equalityExpressionNoIn )*
	;

bitwiseXORExpression
	: bitwiseANDExpression ( XOR^ bitwiseANDExpression )*
	;

bitwiseXORExpressionNoIn
	: bitwiseANDExpressionNoIn ( XOR^ bitwiseANDExpressionNoIn )*
	;

bitwiseORExpression
	: bitwiseXORExpression ( OR^ bitwiseXORExpression )*
	;

bitwiseORExpressionNoIn
	: bitwiseXORExpressionNoIn ( OR^ bitwiseXORExpressionNoIn )*
	;

// $>

// $<Binary logical operators (11.11)

logicalANDExpression
	: bitwiseORExpression ( LAND^ bitwiseORExpression )*
	;

logicalANDExpressionNoIn
	: bitwiseORExpressionNoIn ( LAND^ bitwiseORExpressionNoIn )*
	;

logicalORExpression
	: logicalANDExpression ( LOR^ logicalANDExpression )*
	;

logicalORExpressionNoIn
	: logicalANDExpressionNoIn ( LOR^ logicalANDExpressionNoIn )*
	;

// $>

// $<Conditional operator (11.12)

conditionalExpression
	: logicalORExpression ( QUE^ assignmentExpression COLON! assignmentExpression )?
	;

conditionalExpressionNoIn
	: logicalORExpressionNoIn ( QUE^ assignmentExpressionNoIn COLON! assignmentExpressionNoIn )?
	;

// $>

// $<Assignment operators (11.13)

/*
The specification defines the AssignmentExpression rule as follows:
AssignmentExpression :
	ConditionalExpression
	LeftHandSideExpression AssignmentOperator AssignmentExpression
This rule has a LL(*) conflict. Resolving this with a syntactical predicate will yield something like this:

assignmentExpression
	: ( leftHandSideExpression assignmentOperator )=> leftHandSideExpression assignmentOperator^ assignmentExpression
	| conditionalExpression
	;

assignmentOperator
	: ASSIGN | POWASS | CARETASS | MULASS | DIVASS | MODASS | ADDASS | SUBASS | SHLASS | SHRASS | SHUASS | ANDASS | XORASS | ORASS
	;

But that didn't seem to work. Terence Par writes in his book that LL(*) conflicts in general can best be solved with auto backtracking. But that would be
a performance killer for such a heavy used rule.
The solution I came up with is to always invoke the conditionalExpression first and than decide what to do based on the result of that rule.
When the rule results in a Tree that can't be coming from a left hand side expression, then we're done.
When it results in a Tree that is coming from a left hand side expression and the LA(1) is an assignment operator then parse the assignment operator
followed by the right recursive call.
*/
assignmentExpression
@init
{
	var isLhs = [];
}
	: lhs=conditionalExpression
	( { this.isLeftHandSideAssign(lhs, isLhs) }? assignmentOperator^ assignmentExpression )?
	;

assignmentOperator
	: ASSIGN | POWASS | CARETASS | MULASS | DIVASS | MODASS | ADDASS | SUBASS | SHLASS | SHRASS | SHUASS | ANDASS | XORASS | ORASS
	;

assignmentExpressionNoIn
@init
{
	var isLhs = [];
}
	: lhs=conditionalExpressionNoIn
	( { this.isLeftHandSideAssign(lhs, isLhs) }? assignmentOperator^ assignmentExpressionNoIn )?
	;

// $>

// $<Comma operator (11.14)

expression
	: exprs+=assignmentExpression ( COMMA exprs+=assignmentExpression )*
	-> { $exprs.length > 1 }? ^( CEXPR $exprs+ )
	-> $exprs
	;

expressionNoIn
	: exprs+=assignmentExpressionNoIn ( COMMA exprs+=assignmentExpressionNoIn )*
	-> { $exprs.length > 1 }? ^( CEXPR $exprs+ )
	-> $exprs
	;

// $>

// $>

//
// $<	A.4 Statements (12)
//

/*
This rule handles semicolons reported by the lexer and situations where the ECMA 3 specification states there should be semicolons automaticly inserted.
The auto semicolons are not actually inserted but this rule behaves as if they were.

In the following situations an ECMA 3 parser should auto insert absent but grammaticly required semicolons:
- the current token is a right brace
- the current token is the end of file (EOF) token
- there is at least one end of line (EOL) token between the current token and the previous token.

The RBRACE is handled by matching it but not consuming it.
The EOF needs no further handling because it is not consumed by default.
The EOL situation is handled by promoting the EOL or MultiLineComment with an EOL present from off channel to on channel
and thus making it parseable instead of handling it as white space. This promoting is done in the action promoteEOL.
*/
semic
@init
{
	// Mark current position so we can unconsume a RBRACE.
	var marker = this.input.mark();
	// Promote EOL if appropriate
	this.promoteEOL(retval);
}
	: SEMIC
	| EOF
	| RBRACE { this.input.rewind(marker); }
	| EOL | MultiLineComment // (with EOL in it)
	;

/*
To solve the ambiguity between block and objectLiteral via expressionStatement all but the block alternatives have been moved to statementTail.
Now when k = 1 and a semantical predicate is defined ANTLR generates code that always will prefer block when the LA(1) is a LBRACE.
This will result in the same behaviour that is described in the specification under 12.4 on the expressionStatement rule.
*/
statement
options
{
	k = 1 ;
}
	: { this.input.LA(1) == ECMAScript3ExtParser.LBRACE }? block
	| statementTail
	;

statementTail
	: variableStatement
	| emptyStatement
	| expressionStatement
	| ifStatement
	| iterationStatement
	| continueStatement
	| breakStatement
	| returnStatement
	| withStatement
	| labelledStatement
	| switchStatement
	| throwStatement
	| tryStatement
	;

// $<Block (12.1)
// NOTE: FunctionDeclaration is not a Statement according to the spec,
// but serveral implementations allow it.
block
	: lb=LBRACE sourceElement* RBRACE
	-> ^( BLOCK[$lb, "BLOCK"] sourceElement* )
	;

// $>

// $<Variable statement 12.2)

variableStatement
	: VAR variableDeclaration ( COMMA variableDeclaration )* semic
	-> ^( VAR variableDeclaration+ )
	;

variableDeclaration
	: Identifier ( ASSIGN^ assignmentExpression )?
	;

variableDeclarationNoIn
	: Identifier ( ASSIGN^ assignmentExpressionNoIn )?
	;

// $>

// $<Empty statement (12.3)

emptyStatement
	: SEMIC
	;

// $>

// $<Expression statement (12.4)

/*
The look ahead check on LBRACE and FUNCTION the specification mentions has been left out and its function, resolving the ambiguity between:
- functionExpression and functionDeclaration
- block and objectLiteral
are moved to the statement and sourceElement rules.
*/
expressionStatement
	: expression semic!
	;

// $>

// $<The if statement (12.5)

ifStatement
// The predicate is there just to get rid of the warning. ANTLR will handle the dangling else just fine.
	: IF LPAREN expression RPAREN statement ( { this.input.LA(1) == ECMAScript3ExtParser.ELSE }? ELSE statement )?
	-> ^( IF expression statement+ )
	;

// $>

// $<Iteration statements (12.6)

iterationStatement
	: doStatement
	| whileStatement
	| forStatement
	;

doStatement
	: DO statement WHILE LPAREN expression RPAREN semic
	-> ^( DO statement expression )
	;

whileStatement
	: WHILE^ LPAREN! expression RPAREN! statement
	;

/*
The forStatement production is refactored considerably as the specification contains a very none LL(*) compliant definition.
The initial version was like this:

forStatement
	: FOR^ LPAREN! forControl RPAREN! statement
	;
forControl
options
{
	backtrack = true ;
	//k = 3 ;
}
	: stepClause
	| iterationClause
	;
stepClause
options
{
	memoize = true ;
}
	: ( ex1=expressionNoIn | var=VAR variableDeclarationNoIn ( COMMA variableDeclarationNoIn )* )? SEMIC ex2=expression? SEMIC ex3=expression?
	-> { $var != null }? ^( FORSTEP ^( VAR[$var] variableDeclarationNoIn+ ) ^( EXPR $ex2? ) ^( EXPR $ex3? ) )
	-> ^( FORSTEP ^( EXPR $ex1? ) ^( EXPR $ex2? ) ^( EXPR $ex3? ) )
	;
iterationClause
options
{
	memoize = true ;
}
	: ( leftHandSideExpression | var=VAR variableDeclarationNoIn ) IN expression
	-> { $var != null }? ^( FORITER ^( VAR[$var] variableDeclarationNoIn ) ^( EXPR expression ) )
	-> ^( FORITER ^( EXPR leftHandSideExpression ) ^( EXPR expression ) )
	;

But this completely relies on the backtrack feature and capabilities of ANTLR.
Furthermore backtracking seemed to have 3 major drawbacks:
- the performance cost of backtracking is considerably
- didn't seem to work well with ANTLRWorks
- when introducing a k value to optimize the backtracking away, ANTLR runs out of heap space
*/
forStatement
	: FOR^ LPAREN! forControl RPAREN! statement
	;

forControl
	: forControlVar
	| forControlExpression
	| forControlSemic
	;

forControlVar
	: VAR variableDeclarationNoIn
	(
		(
			IN expression
			-> ^( FORITER ^( VAR variableDeclarationNoIn ) ^( EXPR expression ) )
		)
		|
		(
			( COMMA variableDeclarationNoIn )* SEMIC ex1=expression? SEMIC ex2=expression?
			-> ^( FORSTEP ^( VAR variableDeclarationNoIn+ ) ^( EXPR $ex1? ) ^( EXPR $ex2? ) )
		)
	)
	;

forControlExpression
@init
{
	var isLhs = [];
}
	: ex1=expressionNoIn
	(
		{ this.isLeftHandSideIn(ex1, isLhs) }? (
			IN ex2=expression
			-> ^( FORITER ^( EXPR $ex1 ) ^( EXPR $ex2 ) )
		)
		|
		(
			SEMIC ex2=expression? SEMIC ex3=expression?
			-> ^( FORSTEP ^( EXPR $ex1 ) ^( EXPR $ex2? ) ^( EXPR $ex3? ) )
		)
	)
	;

forControlSemic
	: SEMIC ex1=expression? SEMIC ex2=expression?
	-> ^( FORSTEP ^( EXPR ) ^( EXPR $ex1? ) ^( EXPR $ex2? ) )
	;

// $>

// $<The continue statement (12.7)

/*
The action with the call to promoteEOL after CONTINUE is to enforce the semicolon insertion rule of the specification that there are
no line terminators allowed beween CONTINUE and the optional identifier.
As an optimization we check the la first to decide whether there is an identier following.
*/
continueStatement
	: CONTINUE^ { if (this.input.LA(1) == ECMAScript3ExtLexer.Identifier) this.promoteEOL(null); } Identifier? semic!
	;

// $>

// $<The break statement (12.8)

/*
The action with the call to promoteEOL after BREAK is to enforce the semicolon insertion rule of the specification that there are
no line terminators allowed beween BREAK and the optional identifier.
As an optimization we check the la first to decide whether there is an identier following.
*/
breakStatement
	: BREAK^ { if (this.input.LA(1) == ECMAScript3ExtLexer.Identifier) this.promoteEOL(null); } Identifier? semic!
	;

// $>

// $<The return statement (12.9)

/*
The action calling promoteEOL after RETURN ensures that there are no line terminators between RETURN and the optional expression as the specification states.
When there are these get promoted to on channel and thus virtual semicolon wannabees.
So the folowing code:

return
1

will be parsed as:

return;
1;
*/
returnStatement
	: RETURN^ { this.promoteEOL(null); } expression? semic!
	;

// $>

// $<The with statement (12.10)

withStatement
	: WITH^ LPAREN! expression RPAREN! statement
	;

// $>

// $<The switch statement (12.11)

switchStatement
@init
{
	var defaultClauseCount = 0;
}
	: SWITCH LPAREN expression RPAREN LBRACE ( { defaultClauseCount == 0 }?=> defaultClause { defaultClauseCount++; } | caseClause )* RBRACE
	-> ^( SWITCH expression defaultClause? caseClause* )
	;

caseClause
	: CASE^ expression COLON! statement*
	;

defaultClause
	: DEFAULT^ COLON! statement*
	;

// $>

// $<Labelled statements (12.12)

labelledStatement
	: Identifier COLON statement
	-> ^( LABELLED Identifier statement )
	;

// $>

// $<The throw statement (12.13)

/*
The action calling promoteEOL after THROW ensures that there are no line terminators between THROW and the expression as the specification states.
When there are line terminators these get promoted to on channel and thus to virtual semicolon wannabees.
So the folowing code:

throw
new Error()

will be parsed as:

throw;
new Error();

which will yield a recognition exception!
*/
throwStatement
	: THROW^ { this.promoteEOL(null); } expression semic!
	;

// $>

// $<The try statement (12.14)

tryStatement
	: TRY^ block ( catchClause finallyClause? | finallyClause )
	;

catchClause
	: CATCH^ LPAREN! Identifier RPAREN! block
	;

finallyClause
	: FINALLY^ block
	;

// $>

// $>

//
// $<	A.5 Functions and Programs (13, 14)
//

// $<	Function Definition (13)

functionDeclaration
	: FUNCTION name=Identifier formalParameterList functionBody
	-> ^( FUNCTION $name formalParameterList functionBody )
	;

functionExpression
	: FUNCTION name=Identifier? formalParameterList functionBody
	-> ^( FUNCTION $name? formalParameterList functionBody )
	;

formalParameterList
	: LPAREN ( Identifier ( COMMA Identifier )* )? RPAREN
	-> ^( ARGS Identifier* )
	;

functionBody
	: lb=LBRACE sourceElement* RBRACE
	-> ^( BLOCK[$lb, "BLOCK"] sourceElement* )
	;

// $>

// $<	Program (14)

program
	: sourceElement*
	;

/*
By setting k  to 1 for this rule and adding the semantical predicate ANTRL will generate code that will always prefer functionDeclararion over functionExpression
here and therefor remove the ambiguity between these to production.
This will result in the same behaviour that is described in the specification under 12.4 on the expressionStatement rule.
*/
sourceElement
options
{
	k = 1 ;
}
	: { this.input.LA(1) == ECMAScript3ExtLexer.FUNCTION }? functionDeclaration
	| statement
	;

// $>

// $>
