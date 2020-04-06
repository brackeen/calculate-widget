//
//  NSWindow+MoveToActiveSpace.swift
//  Calculate
//
//  Created by David Brackeen on 4/5/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

extension NSWindow {
    
    /**
     Moves the window to the active space, allowing it to appear on top of full screen windows.
     Note: This window should not have the .moveToActiveSpace collection behavior at all times because
     this causes window ordering issues when switching spaces.
     Tested on macOS 10.15.4 (Catalina) only.
     */
    func moveToActiveSpace(allowOverFullscreen: Bool = true, completion: (() -> Void)? = nil) {
        guard !isOnActiveSpace, NSApp.activationPolicy() == .regular else {
            NSApp.activate(ignoringOtherApps: true)
            completion?()
            return
        }
        
        guard NSApp.isHidden else {
            NSApp.hide(nil)
            DispatchQueue.main.async {
                self.moveToActiveSpace(completion: completion)
            }
            return
        }
        
        let originalWindowCollectionBehavior = collectionBehavior
        collectionBehavior = [ .moveToActiveSpace ]
        if allowOverFullscreen && NSWorkspace.shared.isActiveSpaceFullScreen() {
            // Hack to appear on a full screen space. Tested on Catalina
            NSApp.setActivationPolicy(.accessory)
            NSApp.unhideWithoutActivation()
            NSApp.hide(nil)
            NSApp.setActivationPolicy(.regular)
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            NSApp.activate(ignoringOtherApps: true)
            DispatchQueue.main.async {
                self.collectionBehavior = originalWindowCollectionBehavior
                completion?()
            }
        }
    }
}

extension NSWorkspace {
    
    func isActiveSpaceFullScreen() -> Bool {
        guard let winInfoArray = CGWindowListCopyWindowInfo([.excludeDesktopElements, .optionOnScreenOnly], kCGNullWindowID) as? Array<[String : Any]> else {
            return false
        }
        for winInfo in winInfoArray {
            guard let windowLayer = winInfo[kCGWindowLayer as String] as? NSNumber, windowLayer == 0 else {
                continue
            }
            guard let boundsDict = winInfo[kCGWindowBounds as String] as? [String : Any], let bounds = CGRect(dictionaryRepresentation: boundsDict as CFDictionary) else {
                continue
            }
            if bounds.size == NSScreen.main?.frame.size {
                return true
            }
        }
        return false
    }
}
