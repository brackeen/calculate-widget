//
//  AppView.swift
//  Calculate
//
//  Created by David Brackeen on 3/21/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class AppView: NSView {
    
    weak var viewToFocusOnClick: NSView?
    
    override func mouseDown(with event: NSEvent) {
        super.mouseDown(with: event)
        if let view = self.viewToFocusOnClick {
            let firstResponderView = view.window?.firstResponder as? NSView
            if firstResponderView == nil || firstResponderView!.ancestorShared(with: view) != view {
                view.window?.makeFirstResponder(view)
            }
        }
    }
}
