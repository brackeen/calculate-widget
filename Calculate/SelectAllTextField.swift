//
//  SelectAllTextField.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class SelectAllTextField: NSTextField, HasCustomFieldEditor {
    
    static var customFieldEditor: NSText = SelectAllTextView()
    
    // Select all when clicking
    override func mouseDown(with event: NSEvent) {
        super.mouseDown(with: event)
        if let textEditor = currentEditor(), textEditor.selectedRange.length == 0 {
            textEditor.selectAll(self)
        }
    }
    
    // Focus input field when pressing "Esc"
    override func cancelOperation(_ sender: Any?) {
        (window?.contentViewController as? AppViewController)?.focusInputField()
    }
}

fileprivate class SelectAllTextView: NSTextView {

    // When copying text to the clipboard, do not include invisible break characters.
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
