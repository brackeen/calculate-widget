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

    override func viewDidLoad() {
        super.viewDidLoad()

        inputField.stringValue = "1+1"
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
    }
}

extension ViewController: NSTextFieldDelegate {

    func controlTextDidChange(_ obj: Notification) {
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
