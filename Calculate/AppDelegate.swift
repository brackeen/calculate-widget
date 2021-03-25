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
        activateMainWindow(sender)
        return true
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        Calculate.shared.save()
        // Terminate if hotkey not set
        return KeyboardShortcuts.getShortcut(for: .hotkey) == nil
    }

    func applicationDidResignActive(_ notification: Notification) {
        Calculate.shared.save()
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        Calculate.shared.save()
    }
    
    @IBAction func activateMainWindow(_ sender: Any) {
        if let appWindow = NSApp.windows.first(where: { $0 is AppWindow}) as? AppWindow {
            appWindow.makeKeyAndOrderFront(self)
            appWindow.focusInputField()
        } else {
            instantiateMainWindow()
        }
    }
    
    @IBAction func checkForUpdates(_ sender: Any) {
        if let appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String,
           let encodedAppVersion = appVersion.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
           let url = URL(string: "http://www.brackeen.com/calculate/?version=" + encodedAppVersion) {
            NSWorkspace.shared.open(url)
        }
    }
}
