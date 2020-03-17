//
//  MemoryCollectionViewItem.swift
//  Calculate
//
//  Created by David Brackeen on 3/17/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class MemoryCollectionViewItem: NSCollectionViewItem, OutputItem {
    
    static let identifier = NSUserInterfaceItemIdentifier("MemoryCollectionViewItem")
    
    @IBOutlet weak var topSpacingConstraint: NSLayoutConstraint?
    @IBOutlet weak var bottomSpacingConstraint: NSLayoutConstraint?
    
    internal var widthConstraint: NSLayoutConstraint?
    
    var output: Calculate.Output? {
        didSet {
            guard let output = output else {
                return
            }
            let key = output.input
            let value = output.output.breakOnSymbols()
            let keyRange = NSRange(key.startIndex..<key.endIndex, in: key)
            let font = NSFont.monospacedDigitSystemFont(ofSize: textField?.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
            let boldFont = NSFont.monospacedDigitSystemFont(ofSize: textField?.font?.pointSize ?? NSFont.systemFontSize, weight: .bold)
            let paragraph = NSMutableParagraphStyle()
            paragraph.firstLineHeadIndent = 0
            paragraph.headIndent = 18

            let attributedString = NSMutableAttributedString(
                string: key + " = " + value,
                attributes: [
                    NSAttributedString.Key.paragraphStyle: paragraph,
                    NSAttributedString.Key.font: font,
                    NSAttributedString.Key.foregroundColor: NSColor.labelColor
                ]
            )
            attributedString.addAttribute(NSAttributedString.Key.font, value: boldFont, range: keyRange)
            
            textField?.attributedStringValue = attributedString
            textField?.allowsEditingTextAttributes = true
        }
    }
    
    var isFirstInList: Bool = false {
        didSet {
            topSpacingConstraint?.constant = isFirstInList ? 4 : 0
        }
    }

    var isLastInList: Bool = false {
        didSet {
            bottomSpacingConstraint?.constant = isLastInList ? 4 : 0
        }
    }
}
