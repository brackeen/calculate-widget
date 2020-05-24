//
//  AppViewController.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Cocoa

class AppViewController: NSViewController {
    
    @IBOutlet weak var inputField: NSTextField!
    @IBOutlet weak var outputCollectionView: NSCollectionView!
    
    fileprivate var textFieldWasEmpty = true
    fileprivate var allowInsertAnsVariable = true
    fileprivate var historyEnd: String?
    fileprivate var completions: [String]?
    fileprivate var completionWordStart = "".endIndex
    
    fileprivate var inputFieldUndoManager: UndoManager? {
        return inputField?.currentEditor()?.undoManager
    }
    
    fileprivate var prototypeOutputCollectionViewItem: OutputCollectionViewItem!
    fileprivate var prototypeMemoryCollectionViewItem: MemoryCollectionViewItem!
    fileprivate var outputCollectionViewItemDefaultHeight: CGFloat = 0
    fileprivate var memoryCollectionViewItemDefaultHeight: CGFloat = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        
        prototypeOutputCollectionViewItem = OutputCollectionViewItem.loadFromNib()!
        prototypeMemoryCollectionViewItem = MemoryCollectionViewItem.loadFromNib()!
        
        outputCollectionViewItemDefaultHeight = prototypeOutputCollectionViewItem.view.frame.height
        memoryCollectionViewItemDefaultHeight = prototypeMemoryCollectionViewItem.view.frame.height
        
        if let layout = outputCollectionView.collectionViewLayout as? NSCollectionViewFlowLayout {
            layout.itemSize = NSSize(width: view.frame.width, height: outputCollectionViewItemDefaultHeight)
        }
        
        (outputCollectionView.collectionViewLayout as? VerticalListCollectionViewLayout)?.bottomAligned = true

        inputField.font = NSFont.appFont(ofSize: inputField.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
        
        if !Calculate.shared.hasInputHistory() {
            inputField.stringValue = "1+1"
        }
        inputField.selectText(nil)
        (view as? AppView)?.viewToFocusOnClick = inputField
        
        MASShortcutBinder.shared()?.bindShortcut(withDefaultsKey: UserDefaults.HotkeyDefaultsKey, toAction: { [weak self] in
            if let inputField = self?.inputField, let window = inputField.window {
                if NSApp.isActive && window.isOnActiveSpace && window.isVisible && window.viewIsFirstResponder(inputField) {
                    NSApp.hide(nil)
                } else {
                    if UserDefaults.standard.moveToActiveSpaceEnabled {
                        window.moveToActiveSpace(completion: {
                            self?.focusInputField()
                        })
                    } else {
                        NSApp.activate(ignoringOtherApps: true)
                        self?.focusInputField()
                    }
                }
            }
        })
        
        NotificationCenter.default.addObserver(self, selector: #selector(fontDidChange), name: UserDefaults.FontDidChange, object: nil)
        
        // Focus in an async block to get around window restoration
        DispatchQueue.main.async { [weak self] in
            self?.focusInputField()
        }
    }
    
    func focusInputField() {
        if let window = inputField.window {
            window.makeKeyAndOrderFront(nil)
            if !window.viewIsFirstResponder(inputField) {
                window.makeFirstResponder(inputField)
            }
        }
    }
    
    @objc func fontDidChange(_ sender: Any) {
        // NOTE: This is slow with lot of history.
        outputCollectionView.reloadData()
        (outputCollectionView.collectionViewLayout as? VerticalListCollectionViewLayout)?.notifyReloadData()
        inputField.font = NSFont.appFont(ofSize: inputField.font?.pointSize ?? NSFont.systemFontSize, weight: .regular)
    }

    @IBAction func copyLastAnswer(_ sender: Any) {
        let lastAnswer = Calculate.shared.getLastAnswer() ?? "0"
        NSPasteboard.general.declareTypes([.string], owner: nil)
        NSPasteboard.general.setString(lastAnswer, forType: .string)
    }
    
    @IBAction func clearOutput(_ sender: Any) {
        Calculate.shared.clearOutputHistory()
        outputCollectionView.reloadData()
        (outputCollectionView.collectionViewLayout as? VerticalListCollectionViewLayout)?.notifyReloadData()
    }
    
    @IBAction func showMemory(_ sender: Any) {
        let originalOutputCount = Calculate.shared.outputHistory.count
        let addedCount = Calculate.shared.showMemory()
        if addedCount > 0 {
            updateCollectionView(originalOutputCount: originalOutputCount, addedCount: addedCount)
        }
    }
    
    @IBAction func showHelp(_ sender: Any) {
        let originalOutputCount = Calculate.shared.outputHistory.count
        let addedCount = Calculate.shared.showHelp()
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
            (outputCollectionView.collectionViewLayout as? VerticalListCollectionViewLayout)?.notifyReloadData()
        } else {
            outputCollectionView.performBatchUpdates({
                let deletedCount = originalOutputCount - outputCount + addedCount
                if deletedCount > 0 {
                    (outputCollectionView.collectionViewLayout as? VerticalListCollectionViewLayout)?.notifyDeleteFirst(deletedCount)
                    let deletedIndexPaths = (0..<deletedCount).map { IndexPath(item: $0, section: 0) }
                    outputCollectionView.deleteItems(at: Set(deletedIndexPaths))
                }
                let addedIndexPaths = (0..<addedCount).map { IndexPath(item: originalOutputCount - deletedCount + $0, section: 0) }
                outputCollectionView.insertItems(at: Set(addedIndexPaths))
            }, completionHandler: nil)
        }
        scrollTo(item: outputCount - addedCount)
    }
    
    @IBAction func undo(_ sender: Any) {
        if let undoManager = inputFieldUndoManager, undoManager.canUndo {
            undoManager.undo()
        }
    }
    
    @IBAction func redo(_ sender: Any) {
        if let undoManager = inputFieldUndoManager, undoManager.canRedo {
            undoManager.redo()
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
        
        // Fixes issue where expression is copied from output and it contains the zero-width space character.
        // This isn't a perfect solution - a better solution would be one of:
        // 1) Prevent copying/pasting zero-width space character to/from TextFields
        // 2) Custom word-wrapping in TextFields (avoid zero-width space character altogether)
        expression.removeAll(where: { $0 == "\u{200B}" })
        
        let originalOutputCount = Calculate.shared.outputHistory.count
        Calculate.shared.calc(expression, addToHistory: addToHistory)
        updateCollectionView(originalOutputCount: originalOutputCount, addedCount: 1)
        
        inputField.stringValue = ""
        textFieldWasEmpty = true
        allowInsertAnsVariable = true
        historyEnd = nil
        completions = nil
    }
    
    @IBAction func scrollOutputPageUp(_ sender: Any?) {
        scrollRelative(amount: -outputCollectionView.visibleRect.height)
    }
        
    @IBAction func scrollOutputPageDown(_ sender: Any?) {
        scrollRelative(amount: outputCollectionView.visibleRect.height)
    }
    
    @IBAction func scrollOutputLineUp(_ sender: Any?) {
        let height = outputCollectionViewItemDefaultHeight
        scrollRelative(amount: -height)
    }
        
    @IBAction func scrollOutputLineDown(_ sender: Any?) {
        let height = outputCollectionViewItemDefaultHeight
        scrollRelative(amount: height)
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
        outputCollectionView.animator().scrollToVisible(frame)
    }
    
    fileprivate func replaceAutocompletion(_ completion: String) {
        let input = inputField.stringValue
        if let textView = inputField.currentEditor() as? NSTextView {
            // For Undo support
            let currentCompletions = completions
            textView.insertText(completion, replacementRange: NSRange(completionWordStart..., in: input))
            completions = currentCompletions
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
                        replaceAutocompletion(completions[j])
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
                        replaceAutocompletion(completion)
                        inputField.currentEditor()?.moveToEndOfLine(nil)
                    }
                    self.completions = completions
                }
            }
        }
    }
}

extension AppViewController: NSTextFieldDelegate {

    func controlTextDidChange(_ obj: Notification) {
        completions = nil
        let text = inputField.stringValue
        if text.isEmpty {
            textFieldWasEmpty = true
        } else {
            if let ch = text.first, text.count == 1, textFieldWasEmpty && allowInsertAnsVariable &&
                (ch == "+" || ch == "-" || ch == "*" || ch == "/" || ch == "%" || ch == "&" || ch == "|" || ch == "^") &&
                UserDefaults.standard.insertAnsEnabled {

                // Register later otherwise the edit will get merged with the current edit (inserting the "+" for example)
                inputField.insertAns(registerLater: true)

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
            scrollOutputPageUp(nil)
            return true
        } else if commandSelector == #selector(scrollPageDown(_:)) {
            scrollOutputPageDown(nil)
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

extension NSTextField {
    
    func insertAns(registerLater: Bool = false) {
        let originalText = stringValue
        let registerBlock = {
            self.currentEditor()?.undoManager?.registerUndo(withTarget: self, handler: { me in
                me.undoInsertAns(originalText: originalText)
            })
            self.currentEditor()?.undoManager?.setActionName(NSLocalizedString("Insert \"ans\"", comment: "Insert \"ans\" undo action name"))
        }
        if registerLater {
            DispatchQueue.main.async {
                registerBlock()
            }
        } else {
            registerBlock()
        }
        currentEditor()?.replaceCharacters(in: NSRange(location: 0, length: 0), with: "ans")
        currentEditor()?.moveToEndOfLine(nil)
    }

    func undoInsertAns(originalText: String) {
        currentEditor()?.undoManager?.registerUndo(withTarget: self, handler: { me in
            me.insertAns()
        })
        currentEditor()?.undoManager?.setActionName(NSLocalizedString("Insert \"ans\"", comment: "Insert \"ans\" undo action name"))
        stringValue = originalText
        currentEditor()?.moveToEndOfLine(nil)
    }
}

extension AppViewController: NSCollectionViewDataSource {

    func collectionView(_ collectionView: NSCollectionView, numberOfItemsInSection section: Int) -> Int {
        return Calculate.shared.outputHistory.count
    }
    
    func collectionView(_ collectionView: NSCollectionView, itemForRepresentedObjectAt indexPath: IndexPath) -> NSCollectionViewItem {
        let item: NSCollectionViewItem
        let output = Calculate.shared.outputHistory[indexPath.item]
        if output.type == .memory {
            item = collectionView.makeItem(withIdentifier: MemoryCollectionViewItem.identifier, for: indexPath)
            if let memoryItem = item as? MemoryCollectionViewItem {
                memoryItem.isFirstInList = output.newSection
                memoryItem.isLastInList = (Calculate.shared.outputHistory.count - 1 == indexPath.item ||
                    Calculate.shared.outputHistory[indexPath.item + 1].type != .memory ||
                    Calculate.shared.outputHistory[indexPath.item + 1].newSection)
            }
        } else if output.type == .help {
            item = collectionView.makeItem(withIdentifier: MemoryCollectionViewItem.identifier, for: indexPath)
        } else {
            item = collectionView.makeItem(withIdentifier: OutputCollectionViewItem.identifier, for: indexPath)
        }
        (item as? OutputItem)?.output = output
        return item
    }
}

extension AppViewController: NSCollectionViewDelegate, VerticalListCollectionViewDelegateLayout {
    
    func minimumWidth() -> CGFloat {
        return outputCollectionView.window?.minSize.width ?? 0
    }
    
    func minimumHeight(forItemAt indexPath: IndexPath) -> CGFloat {
        let output = Calculate.shared.outputHistory[indexPath.item]
        if output.type == .memory || output.type == .help {
            return memoryCollectionViewItemDefaultHeight
        } else {
            return outputCollectionViewItemDefaultHeight
        }
    }
    
    func measuredHeight(forItemAt indexPath: IndexPath, width: CGFloat) -> CGFloat {
        let item: OutputItem
        let output = Calculate.shared.outputHistory[indexPath.item]
        if output.type == .memory {
            item = prototypeMemoryCollectionViewItem
            if let memoryItem = item as? MemoryCollectionViewItem {
                memoryItem.isFirstInList = output.newSection
                memoryItem.isLastInList = (Calculate.shared.outputHistory.count - 1 == indexPath.item ||
                    Calculate.shared.outputHistory[indexPath.item + 1].type != .memory ||
                    Calculate.shared.outputHistory[indexPath.item + 1].newSection)
            }
        } else if output.type == .help {
            item = prototypeMemoryCollectionViewItem
        } else {
            item = prototypeOutputCollectionViewItem
        }
        item.output = output
        let size = item.fittingSize(forWidth: width)
        return size.height
    }
    
    func collectionView(_ collectionView: NSCollectionView, layout collectionViewLayout: NSCollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> NSSize {
        return itemSize(forWidth: collectionView.frame.width, layout: collectionViewLayout, indexPath: indexPath)
    }
}

extension AppViewController: NSUserInterfaceValidations {
    
    func validateUserInterfaceItem(_ item: NSValidatedUserInterfaceItem) -> Bool {
        if item.action == #selector(clearOutput(_:)) {
            return !Calculate.shared.outputHistory.isEmpty
        } else if item.action == #selector(undo(_:)) {
            if let undoManager = inputFieldUndoManager {
                (item as? NSMenuItem)?.title = undoManager.undoMenuItemTitle
                return undoManager.canUndo
            } else {
                return false
            }
        } else if item.action == #selector(redo(_:)) {
            if let undoManager = inputFieldUndoManager {
                (item as? NSMenuItem)?.title = undoManager.redoMenuItemTitle
                return undoManager.canRedo
            } else {
                return false
            }
        } else {
            return true
        }
    }
}
