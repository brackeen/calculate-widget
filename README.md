# Calculate

> :warning: This code is in the process of being converted to a native app, and does not work at the moment. For the original dashboard version, see [version 1.2.2](https://github.com/brackeen/calculate-widget/tree/1.2.2).

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

## Credits
* ANTLR by Terence Parr.
* EMCAScript grammar by Patrick Hulsmeijer.
* Emitter code based on JavaEmitter by Andy Tripp.
