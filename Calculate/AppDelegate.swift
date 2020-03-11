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

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Quick test
        var result = Calculate.shared.calc("myvar=[2^8, cos(pi)]") ?? ""
        print(result)
        result = Calculate.shared.calc("myvar[0]") ?? ""
        print(result)
        Calculate.shared.getUserVariables().forEach { (name) in
            print("User variable: \(name)")
        }
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
