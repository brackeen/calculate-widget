//
//  AppearanceWindow.swift
//  Calculate
//
//  Created by David Brackeen on 3/18/21.
//  Copyright © 2021 David Brackeen. All rights reserved.
//

import AppKit

class AppearanceWindow: NSWindow {
    
    override func awakeFromNib() {
        super.awakeFromNib()
        appearance = UserDefaults.standard.appearance.nsAppearance
    }
}
