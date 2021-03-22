//
//  Preferences.swift
//  Calculate
//
//  Created by David Brackeen on 5/23/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation
import AppKit
import KeyboardShortcuts

extension UserDefaults {
    
    static let fontDidChangeNotification = NSNotification.Name("fontDidChangeNotification")
    static let toolbarVisibilityDidChangeNotification = NSNotification.Name("toolbarVisibilityDidChangeNotification")
    
    enum ToolbarVisibility: Int {
        case auto = 0
        case always = 1
        case never = 2
    }
    
    enum Appearance: Int {
        case system = 0
        case light = 1
        case dark = 2
        
        var nsAppearance: NSAppearance? {
            switch self {
            case .system:
                return nil
            case .light:
                return NSAppearance(named: .aqua)
            case .dark:
                return NSAppearance(named: .darkAqua)
            }
        }
    }

    private static let hotkeyMoveToActiveSpaceDefaultsKey = "hotkeyMoveToActiveSpace"
    private static let insertAnsDefaultsKey = "insertAns"
    private static let monospaceFontKey = "monospace"
    private static let toolbarVisibilityKey = "toolbarVisibility"
    private static let appearanceKey = "appearance"
    
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
            if newValue != toolbarVisibility {
                set(newValue.rawValue, forKey: UserDefaults.toolbarVisibilityKey)
                NotificationCenter.default.post(name: UserDefaults.toolbarVisibilityDidChangeNotification, object: nil)
            }
        }
    }
    
    var appearance: Appearance {
        get {
            return Appearance(rawValue: integer(forKey: UserDefaults.appearanceKey)) ?? .system
        }
        set {
            set(newValue.rawValue, forKey: UserDefaults.appearanceKey)
        }
    }
    
    var isHotKeySet: Bool {
        return KeyboardShortcuts.getShortcut(for: .hotkey) != nil
    }
    
    func registerDefaults() {
        register(defaults: [
            UserDefaults.hotkeyMoveToActiveSpaceDefaultsKey: true,
            UserDefaults.insertAnsDefaultsKey: true,
            UserDefaults.monospaceFontKey: false,
            UserDefaults.appearanceKey: Appearance.system.rawValue,
            UserDefaults.toolbarVisibilityKey: ToolbarVisibility.auto.rawValue,
        ])
    }
}

extension KeyboardShortcuts.Name {
    static let hotkey = Self("hotkey")
}
