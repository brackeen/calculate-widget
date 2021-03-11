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
        // Prevent focus loss when moving the window. Caveat: to detect return key, check `insertNewline` comand
        let textView = NSTextView()
        textView.isFieldEditor = false
        return textView
    }()
}
