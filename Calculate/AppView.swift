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
    private var trackingArea: NSTrackingArea?
    private var toolbarVisibility: UserDefaults.ToolbarVisibility = .auto;
    
    override func awakeFromNib() {
        super.awakeFromNib()
        toolbarVisibility = UserDefaults.standard.toolbarVisibility;
        NotificationCenter.default.addObserver(self, selector: #selector(toolbarVisibilityDidChange), name: UserDefaults.toolbarVisibilityDidChangeNotification, object: nil)
    }
    
    override func mouseDown(with event: NSEvent) {
        super.mouseDown(with: event)
        if let view = viewToFocusOnClick, let window = view.window, !window.viewIsFirstResponder(view) {
            window.makeFirstResponder(view)
        }
    }
    
    override func viewDidMoveToWindow() {
        super.viewDidMoveToWindow()
        updateTrackingArea()
        if toolbarVisibility != .always {
            showTitleBar(false, animated: false)
        }
    }
    
    override func setFrameSize(_ newSize: NSSize) {
        super.setFrameSize(newSize)
        updateTrackingArea()
    }
    
    override func mouseMoved(with event: NSEvent) {
        if toolbarVisibility == .auto {
            showTitleBar(true)
        }
    }
    
    override func mouseExited(with event: NSEvent) {
        guard toolbarVisibility == .auto else {
            return
        }
        let customizationPaletteIsRunning = window?.toolbar?.customizationPaletteIsRunning ?? false
        if !customizationPaletteIsRunning {
            showTitleBar(false)
        }
    }
    
    @objc func toolbarVisibilityDidChange(_ sender: Any) {
        toolbarVisibility = UserDefaults.standard.toolbarVisibility
        if toolbarVisibility == .always {
            showTitleBar(true)
        } else if toolbarVisibility == .never {
            showTitleBar(false)
        }
    }
    
    func showTitleBar(_ visible: Bool, animated: Bool = true) {
        var titleBarView = window?.standardWindowButton(.closeButton)?.superview
        if #available(macOS 11, *) {
            titleBarView = titleBarView?.superview
        }
        if let titleBarView = titleBarView {
            let newAlpha: CGFloat = visible ? 1.0 : 0.0
            if titleBarView.alphaValue != newAlpha {
                if animated {
                    titleBarView.animator().alphaValue = newAlpha
                } else {
                    titleBarView.alphaValue = newAlpha
                }
            }
        }
    }
    
    private func updateTrackingArea() {
        if let oldTrackingArea = trackingArea {
            removeTrackingArea(oldTrackingArea)
            trackingArea = nil
        }
        if window != nil {
            let newTrackingArea = NSTrackingArea(rect: frame, options: [.mouseEnteredAndExited, .mouseMoved, .activeAlways], owner: self, userInfo: nil)
            addTrackingArea(newTrackingArea)
            trackingArea = newTrackingArea
        }
    }
}
