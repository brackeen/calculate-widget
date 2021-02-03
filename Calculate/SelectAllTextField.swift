//
//  SelectAllTextField.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class SelectAllTextField: NSTextField {
    
    private weak var fieldEditor: NSTextView?
    
    override func mouseDown(with event: NSEvent) {
        super.mouseDown(with: event)
        if let textEditor = currentEditor(), textEditor.selectedRange.length == 0 {
            textEditor.selectAll(self)
        }
    }
    
    override func cancelOperation(_ sender: Any?) {
        (window?.contentViewController as? AppViewController)?.focusInputField()
    }
    
    func fieldEditor(_ createFlag: Bool) -> NSText? {
        var fieldEditor = self.fieldEditor
        if !createFlag || fieldEditor != nil {
            return fieldEditor
        }
        fieldEditor = SelectAllTextView()
        self.fieldEditor = fieldEditor
        return fieldEditor
    }
}

class SelectAllTextView: NSTextView {

    override func writeSelection(to pboard: NSPasteboard, type: NSPasteboard.PasteboardType) -> Bool {
        var stringToCopy = ""
        selectedRanges.forEach { value in
            let range = value.rangeValue
            stringToCopy += (string as NSString).substring(with: range)
        }
        stringToCopy.removeInvisibleBreaks()
        if stringToCopy.isEmpty {
            return false
        } else {
            return NSPasteboard.general.setString(stringToCopy, forType: type)
        }
    }
}
