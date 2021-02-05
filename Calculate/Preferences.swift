//
//  Preferences.swift
//  Calculate
//
//  Created by David Brackeen on 5/23/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation

extension UserDefaults {
    
    static let hotkeyDefaultsKey = "hotkey"
    
    static let fontDidChangeNotification = NSNotification.Name("fontDidChangeNotification")
    static let toolbarVisibilityDidChangeNotification = NSNotification.Name("toolbarVisibilityDidChangeNotification")
    
    enum ToolbarVisibility: Int {
        case auto = 0
        case always = 1
        case never = 2
    }

    private static let hotkeyMoveToActiveSpaceDefaultsKey = "hotkeyMoveToActiveSpace"
    private static let insertAnsDefaultsKey = "insertAns"
    private static let monospaceFontKey = "monospace"
    private static let toolbarVisibilityKey = "toolbarVisibility"
    
    var moveToActiveSpaceEnabled: Bool {
        get {
            return bool(forKey: UserDefaults.hotkeyMoveToActiveSpaceDefaultsKey)
        }
        set {
            set(newValue, forKey: UserDefaults.hotkeyMoveToActiveSpaceDefaultsKey)
        }
    }
    
    var insertAnsEnabled: Bool {
        get {
            return bool(forKey: UserDefaults.insertAnsDefaultsKey)
        }
        set {
            set(newValue, forKey: UserDefaults.insertAnsDefaultsKey)
        }
    }
    
    var monospaceFont: Bool {
        get {
            return bool(forKey: UserDefaults.monospaceFontKey)
        }
        set {
            if newValue != monospaceFont {
                set(newValue, forKey: UserDefaults.monospaceFontKey)
                NotificationCenter.default.post(name: UserDefaults.fontDidChangeNotification, object: nil)
            }
        }
    }
    
    var toolbarVisibility: ToolbarVisibility {
        get {
            return ToolbarVisibility(rawValue: integer(forKey: UserDefaults.toolbarVisibilityKey)) ?? .auto
        }
        set {
            set(newValue.rawValue, forKey: UserDefaults.toolbarVisibilityKey)
            NotificationCenter.default.post(name: UserDefaults.toolbarVisibilityDidChangeNotification, object: nil)
        }
    }
    
    var isHotKeySet: Bool {
        let shortcutView = MASShortcutView()
        shortcutView.associatedUserDefaultsKey = UserDefaults.hotkeyDefaultsKey
        return shortcutView.shortcutValue != nil
    }
    
    func registerDefaults() {
        register(defaults: [
            UserDefaults.hotkeyMoveToActiveSpaceDefaultsKey: true,
            UserDefaults.insertAnsDefaultsKey: true,
            UserDefaults.monospaceFontKey: false,
            UserDefaults.toolbarVisibilityKey: ToolbarVisibility.auto.rawValue,
        ])
    }
}
