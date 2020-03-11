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

    override func viewDidLoad() {
        super.viewDidLoad()

        inputField.stringValue = "1+1"
        inputField.selectText(nil)
        inputField.cell?.focusRingType = .none
        inputField.becomeFirstResponder()
    }
    
    @IBAction func enterPressed(_ sender: Any) {
        let expression = inputField.stringValue
        if let result = Calculate.shared.calc(expression, addToHistory: true) {
            print(result)
        }
        
        inputField.stringValue = ""
        textFieldWasEmpty = true
        allowInsertAnsVariable = true
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
}
