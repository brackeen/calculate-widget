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
    
    internal var widthConstraint: NSLayoutConstraint?
    
    var output: Calculate.Output? {
        didSet {
            guard let output = output else {
                return
            }
            inputLabel.stringValue = output.input
            outputLabel.stringValue = output.output
            if output.type == .error {
                outputLabel.textColor = NSColor(named: NSColor.Name("outputErrorColor"))
            } else {
                outputLabel.textColor = NSColor.labelColor
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        inputLabel.font = NSFont.monospacedDigitSystemFont(ofSize: inputLabel.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
        outputLabel.font = NSFont.monospacedDigitSystemFont(ofSize: outputLabel.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
    }
}
