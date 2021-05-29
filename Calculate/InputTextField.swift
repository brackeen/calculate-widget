//
//  InputTextField.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/21.
//  Copyright © 2021 David Brackeen. All rights reserved.
//

import Cocoa

class InputTextField: NSTextField, HasCustomFieldEditor {
    
    static var customFieldEditor: NSText = {
        // Set `isFieldEditor` to false to prevent focus loss when moving the window.
        // Caveat: to detect return key, check `insertNewline` command
        let textView = NSTextView()
        textView.isRichText = false
        textView.isFieldEditor = false
        textView.isAutomaticQuoteSubstitutionEnabled = false
        textView.isAutomaticDashSubstitutionEnabled = false
        textView.isAutomaticDataDetectionEnabled = false
        return textView
    }()
    
    // Hide app when pressing "Esc"
    override func cancelOperation(_ sender: Any?) {
        NSApp.hide(nil)
    }
}
