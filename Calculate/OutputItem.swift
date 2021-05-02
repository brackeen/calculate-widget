//
//  OutputItem.swift
//  Calculate
//
//  Created by David Brackeen on 3/17/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

protocol OutputItem: AnyObject {
    
    var widthConstraint: NSLayoutConstraint? { get set }
    var view: NSView { get }
    var output: Calculate.Output? { get set }
    
    static var identifier: NSUserInterfaceItemIdentifier { get }
    static func loadFromNib() -> Self?
}

extension OutputItem {
    
    func fittingSize(forWidth width: CGFloat) -> NSSize {
        if let widthConstraint = widthConstraint {
            widthConstraint.constant = width
        } else {
            widthConstraint = NSLayoutConstraint(item: view, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1, constant: width)
            view.addConstraint(widthConstraint!)
        }
        
        view.layoutSubtreeIfNeeded()
        
        return view.fittingSize
    }
    
    static func loadFromNib() -> Self? {
        var topLevelObjects: NSArray?
        NSNib(nibNamed: identifier.rawValue, bundle: nil)?.instantiate(withOwner: nil, topLevelObjects: &topLevelObjects)
        return topLevelObjects?.compactMap({ $0 as? Self }).first
    }
}
