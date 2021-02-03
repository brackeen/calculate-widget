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
        if let textField = object as? SelectAllTextField {
            return textField.fieldEditor(createFlag)
        } else {
            return super.fieldEditor(createFlag, for: object)
        }
    }
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
