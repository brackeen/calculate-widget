# Change Log

### 2.0 alpha 3 (May 5, 2021)
- New toolbar.
- New input field appearance.
- New icon for Big Sur.
- Support for Apple Silicon.
- Add Appearance preference (Light/Dark).
- Updated error when attempting to set a constant ("e=5").
- Updated keyboard shortcut library. (You will have to reset your hotkey in Calculate's Preferences).
- If hotkey is set, keep app alive after closing the window.
- Fixed bug where invisible break chars were included when copying to the clipboard.
- Fixed several other minor UI issues.

### 2.0 alpha 2 (May 24, 2020)
- Add monospace font option.
- Add option to automatically insert "ans".
- Add undo/redo support for the input field.
- Improved performance with a large output history.

### 2.0 alpha 1 (March 23, 2020)
- Newly written native app using the original JS engine.

### [1.2.2](https://github.com/brackeen/calculate-widget/releases/tag/1.2.2) (December 17, 2015)
- Minor update for Mac OS X 10.11 El Capitan (Use system font).

### 1.2.1 (October 18, 2014)
- Floating-point precision display tweaks.
- Updates for Mac OS X 10.10 Yosemite (Use Helvetica Neue instead of Lucida Grande, other tweaks).

### 1.2 (June 24, 2014)
- Fixed floating-point precision for simple addition, subtraction, and 
  multiplication. For example, "0.1+0.2" is now "0.3" instead of 
  "0.30000000000000004".
- The previous answer is now "ans" (instead of "answer").
- Retina support
- Modern scroll indicator
- Minor bug fixes
- Requires Safari 5 (Tested on Mac OS X Lion with Safari 5).

### 1.1.5 (Apr 15, 2010)
- Added power operator ^. Example: 2^8 == 256 (If you're a programmer, for xor use >< instead of ^)
- Added factorial operator !. Example: 5! == 120
- Added binary input. Example: '0b11011'
- Added octal input. Example: '0o2840'
- Numbers with a leading zero are treated as decimal. Example: 0042 == 42
- Command-C copies the last answer. Make sure nothing is currently
  selected, and press Command-C to copy last numeric answer to the clipboard.
- Fixed bug: the variable 'i' couldn't be set.
- Fixed bug: 'undefined' could be set
- Fixed persistence bug: functions inside another block
- Fixed persistence bug: object literals containing name-value pairs whose name
  wasn't an identifier

### 1.1.4 (Nov 25, 2008)
- Widget dimensions now persistent between sessions.
- Object literals can now be used. For example: point = { x:0, y:6 }
- Toolbar: Use C instead of X

### 1.1.3 (May 3, 2008)
- Fixed focus big introduced in 1.1.2

### 1.1.2 (May 1, 2008)
- Numpad: The clear key clears the input area
- Numpad (International keyboards): the comma on the numpad is inserted as a period
  (tested on Safari 3.1, Leopard)
- Code cleanup based on latest version of jslint

### 1.1.1 (Apr 2, 2008)
- Fixes for autocompletion when Safari 3.1 is installed.

### 1.1.0 (Feb 28, 2008)
- Added autocompletion of variables and functions names using the Tab key.
  For example, 1/an<TAB> autocompletes to 1/answer
- Added several new functions (log2, log10, and many trig & hyperbolic functions)
- Added degree mode.
- Fixed display and persistence of lists.
- Added several shortcut keys.
- Code cleanup based on Dustin Diaz's JavaScript work.

### 1.0.1 (October 31, 2007)
- Default text is now "1+1" instead of "Enter an expression"
- Pi symbol is now set (type option-P to enter the pi character - Leopard only)
- Fixed minor layout issues in Leopard
- Widget now has a "back" with a "check version" link

### 1.0.0 (April 27, 2007)
- Initial release.
