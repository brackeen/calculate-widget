#!/bin/bash
OUT_DIR=3rdparty/gen
java -classpath 3rdparty/antlr-3.1.2.jar org.antlr.Tool ECMAScript3Ext.g -fo $OUT_DIR
rm $OUT_DIR/ECMAScript3Ext.tokens
    
# ANTLR 3.1.2 inserts invalid code that should be changed.
# Convert this:
#     set89=input.LT(1);
#     set89=this.input.LT(1);
# to this:
#     set89=null;
#     set89=this.input.LT(1);
sed -i "" 's/=input.LT(1);/=null;/g' $OUT_DIR/ECMAScript3ExtParser.js
