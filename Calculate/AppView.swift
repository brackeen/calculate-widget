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
    private var toolbarVisibility: UserDefaults.ToolbarVisibility = .auto
    private var currentAnimationId: UUID = UUID()
    
    override func awakeFromNib() {
        super.awakeFromNib()
        toolbarVisibility = UserDefaults.standard.toolbarVisibility
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
        
        let isFullScreen = window?.styleMask.contains(.fullScreen) ?? false
        let hideTitleBar = toolbarVisibility == .never || (toolbarVisibility == .auto && !isFullScreen)
        if hideTitleBar {
            showTitleBar(false, animated: false, force: true)
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
        hideTitleBarIfPossible()
    }
    
    func hideTitleBarIfPossible() {
        let isFullScreen = window?.styleMask.contains(.fullScreen) ?? false
        let hideTitleBar = toolbarVisibility == .never || (toolbarVisibility == .auto && !isFullScreen)
        let customizationPaletteIsRunning = window?.toolbar?.customizationPaletteIsRunning ?? false
        if !customizationPaletteIsRunning && hideTitleBar {
            showTitleBar(false)
        }
    }
    
    @objc func toolbarVisibilityDidChange(_ sender: Any) {
        toolbarVisibility = UserDefaults.standard.toolbarVisibility
        if toolbarVisibility == .always {
            showTitleBar(true, force: true)
        } else if toolbarVisibility == .never {
            showTitleBar(false, force: true)
        }
        updateTrackingArea()
    }
    
    private func setToolbarVisibility(_ visible: Bool) {
        guard let window = window else {
            return
        }
        if let toolbar = window.toolbar, !toolbar.items.isEmpty {
            // Prevent buttons from being tappable (or showing tooltips) when toolbar is invisible.
            // Only set if (!toolbar.items.isEmpty) otherwise the toolbar items will not be added on launch.
            toolbar.isVisible = visible
        }
        window.standardWindowButton(.closeButton)?.isHidden = !visible
        window.standardWindowButton(.miniaturizeButton)?.isHidden = !visible
        window.standardWindowButton(.zoomButton)?.isHidden = !visible
    }
    
    private func showTitleBar(_ visible: Bool, animated: Bool = true, force: Bool = false) {
        var titleBarView = window?.standardWindowButton(.closeButton)?.superview
        if #available(macOS 11, *) {
            titleBarView = titleBarView?.superview
        }
        if let titleBarView = titleBarView {
            let newAlpha: CGFloat = visible ? 1.0 : 0.0
            if force || titleBarView.alphaValue != newAlpha {
                let animationId = UUID()
                currentAnimationId = animationId
                if animated {
                    if toolbarVisibility != .never {
                        setToolbarVisibility(true)
                    }
                    NSAnimationContext.runAnimationGroup { context in
                        titleBarView.animator().alphaValue = newAlpha
                    } completionHandler: { [weak self] in
                        if let self = self, self.currentAnimationId == animationId {
                            if self.toolbarVisibility == .never {
                                self.setToolbarVisibility(false)
                            }
                        }
                    }
                } else {
                    setToolbarVisibility(toolbarVisibility != .never)
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
        let isFullScreen = window?.styleMask.contains(.fullScreen) ?? false
        if window != nil && toolbarVisibility == .auto && !isFullScreen {
            let newTrackingArea = NSTrackingArea(rect: frame, options: [.mouseEnteredAndExited, .mouseMoved, .activeAlways], owner: self, userInfo: nil)
            addTrackingArea(newTrackingArea)
            trackingArea = newTrackingArea
        }
    }
}
