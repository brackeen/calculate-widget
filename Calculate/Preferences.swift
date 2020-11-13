//
//  Preferences.swift
//  Calculate
//
//  Created by David Brackeen on 5/23/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation

extension UserDefaults {
    
    static let HotkeyDefaultsKey = "hotkey"
    static let FontDidChange = NSNotification.Name("FontDidChange")

    private static let HotkeyMoveToActiveSpaceDefaultsKey = "hotkeyMoveToActiveSpace"
    private static let InsertAnsDefaultsKey = "insertAns"
    private static let MonospaceFontKey = "monospace"
    
    var moveToActiveSpaceEnabled: Bool {
        get {
            return bool(forKey: UserDefaults.HotkeyMoveToActiveSpaceDefaultsKey)
        }
        set {
            set(newValue, forKey: UserDefaults.HotkeyMoveToActiveSpaceDefaultsKey)
        }
    }
    
    var insertAnsEnabled: Bool {
        get {
            return bool(forKey: UserDefaults.InsertAnsDefaultsKey)
        }
        set {
            set(newValue, forKey: UserDefaults.InsertAnsDefaultsKey)
        }
    }
    
    var monospaceFont: Bool {
        get {
            return bool(forKey: UserDefaults.MonospaceFontKey)
        }
        set {
            if newValue != monospaceFont {
                set(newValue, forKey: UserDefaults.MonospaceFontKey)
                NotificationCenter.default.post(name: UserDefaults.FontDidChange, object: nil)
            }
        }
    }
    
    var isHotKeySet: Bool {
        let shortcutView = MASShortcutView()
        shortcutView.associatedUserDefaultsKey = UserDefaults.HotkeyDefaultsKey
        return shortcutView.shortcutValue != nil
    }
    
    func registerDefaults() {
        register(defaults: [
            UserDefaults.HotkeyMoveToActiveSpaceDefaultsKey: true,
            UserDefaults.InsertAnsDefaultsKey: true,
            UserDefaults.MonospaceFontKey: false,
        ])
    }
}
