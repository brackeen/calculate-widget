//
//  String+Break.swift
//  Calculate
//
//  Created by David Brackeen on 3/17/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation

extension String {
    
    // For prettier word wrapping.
    // Insert zero-width space ("\u200B") after break chars.
    // For example, "3.141592653589793+1.0000000000000000" on a small-width window should break on the "+"
    public func breakOnSymbols() -> String {
        let symbols = CharacterSet(charactersIn: "+-*/%&|^,;!<>")
        var prevCharIsWhitespaceOrSymbol = true
        return unicodeScalars.reversed().map ( { ch in
            let isWhitespace = CharacterSet.whitespacesAndNewlines.contains(ch)
            let isSymbol = symbols.contains(ch)
            let result: String
            if isSymbol && !prevCharIsWhitespaceOrSymbol {
                result = String(ch) + "\u{200B}"
            } else {
                result = String(ch)
            }
            prevCharIsWhitespaceOrSymbol = isWhitespace || isSymbol
            return result
        }).reversed().joined()
    }
    
    public mutating func removeInvisibleBreaks() {
        removeAll(where: { $0 == "\u{200B}" })
    }
    
    public func removedInvisibleBreaks() -> String {
        var mutableString = self
        mutableString.removeInvisibleBreaks()
        return mutableString
    }
}
