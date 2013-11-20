# Calculate

Calculate is a Mac OS X dashboard widget for evaluating math expressions.

[http://www.brackeen.com/calculate/](http://www.brackeen.com/calculate/)

## How it works

Calculate has a custom ANTLR grammar similar to JavaScript, but with the 
following changes:

* `^` and `**` are power operators.
* `><` is the xor operator.
* `!` is factorial.
* Binary literals: `0b101010`.
* Octal literals: `0o52`.
* Numbers with leading zeros are treated as decimal literals, not octal.
* After parsing the input to a grammar tree, it emits the tree to standard 
JavaScript source code, and executes it using `eval()`.

## Building from source

The source is organized as an Ant-based NetBeans project. 
(NetBeans isn't required - you just need Apache Ant.) 
Requires Mac OS X, of course.

## Credits
* ANTLR by Terence Parr.
* EMCAScript grammar by Patrick Hulsmeijer.
* Emitter code based on JavaEmitter by Andy Tripp.