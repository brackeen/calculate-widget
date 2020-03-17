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
    fileprivate var prototypeMemoryCollectionViewItem: MemoryCollectionViewItem!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        prototypeOutputCollectionViewItem = OutputCollectionViewItem.loadFromNib()!
        prototypeMemoryCollectionViewItem = MemoryCollectionViewItem.loadFromNib()!
        
        if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
            layout.itemSize = NSSize(width: view.frame.width, height: prototypeOutputCollectionViewItem.view.frame.height)
        }

        inputField.font = NSFont.monospacedDigitSystemFont(ofSize: inputField.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
        
        if !Calculate.shared.hasInputHistory() {
            inputField.stringValue = "1+1"
        }
        inputField.selectText(nil)
    }

    override func viewWillLayout() {
        super.viewWillLayout()
        
        if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
            layout.itemSize.width = view.frame.width
            layout.invalidateLayout()
        }
    }
    
    @IBAction func copyLastAnswer(_ sender: Any) {
        if let lastAnswer = Calculate.shared.getLastAnswer() {
            NSPasteboard.general.declareTypes([.string], owner: nil)
            NSPasteboard.general.setString(lastAnswer, forType: .string)
        }
    }
    
    @IBAction func clearOutput(_ sender: Any) {
        Calculate.shared.clearOutputHistory()
        outputCollectionView.reloadData()
    }
    
    @IBAction func showMemory(_ sender: Any) {
        let originalOutputCount = Calculate.shared.outputHistory.count
        let addedCount = Calculate.shared.showMemory()
        if addedCount > 0 {
            updateCollectionView(originalOutputCount: originalOutputCount, addedCount: addedCount)
        }
    }
    
    @IBAction func checkForUpdates(_ sender: Any) {
        if let url = URL(string: "https://github.com/brackeen/calculate-widget/releases") {
            NSWorkspace.shared.open(url)
        }
    }
    
    private func updateCollectionView(originalOutputCount: Int, addedCount: Int) {
        let outputCount = Calculate.shared.outputHistory.count
        if addedCount >= outputCount || originalOutputCount == 0 {
            outputCollectionView.reloadData()
        } else {
            outputCollectionView.performBatchUpdates({
                let deletedCount = originalOutputCount - outputCount + addedCount
                if deletedCount > 0 {
                    let deletedIndexPaths = (0..<deletedCount).map { IndexPath(item: $0, section: 0) }
                    outputCollectionView.deleteItems(at: Set(deletedIndexPaths))
                }
                let addedIndexPaths = (0..<addedCount).map { IndexPath(item: originalOutputCount - deletedCount + $0, section: 0) }
                outputCollectionView.insertItems(at: Set(addedIndexPaths))
            }, completionHandler: nil)
        }
        scrollTo(item: outputCount - addedCount)
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
        updateCollectionView(originalOutputCount: originalOutputCount, addedCount: 1)
        
        inputField.stringValue = ""
        textFieldWasEmpty = true
        allowInsertAnsVariable = true
        historyEnd = nil
        completions = nil
    }
    
    fileprivate func scrollTo(item: Int) {
        let outputCount = Calculate.shared.outputHistory.count
        if item >= 0 && item < outputCount {
            let extraHeight: CGFloat
            if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
                extraHeight = layout.sectionInset.bottom
            } else {
                extraHeight = 0
            }

            var frame = outputCollectionView.frameForItem(at: outputCount - 1)
            frame.size.height += extraHeight
            outputCollectionView.scrollToVisible(frame)
            
            if item != outputCount - 1 {
                // Scroll back up to the first in the list, so it is at the top of the window
                frame = outputCollectionView.frameForItem(at: item)
                frame.size.height += extraHeight
                outputCollectionView.scrollToVisible(frame)
            }
        }
    }
    
    fileprivate func scrollRelative(amount: CGFloat) {
        var frame = outputCollectionView.visibleRect
        frame.origin.y += amount
        print(frame)
        print(outputCollectionView.bounds.height)
        outputCollectionView.animator().scrollToVisible(frame)
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
        } else if commandSelector == #selector(scrollPageUp(_:)) {
            scrollRelative(amount: -outputCollectionView.visibleRect.height)
            return true
        } else if commandSelector == #selector(scrollPageDown(_:)) {
            scrollRelative(amount: outputCollectionView.visibleRect.height)
            return true
        } else if commandSelector == #selector(moveToBeginningOfDocument(_:)) {
            scrollTo(item: 0)
            return true
        } else if commandSelector == #selector(moveToEndOfDocument(_:)) {
            scrollTo(item: Calculate.shared.outputHistory.count - 1)
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
        let item: NSCollectionViewItem
        let output = Calculate.shared.outputHistory[indexPath.item]
        if output.type == .memory {
            item = collectionView.makeItem(withIdentifier: MemoryCollectionViewItem.identifier, for: indexPath)
        } else {
            item = collectionView.makeItem(withIdentifier: OutputCollectionViewItem.identifier, for: indexPath)
        }
        (item as? OutputItem)?.output = output
        return item
    }
}

extension ViewController: NSCollectionViewDelegate, NSCollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: NSCollectionView,
           layout collectionViewLayout: NSCollectionViewLayout,
           sizeForItemAt indexPath: IndexPath) -> NSSize {
        let item: OutputItem
        let output = Calculate.shared.outputHistory[indexPath.item]
        if output.type == .memory {
            item = prototypeMemoryCollectionViewItem
        } else {
            item = prototypeOutputCollectionViewItem
        }
        item.output = output
        return item.fittingSize(forWidth: collectionView.frame.width)
    }
}

extension ViewController: NSUserInterfaceValidations {
    
    func validateUserInterfaceItem(_ item: NSValidatedUserInterfaceItem) -> Bool {
        if item.action == #selector(copyLastAnswer(_:)) {
            return Calculate.shared.getLastAnswer() != nil
        } else if item.action == #selector(clearOutput(_:)) {
            return !Calculate.shared.outputHistory.isEmpty
        } else {
            return true
        }
    }
}

class BottomAlignedCollectionViewFlowLayout: NSCollectionViewFlowLayout {
    
    override func layoutAttributesForElements(in rect: CGRect) -> [NSCollectionViewLayoutAttributes] {
        let attributes = super.layoutAttributesForElements(in: rect)
        guard let collectionView = collectionView, collectionView.bounds.height > collectionViewContentSize.height else {
            return attributes
        }
        let offset = collectionView.bounds.height - collectionViewContentSize.height
        return attributes.map { attribute in
            let newAttribute = attribute.copy() as! NSCollectionViewLayoutAttributes
            newAttribute.frame.origin.y += offset
            return newAttribute
        }
    }
}
