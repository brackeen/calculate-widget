//
//  AppWindow.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class AppWindow: AppearanceWindow {
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.backgroundColor = NSColor(named: NSColor.Name("backgroundColor"))
    }
    
    override func fieldEditor(_ createFlag: Bool, for object: Any?) -> NSText? {
        if let field = object as? HasCustomFieldEditor {
            return type(of: field).customFieldEditor
        } else {
            return super.fieldEditor(createFlag, for: object)
        }
    }
    
    override func close() {
        // Release the window without crashing. This seems to be required for the first window created
        isReleasedWhenClosed = windowController != nil
        super.close()
    }
    
    func scrollToBottom() {
        (contentViewController as? AppViewController)?.scrollToBottom()
    }
    
    func toggleActive() {
        (contentViewController as? AppViewController)?.toggleActive()
    }
    
    func focusInputField() {
        (contentViewController as? AppViewController)?.focusInputField()
    }
}

protocol HasCustomFieldEditor {
    static var customFieldEditor: NSText { get }
}

extension NSWindow {
    
    func viewIsFirstResponder(_ view: NSView) -> Bool {
        if let firstResponderView = view.window?.firstResponder as? NSView {
            return firstResponderView.ancestorShared(with: view) == view
        } else {
            return false
        }
    }
}
