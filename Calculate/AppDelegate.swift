//
//  AppDelegate.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    
    private var didDecodeRestorableState = false
    
    override init() {
        UserDefaults.standard.registerDefaults()
    }
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Scroll to bottom when the window was newly created
        if !didDecodeRestorableState {
            for case let window as AppWindow in NSApp.windows {
                window.scrollToBottom()
            }
        }
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
    
    func application(_ app: NSApplication, didDecodeRestorableState coder: NSCoder) {
        didDecodeRestorableState = true
    }

    func applicationDidResignActive(_ notification: Notification) {
        Calculate.shared.save()
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        Calculate.shared.save()
    }
    
    @IBAction func checkForUpdates(_ sender: Any) {
        if let url = URL(string: "https://github.com/brackeen/calculate-widget/releases") {
            NSWorkspace.shared.open(url)
        }
    }
}
