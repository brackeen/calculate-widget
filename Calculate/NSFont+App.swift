//
//  NSFont+App.swift
//  Calculate
//
//  Created by David Brackeen on 3/27/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

extension NSFont {
    
    class func appFont(ofSize fontSize: CGFloat, weight: NSFont.Weight) -> NSFont {
        let monospace = UserDefaults.standard.monospaceFont
        if monospace {
            if #available(OSX 10.15, *) {
                return NSFont.monospacedSystemFont(ofSize: fontSize, weight: weight)
            } else {
                var font = NSFont(name: "SF Mono", size: fontSize) ?? NSFont.userFixedPitchFont(ofSize: fontSize) ?? NSFont(name: "Menlo", size: fontSize) ?? NSFont(name: "Monaco", size: fontSize) ?? NSFont.systemFont(ofSize: fontSize)
                if !font.isFixedPitch {
                    font = NSFontManager.shared.convert(font, toHaveTrait: .fixedPitchFontMask)
                }
                if weight == .black || weight == .bold || weight == .semibold || weight == .heavy {
                    font = NSFontManager.shared.convert(font, toHaveTrait: .boldFontMask)
                }
                return font
            }
        } else {
            return NSFont.monospacedDigitSystemFont(ofSize: fontSize, weight: weight)
        }
    }
}
