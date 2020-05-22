//
//  SelectAllTextField.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class SelectAllTextField: NSTextField {
    
    override func mouseDown(with event: NSEvent) {
        super.mouseDown(with: event)
        if let textEditor = currentEditor(), textEditor.selectedRange.length == 0 {
            textEditor.selectAll(self)
        }
    }
    
    override func cancelOperation(_ sender: Any?) {
        (window?.contentViewController as? AppViewController)?.focusInputField()
    }
}
