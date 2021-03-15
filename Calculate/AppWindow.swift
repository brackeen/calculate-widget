//
//  AppWindow.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class AppWindow: NSWindow {
    
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
    
    func scrollToBottom() {
        if let viewController = contentViewController as? AppViewController {
            viewController.scrollToBottom()
        }
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
