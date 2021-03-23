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
            let font = NSFont.appFont(ofSize: textField?.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
            let boldFont = NSFont.appFont(ofSize: textField?.font?.pointSize ?? NSFont.systemFontSize, weight: .bold)
            let indent = ("00" as NSString).size(withAttributes: [.font: font]).width
            let paragraphStyle = NSMutableParagraphStyle()
            paragraphStyle.firstLineHeadIndent = 0

            let textColor: NSColor
            let string: String
            if output.type == .memory {
                string = key + " = " + value
                textColor = NSColor(named: NSColor.Name("memoryColor")) ?? NSColor.labelColor
                paragraphStyle.headIndent = indent
            } else {
                string = key + value
                textColor = NSColor.labelColor
                topSpacingConstraint?.constant = 12
                bottomSpacingConstraint?.constant = value.isEmpty ? 0 : 4
                
                let bullet = "\u{2022}"
                if value.contains(bullet) {
                    paragraphStyle.headIndent = max(indent, (" \u{2022} " as NSString).size(withAttributes: [.font: font]).width)
                    paragraphStyle.tabStops = [NSTextTab(textAlignment: .left, location: paragraphStyle.headIndent, options: [:])]
                }
            }
            
            let attributedString = NSMutableAttributedString(string: string, attributes: [
                .paragraphStyle: paragraphStyle,
                .font: font,
                .foregroundColor: textColor])
            if output.type == .memory {
                attributedString.addAttribute(.foregroundColor, value: NSColor.labelColor, range: keyRange)
            } else {
                attributedString.addAttribute(.font, value: boldFont, range: keyRange)
            }
            
            textField?.attributedStringValue = attributedString
            textField?.allowsEditingTextAttributes = true
        }
    }
    
    var isFirstInList: Bool = false {
        didSet {
            topSpacingConstraint?.constant = isFirstInList ? 8 : 0
        }
    }

    var isLastInList: Bool = false {
        didSet {
            bottomSpacingConstraint?.constant = isLastInList ? 8 : 0
        }
    }
}
