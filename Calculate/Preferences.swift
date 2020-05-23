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

    private static let hotkeyMoveToActiveSpaceDisabledDefaultsKey = "hotkeyMoveToActiveSpaceDisabled"
    
    var moveToActiveSpaceEnabled: Bool {
        get {
            return !bool(forKey: UserDefaults.hotkeyMoveToActiveSpaceDisabledDefaultsKey)
        }
        set {
            set(!newValue, forKey: UserDefaults.hotkeyMoveToActiveSpaceDisabledDefaultsKey)
        }
    }
}
