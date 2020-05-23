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
    @IBOutlet weak var insertAnsButton: NSButton!
    @IBOutlet weak var monospaceFontButton: NSButton!
    @IBOutlet weak var moveToActiveSpaceButton: NSButton!
    @IBOutlet weak var shortcutView: MASShortcutView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        angleModeButton.selectItem(withTag: Calculate.shared.angleMode.rawValue)
        insertAnsButton.state = UserDefaults.standard.insertAnsEnabled ? .on : .off
        monospaceFontButton.state = UserDefaults.standard.monospaceFont ? .on : .off
        
        shortcutView.style = MASShortcutViewStyleTexturedRect
        shortcutView.associatedUserDefaultsKey = UserDefaults.HotkeyDefaultsKey
        shortcutView.shortcutValueChange = { [weak self] shortcutView in
            self?.moveToActiveSpaceButton.isEnabled = (shortcutView?.shortcutValue != nil)
        }

        moveToActiveSpaceButton.state = UserDefaults.standard.moveToActiveSpaceEnabled ? .on : .off
        moveToActiveSpaceButton.isEnabled = (shortcutView.shortcutValue != nil)
    }
    
    @IBAction func angleModeChanged(_ sender: Any) {
        if let angleMode = Calculate.AngleMode(rawValue: angleModeButton.selectedTag()) {
            Calculate.shared.angleMode = angleMode
        }
    }
    
    @IBAction func moveToActiveSpaceChanged(_ sender: Any) {
        UserDefaults.standard.moveToActiveSpaceEnabled = moveToActiveSpaceButton.state == .on
    }
    
    @IBAction func insertAnsChanged(_ sender: Any) {
        UserDefaults.standard.insertAnsEnabled = insertAnsButton.state == .on
    }
    
    @IBAction func monospaceFontChanged(_ sender: Any) {
        UserDefaults.standard.monospaceFont = monospaceFontButton.state == .on
    }
}
