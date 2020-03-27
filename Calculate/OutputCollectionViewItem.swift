//
//  OutputCollectionViewItem.swift
//  Calculate
//
//  Created by David Brackeen on 3/16/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class OutputCollectionViewItem: NSCollectionViewItem, OutputItem {
    
    static let identifier = NSUserInterfaceItemIdentifier("OutputCollectionViewItem")
    
    @IBOutlet weak var inputLabel: NSTextField!
    @IBOutlet weak var outputLabel: NSTextField!
    @IBOutlet weak var inputLabelLeadingConstraint: NSLayoutConstraint!
    @IBOutlet weak var outputLabelLeadingConstraint: NSLayoutConstraint!
    
    internal var widthConstraint: NSLayoutConstraint?
    
    var output: Calculate.Output? {
        didSet {
            guard let output = output else {
                return
            }
            let inputFont = NSFont.appFont(ofSize: inputLabel.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
            let outputFont = NSFont.appFont(ofSize: outputLabel.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
            let indent = ("00" as NSString).size(withAttributes: [NSAttributedString.Key.font: outputFont]).width
            inputLabel.font = inputFont
            outputLabel.font = outputFont
            outputLabelLeadingConstraint.constant = inputLabelLeadingConstraint.constant + indent
            inputLabel.stringValue = output.input.breakOnSymbols()
            outputLabel.stringValue = output.output.breakOnSymbols()
            if output.type == .error {
                outputLabel.textColor = NSColor(named: NSColor.Name("outputErrorColor"))
            } else {
                outputLabel.textColor = NSColor.labelColor
            }
        }
    }
}
