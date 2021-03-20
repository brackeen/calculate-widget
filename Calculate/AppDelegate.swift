//
//  AppDelegate.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa
import KeyboardShortcuts

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    
    override init() {
        UserDefaults.standard.registerDefaults()
    }
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        KeyboardShortcuts.onKeyDown(for: .hotkey) { [weak self] in
            if let appWindow = NSApp.windows.first(where: { $0 is AppWindow}) as? AppWindow {
                appWindow.toggleActive()
            } else {
                self?.instantiateMainWindow()
            }
        }
    }
    
    private func instantiateMainWindow() {
        if let windowController = NSStoryboard.main?.instantiateInitialController() as? NSWindowController, let window = windowController.window as? AppWindow {
            window.toggleActive()
        }
    }
    
    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows: Bool) -> Bool {
        var mainOrPrefsFound = false
        if let appWindow = NSApp.windows.first(where: { $0 is AppWindow}) as? AppWindow {
            mainOrPrefsFound = true
            appWindow.makeKeyAndOrderFront(self)
            appWindow.focusInputField()
        } else {
            NSApp.windows.filter { $0 is AppearanceWindow }.forEach {
                mainOrPrefsFound = true
                $0.makeKeyAndOrderFront(self)
            }
        }
        if !mainOrPrefsFound {
            instantiateMainWindow()
        }
        return true
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        Calculate.shared.save()
        return false
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
