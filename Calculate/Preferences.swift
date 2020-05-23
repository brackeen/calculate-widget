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

    private static let hotkeyMoveToActiveSpaceDefaultsKey = "hotkeyMoveToActiveSpace"
    private static let insertAnsDefaultsKey = "insertAns"
    
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
    
    func registerDefaults() {
        register(defaults: [
            UserDefaults.hotkeyMoveToActiveSpaceDefaultsKey: true,
            UserDefaults.insertAnsDefaultsKey: true,
        ])
    }
}
