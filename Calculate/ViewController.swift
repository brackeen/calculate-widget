//
//  ViewController.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {
    
    @IBOutlet weak var inputField: NSTextField!
    
    fileprivate var textFieldWasEmpty = true
    fileprivate var allowInsertAnsVariable = true
    fileprivate var historyEnd: String?
    fileprivate var completions: [String]?
    fileprivate var completionWordStart = "".endIndex

    override func viewDidLoad() {
        super.viewDidLoad()

        if !Calculate.shared.hasInputHistory() {
            inputField.stringValue = "1+1"
        }
        inputField.selectText(nil)
        inputField.cell?.focusRingType = .none
        inputField.becomeFirstResponder()
    }
    
    @IBAction func enterPressed(_ sender: Any) {
        var expression = inputField.stringValue
        var addToHistory = true
        
        if expression.isEmpty {
            if let prevExpression = Calculate.shared.getInputHistoryPrev(), !prevExpression.isEmpty {
                expression = prevExpression
                addToHistory = false
            } else {
                return
            }
        }
        
        if let result = Calculate.shared.calc(expression, addToHistory: addToHistory) {
            print(result)
        }
        
        inputField.stringValue = ""
        textFieldWasEmpty = true
        allowInsertAnsVariable = true
        historyEnd = nil
        completions = nil
    }
    
    fileprivate func doAutocomplete(forward: Bool) {
        let input = inputField.stringValue
        
        guard !input.isEmpty else {
            return
        }
        
        if let completions = completions {
            if completions.count > 1 {
                let lastCompletion = String(input[completionWordStart...])
                let offset = forward ? 1 : completions.count - 1
                for i in completions.indices {
                    if lastCompletion == completions[i] {
                        let j = (i + offset) % completions.count
                        inputField.stringValue = input[..<completionWordStart] + completions[j]
                        inputField.currentEditor()?.moveToEndOfLine(nil)
                        break
                    }
                }
            }
        } else {
            let cursorAtEnd: Bool
            if let nsSelectedRange = inputField.currentEditor()?.selectedRange, let selectedRange = Range<String.Index>(nsSelectedRange, in: input) {
                cursorAtEnd = selectedRange.lowerBound == input.endIndex
            } else {
                cursorAtEnd = false
            }
            
            if cursorAtEnd {
                var allowedCharacterSet = CharacterSet.alphanumerics
                allowedCharacterSet.insert(charactersIn: "_")

                completionWordStart = input.endIndex
                for index in input.indices.reversed() {
                    let suffix = input[index...]
                    let isAllowed = suffix.rangeOfCharacter(from: allowedCharacterSet.inverted) == nil
                    if isAllowed {
                        completionWordStart = index
                    } else {
                        break
                    }
                }
                
                if completionWordStart < input.endIndex {
                    let prefix = String(input[completionWordStart...])
                    let completions = Calculate.shared.getCompletions(prefix: prefix)
                    if !completions.isEmpty {
                        var completion = completions[0]
                        // Make the first completion of "e" be "exp", then cycle back to "e"
                        if prefix == completion && completions.count > 1 {
                            completion = completions[1]
                        }
                        inputField.stringValue = input[..<completionWordStart] + completion
                        inputField.currentEditor()?.moveToEndOfLine(nil)
                    }
                    self.completions = completions
                }
            }
        }
    }
}

extension ViewController: NSTextFieldDelegate {

    func controlTextDidChange(_ obj: Notification) {
        completions = nil
        let text = inputField.stringValue
        if text.isEmpty {
            textFieldWasEmpty = true
        } else {
            if let ch = text.first, textFieldWasEmpty && allowInsertAnsVariable &&
                (ch == "+" || ch == "-" || ch == "*" || ch == "/" || ch == "%" || ch == "&" || ch == "|" || ch == "^") {
                inputField.stringValue = "ans" + text
                inputField.currentEditor()?.moveToEndOfLine(nil)
                allowInsertAnsVariable = false
            }
            textFieldWasEmpty = false
        }
    }
    
    func control(_ control: NSControl, textView: NSTextView, doCommandBy commandSelector: Selector) -> Bool {
        if commandSelector == #selector(insertTab(_:)) {
            doAutocomplete(forward: true)
            return true
        } else if commandSelector == #selector(insertBacktab(_:)) {
            doAutocomplete(forward: false)
            return true
        }
        
        completions = nil
        
        if commandSelector == #selector(moveUp(_:)) {
            let isAtEndOfInputHistory = Calculate.shared.isAtEndOfInputHistory()
            if let historyItem = Calculate.shared.getInputHistoryPrev() {
                if isAtEndOfInputHistory {
                    historyEnd = inputField.stringValue
                }
                inputField.stringValue = historyItem
                inputField.currentEditor()?.moveToEndOfLine(nil)
            }
            return true
        } else if commandSelector == #selector(moveDown(_:)) {
            if let historyItem = Calculate.shared.getInputHistoryNext() ?? historyEnd {
                inputField.stringValue = historyItem
                inputField.currentEditor()?.moveToEndOfLine(nil)
            }
            return true
        } else {
            return false
        }
    }
}
