//
//  ViewController.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {
    
    @IBOutlet weak var inputField: NSTextField!
    @IBOutlet weak var outputCollectionView: NSCollectionView!
    
    fileprivate var textFieldWasEmpty = true
    fileprivate var allowInsertAnsVariable = true
    fileprivate var historyEnd: String?
    fileprivate var completions: [String]?
    fileprivate var completionWordStart = "".endIndex
    
    fileprivate var prototypeOutputCollectionViewItem: OutputCollectionViewItem!
    fileprivate var prototypeOutputCollectionViewItemSize: CGSize = .zero

    override func viewDidLoad() {
        super.viewDidLoad()
        
        var topLevelObjects: NSArray?
        NSNib(nibNamed: OutputCollectionViewItem.identifier.rawValue, bundle: nil)?.instantiate(withOwner: nil, topLevelObjects: &topLevelObjects)
        prototypeOutputCollectionViewItem = topLevelObjects!.compactMap({ $0 as? OutputCollectionViewItem }).first!
        prototypeOutputCollectionViewItemSize.width = view.frame.width
        prototypeOutputCollectionViewItemSize.height = prototypeOutputCollectionViewItem.view.frame.height

        inputField.font = NSFont.monospacedDigitSystemFont(ofSize: inputField.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
        
        if !Calculate.shared.hasInputHistory() {
            inputField.stringValue = "1+1"
        }
        inputField.selectText(nil)
    }

    override func viewWillLayout() {
        super.viewWillLayout()
        
        prototypeOutputCollectionViewItemSize.width = view.frame.width
        if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
            if layout.itemSize != prototypeOutputCollectionViewItemSize {
                layout.itemSize = prototypeOutputCollectionViewItemSize
                layout.invalidateLayout()
            }
        }
    }
    
    @IBAction func copyLastAnswer(_ sender: Any) {
        if let lastAnswer = Calculate.shared.outputHistory.last?.output {
            NSPasteboard.general.declareTypes([.string], owner: nil)
            NSPasteboard.general.setString(lastAnswer, forType: .string)
        }
    }
    
    @IBAction func enterPressed(_ sender: Any) {
        var expression = inputField.stringValue
        var addToHistory = true
        
        if expression.isEmpty {
            if let prevExpression = Calculate.shared.getInputHistoryPrev(), !prevExpression.isEmpty {
                expression = prevExpression
                addToHistory = false
            } else {
                return
            }
        }
        
        let originalOutputCount = Calculate.shared.outputHistory.count
        Calculate.shared.calc(expression, addToHistory: addToHistory)
        
        let outputCount = Calculate.shared.outputHistory.count
        outputCollectionView.performBatchUpdates({
            if outputCount <= originalOutputCount {
                let deletedCount = originalOutputCount - originalOutputCount + 1
                let deletedIndexPaths = Set((0..<deletedCount).map { IndexPath(item: $0, section: 0) })
                outputCollectionView.deleteItems(at: deletedIndexPaths)
            }
            outputCollectionView.insertItems(at: [IndexPath(item: outputCount - 1, section: 0)])
        }, completionHandler: nil)
        scrollToBottom()
        
        inputField.stringValue = ""
        textFieldWasEmpty = true
        allowInsertAnsVariable = true
        historyEnd = nil
        completions = nil
    }
    
    fileprivate func scrollToBottom() {
        let outputCount = Calculate.shared.outputHistory.count
        if outputCount > 0 {
            var frame = outputCollectionView.frameForItem(at: outputCount - 1)
            if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
                frame.size.height += layout.sectionInset.bottom
            }
            outputCollectionView.scrollToVisible(frame)
        }
    }
    
    fileprivate func doAutocomplete(forward: Bool) {
        let input = inputField.stringValue
        
        guard !input.isEmpty else {
            return
        }
        
        if let completions = completions {
            if completions.count > 1 {
                let lastCompletion = String(input[completionWordStart...])
                let offset = forward ? 1 : completions.count - 1
                for i in completions.indices {
                    if lastCompletion == completions[i] {
                        let j = (i + offset) % completions.count
                        inputField.stringValue = input[..<completionWordStart] + completions[j]
                        inputField.currentEditor()?.moveToEndOfLine(nil)
                        break
                    }
                }
            }
        } else {
            let cursorAtEnd: Bool
            if let nsSelectedRange = inputField.currentEditor()?.selectedRange, let selectedRange = Range<String.Index>(nsSelectedRange, in: input) {
                cursorAtEnd = selectedRange.lowerBound == input.endIndex
            } else {
                cursorAtEnd = false
            }
            
            if cursorAtEnd {
                var allowedCharacterSet = CharacterSet.alphanumerics
                allowedCharacterSet.insert(charactersIn: "_")

                completionWordStart = input.endIndex
                for index in input.indices.reversed() {
                    let suffix = input[index...]
                    let isAllowed = suffix.rangeOfCharacter(from: allowedCharacterSet.inverted) == nil
                    if isAllowed {
                        completionWordStart = index
                    } else {
                        break
                    }
                }
                
                if completionWordStart < input.endIndex {
                    let prefix = String(input[completionWordStart...])
                    let completions = Calculate.shared.getCompletions(prefix: prefix)
                    if !completions.isEmpty {
                        var completion = completions[0]
                        // Make the first completion of "e" be "exp", then cycle back to "e"
                        if prefix == completion && completions.count > 1 {
                            completion = completions[1]
                        }
                        inputField.stringValue = input[..<completionWordStart] + completion
                        inputField.currentEditor()?.moveToEndOfLine(nil)
                    }
                    self.completions = completions
                }
            }
        }
    }
}

extension ViewController: NSTextFieldDelegate {

    func controlTextDidChange(_ obj: Notification) {
        completions = nil
        let text = inputField.stringValue
        if text.isEmpty {
            textFieldWasEmpty = true
        } else {
            if let ch = text.first, textFieldWasEmpty && allowInsertAnsVariable &&
                (ch == "+" || ch == "-" || ch == "*" || ch == "/" || ch == "%" || ch == "&" || ch == "|" || ch == "^") {
                inputField.stringValue = "ans" + text
                inputField.currentEditor()?.moveToEndOfLine(nil)
                allowInsertAnsVariable = false
            }
            textFieldWasEmpty = false
        }
    }
    
    func control(_ control: NSControl, textView: NSTextView, doCommandBy commandSelector: Selector) -> Bool {
        if commandSelector == #selector(insertTab(_:)) {
            doAutocomplete(forward: true)
            return true
        } else if commandSelector == #selector(insertBacktab(_:)) {
            doAutocomplete(forward: false)
            return true
        }
        
        completions = nil
        
        if commandSelector == #selector(moveUp(_:)) {
            let isAtEndOfInputHistory = Calculate.shared.isAtEndOfInputHistory()
            if let historyItem = Calculate.shared.getInputHistoryPrev() {
                if isAtEndOfInputHistory {
                    historyEnd = inputField.stringValue
                }
                inputField.stringValue = historyItem
                inputField.currentEditor()?.moveToEndOfLine(nil)
            }
            return true
        } else if commandSelector == #selector(moveDown(_:)) {
            if let historyItem = Calculate.shared.getInputHistoryNext() ?? historyEnd {
                inputField.stringValue = historyItem
                inputField.currentEditor()?.moveToEndOfLine(nil)
            }
            return true
        } else {
            return false
        }
    }
}

extension ViewController: NSCollectionViewDataSource {

    func collectionView(_ collectionView: NSCollectionView, numberOfItemsInSection section: Int) -> Int {
        return Calculate.shared.outputHistory.count
    }
    
    func collectionView(_ collectionView: NSCollectionView, itemForRepresentedObjectAt indexPath: IndexPath) -> NSCollectionViewItem {
        let item = collectionView.makeItem(withIdentifier: OutputCollectionViewItem.identifier, for: indexPath)
        if let outputItem = item as? OutputCollectionViewItem {
            outputItem.output = Calculate.shared.outputHistory[indexPath.item]
        }
        return item
    }
}

extension ViewController: NSCollectionViewDelegate, NSCollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: NSCollectionView,
           layout collectionViewLayout: NSCollectionViewLayout,
           sizeForItemAt indexPath: IndexPath) -> NSSize {
        prototypeOutputCollectionViewItem.output = Calculate.shared.outputHistory[indexPath.item]
        return prototypeOutputCollectionViewItem.fittingSize(forWidth: collectionView.frame.width)
    }
}

class PaddedTextFieldCell: NSTextFieldCell {

    @IBInspectable var leftPadding: CGFloat = 10.0

    override func drawingRect(forBounds rect: NSRect) -> NSRect {
        let rectInset = NSMakeRect(rect.origin.x + leftPadding, rect.origin.y, rect.size.width - leftPadding, rect.size.height)
        return super.drawingRect(forBounds: rectInset)
    }
}
