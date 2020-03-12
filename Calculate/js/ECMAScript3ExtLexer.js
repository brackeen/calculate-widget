// $ANTLR 3.1.2 ECMAScript3Ext.g 2020-03-12 06:06:18

var ECMAScript3ExtLexer = function(input, state) {
// alternate constructor @todo
// public ECMAScript3ExtLexer(CharStream input)
// public ECMAScript3ExtLexer(CharStream input, RecognizerSharedState state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){


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

    }).call(this);

    this.dfa20 = new ECMAScript3ExtLexer.DFA20(this);
    this.dfa36 = new ECMAScript3ExtLexer.DFA36(this);
    ECMAScript3ExtLexer.superclass.constructor.call(this, input, state);


};

org.antlr.lang.augmentObject(ECMAScript3ExtLexer, {
    IdentifierStartASCII: 156,
    SHUASS: 104,
    PS: 148,
    VAR: 28,
    THROW: 25,
    EXPORT: 41,
    MULASS: 100,
    STATIC: 57,
    BSLASH: 135,
    INTERFACE: 49,
    BREAK: 7,
    BYTE: 34,
    ELSE: 14,
    SHRASS: 103,
    ANDASS: 105,
    IF: 18,
    DecimalIntegerLiteralWithoutLeadingZero: 164,
    ENUM: 40,
    SUB: 81,
    IN: 19,
    SEMIC: 70,
    LPAREN: 65,
    DOT: 69,
    FORITER: 117,
    POWASS: 130,
    FUNCTION: 17,
    HexDigit: 155,
    LOR: 94,
    SUBASS: 99,
    CASE: 8,
    HexIntegerLiteral: 169,
    ITEM: 119,
    BinaryDigit: 162,
    StringLiteral: 154,
    LBRACK: 67,
    POS: 127,
    NBSP: 142,
    CharacterEscapeSequence: 170,
    PUBLIC: 55,
    THROWS: 60,
    POW: 129,
    XOR: 133,
    DQUOTE: 136,
    LBRACE: 63,
    SAME: 78,
    CALL: 114,
    GOTO: 45,
    UnicodeEscapeSequence: 174,
    DecimalDigit: 157,
    CHAR: 35,
    LABELLED: 120,
    PINC: 126,
    ASSIGN: 97,
    IdentifierPart: 158,
    IMPORT: 47,
    DELETE: 12,
    CATCH: 9,
    DecimalLiteral: 166,
    CARETASS: 132,
    OctalEscapeSequence: 172,
    DOUBLE: 39,
    PROTECTED: 54,
    SP: 141,
    LONG: 50,
    COMMA: 71,
    OctalIntegerLiteral: 167,
    OctalDigit: 161,
    DIVASS: 108,
    CEXPR: 115,
    DEBUGGER: 38,
    PRIVATE: 53,
    CR: 146,
    LineTerminator: 149,
    CONTINUE: 10,
    DIV: 107,
    NEG: 122,
    USP: 143,
    TAB: 138,
    PAREXPR: 124,
    LF: 145,
    NEQ: 77,
    FACTORIAL: 128,
    VOLATILE: 62,
    INSTANCEOF: 20,
    NEW: 21,
    EXTENDS: 42,
    ADD: 80,
    ARRAY: 110,
    RegularExpressionLiteral: 160,
    LS: 147,
    LT: 72,
    ADDASS: 98,
    DO: 13,
    CLASS: 36,
    FINALLY: 15,
    Identifier: 153,
    BinaryIntegerLiteral: 168,
    CONST: 37,
    PACKAGE: 52,
    SHL: 86,
    FORSTEP: 118,
    TRY: 26,
    SHR: 87,
    BackslashSequence: 176,
    SYNCHRONIZED: 59,
    QUE: 95,
    SHU: 88,
    NULL: 4,
    MUL: 82,
    RegularExpressionFirstChar: 177,
    FOR: 16,
    BLOCK: 111,
    TRUE: 5,
    FINAL: 43,
    SingleLineComment: 152,
    RPAREN: 66,
    HexEscapeSequence: 173,
    EQ: 76,
    OBJECT: 123,
    CARET: 131,
    BOOLEAN: 33,
    DecimalIntegerLiteral: 165,
    RBRACK: 68,
    NOT: 91,
    RBRACE: 64,
    NAMEDVALUE: 121,
    AND: 89,
    PDEC: 125,
    THIS: 24,
    ZeroToThree: 171,
    SWITCH: 23,
    VOID: 29,
    LTE: 74,
    TRANSIENT: 61,
    VT: 139,
    INC: 84,
    FF: 140,
    FLOAT: 44,
    NATIVE: 51,
    ARGS: 109,
    NSAME: 79,
    LAND: 93,
    IdentifierNameASCIIStart: 159,
    ABSTRACT: 32,
    INT: 48,
    INV: 92,
    RETURN: 22,
    BYFIELD: 112,
    EXPR: 116,
    ExponentPart: 163,
    SHLASS: 102,
    SQUOTE: 137,
    BYINDEX: 113,
    EOF: -1,
    MODASS: 101,
    ORASS: 106,
    SUPER: 58,
    MOD: 83,
    DEC: 85,
    OR: 90,
    EOL: 150,
    MultiLineComment: 151,
    EscapeSequence: 175,
    IMPLEMENTS: 46,
    COLON: 96,
    GT: 73,
    WhiteSpace: 144,
    WITH: 31,
    SHORT: 56,
    XORASS: 134,
    TYPEOF: 27,
    RegularExpressionChar: 178,
    GTE: 75,
    FALSE: 6,
    WHILE: 30,
    DEFAULT: 11
});

(function(){
var HIDDEN = org.antlr.runtime.Token.HIDDEN_CHANNEL,
    EOF = org.antlr.runtime.Token.EOF;
org.antlr.lang.extend(ECMAScript3ExtLexer, org.antlr.runtime.Lexer, {
    IdentifierStartASCII : 156,
    SHUASS : 104,
    PS : 148,
    VAR : 28,
    THROW : 25,
    EXPORT : 41,
    MULASS : 100,
    STATIC : 57,
    BSLASH : 135,
    INTERFACE : 49,
    BREAK : 7,
    BYTE : 34,
    ELSE : 14,
    SHRASS : 103,
    ANDASS : 105,
    IF : 18,
    DecimalIntegerLiteralWithoutLeadingZero : 164,
    ENUM : 40,
    SUB : 81,
    IN : 19,
    SEMIC : 70,
    LPAREN : 65,
    DOT : 69,
    FORITER : 117,
    POWASS : 130,
    FUNCTION : 17,
    HexDigit : 155,
    LOR : 94,
    SUBASS : 99,
    CASE : 8,
    HexIntegerLiteral : 169,
    ITEM : 119,
    BinaryDigit : 162,
    StringLiteral : 154,
    LBRACK : 67,
    POS : 127,
    NBSP : 142,
    CharacterEscapeSequence : 170,
    PUBLIC : 55,
    THROWS : 60,
    POW : 129,
    XOR : 133,
    DQUOTE : 136,
    LBRACE : 63,
    SAME : 78,
    CALL : 114,
    GOTO : 45,
    UnicodeEscapeSequence : 174,
    DecimalDigit : 157,
    CHAR : 35,
    LABELLED : 120,
    PINC : 126,
    ASSIGN : 97,
    IdentifierPart : 158,
    IMPORT : 47,
    DELETE : 12,
    CATCH : 9,
    DecimalLiteral : 166,
    CARETASS : 132,
    OctalEscapeSequence : 172,
    DOUBLE : 39,
    PROTECTED : 54,
    SP : 141,
    LONG : 50,
    COMMA : 71,
    OctalIntegerLiteral : 167,
    OctalDigit : 161,
    DIVASS : 108,
    CEXPR : 115,
    DEBUGGER : 38,
    PRIVATE : 53,
    CR : 146,
    LineTerminator : 149,
    CONTINUE : 10,
    DIV : 107,
    NEG : 122,
    USP : 143,
    TAB : 138,
    PAREXPR : 124,
    LF : 145,
    NEQ : 77,
    FACTORIAL : 128,
    VOLATILE : 62,
    INSTANCEOF : 20,
    NEW : 21,
    EXTENDS : 42,
    ADD : 80,
    ARRAY : 110,
    RegularExpressionLiteral : 160,
    LS : 147,
    LT : 72,
    ADDASS : 98,
    DO : 13,
    CLASS : 36,
    FINALLY : 15,
    Identifier : 153,
    BinaryIntegerLiteral : 168,
    CONST : 37,
    PACKAGE : 52,
    SHL : 86,
    FORSTEP : 118,
    TRY : 26,
    SHR : 87,
    BackslashSequence : 176,
    SYNCHRONIZED : 59,
    QUE : 95,
    SHU : 88,
    NULL : 4,
    MUL : 82,
    RegularExpressionFirstChar : 177,
    FOR : 16,
    BLOCK : 111,
    TRUE : 5,
    FINAL : 43,
    SingleLineComment : 152,
    RPAREN : 66,
    HexEscapeSequence : 173,
    EQ : 76,
    OBJECT : 123,
    CARET : 131,
    BOOLEAN : 33,
    DecimalIntegerLiteral : 165,
    RBRACK : 68,
    NOT : 91,
    RBRACE : 64,
    NAMEDVALUE : 121,
    AND : 89,
    PDEC : 125,
    THIS : 24,
    ZeroToThree : 171,
    SWITCH : 23,
    VOID : 29,
    LTE : 74,
    TRANSIENT : 61,
    VT : 139,
    INC : 84,
    FF : 140,
    FLOAT : 44,
    NATIVE : 51,
    ARGS : 109,
    NSAME : 79,
    LAND : 93,
    IdentifierNameASCIIStart : 159,
    ABSTRACT : 32,
    INT : 48,
    INV : 92,
    RETURN : 22,
    BYFIELD : 112,
    EXPR : 116,
    ExponentPart : 163,
    SHLASS : 102,
    SQUOTE : 137,
    BYINDEX : 113,
    EOF : -1,
    MODASS : 101,
    ORASS : 106,
    SUPER : 58,
    MOD : 83,
    DEC : 85,
    OR : 90,
    EOL : 150,
    MultiLineComment : 151,
    EscapeSequence : 175,
    IMPLEMENTS : 46,
    COLON : 96,
    GT : 73,
    WhiteSpace : 144,
    WITH : 31,
    SHORT : 56,
    XORASS : 134,
    TYPEOF : 27,
    RegularExpressionChar : 178,
    GTE : 75,
    FALSE : 6,
    WHILE : 30,
    DEFAULT : 11,
    getGrammarFileName: function() { return "ECMAScript3Ext.g"; }
});
org.antlr.lang.augmentObject(ECMAScript3ExtLexer.prototype, {
    // $ANTLR start NULL
    mNULL: function()  {
        try {
            var _type = this.NULL;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:513:6: ( 'null' )
            // ECMAScript3Ext.g:513:8: 'null'
            this.match("null"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NULL",

    // $ANTLR start TRUE
    mTRUE: function()  {
        try {
            var _type = this.TRUE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:514:6: ( 'true' )
            // ECMAScript3Ext.g:514:8: 'true'
            this.match("true"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "TRUE",

    // $ANTLR start FALSE
    mFALSE: function()  {
        try {
            var _type = this.FALSE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:515:7: ( 'false' )
            // ECMAScript3Ext.g:515:9: 'false'
            this.match("false"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FALSE",

    // $ANTLR start BREAK
    mBREAK: function()  {
        try {
            var _type = this.BREAK;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:516:7: ( 'break' )
            // ECMAScript3Ext.g:516:9: 'break'
            this.match("break"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "BREAK",

    // $ANTLR start CASE
    mCASE: function()  {
        try {
            var _type = this.CASE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:517:6: ( 'case' )
            // ECMAScript3Ext.g:517:8: 'case'
            this.match("case"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CASE",

    // $ANTLR start CATCH
    mCATCH: function()  {
        try {
            var _type = this.CATCH;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:518:7: ( 'catch' )
            // ECMAScript3Ext.g:518:9: 'catch'
            this.match("catch"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CATCH",

    // $ANTLR start CONTINUE
    mCONTINUE: function()  {
        try {
            var _type = this.CONTINUE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:519:10: ( 'continue' )
            // ECMAScript3Ext.g:519:12: 'continue'
            this.match("continue"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CONTINUE",

    // $ANTLR start DEFAULT
    mDEFAULT: function()  {
        try {
            var _type = this.DEFAULT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:520:9: ( 'default' )
            // ECMAScript3Ext.g:520:11: 'default'
            this.match("default"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DEFAULT",

    // $ANTLR start DELETE
    mDELETE: function()  {
        try {
            var _type = this.DELETE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:521:8: ( 'delete' )
            // ECMAScript3Ext.g:521:10: 'delete'
            this.match("delete"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DELETE",

    // $ANTLR start DO
    mDO: function()  {
        try {
            var _type = this.DO;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:522:4: ( 'do' )
            // ECMAScript3Ext.g:522:6: 'do'
            this.match("do"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DO",

    // $ANTLR start ELSE
    mELSE: function()  {
        try {
            var _type = this.ELSE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:523:6: ( 'else' )
            // ECMAScript3Ext.g:523:8: 'else'
            this.match("else"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ELSE",

    // $ANTLR start FINALLY
    mFINALLY: function()  {
        try {
            var _type = this.FINALLY;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:524:9: ( 'finally' )
            // ECMAScript3Ext.g:524:11: 'finally'
            this.match("finally"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FINALLY",

    // $ANTLR start FOR
    mFOR: function()  {
        try {
            var _type = this.FOR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:525:5: ( 'for' )
            // ECMAScript3Ext.g:525:7: 'for'
            this.match("for"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FOR",

    // $ANTLR start FUNCTION
    mFUNCTION: function()  {
        try {
            var _type = this.FUNCTION;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:526:10: ( 'function' )
            // ECMAScript3Ext.g:526:12: 'function'
            this.match("function"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FUNCTION",

    // $ANTLR start IF
    mIF: function()  {
        try {
            var _type = this.IF;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:527:4: ( 'if' )
            // ECMAScript3Ext.g:527:6: 'if'
            this.match("if"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "IF",

    // $ANTLR start IN
    mIN: function()  {
        try {
            var _type = this.IN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:528:4: ( 'in' )
            // ECMAScript3Ext.g:528:6: 'in'
            this.match("in"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "IN",

    // $ANTLR start INSTANCEOF
    mINSTANCEOF: function()  {
        try {
            var _type = this.INSTANCEOF;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:529:12: ( 'instanceof' )
            // ECMAScript3Ext.g:529:14: 'instanceof'
            this.match("instanceof"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "INSTANCEOF",

    // $ANTLR start NEW
    mNEW: function()  {
        try {
            var _type = this.NEW;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:530:5: ( 'new' )
            // ECMAScript3Ext.g:530:7: 'new'
            this.match("new"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NEW",

    // $ANTLR start RETURN
    mRETURN: function()  {
        try {
            var _type = this.RETURN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:531:8: ( 'return' )
            // ECMAScript3Ext.g:531:10: 'return'
            this.match("return"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "RETURN",

    // $ANTLR start SWITCH
    mSWITCH: function()  {
        try {
            var _type = this.SWITCH;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:532:8: ( 'switch' )
            // ECMAScript3Ext.g:532:10: 'switch'
            this.match("switch"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SWITCH",

    // $ANTLR start THIS
    mTHIS: function()  {
        try {
            var _type = this.THIS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:533:6: ( 'this' )
            // ECMAScript3Ext.g:533:8: 'this'
            this.match("this"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "THIS",

    // $ANTLR start THROW
    mTHROW: function()  {
        try {
            var _type = this.THROW;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:534:7: ( 'throw' )
            // ECMAScript3Ext.g:534:9: 'throw'
            this.match("throw"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "THROW",

    // $ANTLR start TRY
    mTRY: function()  {
        try {
            var _type = this.TRY;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:535:5: ( 'try' )
            // ECMAScript3Ext.g:535:7: 'try'
            this.match("try"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "TRY",

    // $ANTLR start TYPEOF
    mTYPEOF: function()  {
        try {
            var _type = this.TYPEOF;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:536:8: ( 'typeof' )
            // ECMAScript3Ext.g:536:10: 'typeof'
            this.match("typeof"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "TYPEOF",

    // $ANTLR start VAR
    mVAR: function()  {
        try {
            var _type = this.VAR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:537:5: ( 'var' )
            // ECMAScript3Ext.g:537:7: 'var'
            this.match("var"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "VAR",

    // $ANTLR start VOID
    mVOID: function()  {
        try {
            var _type = this.VOID;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:538:6: ( 'void' )
            // ECMAScript3Ext.g:538:8: 'void'
            this.match("void"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "VOID",

    // $ANTLR start WHILE
    mWHILE: function()  {
        try {
            var _type = this.WHILE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:539:7: ( 'while' )
            // ECMAScript3Ext.g:539:9: 'while'
            this.match("while"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "WHILE",

    // $ANTLR start WITH
    mWITH: function()  {
        try {
            var _type = this.WITH;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:540:6: ( 'with' )
            // ECMAScript3Ext.g:540:8: 'with'
            this.match("with"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "WITH",

    // $ANTLR start ABSTRACT
    mABSTRACT: function()  {
        try {
            var _type = this.ABSTRACT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:541:10: ( 'abstract' )
            // ECMAScript3Ext.g:541:12: 'abstract'
            this.match("abstract"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ABSTRACT",

    // $ANTLR start BOOLEAN
    mBOOLEAN: function()  {
        try {
            var _type = this.BOOLEAN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:542:9: ( 'boolean' )
            // ECMAScript3Ext.g:542:11: 'boolean'
            this.match("boolean"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "BOOLEAN",

    // $ANTLR start BYTE
    mBYTE: function()  {
        try {
            var _type = this.BYTE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:543:6: ( 'byte' )
            // ECMAScript3Ext.g:543:8: 'byte'
            this.match("byte"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "BYTE",

    // $ANTLR start CHAR
    mCHAR: function()  {
        try {
            var _type = this.CHAR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:544:6: ( 'char' )
            // ECMAScript3Ext.g:544:8: 'char'
            this.match("char"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CHAR",

    // $ANTLR start CLASS
    mCLASS: function()  {
        try {
            var _type = this.CLASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:545:7: ( 'class' )
            // ECMAScript3Ext.g:545:9: 'class'
            this.match("class"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CLASS",

    // $ANTLR start CONST
    mCONST: function()  {
        try {
            var _type = this.CONST;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:546:7: ( 'const' )
            // ECMAScript3Ext.g:546:9: 'const'
            this.match("const"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CONST",

    // $ANTLR start DEBUGGER
    mDEBUGGER: function()  {
        try {
            var _type = this.DEBUGGER;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:547:10: ( 'debugger' )
            // ECMAScript3Ext.g:547:12: 'debugger'
            this.match("debugger"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DEBUGGER",

    // $ANTLR start DOUBLE
    mDOUBLE: function()  {
        try {
            var _type = this.DOUBLE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:548:8: ( 'double' )
            // ECMAScript3Ext.g:548:10: 'double'
            this.match("double"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DOUBLE",

    // $ANTLR start ENUM
    mENUM: function()  {
        try {
            var _type = this.ENUM;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:549:6: ( 'enum' )
            // ECMAScript3Ext.g:549:8: 'enum'
            this.match("enum"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ENUM",

    // $ANTLR start EXPORT
    mEXPORT: function()  {
        try {
            var _type = this.EXPORT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:550:8: ( 'export' )
            // ECMAScript3Ext.g:550:10: 'export'
            this.match("export"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "EXPORT",

    // $ANTLR start EXTENDS
    mEXTENDS: function()  {
        try {
            var _type = this.EXTENDS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:551:9: ( 'extends' )
            // ECMAScript3Ext.g:551:11: 'extends'
            this.match("extends"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "EXTENDS",

    // $ANTLR start FINAL
    mFINAL: function()  {
        try {
            var _type = this.FINAL;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:552:7: ( 'final' )
            // ECMAScript3Ext.g:552:9: 'final'
            this.match("final"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FINAL",

    // $ANTLR start FLOAT
    mFLOAT: function()  {
        try {
            var _type = this.FLOAT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:553:7: ( 'float' )
            // ECMAScript3Ext.g:553:9: 'float'
            this.match("float"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FLOAT",

    // $ANTLR start GOTO
    mGOTO: function()  {
        try {
            var _type = this.GOTO;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:554:6: ( 'goto' )
            // ECMAScript3Ext.g:554:8: 'goto'
            this.match("goto"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "GOTO",

    // $ANTLR start IMPLEMENTS
    mIMPLEMENTS: function()  {
        try {
            var _type = this.IMPLEMENTS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:555:12: ( 'implements' )
            // ECMAScript3Ext.g:555:14: 'implements'
            this.match("implements"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "IMPLEMENTS",

    // $ANTLR start IMPORT
    mIMPORT: function()  {
        try {
            var _type = this.IMPORT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:556:8: ( 'import' )
            // ECMAScript3Ext.g:556:10: 'import'
            this.match("import"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "IMPORT",

    // $ANTLR start INT
    mINT: function()  {
        try {
            var _type = this.INT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:557:5: ( 'int' )
            // ECMAScript3Ext.g:557:7: 'int'
            this.match("int"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "INT",

    // $ANTLR start INTERFACE
    mINTERFACE: function()  {
        try {
            var _type = this.INTERFACE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:558:11: ( 'interface' )
            // ECMAScript3Ext.g:558:13: 'interface'
            this.match("interface"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "INTERFACE",

    // $ANTLR start LONG
    mLONG: function()  {
        try {
            var _type = this.LONG;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:559:6: ( 'long' )
            // ECMAScript3Ext.g:559:8: 'long'
            this.match("long"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LONG",

    // $ANTLR start NATIVE
    mNATIVE: function()  {
        try {
            var _type = this.NATIVE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:560:8: ( 'native' )
            // ECMAScript3Ext.g:560:10: 'native'
            this.match("native"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NATIVE",

    // $ANTLR start PACKAGE
    mPACKAGE: function()  {
        try {
            var _type = this.PACKAGE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:561:9: ( 'package' )
            // ECMAScript3Ext.g:561:11: 'package'
            this.match("package"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "PACKAGE",

    // $ANTLR start PRIVATE
    mPRIVATE: function()  {
        try {
            var _type = this.PRIVATE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:562:9: ( 'private' )
            // ECMAScript3Ext.g:562:11: 'private'
            this.match("private"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "PRIVATE",

    // $ANTLR start PROTECTED
    mPROTECTED: function()  {
        try {
            var _type = this.PROTECTED;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:563:11: ( 'protected' )
            // ECMAScript3Ext.g:563:13: 'protected'
            this.match("protected"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "PROTECTED",

    // $ANTLR start PUBLIC
    mPUBLIC: function()  {
        try {
            var _type = this.PUBLIC;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:564:8: ( 'public' )
            // ECMAScript3Ext.g:564:10: 'public'
            this.match("public"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "PUBLIC",

    // $ANTLR start SHORT
    mSHORT: function()  {
        try {
            var _type = this.SHORT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:565:7: ( 'short' )
            // ECMAScript3Ext.g:565:9: 'short'
            this.match("short"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHORT",

    // $ANTLR start STATIC
    mSTATIC: function()  {
        try {
            var _type = this.STATIC;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:566:8: ( 'static' )
            // ECMAScript3Ext.g:566:10: 'static'
            this.match("static"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "STATIC",

    // $ANTLR start SUPER
    mSUPER: function()  {
        try {
            var _type = this.SUPER;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:567:7: ( 'super' )
            // ECMAScript3Ext.g:567:9: 'super'
            this.match("super"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SUPER",

    // $ANTLR start SYNCHRONIZED
    mSYNCHRONIZED: function()  {
        try {
            var _type = this.SYNCHRONIZED;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:568:14: ( 'synchronized' )
            // ECMAScript3Ext.g:568:16: 'synchronized'
            this.match("synchronized"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SYNCHRONIZED",

    // $ANTLR start THROWS
    mTHROWS: function()  {
        try {
            var _type = this.THROWS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:569:8: ( 'throws' )
            // ECMAScript3Ext.g:569:10: 'throws'
            this.match("throws"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "THROWS",

    // $ANTLR start TRANSIENT
    mTRANSIENT: function()  {
        try {
            var _type = this.TRANSIENT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:570:11: ( 'transient' )
            // ECMAScript3Ext.g:570:13: 'transient'
            this.match("transient"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "TRANSIENT",

    // $ANTLR start VOLATILE
    mVOLATILE: function()  {
        try {
            var _type = this.VOLATILE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:571:10: ( 'volatile' )
            // ECMAScript3Ext.g:571:12: 'volatile'
            this.match("volatile"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "VOLATILE",

    // $ANTLR start LBRACE
    mLBRACE: function()  {
        try {
            var _type = this.LBRACE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:572:8: ( '{' )
            // ECMAScript3Ext.g:572:10: '{'
            this.match('{'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LBRACE",

    // $ANTLR start RBRACE
    mRBRACE: function()  {
        try {
            var _type = this.RBRACE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:573:8: ( '}' )
            // ECMAScript3Ext.g:573:10: '}'
            this.match('}'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "RBRACE",

    // $ANTLR start LPAREN
    mLPAREN: function()  {
        try {
            var _type = this.LPAREN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:574:8: ( '(' )
            // ECMAScript3Ext.g:574:10: '('
            this.match('('); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LPAREN",

    // $ANTLR start RPAREN
    mRPAREN: function()  {
        try {
            var _type = this.RPAREN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:575:8: ( ')' )
            // ECMAScript3Ext.g:575:10: ')'
            this.match(')'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "RPAREN",

    // $ANTLR start LBRACK
    mLBRACK: function()  {
        try {
            var _type = this.LBRACK;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:576:8: ( '[' )
            // ECMAScript3Ext.g:576:10: '['
            this.match('['); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LBRACK",

    // $ANTLR start RBRACK
    mRBRACK: function()  {
        try {
            var _type = this.RBRACK;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:577:8: ( ']' )
            // ECMAScript3Ext.g:577:10: ']'
            this.match(']'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "RBRACK",

    // $ANTLR start DOT
    mDOT: function()  {
        try {
            var _type = this.DOT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:578:5: ( '.' )
            // ECMAScript3Ext.g:578:7: '.'
            this.match('.'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DOT",

    // $ANTLR start SEMIC
    mSEMIC: function()  {
        try {
            var _type = this.SEMIC;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:579:7: ( ';' )
            // ECMAScript3Ext.g:579:9: ';'
            this.match(';'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SEMIC",

    // $ANTLR start COMMA
    mCOMMA: function()  {
        try {
            var _type = this.COMMA;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:580:7: ( ',' )
            // ECMAScript3Ext.g:580:9: ','
            this.match(','); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "COMMA",

    // $ANTLR start LT
    mLT: function()  {
        try {
            var _type = this.LT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:581:4: ( '<' )
            // ECMAScript3Ext.g:581:6: '<'
            this.match('<'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LT",

    // $ANTLR start GT
    mGT: function()  {
        try {
            var _type = this.GT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:582:4: ( '>' )
            // ECMAScript3Ext.g:582:6: '>'
            this.match('>'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "GT",

    // $ANTLR start LTE
    mLTE: function()  {
        try {
            var _type = this.LTE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:583:5: ( '<=' )
            // ECMAScript3Ext.g:583:7: '<='
            this.match("<="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LTE",

    // $ANTLR start GTE
    mGTE: function()  {
        try {
            var _type = this.GTE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:584:5: ( '>=' )
            // ECMAScript3Ext.g:584:7: '>='
            this.match(">="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "GTE",

    // $ANTLR start EQ
    mEQ: function()  {
        try {
            var _type = this.EQ;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:585:4: ( '==' )
            // ECMAScript3Ext.g:585:6: '=='
            this.match("=="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "EQ",

    // $ANTLR start NEQ
    mNEQ: function()  {
        try {
            var _type = this.NEQ;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:586:5: ( '!=' )
            // ECMAScript3Ext.g:586:7: '!='
            this.match("!="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NEQ",

    // $ANTLR start SAME
    mSAME: function()  {
        try {
            var _type = this.SAME;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:587:6: ( '===' )
            // ECMAScript3Ext.g:587:8: '==='
            this.match("==="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SAME",

    // $ANTLR start NSAME
    mNSAME: function()  {
        try {
            var _type = this.NSAME;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:588:7: ( '!==' )
            // ECMAScript3Ext.g:588:9: '!=='
            this.match("!=="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NSAME",

    // $ANTLR start ADD
    mADD: function()  {
        try {
            var _type = this.ADD;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:589:5: ( '+' )
            // ECMAScript3Ext.g:589:7: '+'
            this.match('+'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ADD",

    // $ANTLR start SUB
    mSUB: function()  {
        try {
            var _type = this.SUB;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:590:5: ( '-' )
            // ECMAScript3Ext.g:590:7: '-'
            this.match('-'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SUB",

    // $ANTLR start MUL
    mMUL: function()  {
        try {
            var _type = this.MUL;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:591:5: ( '*' )
            // ECMAScript3Ext.g:591:7: '*'
            this.match('*'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "MUL",

    // $ANTLR start MOD
    mMOD: function()  {
        try {
            var _type = this.MOD;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:592:5: ( '%' )
            // ECMAScript3Ext.g:592:7: '%'
            this.match('%'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "MOD",

    // $ANTLR start INC
    mINC: function()  {
        try {
            var _type = this.INC;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:593:5: ( '++' )
            // ECMAScript3Ext.g:593:7: '++'
            this.match("++"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "INC",

    // $ANTLR start DEC
    mDEC: function()  {
        try {
            var _type = this.DEC;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:594:5: ( '--' )
            // ECMAScript3Ext.g:594:7: '--'
            this.match("--"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DEC",

    // $ANTLR start SHL
    mSHL: function()  {
        try {
            var _type = this.SHL;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:595:5: ( '<<' )
            // ECMAScript3Ext.g:595:7: '<<'
            this.match("<<"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHL",

    // $ANTLR start SHR
    mSHR: function()  {
        try {
            var _type = this.SHR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:596:5: ( '>>' )
            // ECMAScript3Ext.g:596:7: '>>'
            this.match(">>"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHR",

    // $ANTLR start SHU
    mSHU: function()  {
        try {
            var _type = this.SHU;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:597:5: ( '>>>' )
            // ECMAScript3Ext.g:597:7: '>>>'
            this.match(">>>"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHU",

    // $ANTLR start AND
    mAND: function()  {
        try {
            var _type = this.AND;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:598:5: ( '&' )
            // ECMAScript3Ext.g:598:7: '&'
            this.match('&'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "AND",

    // $ANTLR start OR
    mOR: function()  {
        try {
            var _type = this.OR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:599:4: ( '|' )
            // ECMAScript3Ext.g:599:6: '|'
            this.match('|'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "OR",

    // $ANTLR start NOT
    mNOT: function()  {
        try {
            var _type = this.NOT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:600:5: ( '!' )
            // ECMAScript3Ext.g:600:7: '!'
            this.match('!'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "NOT",

    // $ANTLR start INV
    mINV: function()  {
        try {
            var _type = this.INV;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:601:5: ( '~' )
            // ECMAScript3Ext.g:601:7: '~'
            this.match('~'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "INV",

    // $ANTLR start LAND
    mLAND: function()  {
        try {
            var _type = this.LAND;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:602:6: ( '&&' )
            // ECMAScript3Ext.g:602:8: '&&'
            this.match("&&"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LAND",

    // $ANTLR start LOR
    mLOR: function()  {
        try {
            var _type = this.LOR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:603:5: ( '||' )
            // ECMAScript3Ext.g:603:7: '||'
            this.match("||"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LOR",

    // $ANTLR start QUE
    mQUE: function()  {
        try {
            var _type = this.QUE;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:604:5: ( '?' )
            // ECMAScript3Ext.g:604:7: '?'
            this.match('?'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "QUE",

    // $ANTLR start COLON
    mCOLON: function()  {
        try {
            var _type = this.COLON;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:605:7: ( ':' )
            // ECMAScript3Ext.g:605:9: ':'
            this.match(':'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "COLON",

    // $ANTLR start ASSIGN
    mASSIGN: function()  {
        try {
            var _type = this.ASSIGN;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:606:8: ( '=' )
            // ECMAScript3Ext.g:606:10: '='
            this.match('='); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ASSIGN",

    // $ANTLR start ADDASS
    mADDASS: function()  {
        try {
            var _type = this.ADDASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:607:8: ( '+=' )
            // ECMAScript3Ext.g:607:10: '+='
            this.match("+="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ADDASS",

    // $ANTLR start SUBASS
    mSUBASS: function()  {
        try {
            var _type = this.SUBASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:608:8: ( '-=' )
            // ECMAScript3Ext.g:608:10: '-='
            this.match("-="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SUBASS",

    // $ANTLR start MULASS
    mMULASS: function()  {
        try {
            var _type = this.MULASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:609:8: ( '*=' )
            // ECMAScript3Ext.g:609:10: '*='
            this.match("*="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "MULASS",

    // $ANTLR start MODASS
    mMODASS: function()  {
        try {
            var _type = this.MODASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:610:8: ( '%=' )
            // ECMAScript3Ext.g:610:10: '%='
            this.match("%="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "MODASS",

    // $ANTLR start SHLASS
    mSHLASS: function()  {
        try {
            var _type = this.SHLASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:611:8: ( '<<=' )
            // ECMAScript3Ext.g:611:10: '<<='
            this.match("<<="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHLASS",

    // $ANTLR start SHRASS
    mSHRASS: function()  {
        try {
            var _type = this.SHRASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:612:8: ( '>>=' )
            // ECMAScript3Ext.g:612:10: '>>='
            this.match(">>="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHRASS",

    // $ANTLR start SHUASS
    mSHUASS: function()  {
        try {
            var _type = this.SHUASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:613:8: ( '>>>=' )
            // ECMAScript3Ext.g:613:10: '>>>='
            this.match(">>>="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SHUASS",

    // $ANTLR start ANDASS
    mANDASS: function()  {
        try {
            var _type = this.ANDASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:614:8: ( '&=' )
            // ECMAScript3Ext.g:614:10: '&='
            this.match("&="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ANDASS",

    // $ANTLR start ORASS
    mORASS: function()  {
        try {
            var _type = this.ORASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:615:7: ( '|=' )
            // ECMAScript3Ext.g:615:9: '|='
            this.match("|="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ORASS",

    // $ANTLR start DIV
    mDIV: function()  {
        try {
            var _type = this.DIV;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:616:5: ( '/' )
            // ECMAScript3Ext.g:616:7: '/'
            this.match('/'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DIV",

    // $ANTLR start DIVASS
    mDIVASS: function()  {
        try {
            var _type = this.DIVASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:617:8: ( '/=' )
            // ECMAScript3Ext.g:617:10: '/='
            this.match("/="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DIVASS",

    // $ANTLR start POW
    mPOW: function()  {
        try {
            var _type = this.POW;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:618:5: ( '**' )
            // ECMAScript3Ext.g:618:7: '**'
            this.match("**"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "POW",

    // $ANTLR start POWASS
    mPOWASS: function()  {
        try {
            var _type = this.POWASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:619:8: ( '**=' )
            // ECMAScript3Ext.g:619:10: '**='
            this.match("**="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "POWASS",

    // $ANTLR start CARET
    mCARET: function()  {
        try {
            var _type = this.CARET;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:620:7: ( '^' )
            // ECMAScript3Ext.g:620:9: '^'
            this.match('^'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CARET",

    // $ANTLR start CARETASS
    mCARETASS: function()  {
        try {
            var _type = this.CARETASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:621:10: ( '^=' )
            // ECMAScript3Ext.g:621:12: '^='
            this.match("^="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CARETASS",

    // $ANTLR start XOR
    mXOR: function()  {
        try {
            var _type = this.XOR;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:622:5: ( '><' )
            // ECMAScript3Ext.g:622:7: '><'
            this.match("><"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "XOR",

    // $ANTLR start XORASS
    mXORASS: function()  {
        try {
            var _type = this.XORASS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:623:8: ( '><=' )
            // ECMAScript3Ext.g:623:10: '><='
            this.match("><="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "XORASS",

    // $ANTLR start BSLASH
    mBSLASH: function()  {
        try {
            // ECMAScript3Ext.g:820:2: ( '\\\\' )
            // ECMAScript3Ext.g:820:4: '\\\\'
            this.match('\\'); 



        }
        finally {
        }
    },
    // $ANTLR end "BSLASH",

    // $ANTLR start DQUOTE
    mDQUOTE: function()  {
        try {
            // ECMAScript3Ext.g:824:2: ( '\"' )
            // ECMAScript3Ext.g:824:4: '\"'
            this.match('\"'); 



        }
        finally {
        }
    },
    // $ANTLR end "DQUOTE",

    // $ANTLR start SQUOTE
    mSQUOTE: function()  {
        try {
            // ECMAScript3Ext.g:828:2: ( '\\'' )
            // ECMAScript3Ext.g:828:4: '\\''
            this.match('\''); 



        }
        finally {
        }
    },
    // $ANTLR end "SQUOTE",

    // $ANTLR start TAB
    mTAB: function()  {
        try {
            // ECMAScript3Ext.g:834:2: ( '\\u0009' )
            // ECMAScript3Ext.g:834:4: '\\u0009'
            this.match('\t'); 



        }
        finally {
        }
    },
    // $ANTLR end "TAB",

    // $ANTLR start VT
    mVT: function()  {
        try {
            // ECMAScript3Ext.g:838:2: ( '\\u000b' )
            // ECMAScript3Ext.g:838:4: '\\u000b'
            this.match('\u000B'); 



        }
        finally {
        }
    },
    // $ANTLR end "VT",

    // $ANTLR start FF
    mFF: function()  {
        try {
            // ECMAScript3Ext.g:842:2: ( '\\u000c' )
            // ECMAScript3Ext.g:842:4: '\\u000c'
            this.match('\f'); 



        }
        finally {
        }
    },
    // $ANTLR end "FF",

    // $ANTLR start SP
    mSP: function()  {
        try {
            // ECMAScript3Ext.g:846:2: ( '\\u0020' )
            // ECMAScript3Ext.g:846:4: '\\u0020'
            this.match(' '); 



        }
        finally {
        }
    },
    // $ANTLR end "SP",

    // $ANTLR start NBSP
    mNBSP: function()  {
        try {
            // ECMAScript3Ext.g:850:2: ( '\\u00a0' )
            // ECMAScript3Ext.g:850:4: '\\u00a0'
            this.match('\u00A0'); 



        }
        finally {
        }
    },
    // $ANTLR end "NBSP",

    // $ANTLR start USP
    mUSP: function()  {
        try {
            // ECMAScript3Ext.g:854:2: ( '\\u1680' | '\\u180E' | '\\u2000' | '\\u2001' | '\\u2002' | '\\u2003' | '\\u2004' | '\\u2005' | '\\u2006' | '\\u2007' | '\\u2008' | '\\u2009' | '\\u200A' | '\\u202F' | '\\u205F' | '\\u3000' )
            // ECMAScript3Ext.g:
            if ( this.input.LA(1)=='\u1680'||this.input.LA(1)=='\u180E'||(this.input.LA(1)>='\u2000' && this.input.LA(1)<='\u200A')||this.input.LA(1)=='\u202F'||this.input.LA(1)=='\u205F'||this.input.LA(1)=='\u3000' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "USP",

    // $ANTLR start WhiteSpace
    mWhiteSpace: function()  {
        try {
            var _type = this.WhiteSpace;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:873:2: ( ( TAB | VT | FF | SP | NBSP | USP )+ )
            // ECMAScript3Ext.g:873:4: ( TAB | VT | FF | SP | NBSP | USP )+
            // ECMAScript3Ext.g:873:4: ( TAB | VT | FF | SP | NBSP | USP )+
            var cnt1=0;
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0=='\t'||(LA1_0>='\u000B' && LA1_0<='\f')||LA1_0==' '||LA1_0=='\u00A0'||LA1_0=='\u1680'||LA1_0=='\u180E'||(LA1_0>='\u2000' && LA1_0<='\u200A')||LA1_0=='\u202F'||LA1_0=='\u205F'||LA1_0=='\u3000') ) {
                    alt1=1;
                }


                switch (alt1) {
                case 1 :
                    // ECMAScript3Ext.g:
                    if ( this.input.LA(1)=='\t'||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||this.input.LA(1)==' '||this.input.LA(1)=='\u00A0'||this.input.LA(1)=='\u1680'||this.input.LA(1)=='\u180E'||(this.input.LA(1)>='\u2000' && this.input.LA(1)<='\u200A')||this.input.LA(1)=='\u202F'||this.input.LA(1)=='\u205F'||this.input.LA(1)=='\u3000' ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

                default :
                    if ( cnt1 >= 1 ) {
                        break loop1;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(1, this.input);
                        throw eee;
                }
                cnt1++;
            } while (true);

             _channel = HIDDEN; 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "WhiteSpace",

    // $ANTLR start LF
    mLF: function()  {
        try {
            // ECMAScript3Ext.g:881:2: ( '\\n' )
            // ECMAScript3Ext.g:881:4: '\\n'
            this.match('\n'); 



        }
        finally {
        }
    },
    // $ANTLR end "LF",

    // $ANTLR start CR
    mCR: function()  {
        try {
            // ECMAScript3Ext.g:885:2: ( '\\r' )
            // ECMAScript3Ext.g:885:4: '\\r'
            this.match('\r'); 



        }
        finally {
        }
    },
    // $ANTLR end "CR",

    // $ANTLR start LS
    mLS: function()  {
        try {
            // ECMAScript3Ext.g:889:2: ( '\\u2028' )
            // ECMAScript3Ext.g:889:4: '\\u2028'
            this.match('\u2028'); 



        }
        finally {
        }
    },
    // $ANTLR end "LS",

    // $ANTLR start PS
    mPS: function()  {
        try {
            // ECMAScript3Ext.g:893:2: ( '\\u2029' )
            // ECMAScript3Ext.g:893:4: '\\u2029'
            this.match('\u2029'); 



        }
        finally {
        }
    },
    // $ANTLR end "PS",

    // $ANTLR start LineTerminator
    mLineTerminator: function()  {
        try {
            // ECMAScript3Ext.g:897:2: ( CR | LF | LS | PS )
            // ECMAScript3Ext.g:
            if ( this.input.LA(1)=='\n'||this.input.LA(1)=='\r'||(this.input.LA(1)>='\u2028' && this.input.LA(1)<='\u2029') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "LineTerminator",

    // $ANTLR start EOL
    mEOL: function()  {
        try {
            var _type = this.EOL;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:901:2: ( ( ( CR ( LF )? ) | LF | LS | PS ) )
            // ECMAScript3Ext.g:901:4: ( ( CR ( LF )? ) | LF | LS | PS )
            // ECMAScript3Ext.g:901:4: ( ( CR ( LF )? ) | LF | LS | PS )
            var alt3=4;
            switch ( this.input.LA(1) ) {
            case '\r':
                alt3=1;
                break;
            case '\n':
                alt3=2;
                break;
            case '\u2028':
                alt3=3;
                break;
            case '\u2029':
                alt3=4;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 3, 0, this.input);

                throw nvae;
            }

            switch (alt3) {
                case 1 :
                    // ECMAScript3Ext.g:901:6: ( CR ( LF )? )
                    // ECMAScript3Ext.g:901:6: ( CR ( LF )? )
                    // ECMAScript3Ext.g:901:8: CR ( LF )?
                    this.mCR(); 
                    // ECMAScript3Ext.g:901:11: ( LF )?
                    var alt2=2;
                    var LA2_0 = this.input.LA(1);

                    if ( (LA2_0=='\n') ) {
                        alt2=1;
                    }
                    switch (alt2) {
                        case 1 :
                            // ECMAScript3Ext.g:901:11: LF
                            this.mLF(); 


                            break;

                    }






                    break;
                case 2 :
                    // ECMAScript3Ext.g:901:19: LF
                    this.mLF(); 


                    break;
                case 3 :
                    // ECMAScript3Ext.g:901:24: LS
                    this.mLS(); 


                    break;
                case 4 :
                    // ECMAScript3Ext.g:901:29: PS
                    this.mPS(); 


                    break;

            }

             _channel = HIDDEN; 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "EOL",

    // $ANTLR start MultiLineComment
    mMultiLineComment: function()  {
        try {
            var _type = this.MultiLineComment;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:908:2: ( '/*' ( options {greedy=false; } : . )* '*/' )
            // ECMAScript3Ext.g:908:4: '/*' ( options {greedy=false; } : . )* '*/'
            this.match("/*"); 

            // ECMAScript3Ext.g:908:9: ( options {greedy=false; } : . )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0=='*') ) {
                    var LA4_1 = this.input.LA(2);

                    if ( (LA4_1=='/') ) {
                        alt4=2;
                    }
                    else if ( ((LA4_1>='\u0000' && LA4_1<='.')||(LA4_1>='0' && LA4_1<='\uFFFF')) ) {
                        alt4=1;
                    }


                }
                else if ( ((LA4_0>='\u0000' && LA4_0<=')')||(LA4_0>='+' && LA4_0<='\uFFFF')) ) {
                    alt4=1;
                }


                switch (alt4) {
                case 1 :
                    // ECMAScript3Ext.g:908:41: .
                    this.matchAny(); 


                    break;

                default :
                    break loop4;
                }
            } while (true);

            this.match("*/"); 

             _channel = HIDDEN; 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "MultiLineComment",

    // $ANTLR start SingleLineComment
    mSingleLineComment: function()  {
        try {
            var _type = this.SingleLineComment;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:912:2: ( '//' (~ ( LineTerminator ) )* )
            // ECMAScript3Ext.g:912:4: '//' (~ ( LineTerminator ) )*
            this.match("//"); 

            // ECMAScript3Ext.g:912:9: (~ ( LineTerminator ) )*
            loop5:
            do {
                var alt5=2;
                var LA5_0 = this.input.LA(1);

                if ( ((LA5_0>='\u0000' && LA5_0<='\t')||(LA5_0>='\u000B' && LA5_0<='\f')||(LA5_0>='\u000E' && LA5_0<='\u2027')||(LA5_0>='\u202A' && LA5_0<='\uFFFF')) ) {
                    alt5=1;
                }


                switch (alt5) {
                case 1 :
                    // ECMAScript3Ext.g:912:11: ~ ( LineTerminator )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

                default :
                    break loop5;
                }
            } while (true);

             _channel = HIDDEN; 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "SingleLineComment",

    // $ANTLR start IdentifierStartASCII
    mIdentifierStartASCII: function()  {
        try {
            // ECMAScript3Ext.g:1013:2: ( 'a' .. 'z' | 'A' .. 'Z' | '$' | '_' | BSLASH 'u' HexDigit HexDigit HexDigit HexDigit )
            var alt6=5;
            switch ( this.input.LA(1) ) {
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
            case 'l':
            case 'm':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'r':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                alt6=1;
                break;
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
                alt6=2;
                break;
            case '$':
                alt6=3;
                break;
            case '_':
                alt6=4;
                break;
            case '\\':
                alt6=5;
                break;
            default:
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 6, 0, this.input);

                throw nvae;
            }

            switch (alt6) {
                case 1 :
                    // ECMAScript3Ext.g:1013:4: 'a' .. 'z'
                    this.matchRange('a','z'); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1013:15: 'A' .. 'Z'
                    this.matchRange('A','Z'); 


                    break;
                case 3 :
                    // ECMAScript3Ext.g:1014:4: '$'
                    this.match('$'); 


                    break;
                case 4 :
                    // ECMAScript3Ext.g:1015:4: '_'
                    this.match('_'); 


                    break;
                case 5 :
                    // ECMAScript3Ext.g:1016:4: BSLASH 'u' HexDigit HexDigit HexDigit HexDigit
                    this.mBSLASH(); 
                    this.match('u'); 
                    this.mHexDigit(); 
                    this.mHexDigit(); 
                    this.mHexDigit(); 
                    this.mHexDigit(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "IdentifierStartASCII",

    // $ANTLR start IdentifierPart
    mIdentifierPart: function()  {
        try {
            // ECMAScript3Ext.g:1024:2: ( DecimalDigit | IdentifierStartASCII | {...}?)
            var alt7=3;
            switch ( this.input.LA(1) ) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                alt7=1;
                break;
            case '$':
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
            case '\\':
            case '_':
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
            case 'l':
            case 'm':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'r':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                alt7=2;
                break;
            default:
                alt7=3;}

            switch (alt7) {
                case 1 :
                    // ECMAScript3Ext.g:1024:4: DecimalDigit
                    this.mDecimalDigit(); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1025:4: IdentifierStartASCII
                    this.mIdentifierStartASCII(); 


                    break;
                case 3 :
                    // ECMAScript3Ext.g:1026:4: {...}?
                    if ( !(( this.isIdentifierPartUnicode(this.input.LA(1)) )) ) {
                        throw new org.antlr.runtime.FailedPredicateException(this.input, "IdentifierPart", " this.isIdentifierPartUnicode(this.input.LA(1)) ");
                    }
                     this.matchAny(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "IdentifierPart",

    // $ANTLR start IdentifierNameASCIIStart
    mIdentifierNameASCIIStart: function()  {
        try {
            // ECMAScript3Ext.g:1030:2: ( IdentifierStartASCII ( IdentifierPart )* )
            // ECMAScript3Ext.g:1030:4: IdentifierStartASCII ( IdentifierPart )*
            this.mIdentifierStartASCII(); 
            // ECMAScript3Ext.g:1030:25: ( IdentifierPart )*
            loop8:
            do {
                var alt8=2;
                var LA8_0 = this.input.LA(1);

                if ( (LA8_0=='$'||(LA8_0>='0' && LA8_0<='9')||(LA8_0>='A' && LA8_0<='Z')||LA8_0=='\\'||LA8_0=='_'||(LA8_0>='a' && LA8_0<='z')) ) {
                    alt8=1;
                }
                else if ( (( this.isIdentifierPartUnicode(this.input.LA(1)) )) ) {
                    alt8=1;
                }


                switch (alt8) {
                case 1 :
                    // ECMAScript3Ext.g:1030:25: IdentifierPart
                    this.mIdentifierPart(); 


                    break;

                default :
                    break loop8;
                }
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end "IdentifierNameASCIIStart",

    // $ANTLR start Identifier
    mIdentifier: function()  {
        try {
            var _type = this.Identifier;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1042:2: ( IdentifierNameASCIIStart | )
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0=='$'||(LA9_0>='A' && LA9_0<='Z')||LA9_0=='\\'||LA9_0=='_'||(LA9_0>='a' && LA9_0<='z')) ) {
                alt9=1;
            }
            else {
                alt9=2;}
            switch (alt9) {
                case 1 :
                    // ECMAScript3Ext.g:1042:4: IdentifierNameASCIIStart
                    this.mIdentifierNameASCIIStart(); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1043:4: 
                     this.consumeIdentifierUnicodeStart(); 


                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "Identifier",

    // $ANTLR start DecimalDigit
    mDecimalDigit: function()  {
        try {
            // ECMAScript3Ext.g:1128:2: ( '0' .. '9' )
            // ECMAScript3Ext.g:1128:4: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end "DecimalDigit",

    // $ANTLR start HexDigit
    mHexDigit: function()  {
        try {
            // ECMAScript3Ext.g:1132:2: ( DecimalDigit | 'a' .. 'f' | 'A' .. 'F' )
            // ECMAScript3Ext.g:
            if ( (this.input.LA(1)>='0' && this.input.LA(1)<='9')||(this.input.LA(1)>='A' && this.input.LA(1)<='F')||(this.input.LA(1)>='a' && this.input.LA(1)<='f') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "HexDigit",

    // $ANTLR start OctalDigit
    mOctalDigit: function()  {
        try {
            // ECMAScript3Ext.g:1136:2: ( '0' .. '7' )
            // ECMAScript3Ext.g:1136:4: '0' .. '7'
            this.matchRange('0','7'); 



        }
        finally {
        }
    },
    // $ANTLR end "OctalDigit",

    // $ANTLR start BinaryDigit
    mBinaryDigit: function()  {
        try {
            // ECMAScript3Ext.g:1140:2: ( '0' | '1' )
            // ECMAScript3Ext.g:
            if ( (this.input.LA(1)>='0' && this.input.LA(1)<='1') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "BinaryDigit",

    // $ANTLR start ExponentPart
    mExponentPart: function()  {
        try {
            // ECMAScript3Ext.g:1144:2: ( ( 'e' | 'E' ) ( '+' | '-' )? ( DecimalDigit )+ )
            // ECMAScript3Ext.g:1144:4: ( 'e' | 'E' ) ( '+' | '-' )? ( DecimalDigit )+
            if ( this.input.LA(1)=='E'||this.input.LA(1)=='e' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}

            // ECMAScript3Ext.g:1144:18: ( '+' | '-' )?
            var alt10=2;
            var LA10_0 = this.input.LA(1);

            if ( (LA10_0=='+'||LA10_0=='-') ) {
                alt10=1;
            }
            switch (alt10) {
                case 1 :
                    // ECMAScript3Ext.g:
                    if ( this.input.LA(1)=='+'||this.input.LA(1)=='-' ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

            }

            // ECMAScript3Ext.g:1144:33: ( DecimalDigit )+
            var cnt11=0;
            loop11:
            do {
                var alt11=2;
                var LA11_0 = this.input.LA(1);

                if ( ((LA11_0>='0' && LA11_0<='9')) ) {
                    alt11=1;
                }


                switch (alt11) {
                case 1 :
                    // ECMAScript3Ext.g:1144:33: DecimalDigit
                    this.mDecimalDigit(); 


                    break;

                default :
                    if ( cnt11 >= 1 ) {
                        break loop11;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(11, this.input);
                        throw eee;
                }
                cnt11++;
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end "ExponentPart",

    // $ANTLR start DecimalIntegerLiteralWithoutLeadingZero
    mDecimalIntegerLiteralWithoutLeadingZero: function()  {
        try {
            // ECMAScript3Ext.g:1148:2: ( '0' | '1' .. '9' ( DecimalDigit )* )
            var alt13=2;
            var LA13_0 = this.input.LA(1);

            if ( (LA13_0=='0') ) {
                alt13=1;
            }
            else if ( ((LA13_0>='1' && LA13_0<='9')) ) {
                alt13=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 13, 0, this.input);

                throw nvae;
            }
            switch (alt13) {
                case 1 :
                    // ECMAScript3Ext.g:1148:4: '0'
                    this.match('0'); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1149:4: '1' .. '9' ( DecimalDigit )*
                    this.matchRange('1','9'); 
                    // ECMAScript3Ext.g:1149:13: ( DecimalDigit )*
                    loop12:
                    do {
                        var alt12=2;
                        var LA12_0 = this.input.LA(1);

                        if ( ((LA12_0>='0' && LA12_0<='9')) ) {
                            alt12=1;
                        }


                        switch (alt12) {
                        case 1 :
                            // ECMAScript3Ext.g:1149:13: DecimalDigit
                            this.mDecimalDigit(); 


                            break;

                        default :
                            break loop12;
                        }
                    } while (true);



                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "DecimalIntegerLiteralWithoutLeadingZero",

    // $ANTLR start DecimalIntegerLiteral
    mDecimalIntegerLiteral: function()  {
        try {
            // ECMAScript3Ext.g:1153:2: ( ( DecimalDigit )+ )
            // ECMAScript3Ext.g:1153:4: ( DecimalDigit )+
            // ECMAScript3Ext.g:1153:4: ( DecimalDigit )+
            var cnt14=0;
            loop14:
            do {
                var alt14=2;
                var LA14_0 = this.input.LA(1);

                if ( ((LA14_0>='0' && LA14_0<='9')) ) {
                    alt14=1;
                }


                switch (alt14) {
                case 1 :
                    // ECMAScript3Ext.g:1153:4: DecimalDigit
                    this.mDecimalDigit(); 


                    break;

                default :
                    if ( cnt14 >= 1 ) {
                        break loop14;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(14, this.input);
                        throw eee;
                }
                cnt14++;
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end "DecimalIntegerLiteral",

    // $ANTLR start DecimalLiteral
    mDecimalLiteral: function()  {
        try {
            var _type = this.DecimalLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1157:2: ( DecimalIntegerLiteral '.' ( DecimalDigit )* ( ExponentPart )? | '.' ( DecimalDigit )+ ( ExponentPart )? | DecimalIntegerLiteral ( ExponentPart )? )
            var alt20=3;
            alt20 = this.dfa20.predict(this.input);
            switch (alt20) {
                case 1 :
                    // ECMAScript3Ext.g:1157:4: DecimalIntegerLiteral '.' ( DecimalDigit )* ( ExponentPart )?
                    this.mDecimalIntegerLiteral(); 
                    this.match('.'); 
                    // ECMAScript3Ext.g:1157:30: ( DecimalDigit )*
                    loop15:
                    do {
                        var alt15=2;
                        var LA15_0 = this.input.LA(1);

                        if ( ((LA15_0>='0' && LA15_0<='9')) ) {
                            alt15=1;
                        }


                        switch (alt15) {
                        case 1 :
                            // ECMAScript3Ext.g:1157:30: DecimalDigit
                            this.mDecimalDigit(); 


                            break;

                        default :
                            break loop15;
                        }
                    } while (true);

                    // ECMAScript3Ext.g:1157:44: ( ExponentPart )?
                    var alt16=2;
                    var LA16_0 = this.input.LA(1);

                    if ( (LA16_0=='E'||LA16_0=='e') ) {
                        alt16=1;
                    }
                    switch (alt16) {
                        case 1 :
                            // ECMAScript3Ext.g:1157:44: ExponentPart
                            this.mExponentPart(); 


                            break;

                    }



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1158:4: '.' ( DecimalDigit )+ ( ExponentPart )?
                    this.match('.'); 
                    // ECMAScript3Ext.g:1158:8: ( DecimalDigit )+
                    var cnt17=0;
                    loop17:
                    do {
                        var alt17=2;
                        var LA17_0 = this.input.LA(1);

                        if ( ((LA17_0>='0' && LA17_0<='9')) ) {
                            alt17=1;
                        }


                        switch (alt17) {
                        case 1 :
                            // ECMAScript3Ext.g:1158:8: DecimalDigit
                            this.mDecimalDigit(); 


                            break;

                        default :
                            if ( cnt17 >= 1 ) {
                                break loop17;
                            }
                                var eee = new org.antlr.runtime.EarlyExitException(17, this.input);
                                throw eee;
                        }
                        cnt17++;
                    } while (true);

                    // ECMAScript3Ext.g:1158:22: ( ExponentPart )?
                    var alt18=2;
                    var LA18_0 = this.input.LA(1);

                    if ( (LA18_0=='E'||LA18_0=='e') ) {
                        alt18=1;
                    }
                    switch (alt18) {
                        case 1 :
                            // ECMAScript3Ext.g:1158:22: ExponentPart
                            this.mExponentPart(); 


                            break;

                    }



                    break;
                case 3 :
                    // ECMAScript3Ext.g:1159:4: DecimalIntegerLiteral ( ExponentPart )?
                    this.mDecimalIntegerLiteral(); 
                    // ECMAScript3Ext.g:1159:26: ( ExponentPart )?
                    var alt19=2;
                    var LA19_0 = this.input.LA(1);

                    if ( (LA19_0=='E'||LA19_0=='e') ) {
                        alt19=1;
                    }
                    switch (alt19) {
                        case 1 :
                            // ECMAScript3Ext.g:1159:26: ExponentPart
                            this.mExponentPart(); 


                            break;

                    }



                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DecimalLiteral",

    // $ANTLR start OctalIntegerLiteral
    mOctalIntegerLiteral: function()  {
        try {
            var _type = this.OctalIntegerLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1163:2: ( ( '0o' | '0O' ) ( OctalDigit )+ )
            // ECMAScript3Ext.g:1163:4: ( '0o' | '0O' ) ( OctalDigit )+
            // ECMAScript3Ext.g:1163:4: ( '0o' | '0O' )
            var alt21=2;
            var LA21_0 = this.input.LA(1);

            if ( (LA21_0=='0') ) {
                var LA21_1 = this.input.LA(2);

                if ( (LA21_1=='o') ) {
                    alt21=1;
                }
                else if ( (LA21_1=='O') ) {
                    alt21=2;
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 21, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 21, 0, this.input);

                throw nvae;
            }
            switch (alt21) {
                case 1 :
                    // ECMAScript3Ext.g:1163:6: '0o'
                    this.match("0o"); 



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1163:13: '0O'
                    this.match("0O"); 



                    break;

            }

            // ECMAScript3Ext.g:1163:20: ( OctalDigit )+
            var cnt22=0;
            loop22:
            do {
                var alt22=2;
                var LA22_0 = this.input.LA(1);

                if ( ((LA22_0>='0' && LA22_0<='7')) ) {
                    alt22=1;
                }


                switch (alt22) {
                case 1 :
                    // ECMAScript3Ext.g:1163:20: OctalDigit
                    this.mOctalDigit(); 


                    break;

                default :
                    if ( cnt22 >= 1 ) {
                        break loop22;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(22, this.input);
                        throw eee;
                }
                cnt22++;
            } while (true);




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "OctalIntegerLiteral",

    // $ANTLR start BinaryIntegerLiteral
    mBinaryIntegerLiteral: function()  {
        try {
            var _type = this.BinaryIntegerLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1167:2: ( ( '0b' | '0B' ) ( BinaryDigit )+ )
            // ECMAScript3Ext.g:1167:4: ( '0b' | '0B' ) ( BinaryDigit )+
            // ECMAScript3Ext.g:1167:4: ( '0b' | '0B' )
            var alt23=2;
            var LA23_0 = this.input.LA(1);

            if ( (LA23_0=='0') ) {
                var LA23_1 = this.input.LA(2);

                if ( (LA23_1=='b') ) {
                    alt23=1;
                }
                else if ( (LA23_1=='B') ) {
                    alt23=2;
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 23, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 23, 0, this.input);

                throw nvae;
            }
            switch (alt23) {
                case 1 :
                    // ECMAScript3Ext.g:1167:6: '0b'
                    this.match("0b"); 



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1167:13: '0B'
                    this.match("0B"); 



                    break;

            }

            // ECMAScript3Ext.g:1167:20: ( BinaryDigit )+
            var cnt24=0;
            loop24:
            do {
                var alt24=2;
                var LA24_0 = this.input.LA(1);

                if ( ((LA24_0>='0' && LA24_0<='1')) ) {
                    alt24=1;
                }


                switch (alt24) {
                case 1 :
                    // ECMAScript3Ext.g:1167:20: BinaryDigit
                    this.mBinaryDigit(); 


                    break;

                default :
                    if ( cnt24 >= 1 ) {
                        break loop24;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(24, this.input);
                        throw eee;
                }
                cnt24++;
            } while (true);




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "BinaryIntegerLiteral",

    // $ANTLR start HexIntegerLiteral
    mHexIntegerLiteral: function()  {
        try {
            var _type = this.HexIntegerLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1171:2: ( ( '0x' | '0X' ) ( HexDigit )+ )
            // ECMAScript3Ext.g:1171:4: ( '0x' | '0X' ) ( HexDigit )+
            // ECMAScript3Ext.g:1171:4: ( '0x' | '0X' )
            var alt25=2;
            var LA25_0 = this.input.LA(1);

            if ( (LA25_0=='0') ) {
                var LA25_1 = this.input.LA(2);

                if ( (LA25_1=='x') ) {
                    alt25=1;
                }
                else if ( (LA25_1=='X') ) {
                    alt25=2;
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 25, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 25, 0, this.input);

                throw nvae;
            }
            switch (alt25) {
                case 1 :
                    // ECMAScript3Ext.g:1171:6: '0x'
                    this.match("0x"); 



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1171:13: '0X'
                    this.match("0X"); 



                    break;

            }

            // ECMAScript3Ext.g:1171:20: ( HexDigit )+
            var cnt26=0;
            loop26:
            do {
                var alt26=2;
                var LA26_0 = this.input.LA(1);

                if ( ((LA26_0>='0' && LA26_0<='9')||(LA26_0>='A' && LA26_0<='F')||(LA26_0>='a' && LA26_0<='f')) ) {
                    alt26=1;
                }


                switch (alt26) {
                case 1 :
                    // ECMAScript3Ext.g:1171:20: HexDigit
                    this.mHexDigit(); 


                    break;

                default :
                    if ( cnt26 >= 1 ) {
                        break loop26;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(26, this.input);
                        throw eee;
                }
                cnt26++;
            } while (true);




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "HexIntegerLiteral",

    // $ANTLR start CharacterEscapeSequence
    mCharacterEscapeSequence: function()  {
        try {
            // ECMAScript3Ext.g:1191:2: (~ ( DecimalDigit | 'x' | 'u' | LineTerminator ) )
            // ECMAScript3Ext.g:1191:4: ~ ( DecimalDigit | 'x' | 'u' | LineTerminator )
            if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='/')||(this.input.LA(1)>=':' && this.input.LA(1)<='t')||(this.input.LA(1)>='v' && this.input.LA(1)<='w')||(this.input.LA(1)>='y' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "CharacterEscapeSequence",

    // $ANTLR start ZeroToThree
    mZeroToThree: function()  {
        try {
            // ECMAScript3Ext.g:1195:2: ( '0' .. '3' )
            // ECMAScript3Ext.g:1195:4: '0' .. '3'
            this.matchRange('0','3'); 



        }
        finally {
        }
    },
    // $ANTLR end "ZeroToThree",

    // $ANTLR start OctalEscapeSequence
    mOctalEscapeSequence: function()  {
        try {
            // ECMAScript3Ext.g:1199:2: ( OctalDigit | ZeroToThree OctalDigit | '4' .. '7' OctalDigit | ZeroToThree OctalDigit OctalDigit )
            var alt27=4;
            var LA27_0 = this.input.LA(1);

            if ( ((LA27_0>='0' && LA27_0<='3')) ) {
                var LA27_1 = this.input.LA(2);

                if ( ((LA27_1>='0' && LA27_1<='7')) ) {
                    var LA27_4 = this.input.LA(3);

                    if ( ((LA27_4>='0' && LA27_4<='7')) ) {
                        alt27=4;
                    }
                    else {
                        alt27=2;}
                }
                else {
                    alt27=1;}
            }
            else if ( ((LA27_0>='4' && LA27_0<='7')) ) {
                var LA27_2 = this.input.LA(2);

                if ( ((LA27_2>='0' && LA27_2<='7')) ) {
                    alt27=3;
                }
                else {
                    alt27=1;}
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 27, 0, this.input);

                throw nvae;
            }
            switch (alt27) {
                case 1 :
                    // ECMAScript3Ext.g:1199:4: OctalDigit
                    this.mOctalDigit(); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1200:4: ZeroToThree OctalDigit
                    this.mZeroToThree(); 
                    this.mOctalDigit(); 


                    break;
                case 3 :
                    // ECMAScript3Ext.g:1201:4: '4' .. '7' OctalDigit
                    this.matchRange('4','7'); 
                    this.mOctalDigit(); 


                    break;
                case 4 :
                    // ECMAScript3Ext.g:1202:4: ZeroToThree OctalDigit OctalDigit
                    this.mZeroToThree(); 
                    this.mOctalDigit(); 
                    this.mOctalDigit(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "OctalEscapeSequence",

    // $ANTLR start HexEscapeSequence
    mHexEscapeSequence: function()  {
        try {
            // ECMAScript3Ext.g:1206:2: ( 'x' HexDigit HexDigit )
            // ECMAScript3Ext.g:1206:4: 'x' HexDigit HexDigit
            this.match('x'); 
            this.mHexDigit(); 
            this.mHexDigit(); 



        }
        finally {
        }
    },
    // $ANTLR end "HexEscapeSequence",

    // $ANTLR start UnicodeEscapeSequence
    mUnicodeEscapeSequence: function()  {
        try {
            // ECMAScript3Ext.g:1210:2: ( 'u' HexDigit HexDigit HexDigit HexDigit )
            // ECMAScript3Ext.g:1210:4: 'u' HexDigit HexDigit HexDigit HexDigit
            this.match('u'); 
            this.mHexDigit(); 
            this.mHexDigit(); 
            this.mHexDigit(); 
            this.mHexDigit(); 



        }
        finally {
        }
    },
    // $ANTLR end "UnicodeEscapeSequence",

    // $ANTLR start EscapeSequence
    mEscapeSequence: function()  {
        try {
            // ECMAScript3Ext.g:1214:2: ( BSLASH ( CharacterEscapeSequence | OctalEscapeSequence | HexEscapeSequence | UnicodeEscapeSequence ) )
            // ECMAScript3Ext.g:1215:2: BSLASH ( CharacterEscapeSequence | OctalEscapeSequence | HexEscapeSequence | UnicodeEscapeSequence )
            this.mBSLASH(); 
            // ECMAScript3Ext.g:1216:2: ( CharacterEscapeSequence | OctalEscapeSequence | HexEscapeSequence | UnicodeEscapeSequence )
            var alt28=4;
            var LA28_0 = this.input.LA(1);

            if ( ((LA28_0>='\u0000' && LA28_0<='\t')||(LA28_0>='\u000B' && LA28_0<='\f')||(LA28_0>='\u000E' && LA28_0<='/')||(LA28_0>=':' && LA28_0<='t')||(LA28_0>='v' && LA28_0<='w')||(LA28_0>='y' && LA28_0<='\u2027')||(LA28_0>='\u202A' && LA28_0<='\uFFFF')) ) {
                alt28=1;
            }
            else if ( ((LA28_0>='0' && LA28_0<='7')) ) {
                alt28=2;
            }
            else if ( (LA28_0=='x') ) {
                alt28=3;
            }
            else if ( (LA28_0=='u') ) {
                alt28=4;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 28, 0, this.input);

                throw nvae;
            }
            switch (alt28) {
                case 1 :
                    // ECMAScript3Ext.g:1217:3: CharacterEscapeSequence
                    this.mCharacterEscapeSequence(); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1218:5: OctalEscapeSequence
                    this.mOctalEscapeSequence(); 


                    break;
                case 3 :
                    // ECMAScript3Ext.g:1219:5: HexEscapeSequence
                    this.mHexEscapeSequence(); 


                    break;
                case 4 :
                    // ECMAScript3Ext.g:1220:5: UnicodeEscapeSequence
                    this.mUnicodeEscapeSequence(); 


                    break;

            }




        }
        finally {
        }
    },
    // $ANTLR end "EscapeSequence",

    // $ANTLR start StringLiteral
    mStringLiteral: function()  {
        try {
            var _type = this.StringLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1225:2: ( SQUOTE (~ ( SQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* SQUOTE | DQUOTE (~ ( DQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* DQUOTE )
            var alt31=2;
            var LA31_0 = this.input.LA(1);

            if ( (LA31_0=='\'') ) {
                alt31=1;
            }
            else if ( (LA31_0=='\"') ) {
                alt31=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 31, 0, this.input);

                throw nvae;
            }
            switch (alt31) {
                case 1 :
                    // ECMAScript3Ext.g:1225:4: SQUOTE (~ ( SQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* SQUOTE
                    this.mSQUOTE(); 
                    // ECMAScript3Ext.g:1225:11: (~ ( SQUOTE | BSLASH | LineTerminator ) | EscapeSequence )*
                    loop29:
                    do {
                        var alt29=3;
                        var LA29_0 = this.input.LA(1);

                        if ( ((LA29_0>='\u0000' && LA29_0<='\t')||(LA29_0>='\u000B' && LA29_0<='\f')||(LA29_0>='\u000E' && LA29_0<='&')||(LA29_0>='(' && LA29_0<='[')||(LA29_0>=']' && LA29_0<='\u2027')||(LA29_0>='\u202A' && LA29_0<='\uFFFF')) ) {
                            alt29=1;
                        }
                        else if ( (LA29_0=='\\') ) {
                            alt29=2;
                        }


                        switch (alt29) {
                        case 1 :
                            // ECMAScript3Ext.g:1225:13: ~ ( SQUOTE | BSLASH | LineTerminator )
                            if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='&')||(this.input.LA(1)>='(' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                                this.input.consume();

                            }
                            else {
                                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                                this.recover(mse);
                                throw mse;}



                            break;
                        case 2 :
                            // ECMAScript3Ext.g:1225:53: EscapeSequence
                            this.mEscapeSequence(); 


                            break;

                        default :
                            break loop29;
                        }
                    } while (true);

                    this.mSQUOTE(); 


                    break;
                case 2 :
                    // ECMAScript3Ext.g:1226:4: DQUOTE (~ ( DQUOTE | BSLASH | LineTerminator ) | EscapeSequence )* DQUOTE
                    this.mDQUOTE(); 
                    // ECMAScript3Ext.g:1226:11: (~ ( DQUOTE | BSLASH | LineTerminator ) | EscapeSequence )*
                    loop30:
                    do {
                        var alt30=3;
                        var LA30_0 = this.input.LA(1);

                        if ( ((LA30_0>='\u0000' && LA30_0<='\t')||(LA30_0>='\u000B' && LA30_0<='\f')||(LA30_0>='\u000E' && LA30_0<='!')||(LA30_0>='#' && LA30_0<='[')||(LA30_0>=']' && LA30_0<='\u2027')||(LA30_0>='\u202A' && LA30_0<='\uFFFF')) ) {
                            alt30=1;
                        }
                        else if ( (LA30_0=='\\') ) {
                            alt30=2;
                        }


                        switch (alt30) {
                        case 1 :
                            // ECMAScript3Ext.g:1226:13: ~ ( DQUOTE | BSLASH | LineTerminator )
                            if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                                this.input.consume();

                            }
                            else {
                                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                                this.recover(mse);
                                throw mse;}



                            break;
                        case 2 :
                            // ECMAScript3Ext.g:1226:53: EscapeSequence
                            this.mEscapeSequence(); 


                            break;

                        default :
                            break loop30;
                        }
                    } while (true);

                    this.mDQUOTE(); 


                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "StringLiteral",

    // $ANTLR start BackslashSequence
    mBackslashSequence: function()  {
        try {
            // ECMAScript3Ext.g:1234:2: ( BSLASH ~ ( LineTerminator ) )
            // ECMAScript3Ext.g:1234:4: BSLASH ~ ( LineTerminator )
            this.mBSLASH(); 
            if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "BackslashSequence",

    // $ANTLR start RegularExpressionFirstChar
    mRegularExpressionFirstChar: function()  {
        try {
            // ECMAScript3Ext.g:1238:2: (~ ( LineTerminator | MUL | BSLASH | DIV ) | BackslashSequence )
            var alt32=2;
            var LA32_0 = this.input.LA(1);

            if ( ((LA32_0>='\u0000' && LA32_0<='\t')||(LA32_0>='\u000B' && LA32_0<='\f')||(LA32_0>='\u000E' && LA32_0<=')')||(LA32_0>='+' && LA32_0<='.')||(LA32_0>='0' && LA32_0<='[')||(LA32_0>=']' && LA32_0<='\u2027')||(LA32_0>='\u202A' && LA32_0<='\uFFFF')) ) {
                alt32=1;
            }
            else if ( (LA32_0=='\\') ) {
                alt32=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 32, 0, this.input);

                throw nvae;
            }
            switch (alt32) {
                case 1 :
                    // ECMAScript3Ext.g:1238:4: ~ ( LineTerminator | MUL | BSLASH | DIV )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<=')')||(this.input.LA(1)>='+' && this.input.LA(1)<='.')||(this.input.LA(1)>='0' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1239:4: BackslashSequence
                    this.mBackslashSequence(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "RegularExpressionFirstChar",

    // $ANTLR start RegularExpressionChar
    mRegularExpressionChar: function()  {
        try {
            // ECMAScript3Ext.g:1243:2: (~ ( LineTerminator | BSLASH | DIV ) | BackslashSequence )
            var alt33=2;
            var LA33_0 = this.input.LA(1);

            if ( ((LA33_0>='\u0000' && LA33_0<='\t')||(LA33_0>='\u000B' && LA33_0<='\f')||(LA33_0>='\u000E' && LA33_0<='.')||(LA33_0>='0' && LA33_0<='[')||(LA33_0>=']' && LA33_0<='\u2027')||(LA33_0>='\u202A' && LA33_0<='\uFFFF')) ) {
                alt33=1;
            }
            else if ( (LA33_0=='\\') ) {
                alt33=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 33, 0, this.input);

                throw nvae;
            }
            switch (alt33) {
                case 1 :
                    // ECMAScript3Ext.g:1243:4: ~ ( LineTerminator | BSLASH | DIV )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='.')||(this.input.LA(1)>='0' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\u2027')||(this.input.LA(1)>='\u202A' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;
                case 2 :
                    // ECMAScript3Ext.g:1244:4: BackslashSequence
                    this.mBackslashSequence(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "RegularExpressionChar",

    // $ANTLR start RegularExpressionLiteral
    mRegularExpressionLiteral: function()  {
        try {
            var _type = this.RegularExpressionLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // ECMAScript3Ext.g:1248:2: ({...}? => DIV RegularExpressionFirstChar ( RegularExpressionChar )* DIV ( IdentifierPart )* )
            // ECMAScript3Ext.g:1248:4: {...}? => DIV RegularExpressionFirstChar ( RegularExpressionChar )* DIV ( IdentifierPart )*
            if ( !(( this.areRegularExpressionsEnabled() )) ) {
                throw new org.antlr.runtime.FailedPredicateException(this.input, "RegularExpressionLiteral", " this.areRegularExpressionsEnabled() ");
            }
            this.mDIV(); 
            this.mRegularExpressionFirstChar(); 
            // ECMAScript3Ext.g:1248:78: ( RegularExpressionChar )*
            loop34:
            do {
                var alt34=2;
                var LA34_0 = this.input.LA(1);

                if ( ((LA34_0>='\u0000' && LA34_0<='\t')||(LA34_0>='\u000B' && LA34_0<='\f')||(LA34_0>='\u000E' && LA34_0<='.')||(LA34_0>='0' && LA34_0<='\u2027')||(LA34_0>='\u202A' && LA34_0<='\uFFFF')) ) {
                    alt34=1;
                }


                switch (alt34) {
                case 1 :
                    // ECMAScript3Ext.g:1248:78: RegularExpressionChar
                    this.mRegularExpressionChar(); 


                    break;

                default :
                    break loop34;
                }
            } while (true);

            this.mDIV(); 
            // ECMAScript3Ext.g:1248:105: ( IdentifierPart )*
            loop35:
            do {
                var alt35=2;
                var LA35_0 = this.input.LA(1);

                if ( (LA35_0=='$'||(LA35_0>='0' && LA35_0<='9')||(LA35_0>='A' && LA35_0<='Z')||LA35_0=='\\'||LA35_0=='_'||(LA35_0>='a' && LA35_0<='z')) ) {
                    alt35=1;
                }
                else if ( (( this.isIdentifierPartUnicode(this.input.LA(1)) )) ) {
                    alt35=1;
                }


                switch (alt35) {
                case 1 :
                    // ECMAScript3Ext.g:1248:105: IdentifierPart
                    this.mIdentifierPart(); 


                    break;

                default :
                    break loop35;
                }
            } while (true);




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "RegularExpressionLiteral",

    mTokens: function() {
        // ECMAScript3Ext.g:1:8: ( NULL | TRUE | FALSE | BREAK | CASE | CATCH | CONTINUE | DEFAULT | DELETE | DO | ELSE | FINALLY | FOR | FUNCTION | IF | IN | INSTANCEOF | NEW | RETURN | SWITCH | THIS | THROW | TRY | TYPEOF | VAR | VOID | WHILE | WITH | ABSTRACT | BOOLEAN | BYTE | CHAR | CLASS | CONST | DEBUGGER | DOUBLE | ENUM | EXPORT | EXTENDS | FINAL | FLOAT | GOTO | IMPLEMENTS | IMPORT | INT | INTERFACE | LONG | NATIVE | PACKAGE | PRIVATE | PROTECTED | PUBLIC | SHORT | STATIC | SUPER | SYNCHRONIZED | THROWS | TRANSIENT | VOLATILE | LBRACE | RBRACE | LPAREN | RPAREN | LBRACK | RBRACK | DOT | SEMIC | COMMA | LT | GT | LTE | GTE | EQ | NEQ | SAME | NSAME | ADD | SUB | MUL | MOD | INC | DEC | SHL | SHR | SHU | AND | OR | NOT | INV | LAND | LOR | QUE | COLON | ASSIGN | ADDASS | SUBASS | MULASS | MODASS | SHLASS | SHRASS | SHUASS | ANDASS | ORASS | DIV | DIVASS | POW | POWASS | CARET | CARETASS | XOR | XORASS | WhiteSpace | EOL | MultiLineComment | SingleLineComment | Identifier | DecimalLiteral | OctalIntegerLiteral | BinaryIntegerLiteral | HexIntegerLiteral | StringLiteral | RegularExpressionLiteral )
        var alt36=122;
        alt36 = this.dfa36.predict(this.input);
        switch (alt36) {
            case 1 :
                // ECMAScript3Ext.g:1:10: NULL
                this.mNULL(); 


                break;
            case 2 :
                // ECMAScript3Ext.g:1:15: TRUE
                this.mTRUE(); 


                break;
            case 3 :
                // ECMAScript3Ext.g:1:20: FALSE
                this.mFALSE(); 


                break;
            case 4 :
                // ECMAScript3Ext.g:1:26: BREAK
                this.mBREAK(); 


                break;
            case 5 :
                // ECMAScript3Ext.g:1:32: CASE
                this.mCASE(); 


                break;
            case 6 :
                // ECMAScript3Ext.g:1:37: CATCH
                this.mCATCH(); 


                break;
            case 7 :
                // ECMAScript3Ext.g:1:43: CONTINUE
                this.mCONTINUE(); 


                break;
            case 8 :
                // ECMAScript3Ext.g:1:52: DEFAULT
                this.mDEFAULT(); 


                break;
            case 9 :
                // ECMAScript3Ext.g:1:60: DELETE
                this.mDELETE(); 


                break;
            case 10 :
                // ECMAScript3Ext.g:1:67: DO
                this.mDO(); 


                break;
            case 11 :
                // ECMAScript3Ext.g:1:70: ELSE
                this.mELSE(); 


                break;
            case 12 :
                // ECMAScript3Ext.g:1:75: FINALLY
                this.mFINALLY(); 


                break;
            case 13 :
                // ECMAScript3Ext.g:1:83: FOR
                this.mFOR(); 


                break;
            case 14 :
                // ECMAScript3Ext.g:1:87: FUNCTION
                this.mFUNCTION(); 


                break;
            case 15 :
                // ECMAScript3Ext.g:1:96: IF
                this.mIF(); 


                break;
            case 16 :
                // ECMAScript3Ext.g:1:99: IN
                this.mIN(); 


                break;
            case 17 :
                // ECMAScript3Ext.g:1:102: INSTANCEOF
                this.mINSTANCEOF(); 


                break;
            case 18 :
                // ECMAScript3Ext.g:1:113: NEW
                this.mNEW(); 


                break;
            case 19 :
                // ECMAScript3Ext.g:1:117: RETURN
                this.mRETURN(); 


                break;
            case 20 :
                // ECMAScript3Ext.g:1:124: SWITCH
                this.mSWITCH(); 


                break;
            case 21 :
                // ECMAScript3Ext.g:1:131: THIS
                this.mTHIS(); 


                break;
            case 22 :
                // ECMAScript3Ext.g:1:136: THROW
                this.mTHROW(); 


                break;
            case 23 :
                // ECMAScript3Ext.g:1:142: TRY
                this.mTRY(); 


                break;
            case 24 :
                // ECMAScript3Ext.g:1:146: TYPEOF
                this.mTYPEOF(); 


                break;
            case 25 :
                // ECMAScript3Ext.g:1:153: VAR
                this.mVAR(); 


                break;
            case 26 :
                // ECMAScript3Ext.g:1:157: VOID
                this.mVOID(); 


                break;
            case 27 :
                // ECMAScript3Ext.g:1:162: WHILE
                this.mWHILE(); 


                break;
            case 28 :
                // ECMAScript3Ext.g:1:168: WITH
                this.mWITH(); 


                break;
            case 29 :
                // ECMAScript3Ext.g:1:173: ABSTRACT
                this.mABSTRACT(); 


                break;
            case 30 :
                // ECMAScript3Ext.g:1:182: BOOLEAN
                this.mBOOLEAN(); 


                break;
            case 31 :
                // ECMAScript3Ext.g:1:190: BYTE
                this.mBYTE(); 


                break;
            case 32 :
                // ECMAScript3Ext.g:1:195: CHAR
                this.mCHAR(); 


                break;
            case 33 :
                // ECMAScript3Ext.g:1:200: CLASS
                this.mCLASS(); 


                break;
            case 34 :
                // ECMAScript3Ext.g:1:206: CONST
                this.mCONST(); 


                break;
            case 35 :
                // ECMAScript3Ext.g:1:212: DEBUGGER
                this.mDEBUGGER(); 


                break;
            case 36 :
                // ECMAScript3Ext.g:1:221: DOUBLE
                this.mDOUBLE(); 


                break;
            case 37 :
                // ECMAScript3Ext.g:1:228: ENUM
                this.mENUM(); 


                break;
            case 38 :
                // ECMAScript3Ext.g:1:233: EXPORT
                this.mEXPORT(); 


                break;
            case 39 :
                // ECMAScript3Ext.g:1:240: EXTENDS
                this.mEXTENDS(); 


                break;
            case 40 :
                // ECMAScript3Ext.g:1:248: FINAL
                this.mFINAL(); 


                break;
            case 41 :
                // ECMAScript3Ext.g:1:254: FLOAT
                this.mFLOAT(); 


                break;
            case 42 :
                // ECMAScript3Ext.g:1:260: GOTO
                this.mGOTO(); 


                break;
            case 43 :
                // ECMAScript3Ext.g:1:265: IMPLEMENTS
                this.mIMPLEMENTS(); 


                break;
            case 44 :
                // ECMAScript3Ext.g:1:276: IMPORT
                this.mIMPORT(); 


                break;
            case 45 :
                // ECMAScript3Ext.g:1:283: INT
                this.mINT(); 


                break;
            case 46 :
                // ECMAScript3Ext.g:1:287: INTERFACE
                this.mINTERFACE(); 


                break;
            case 47 :
                // ECMAScript3Ext.g:1:297: LONG
                this.mLONG(); 


                break;
            case 48 :
                // ECMAScript3Ext.g:1:302: NATIVE
                this.mNATIVE(); 


                break;
            case 49 :
                // ECMAScript3Ext.g:1:309: PACKAGE
                this.mPACKAGE(); 


                break;
            case 50 :
                // ECMAScript3Ext.g:1:317: PRIVATE
                this.mPRIVATE(); 


                break;
            case 51 :
                // ECMAScript3Ext.g:1:325: PROTECTED
                this.mPROTECTED(); 


                break;
            case 52 :
                // ECMAScript3Ext.g:1:335: PUBLIC
                this.mPUBLIC(); 


                break;
            case 53 :
                // ECMAScript3Ext.g:1:342: SHORT
                this.mSHORT(); 


                break;
            case 54 :
                // ECMAScript3Ext.g:1:348: STATIC
                this.mSTATIC(); 


                break;
            case 55 :
                // ECMAScript3Ext.g:1:355: SUPER
                this.mSUPER(); 


                break;
            case 56 :
                // ECMAScript3Ext.g:1:361: SYNCHRONIZED
                this.mSYNCHRONIZED(); 


                break;
            case 57 :
                // ECMAScript3Ext.g:1:374: THROWS
                this.mTHROWS(); 


                break;
            case 58 :
                // ECMAScript3Ext.g:1:381: TRANSIENT
                this.mTRANSIENT(); 


                break;
            case 59 :
                // ECMAScript3Ext.g:1:391: VOLATILE
                this.mVOLATILE(); 


                break;
            case 60 :
                // ECMAScript3Ext.g:1:400: LBRACE
                this.mLBRACE(); 


                break;
            case 61 :
                // ECMAScript3Ext.g:1:407: RBRACE
                this.mRBRACE(); 


                break;
            case 62 :
                // ECMAScript3Ext.g:1:414: LPAREN
                this.mLPAREN(); 


                break;
            case 63 :
                // ECMAScript3Ext.g:1:421: RPAREN
                this.mRPAREN(); 


                break;
            case 64 :
                // ECMAScript3Ext.g:1:428: LBRACK
                this.mLBRACK(); 


                break;
            case 65 :
                // ECMAScript3Ext.g:1:435: RBRACK
                this.mRBRACK(); 


                break;
            case 66 :
                // ECMAScript3Ext.g:1:442: DOT
                this.mDOT(); 


                break;
            case 67 :
                // ECMAScript3Ext.g:1:446: SEMIC
                this.mSEMIC(); 


                break;
            case 68 :
                // ECMAScript3Ext.g:1:452: COMMA
                this.mCOMMA(); 


                break;
            case 69 :
                // ECMAScript3Ext.g:1:458: LT
                this.mLT(); 


                break;
            case 70 :
                // ECMAScript3Ext.g:1:461: GT
                this.mGT(); 


                break;
            case 71 :
                // ECMAScript3Ext.g:1:464: LTE
                this.mLTE(); 


                break;
            case 72 :
                // ECMAScript3Ext.g:1:468: GTE
                this.mGTE(); 


                break;
            case 73 :
                // ECMAScript3Ext.g:1:472: EQ
                this.mEQ(); 


                break;
            case 74 :
                // ECMAScript3Ext.g:1:475: NEQ
                this.mNEQ(); 


                break;
            case 75 :
                // ECMAScript3Ext.g:1:479: SAME
                this.mSAME(); 


                break;
            case 76 :
                // ECMAScript3Ext.g:1:484: NSAME
                this.mNSAME(); 


                break;
            case 77 :
                // ECMAScript3Ext.g:1:490: ADD
                this.mADD(); 


                break;
            case 78 :
                // ECMAScript3Ext.g:1:494: SUB
                this.mSUB(); 


                break;
            case 79 :
                // ECMAScript3Ext.g:1:498: MUL
                this.mMUL(); 


                break;
            case 80 :
                // ECMAScript3Ext.g:1:502: MOD
                this.mMOD(); 


                break;
            case 81 :
                // ECMAScript3Ext.g:1:506: INC
                this.mINC(); 


                break;
            case 82 :
                // ECMAScript3Ext.g:1:510: DEC
                this.mDEC(); 


                break;
            case 83 :
                // ECMAScript3Ext.g:1:514: SHL
                this.mSHL(); 


                break;
            case 84 :
                // ECMAScript3Ext.g:1:518: SHR
                this.mSHR(); 


                break;
            case 85 :
                // ECMAScript3Ext.g:1:522: SHU
                this.mSHU(); 


                break;
            case 86 :
                // ECMAScript3Ext.g:1:526: AND
                this.mAND(); 


                break;
            case 87 :
                // ECMAScript3Ext.g:1:530: OR
                this.mOR(); 


                break;
            case 88 :
                // ECMAScript3Ext.g:1:533: NOT
                this.mNOT(); 


                break;
            case 89 :
                // ECMAScript3Ext.g:1:537: INV
                this.mINV(); 


                break;
            case 90 :
                // ECMAScript3Ext.g:1:541: LAND
                this.mLAND(); 


                break;
            case 91 :
                // ECMAScript3Ext.g:1:546: LOR
                this.mLOR(); 


                break;
            case 92 :
                // ECMAScript3Ext.g:1:550: QUE
                this.mQUE(); 


                break;
            case 93 :
                // ECMAScript3Ext.g:1:554: COLON
                this.mCOLON(); 


                break;
            case 94 :
                // ECMAScript3Ext.g:1:560: ASSIGN
                this.mASSIGN(); 


                break;
            case 95 :
                // ECMAScript3Ext.g:1:567: ADDASS
                this.mADDASS(); 


                break;
            case 96 :
                // ECMAScript3Ext.g:1:574: SUBASS
                this.mSUBASS(); 


                break;
            case 97 :
                // ECMAScript3Ext.g:1:581: MULASS
                this.mMULASS(); 


                break;
            case 98 :
                // ECMAScript3Ext.g:1:588: MODASS
                this.mMODASS(); 


                break;
            case 99 :
                // ECMAScript3Ext.g:1:595: SHLASS
                this.mSHLASS(); 


                break;
            case 100 :
                // ECMAScript3Ext.g:1:602: SHRASS
                this.mSHRASS(); 


                break;
            case 101 :
                // ECMAScript3Ext.g:1:609: SHUASS
                this.mSHUASS(); 


                break;
            case 102 :
                // ECMAScript3Ext.g:1:616: ANDASS
                this.mANDASS(); 


                break;
            case 103 :
                // ECMAScript3Ext.g:1:623: ORASS
                this.mORASS(); 


                break;
            case 104 :
                // ECMAScript3Ext.g:1:629: DIV
                this.mDIV(); 


                break;
            case 105 :
                // ECMAScript3Ext.g:1:633: DIVASS
                this.mDIVASS(); 


                break;
            case 106 :
                // ECMAScript3Ext.g:1:640: POW
                this.mPOW(); 


                break;
            case 107 :
                // ECMAScript3Ext.g:1:644: POWASS
                this.mPOWASS(); 


                break;
            case 108 :
                // ECMAScript3Ext.g:1:651: CARET
                this.mCARET(); 


                break;
            case 109 :
                // ECMAScript3Ext.g:1:657: CARETASS
                this.mCARETASS(); 


                break;
            case 110 :
                // ECMAScript3Ext.g:1:666: XOR
                this.mXOR(); 


                break;
            case 111 :
                // ECMAScript3Ext.g:1:670: XORASS
                this.mXORASS(); 


                break;
            case 112 :
                // ECMAScript3Ext.g:1:677: WhiteSpace
                this.mWhiteSpace(); 


                break;
            case 113 :
                // ECMAScript3Ext.g:1:688: EOL
                this.mEOL(); 


                break;
            case 114 :
                // ECMAScript3Ext.g:1:692: MultiLineComment
                this.mMultiLineComment(); 


                break;
            case 115 :
                // ECMAScript3Ext.g:1:709: SingleLineComment
                this.mSingleLineComment(); 


                break;
            case 116 :
                // ECMAScript3Ext.g:1:727: Identifier
                this.mIdentifier(); 


                break;
            case 117 :
                // ECMAScript3Ext.g:1:738: DecimalLiteral
                this.mDecimalLiteral(); 


                break;
            case 118 :
                // ECMAScript3Ext.g:1:753: OctalIntegerLiteral
                this.mOctalIntegerLiteral(); 


                break;
            case 119 :
                // ECMAScript3Ext.g:1:773: BinaryIntegerLiteral
                this.mBinaryIntegerLiteral(); 


                break;
            case 120 :
                // ECMAScript3Ext.g:1:794: HexIntegerLiteral
                this.mHexIntegerLiteral(); 


                break;
            case 121 :
                // ECMAScript3Ext.g:1:812: StringLiteral
                this.mStringLiteral(); 


                break;
            case 122 :
                // ECMAScript3Ext.g:1:826: RegularExpressionLiteral
                this.mRegularExpressionLiteral(); 


                break;

        }

    }

}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(ECMAScript3ExtLexer, {
    DFA20_eotS:
        "\u0001\uffff\u0001\u0003\u0003\uffff",
    DFA20_eofS:
        "\u0005\uffff",
    DFA20_minS:
        "\u0002\u002e\u0003\uffff",
    DFA20_maxS:
        "\u0002\u0039\u0003\uffff",
    DFA20_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0003\u0001\u0001",
    DFA20_specialS:
        "\u0005\uffff}>",
    DFA20_transitionS: [
            "\u0001\u0002\u0001\uffff\u000a\u0001",
            "\u0001\u0004\u0001\uffff\u000a\u0001",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(ECMAScript3ExtLexer, {
    DFA20_eot:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA20_eotS),
    DFA20_eof:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA20_eofS),
    DFA20_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtLexer.DFA20_minS),
    DFA20_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtLexer.DFA20_maxS),
    DFA20_accept:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA20_acceptS),
    DFA20_special:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA20_specialS),
    DFA20_transition: (function() {
        var a = [],
            i,
            numStates = ECMAScript3ExtLexer.DFA20_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA20_transitionS[i]));
        }
        return a;
    })()
});

ECMAScript3ExtLexer.DFA20 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 20;
    this.eot = ECMAScript3ExtLexer.DFA20_eot;
    this.eof = ECMAScript3ExtLexer.DFA20_eof;
    this.min = ECMAScript3ExtLexer.DFA20_min;
    this.max = ECMAScript3ExtLexer.DFA20_max;
    this.accept = ECMAScript3ExtLexer.DFA20_accept;
    this.special = ECMAScript3ExtLexer.DFA20_special;
    this.transition = ECMAScript3ExtLexer.DFA20_transition;
};

org.antlr.lang.extend(ECMAScript3ExtLexer.DFA20, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1156:1: DecimalLiteral : ( DecimalIntegerLiteral '.' ( DecimalDigit )* ( ExponentPart )? | '.' ( DecimalDigit )+ ( ExponentPart )? | DecimalIntegerLiteral ( ExponentPart )? );";
    },
    dummy: null
});
org.antlr.lang.augmentObject(ECMAScript3ExtLexer, {
    DFA36_eotS:
        "\u0011\u002b\u0006\uffff\u0001\u0059\u0002\uffff\u0001\u005c\u0001"+
    "\u0060\u0001\u0062\u0001\u0064\u0001\u0067\u0001\u006a\u0001\u006d\u0001"+
    "\u006f\u0001\u0072\u0001\u0075\u0003\uffff\u0001\u0079\u0001\u007c\u0003"+
    "\uffff\u0001\u002d\u0002\uffff\u0013\u002b\u0001\u009a\u0003\u002b\u0001"+
    "\u009f\u0001\u00a2\u0011\u002b\u0002\uffff\u0001\u00b7\u0002\uffff\u0001"+
    "\u00ba\u0001\u00bc\u0001\uffff\u0001\u00be\u0001\uffff\u0001\u00c0\u0008"+
    "\uffff\u0001\u00c2\u0009\uffff\u0001\u00c3\u0009\uffff\u0001\u002b\u0001"+
    "\u00c5\u0002\u002b\u0001\u00c8\u0006\u002b\u0001\u00cf\u000e\u002b\u0001"+
    "\uffff\u0004\u002b\u0001\uffff\u0001\u002b\u0001\u00e5\u0001\uffff\u0007"+
    "\u002b\u0001\u00ee\u000b\u002b\u0002\uffff\u0001\u00fb\u000b\uffff\u0001"+
    "\u00fc\u0001\uffff\u0001\u002b\u0001\u00fe\u0001\uffff\u0001\u002b\u0001"+
    "\u0100\u0004\u002b\u0001\uffff\u0004\u002b\u0001\u0109\u0001\u010a\u0003"+
    "\u002b\u0001\u010e\u0005\u002b\u0001\u0114\u0001\u0115\u0004\u002b\u0001"+
    "\uffff\u0008\u002b\u0001\uffff\u0001\u0122\u0002\u002b\u0001\u0125\u0001"+
    "\u002b\u0001\u0127\u0001\u0128\u0004\u002b\u0003\uffff\u0001\u002b\u0001"+
    "\uffff\u0001\u002b\u0001\uffff\u0001\u0130\u0001\u002b\u0001\u0132\u0001"+
    "\u0134\u0001\u002b\u0001\u0136\u0001\u0137\u0001\u002b\u0002\uffff\u0001"+
    "\u0139\u0001\u002b\u0001\u013b\u0001\uffff\u0001\u013c\u0004\u002b\u0002"+
    "\uffff\u0008\u002b\u0001\u0149\u0001\u002b\u0001\u014b\u0001\u002b\u0001"+
    "\uffff\u0001\u002b\u0001\u014e\u0001\uffff\u0001\u002b\u0002\uffff\u0004"+
    "\u002b\u0001\u0154\u0001\u002b\u0001\u0156\u0001\uffff\u0001\u0157\u0001"+
    "\uffff\u0001\u002b\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001"+
    "\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\u015d\u0001\u002b\u0001"+
    "\u015f\u0001\u0160\u0004\u002b\u0001\u0165\u0001\u0166\u0001\u0167\u0001"+
    "\uffff\u0001\u0168\u0001\uffff\u0002\u002b\u0001\uffff\u0004\u002b\u0001"+
    "\u016f\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u0171\u0001\u002b\u0001"+
    "\u0173\u0001\u002b\u0001\u0175\u0001\uffff\u0001\u002b\u0002\uffff\u0001"+
    "\u0177\u0003\u002b\u0004\uffff\u0003\u002b\u0001\u017e\u0001\u017f\u0001"+
    "\u002b\u0001\uffff\u0001\u002b\u0001\uffff\u0001\u0182\u0001\uffff\u0001"+
    "\u0183\u0001\uffff\u0001\u0184\u0001\uffff\u0004\u002b\u0001\u0189\u0001"+
    "\u018a\u0002\uffff\u0001\u002b\u0001\u018c\u0003\uffff\u0001\u002b\u0001"+
    "\u018e\u0002\u002b\u0002\uffff\u0001\u0191\u0001\uffff\u0001\u0192\u0001"+
    "\uffff\u0001\u0193\u0001\u002b\u0003\uffff\u0001\u002b\u0001\u0196\u0001"+
    "\uffff",
    DFA36_eofS:
        "\u0197\uffff",
    DFA36_minS:
        "\u0001\u0009\u0001\u0061\u0001\u0068\u0001\u0061\u0001\u006f\u0001"+
    "\u0061\u0001\u0065\u0001\u006c\u0001\u0066\u0001\u0065\u0001\u0068\u0001"+
    "\u0061\u0001\u0068\u0001\u0062\u0002\u006f\u0001\u0061\u0006\uffff\u0001"+
    "\u0030\u0002\uffff\u0002\u003c\u0002\u003d\u0001\u002b\u0001\u002d\u0001"+
    "\u002a\u0001\u003d\u0001\u0026\u0001\u003d\u0003\uffff\u0001\u0000\u0001"+
    "\u003d\u0003\uffff\u0001\u0042\u0002\uffff\u0001\u006c\u0001\u0077\u0001"+
    "\u0074\u0001\u0061\u0001\u0069\u0001\u0070\u0001\u006c\u0001\u006e\u0001"+
    "\u0072\u0001\u006e\u0001\u006f\u0001\u0065\u0001\u006f\u0001\u0074\u0001"+
    "\u0073\u0001\u006e\u0002\u0061\u0001\u0062\u0001\u0024\u0001\u0073\u0001"+
    "\u0075\u0001\u0070\u0002\u0024\u0001\u0070\u0001\u0074\u0001\u0069\u0001"+
    "\u006f\u0001\u0061\u0001\u0070\u0001\u006e\u0001\u0072\u0002\u0069\u0001"+
    "\u0074\u0001\u0073\u0001\u0074\u0001\u006e\u0001\u0063\u0001\u0069\u0001"+
    "\u0062\u0002\uffff\u0001\u003d\u0002\uffff\u0002\u003d\u0001\uffff\u0001"+
    "\u003d\u0001\uffff\u0001\u003d\u0008\uffff\u0001\u003d\u0009\uffff\u0001"+
    "\u0000\u0009\uffff\u0001\u006c\u0001\u0024\u0001\u0069\u0001\u0065\u0001"+
    "\u0024\u0001\u006e\u0001\u0073\u0001\u006f\u0001\u0065\u0001\u0073\u0001"+
    "\u0061\u0001\u0024\u0001\u0063\u0002\u0061\u0001\u006c\u0002\u0065\u0001"+
    "\u0063\u0001\u0073\u0001\u0072\u0001\u0073\u0001\u0061\u0001\u0065\u0001"+
    "\u0075\u0001\u0062\u0001\uffff\u0001\u0065\u0001\u006d\u0001\u006f\u0001"+
    "\u0065\u0001\uffff\u0001\u0074\u0001\u0024\u0001\uffff\u0001\u006c\u0001"+
    "\u0075\u0001\u0074\u0001\u0072\u0001\u0074\u0001\u0065\u0001\u0063\u0001"+
    "\u0024\u0001\u0064\u0001\u0061\u0001\u006c\u0001\u0068\u0001\u0074\u0001"+
    "\u006f\u0001\u0067\u0001\u006b\u0001\u0076\u0001\u0074\u0001\u006c\u0002"+
    "\uffff\u0001\u003d\u000b\uffff\u0001\u0024\u0001\uffff\u0001\u0076\u0001"+
    "\u0024\u0001\uffff\u0001\u0073\u0001\u0024\u0001\u0077\u0001\u006f\u0001"+
    "\u0065\u0001\u006c\u0001\uffff\u0002\u0074\u0001\u006b\u0001\u0065\u0002"+
    "\u0024\u0001\u0068\u0001\u0069\u0001\u0074\u0001\u0024\u0001\u0073\u0001"+
    "\u0075\u0001\u0074\u0001\u0067\u0001\u006c\u0002\u0024\u0001\u0072\u0001"+
    "\u006e\u0001\u0061\u0001\u0072\u0001\uffff\u0001\u0065\u0002\u0072\u0001"+
    "\u0063\u0001\u0074\u0001\u0069\u0001\u0072\u0001\u0068\u0001\uffff\u0001"+
    "\u0024\u0001\u0074\u0001\u0065\u0001\u0024\u0001\u0072\u0002\u0024\u0002"+
    "\u0061\u0001\u0065\u0001\u0069\u0003\uffff\u0001\u0065\u0001\uffff\u0001"+
    "\u0069\u0001\uffff\u0001\u0024\u0001\u0066\u0002\u0024\u0001\u0069\u0002"+
    "\u0024\u0001\u0061\u0002\uffff\u0001\u0024\u0001\u006e\u0001\u0024\u0001"+
    "\uffff\u0001\u0024\u0001\u006c\u0001\u0065\u0001\u0067\u0001\u0065\u0002"+
    "\uffff\u0001\u0074\u0001\u0064\u0001\u006e\u0001\u0066\u0001\u006d\u0001"+
    "\u0074\u0001\u006e\u0001\u0068\u0001\u0024\u0001\u0063\u0001\u0024\u0001"+
    "\u0072\u0001\uffff\u0001\u0069\u0001\u0024\u0001\uffff\u0001\u0061\u0002"+
    "\uffff\u0001\u0067\u0001\u0074\u0002\u0063\u0001\u0024\u0001\u0065\u0001"+
    "\u0024\u0001\uffff\u0001\u0024\u0001\uffff\u0001\u0079\u0001\uffff\u0001"+
    "\u006f\u0002\uffff\u0001\u006e\u0001\uffff\u0001\u0075\u0002\uffff\u0001"+
    "\u0074\u0001\u0024\u0001\u0065\u0002\u0024\u0001\u0073\u0001\u0063\u0001"+
    "\u0061\u0001\u0065\u0003\u0024\u0001\uffff\u0001\u0024\u0001\uffff\u0001"+
    "\u006f\u0001\u006c\u0001\uffff\u0001\u0063\u0002\u0065\u0001\u0074\u0001"+
    "\u0024\u0001\uffff\u0001\u006e\u0002\uffff\u0001\u0024\u0001\u006e\u0001"+
    "\u0024\u0001\u0065\u0001\u0024\u0001\uffff\u0001\u0072\u0002\uffff\u0001"+
    "\u0024\u0001\u0065\u0001\u0063\u0001\u006e\u0004\uffff\u0001\u006e\u0001"+
    "\u0065\u0001\u0074\u0002\u0024\u0001\u0065\u0001\uffff\u0001\u0074\u0001"+
    "\uffff\u0001\u0024\u0001\uffff\u0001\u0024\u0001\uffff\u0001\u0024\u0001"+
    "\uffff\u0001\u006f\u0001\u0065\u0001\u0074\u0001\u0069\u0002\u0024\u0002"+
    "\uffff\u0001\u0064\u0001\u0024\u0003\uffff\u0001\u0066\u0001\u0024\u0001"+
    "\u0073\u0001\u007a\u0002\uffff\u0001\u0024\u0001\uffff\u0001\u0024\u0001"+
    "\uffff\u0001\u0024\u0001\u0065\u0003\uffff\u0001\u0064\u0001\u0024\u0001"+
    "\uffff",
    DFA36_maxS:
        "\u0001\u3000\u0001\u0075\u0001\u0079\u0001\u0075\u0001\u0079\u0002"+
    "\u006f\u0001\u0078\u0001\u006e\u0001\u0065\u0001\u0079\u0001\u006f\u0001"+
    "\u0069\u0001\u0062\u0002\u006f\u0001\u0075\u0006\uffff\u0001\u0039\u0002"+
    "\uffff\u0001\u003d\u0001\u003e\u0007\u003d\u0001\u007c\u0003\uffff\u0001"+
    "\uffff\u0001\u003d\u0003\uffff\u0001\u0078\u0002\uffff\u0001\u006c\u0001"+
    "\u0077\u0001\u0074\u0001\u0079\u0001\u0072\u0001\u0070\u0001\u006c\u0001"+
    "\u006e\u0001\u0072\u0001\u006e\u0001\u006f\u0001\u0065\u0001\u006f\u0002"+
    "\u0074\u0001\u006e\u0002\u0061\u0001\u006c\u0001\u007a\u0001\u0073\u0001"+
    "\u0075\u0001\u0074\u0002\u007a\u0001\u0070\u0001\u0074\u0001\u0069\u0001"+
    "\u006f\u0001\u0061\u0001\u0070\u0001\u006e\u0001\u0072\u0001\u006c\u0001"+
    "\u0069\u0001\u0074\u0001\u0073\u0001\u0074\u0001\u006e\u0001\u0063\u0001"+
    "\u006f\u0001\u0062\u0002\uffff\u0001\u003d\u0002\uffff\u0001\u003e\u0001"+
    "\u003d\u0001\uffff\u0001\u003d\u0001\uffff\u0001\u003d\u0008\uffff\u0001"+
    "\u003d\u0009\uffff\u0001\uffff\u0009\uffff\u0001\u006c\u0001\u007a\u0001"+
    "\u0069\u0001\u0065\u0001\u007a\u0001\u006e\u0001\u0073\u0001\u006f\u0001"+
    "\u0065\u0001\u0073\u0001\u0061\u0001\u007a\u0001\u0063\u0002\u0061\u0001"+
    "\u006c\u0002\u0065\u0001\u0063\u0001\u0074\u0001\u0072\u0001\u0073\u0001"+
    "\u0061\u0001\u0065\u0001\u0075\u0001\u0062\u0001\uffff\u0001\u0065\u0001"+
    "\u006d\u0001\u006f\u0001\u0065\u0001\uffff\u0001\u0074\u0001\u007a\u0001"+
    "\uffff\u0001\u006f\u0001\u0075\u0001\u0074\u0001\u0072\u0001\u0074\u0001"+
    "\u0065\u0001\u0063\u0001\u007a\u0001\u0064\u0001\u0061\u0001\u006c\u0001"+
    "\u0068\u0001\u0074\u0001\u006f\u0001\u0067\u0001\u006b\u0001\u0076\u0001"+
    "\u0074\u0001\u006c\u0002\uffff\u0001\u003d\u000b\uffff\u0001\u007a\u0001"+
    "\uffff\u0001\u0076\u0001\u007a\u0001\uffff\u0001\u0073\u0001\u007a\u0001"+
    "\u0077\u0001\u006f\u0001\u0065\u0001\u006c\u0001\uffff\u0002\u0074\u0001"+
    "\u006b\u0001\u0065\u0002\u007a\u0001\u0068\u0001\u0069\u0001\u0074\u0001"+
    "\u007a\u0001\u0073\u0001\u0075\u0001\u0074\u0001\u0067\u0001\u006c\u0002"+
    "\u007a\u0001\u0072\u0001\u006e\u0001\u0061\u0001\u0072\u0001\uffff\u0001"+
    "\u0065\u0002\u0072\u0001\u0063\u0001\u0074\u0001\u0069\u0001\u0072\u0001"+
    "\u0068\u0001\uffff\u0001\u007a\u0001\u0074\u0001\u0065\u0001\u007a\u0001"+
    "\u0072\u0002\u007a\u0002\u0061\u0001\u0065\u0001\u0069\u0003\uffff\u0001"+
    "\u0065\u0001\uffff\u0001\u0069\u0001\uffff\u0001\u007a\u0001\u0066\u0002"+
    "\u007a\u0001\u0069\u0002\u007a\u0001\u0061\u0002\uffff\u0001\u007a\u0001"+
    "\u006e\u0001\u007a\u0001\uffff\u0001\u007a\u0001\u006c\u0001\u0065\u0001"+
    "\u0067\u0001\u0065\u0002\uffff\u0001\u0074\u0001\u0064\u0001\u006e\u0001"+
    "\u0066\u0001\u006d\u0001\u0074\u0001\u006e\u0001\u0068\u0001\u007a\u0001"+
    "\u0063\u0001\u007a\u0001\u0072\u0001\uffff\u0001\u0069\u0001\u007a\u0001"+
    "\uffff\u0001\u0061\u0002\uffff\u0001\u0067\u0001\u0074\u0002\u0063\u0001"+
    "\u007a\u0001\u0065\u0001\u007a\u0001\uffff\u0001\u007a\u0001\uffff\u0001"+
    "\u0079\u0001\uffff\u0001\u006f\u0002\uffff\u0001\u006e\u0001\uffff\u0001"+
    "\u0075\u0002\uffff\u0001\u0074\u0001\u007a\u0001\u0065\u0002\u007a\u0001"+
    "\u0073\u0001\u0063\u0001\u0061\u0001\u0065\u0003\u007a\u0001\uffff\u0001"+
    "\u007a\u0001\uffff\u0001\u006f\u0001\u006c\u0001\uffff\u0001\u0063\u0002"+
    "\u0065\u0001\u0074\u0001\u007a\u0001\uffff\u0001\u006e\u0002\uffff\u0001"+
    "\u007a\u0001\u006e\u0001\u007a\u0001\u0065\u0001\u007a\u0001\uffff\u0001"+
    "\u0072\u0002\uffff\u0001\u007a\u0001\u0065\u0001\u0063\u0001\u006e\u0004"+
    "\uffff\u0001\u006e\u0001\u0065\u0001\u0074\u0002\u007a\u0001\u0065\u0001"+
    "\uffff\u0001\u0074\u0001\uffff\u0001\u007a\u0001\uffff\u0001\u007a\u0001"+
    "\uffff\u0001\u007a\u0001\uffff\u0001\u006f\u0001\u0065\u0001\u0074\u0001"+
    "\u0069\u0002\u007a\u0002\uffff\u0001\u0064\u0001\u007a\u0003\uffff\u0001"+
    "\u0066\u0001\u007a\u0001\u0073\u0001\u007a\u0002\uffff\u0001\u007a\u0001"+
    "\uffff\u0001\u007a\u0001\uffff\u0001\u007a\u0001\u0065\u0003\uffff\u0001"+
    "\u0064\u0001\u007a\u0001\uffff",
    DFA36_acceptS:
        "\u0011\uffff\u0001\u003c\u0001\u003d\u0001\u003e\u0001\u003f\u0001"+
    "\u0040\u0001\u0041\u0001\uffff\u0001\u0043\u0001\u0044\u000a\uffff\u0001"+
    "\u0059\u0001\u005c\u0001\u005d\u0002\uffff\u0001\u0070\u0001\u0071\u0001"+
    "\u0074\u0001\uffff\u0001\u0075\u0001\u0079\u002a\uffff\u0001\u0042\u0001"+
    "\u0047\u0001\uffff\u0001\u0045\u0001\u0048\u0002\uffff\u0001\u0046\u0001"+
    "\uffff\u0001\u005e\u0001\uffff\u0001\u0058\u0001\u0051\u0001\u005f\u0001"+
    "\u004d\u0001\u0052\u0001\u0060\u0001\u004e\u0001\u0061\u0001\uffff\u0001"+
    "\u004f\u0001\u0062\u0001\u0050\u0001\u005a\u0001\u0066\u0001\u0056\u0001"+
    "\u005b\u0001\u0067\u0001\u0057\u0001\uffff\u0001\u0072\u0001\u0073\u0001"+
    "\u0068\u0001\u007a\u0001\u006d\u0001\u006c\u0001\u0076\u0001\u0077\u0001"+
    "\u0078\u001a\uffff\u0001\u000a\u0004\uffff\u0001\u000f\u0002\uffff\u0001"+
    "\u0010\u0013\uffff\u0001\u0063\u0001\u0053\u0001\uffff\u0001\u0064\u0001"+
    "\u0054\u0001\u006f\u0001\u006e\u0001\u004b\u0001\u0049\u0001\u004c\u0001"+
    "\u004a\u0001\u006b\u0001\u006a\u0001\u0069\u0001\uffff\u0001\u0012\u0002"+
    "\uffff\u0001\u0017\u0006\uffff\u0001\u000d\u0015\uffff\u0001\u002d\u0008"+
    "\uffff\u0001\u0019\u000b\uffff\u0001\u0065\u0001\u0055\u0001\u0001\u0001"+
    "\uffff\u0001\u0002\u0001\uffff\u0001\u0015\u0008\uffff\u0001\u001f\u0001"+
    "\u0005\u0003\uffff\u0001\u0020\u0005\uffff\u0001\u000b\u0001\u0025\u000c"+
    "\uffff\u0001\u001a\u0002\uffff\u0001\u001c\u0001\uffff\u0001\u002a\u0001"+
    "\u002f\u0007\uffff\u0001\u0016\u0001\uffff\u0001\u0003\u0001\uffff\u0001"+
    "\u0028\u0001\uffff\u0001\u0029\u0001\u0004\u0001\uffff\u0001\u0006\u0001"+
    "\uffff\u0001\u0022\u0001\u0021\u000c\uffff\u0001\u0035\u0001\uffff\u0001"+
    "\u0037\u0002\uffff\u0001\u001b\u0005\uffff\u0001\u0030\u0001\uffff\u0001"+
    "\u0039\u0001\u0018\u0005\uffff\u0001\u0009\u0001\uffff\u0001\u0024\u0001"+
    "\u0026\u0004\uffff\u0001\u002c\u0001\u0013\u0001\u0014\u0001\u0036\u0006"+
    "\uffff\u0001\u0034\u0001\uffff\u0001\u000c\u0001\uffff\u0001\u001e\u0001"+
    "\uffff\u0001\u0008\u0001\uffff\u0001\u0027\u0006\uffff\u0001\u0031\u0001"+
    "\u0032\u0002\uffff\u0001\u000e\u0001\u0007\u0001\u0023\u0004\uffff\u0001"+
    "\u003b\u0001\u001d\u0001\uffff\u0001\u003a\u0001\uffff\u0001\u002e\u0002"+
    "\uffff\u0001\u0033\u0001\u0011\u0001\u002b\u0002\uffff\u0001\u0038",
    DFA36_specialS:
        "\u0027\uffff\u0001\u0001\u004e\uffff\u0001\u0000\u0120\uffff}>",
    DFA36_transitionS: [
            "\u0001\u0029\u0001\u002a\u0002\u0029\u0001\u002a\u0012\uffff"+
            "\u0001\u0029\u0001\u001d\u0001\u002e\u0002\uffff\u0001\u0021"+
            "\u0001\u0022\u0001\u002e\u0001\u0013\u0001\u0014\u0001\u0020"+
            "\u0001\u001e\u0001\u0019\u0001\u001f\u0001\u0017\u0001\u0027"+
            "\u0001\u002c\u0009\u002d\u0001\u0026\u0001\u0018\u0001\u001a"+
            "\u0001\u001c\u0001\u001b\u0001\u0025\u001b\uffff\u0001\u0015"+
            "\u0001\uffff\u0001\u0016\u0001\u0028\u0002\uffff\u0001\u000d"+
            "\u0001\u0004\u0001\u0005\u0001\u0006\u0001\u0007\u0001\u0003"+
            "\u0001\u000e\u0001\uffff\u0001\u0008\u0002\uffff\u0001\u000f"+
            "\u0001\uffff\u0001\u0001\u0001\uffff\u0001\u0010\u0001\uffff"+
            "\u0001\u0009\u0001\u000a\u0001\u0002\u0001\uffff\u0001\u000b"+
            "\u0001\u000c\u0003\uffff\u0001\u0011\u0001\u0023\u0001\u0012"+
            "\u0001\u0024\u0021\uffff\u0001\u0029\u15df\uffff\u0001\u0029"+
            "\u018d\uffff\u0001\u0029\u07f1\uffff\u000b\u0029\u001d\uffff"+
            "\u0002\u002a\u0005\uffff\u0001\u0029\u002f\uffff\u0001\u0029"+
            "\u0fa0\uffff\u0001\u0029",
            "\u0001\u0031\u0003\uffff\u0001\u0030\u000f\uffff\u0001\u002f",
            "\u0001\u0033\u0009\uffff\u0001\u0032\u0006\uffff\u0001\u0034",
            "\u0001\u0035\u0007\uffff\u0001\u0036\u0002\uffff\u0001\u0039"+
            "\u0002\uffff\u0001\u0037\u0005\uffff\u0001\u0038",
            "\u0001\u003b\u0002\uffff\u0001\u003a\u0006\uffff\u0001\u003c",
            "\u0001\u003d\u0006\uffff\u0001\u003f\u0003\uffff\u0001\u0040"+
            "\u0002\uffff\u0001\u003e",
            "\u0001\u0041\u0009\uffff\u0001\u0042",
            "\u0001\u0043\u0001\uffff\u0001\u0044\u0009\uffff\u0001\u0045",
            "\u0001\u0046\u0006\uffff\u0001\u0048\u0001\u0047",
            "\u0001\u0049",
            "\u0001\u004b\u000b\uffff\u0001\u004c\u0001\u004d\u0001\uffff"+
            "\u0001\u004a\u0001\uffff\u0001\u004e",
            "\u0001\u004f\u000d\uffff\u0001\u0050",
            "\u0001\u0051\u0001\u0052",
            "\u0001\u0053",
            "\u0001\u0054",
            "\u0001\u0055",
            "\u0001\u0056\u0010\uffff\u0001\u0057\u0002\uffff\u0001\u0058",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u000a\u002d",
            "",
            "",
            "\u0001\u005b\u0001\u005a",
            "\u0001\u005f\u0001\u005d\u0001\u005e",
            "\u0001\u0061",
            "\u0001\u0063",
            "\u0001\u0065\u0011\uffff\u0001\u0066",
            "\u0001\u0068\u000f\uffff\u0001\u0069",
            "\u0001\u006c\u0012\uffff\u0001\u006b",
            "\u0001\u006e",
            "\u0001\u0070\u0016\uffff\u0001\u0071",
            "\u0001\u0074\u003e\uffff\u0001\u0073",
            "",
            "",
            "",
            "\u000a\u007a\u0001\uffff\u0002\u007a\u0001\uffff\u001c\u007a"+
            "\u0001\u0077\u0004\u007a\u0001\u0078\u000d\u007a\u0001\u0076"+
            "\u1fea\u007a\u0002\uffff\udfd6\u007a",
            "\u0001\u007b",
            "",
            "",
            "",
            "\u0001\u007e\u000c\uffff\u0001\u007d\u0008\uffff\u0001\u007f"+
            "\u0009\uffff\u0001\u007e\u000c\uffff\u0001\u007d\u0008\uffff"+
            "\u0001\u007f",
            "",
            "",
            "\u0001\u0080",
            "\u0001\u0081",
            "\u0001\u0082",
            "\u0001\u0085\u0013\uffff\u0001\u0083\u0003\uffff\u0001\u0084",
            "\u0001\u0086\u0008\uffff\u0001\u0087",
            "\u0001\u0088",
            "\u0001\u0089",
            "\u0001\u008a",
            "\u0001\u008b",
            "\u0001\u008c",
            "\u0001\u008d",
            "\u0001\u008e",
            "\u0001\u008f",
            "\u0001\u0090",
            "\u0001\u0091\u0001\u0092",
            "\u0001\u0093",
            "\u0001\u0094",
            "\u0001\u0095",
            "\u0001\u0098\u0003\uffff\u0001\u0096\u0005\uffff\u0001\u0097",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u0014\u002b\u0001\u0099\u0005\u002b",
            "\u0001\u009b",
            "\u0001\u009c",
            "\u0001\u009d\u0003\uffff\u0001\u009e",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u0012\u002b\u0001\u00a0\u0001\u00a1\u0006\u002b",
            "\u0001\u00a3",
            "\u0001\u00a4",
            "\u0001\u00a5",
            "\u0001\u00a6",
            "\u0001\u00a7",
            "\u0001\u00a8",
            "\u0001\u00a9",
            "\u0001\u00aa",
            "\u0001\u00ab\u0002\uffff\u0001\u00ac",
            "\u0001\u00ad",
            "\u0001\u00ae",
            "\u0001\u00af",
            "\u0001\u00b0",
            "\u0001\u00b1",
            "\u0001\u00b2",
            "\u0001\u00b3\u0005\uffff\u0001\u00b4",
            "\u0001\u00b5",
            "",
            "",
            "\u0001\u00b6",
            "",
            "",
            "\u0001\u00b9\u0001\u00b8",
            "\u0001\u00bb",
            "",
            "\u0001\u00bd",
            "",
            "\u0001\u00bf",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u00c1",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u000a\u007a\u0001\uffff\u0002\u007a\u0001\uffff\u201a\u007a"+
            "\u0002\uffff\udfd6\u007a",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u00c4",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u00c6",
            "\u0001\u00c7",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u00c9",
            "\u0001\u00ca",
            "\u0001\u00cb",
            "\u0001\u00cc",
            "\u0001\u00cd",
            "\u0001\u00ce",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u00d0",
            "\u0001\u00d1",
            "\u0001\u00d2",
            "\u0001\u00d3",
            "\u0001\u00d4",
            "\u0001\u00d5",
            "\u0001\u00d6",
            "\u0001\u00d8\u0001\u00d7",
            "\u0001\u00d9",
            "\u0001\u00da",
            "\u0001\u00db",
            "\u0001\u00dc",
            "\u0001\u00dd",
            "\u0001\u00de",
            "",
            "\u0001\u00df",
            "\u0001\u00e0",
            "\u0001\u00e1",
            "\u0001\u00e2",
            "",
            "\u0001\u00e3",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u0004\u002b\u0001\u00e4\u0015\u002b",
            "",
            "\u0001\u00e6\u0002\uffff\u0001\u00e7",
            "\u0001\u00e8",
            "\u0001\u00e9",
            "\u0001\u00ea",
            "\u0001\u00eb",
            "\u0001\u00ec",
            "\u0001\u00ed",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u00ef",
            "\u0001\u00f0",
            "\u0001\u00f1",
            "\u0001\u00f2",
            "\u0001\u00f3",
            "\u0001\u00f4",
            "\u0001\u00f5",
            "\u0001\u00f6",
            "\u0001\u00f7",
            "\u0001\u00f8",
            "\u0001\u00f9",
            "",
            "",
            "\u0001\u00fa",
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
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u00fd",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u00ff",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0101",
            "\u0001\u0102",
            "\u0001\u0103",
            "\u0001\u0104",
            "",
            "\u0001\u0105",
            "\u0001\u0106",
            "\u0001\u0107",
            "\u0001\u0108",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u010b",
            "\u0001\u010c",
            "\u0001\u010d",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u010f",
            "\u0001\u0110",
            "\u0001\u0111",
            "\u0001\u0112",
            "\u0001\u0113",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0116",
            "\u0001\u0117",
            "\u0001\u0118",
            "\u0001\u0119",
            "",
            "\u0001\u011a",
            "\u0001\u011b",
            "\u0001\u011c",
            "\u0001\u011d",
            "\u0001\u011e",
            "\u0001\u011f",
            "\u0001\u0120",
            "\u0001\u0121",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0123",
            "\u0001\u0124",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0126",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0129",
            "\u0001\u012a",
            "\u0001\u012b",
            "\u0001\u012c",
            "",
            "",
            "",
            "\u0001\u012d",
            "",
            "\u0001\u012e",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u0012\u002b\u0001\u012f\u0007\u002b",
            "\u0001\u0131",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u000b\u002b\u0001\u0133\u000e\u002b",
            "\u0001\u0135",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0138",
            "",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u013a",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u013d",
            "\u0001\u013e",
            "\u0001\u013f",
            "\u0001\u0140",
            "",
            "",
            "\u0001\u0141",
            "\u0001\u0142",
            "\u0001\u0143",
            "\u0001\u0144",
            "\u0001\u0145",
            "\u0001\u0146",
            "\u0001\u0147",
            "\u0001\u0148",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u014a",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u014c",
            "",
            "\u0001\u014d",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u014f",
            "",
            "",
            "\u0001\u0150",
            "\u0001\u0151",
            "\u0001\u0152",
            "\u0001\u0153",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0155",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u0158",
            "",
            "\u0001\u0159",
            "",
            "",
            "\u0001\u015a",
            "",
            "\u0001\u015b",
            "",
            "",
            "\u0001\u015c",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u015e",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0161",
            "\u0001\u0162",
            "\u0001\u0163",
            "\u0001\u0164",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u0169",
            "\u0001\u016a",
            "",
            "\u0001\u016b",
            "\u0001\u016c",
            "\u0001\u016d",
            "\u0001\u016e",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u0170",
            "",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0172",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0174",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u0176",
            "",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0178",
            "\u0001\u0179",
            "\u0001\u017a",
            "",
            "",
            "",
            "",
            "\u0001\u017b",
            "\u0001\u017c",
            "\u0001\u017d",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0180",
            "",
            "\u0001\u0181",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u0185",
            "\u0001\u0186",
            "\u0001\u0187",
            "\u0001\u0188",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "",
            "\u0001\u018b",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "",
            "",
            "\u0001\u018d",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u018f",
            "\u0001\u0190",
            "",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            "\u0001\u0194",
            "",
            "",
            "",
            "\u0001\u0195",
            "\u0001\u002b\u000b\uffff\u000a\u002b\u0007\uffff\u001a\u002b"+
            "\u0001\uffff\u0001\u002b\u0002\uffff\u0001\u002b\u0001\uffff"+
            "\u001a\u002b",
            ""
    ]
});

org.antlr.lang.augmentObject(ECMAScript3ExtLexer, {
    DFA36_eot:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA36_eotS),
    DFA36_eof:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA36_eofS),
    DFA36_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtLexer.DFA36_minS),
    DFA36_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(ECMAScript3ExtLexer.DFA36_maxS),
    DFA36_accept:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA36_acceptS),
    DFA36_special:
        org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA36_specialS),
    DFA36_transition: (function() {
        var a = [],
            i,
            numStates = ECMAScript3ExtLexer.DFA36_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(ECMAScript3ExtLexer.DFA36_transitionS[i]));
        }
        return a;
    })()
});

ECMAScript3ExtLexer.DFA36 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 36;
    this.eot = ECMAScript3ExtLexer.DFA36_eot;
    this.eof = ECMAScript3ExtLexer.DFA36_eof;
    this.min = ECMAScript3ExtLexer.DFA36_min;
    this.max = ECMAScript3ExtLexer.DFA36_max;
    this.accept = ECMAScript3ExtLexer.DFA36_accept;
    this.special = ECMAScript3ExtLexer.DFA36_special;
    this.transition = ECMAScript3ExtLexer.DFA36_transition;
};

org.antlr.lang.extend(ECMAScript3ExtLexer.DFA36, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( NULL | TRUE | FALSE | BREAK | CASE | CATCH | CONTINUE | DEFAULT | DELETE | DO | ELSE | FINALLY | FOR | FUNCTION | IF | IN | INSTANCEOF | NEW | RETURN | SWITCH | THIS | THROW | TRY | TYPEOF | VAR | VOID | WHILE | WITH | ABSTRACT | BOOLEAN | BYTE | CHAR | CLASS | CONST | DEBUGGER | DOUBLE | ENUM | EXPORT | EXTENDS | FINAL | FLOAT | GOTO | IMPLEMENTS | IMPORT | INT | INTERFACE | LONG | NATIVE | PACKAGE | PRIVATE | PROTECTED | PUBLIC | SHORT | STATIC | SUPER | SYNCHRONIZED | THROWS | TRANSIENT | VOLATILE | LBRACE | RBRACE | LPAREN | RPAREN | LBRACK | RBRACK | DOT | SEMIC | COMMA | LT | GT | LTE | GTE | EQ | NEQ | SAME | NSAME | ADD | SUB | MUL | MOD | INC | DEC | SHL | SHR | SHU | AND | OR | NOT | INV | LAND | LOR | QUE | COLON | ASSIGN | ADDASS | SUBASS | MULASS | MODASS | SHLASS | SHRASS | SHUASS | ANDASS | ORASS | DIV | DIVASS | POW | POWASS | CARET | CARETASS | XOR | XORASS | WhiteSpace | EOL | MultiLineComment | SingleLineComment | Identifier | DecimalLiteral | OctalIntegerLiteral | BinaryIntegerLiteral | HexIntegerLiteral | StringLiteral | RegularExpressionLiteral );";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA36_118 = input.LA(1);

                             
                            var index36_118 = input.index();
                            input.rewind();
                            s = -1;
                            if ( ((LA36_118>='\u0000' && LA36_118<='\t')||(LA36_118>='\u000B' && LA36_118<='\f')||(LA36_118>='\u000E' && LA36_118<='\u2027')||(LA36_118>='\u202A' && LA36_118<='\uFFFF')) && (( this.areRegularExpressionsEnabled() ))) {s = 122;}

                            else s = 195;

                             
                            input.seek(index36_118);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA36_39 = input.LA(1);

                             
                            var index36_39 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA36_39=='=') ) {s = 118;}

                            else if ( (LA36_39=='*') ) {s = 119;}

                            else if ( (LA36_39=='/') ) {s = 120;}

                            else if ( ((LA36_39>='\u0000' && LA36_39<='\t')||(LA36_39>='\u000B' && LA36_39<='\f')||(LA36_39>='\u000E' && LA36_39<=')')||(LA36_39>='+' && LA36_39<='.')||(LA36_39>='0' && LA36_39<='<')||(LA36_39>='>' && LA36_39<='\u2027')||(LA36_39>='\u202A' && LA36_39<='\uFFFF')) && (( this.areRegularExpressionsEnabled() ))) {s = 122;}

                            else s = 121;

                             
                            input.seek(index36_39);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 36, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
 
})();