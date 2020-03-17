//
//  AppDelegate.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {
    
    static let hotkeyPreferenceKey = "hotkey"

    func applicationDidFinishLaunching(_ aNotification: Notification) {

    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    func applicationDidResignActive(_ notification: Notification) {
        Calculate.shared.save()
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        Calculate.shared.save()
    }
}
