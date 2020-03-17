//
//  PreferencesViewController.swift
//  Calculate
//
//  Created by David Brackeen on 3/17/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class PreferencesViewController: NSViewController {
    
    @IBOutlet weak var angleModeButton: NSPopUpButton!
    @IBOutlet weak var shortcutView: MASShortcutView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        angleModeButton.selectItem(withTag: Calculate.shared.angleMode.rawValue)
        
        shortcutView.style = MASShortcutViewStyleTexturedRect
        shortcutView.associatedUserDefaultsKey = AppDelegate.hotkeyPreferenceKey
    }
    
    @IBAction func angleModeChanged(_ sender: Any) {
        if let angleMode = Calculate.AngleMode(rawValue: angleModeButton.selectedTag()) {
            Calculate.shared.angleMode = angleMode
        }
    }
}
