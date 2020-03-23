//
//  Calculate.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation
import JavaScriptCore

public class Calculate {
    
    public static let shared = Calculate()
    
    public enum AngleMode: Int {
        case radians = 0
        case degrees = 1
    }
    
    public enum OutputType: Int {
        case normal
        case error
        case memory
        case help
        case helpExample
    }
    
    public struct Output {
        let input: String
        let output: String
        let type: OutputType
        var newSection: Bool
    }
    
    public private(set) var outputHistory: [Output] = []
    
    public var angleMode: AngleMode = .radians {
        didSet {
            updateAngleMode()
        }
    }
    
    @discardableResult
    public func calc(_ expression: String, addToHistory: Bool = true) -> String {
        memoryNeedsSaving = true
        
        if addToHistory {
            inputHistoryNeedsSaving = true
            inputHistory.append(expression)
            if inputHistory.count > maxInputHistory {
                inputHistory.removeFirst(inputHistory.count - maxInputHistory)
            }
        }
        inputHistoryIndex = inputHistory.count
        
        var type: OutputType = .normal
        var errorResult: String?
        let originalExceptionHandler = context.exceptionHandler
        context.exceptionHandler = { context, exception in
            errorResult = exception?.toString()
            type = .error
        }
        let result = context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("calc")?
            .call(withArguments: [expression])?.toString()
        context.exceptionHandler = originalExceptionHandler
        
        let output = Output(input: expression, output: errorResult ?? result ?? "", type: type, newSection: false)
        appendOutputHistory(output)
        return output.output
    }
    
    public func getUserVariables() -> [String] {
        return context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("getUserVars")?
            .call(withArguments: [])?.toArray() as? [String] ?? []
    }

    public func getInputHistoryPrev() -> String? {
        if inputHistoryIndex > 0 {
            inputHistoryIndex = min(inputHistoryIndex - 1, inputHistory.count)
            return inputHistory[inputHistoryIndex]
        } else {
            return nil
        }
    }

    public func getInputHistoryNext() -> String? {
        if inputHistoryIndex < inputHistory.count - 1 {
            inputHistoryIndex = max(0, inputHistoryIndex + 1);
            return inputHistory[inputHistoryIndex]
        } else {
            inputHistoryIndex = inputHistory.count
            return nil
        }
    }
    
    public func isAtEndOfInputHistory() -> Bool {
        return inputHistoryIndex >= inputHistory.count
    }
    
    public func hasInputHistory() -> Bool {
        return !inputHistory.isEmpty
    }
    
    public func getCompletions(prefix: String) -> [String] {
        guard let possibleCompletions = context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("getPossibleCompletions")?
            .call(withArguments: [])?.toArray() as? [String] else {
                return []
        }

        var completions = possibleCompletions.filter { $0.starts(with: prefix) }
        completions.sort()
        return completions
    }
    
    public func clearOutputHistory() {
        outputHistory = []
        memoryNeedsSaving = true
    }
    
    public func getLastAnswer() -> String? {
        return outputHistory.last { $0.type == .normal }?.output
    }
    
    public func showMemory() -> Int {
        let memory = context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("getMemoryVars")?
            .call(withArguments: [])?.toArray() as? [[String]] ?? []
        let constants = context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("getConstants")?
            .call(withArguments: [])?.toArray() as? [[String]] ?? []
        let allMemory = constants + memory
        
        var memoryOutput: [Output] = allMemory.compactMap {
            if $0.count == 2 {
                return Output(input: $0[0], output: $0[1], type: .memory, newSection: false)
            } else {
                return nil
            }
        }
        // Put "ans" first
        if let lastAnswerIndex = memoryOutput.firstIndex(where: { $0.input == "ans" }), lastAnswerIndex > 0 {
            let lastAnswer = memoryOutput.remove(at: lastAnswerIndex)
            memoryOutput.insert(lastAnswer, at: 0)
        }
        if var firstItem = memoryOutput.first {
            firstItem.newSection = true
            memoryOutput.removeFirst()
            memoryOutput.insert(firstItem, at: 0)
        }
        appendOutputHistoryList(memoryOutput)
        return memoryOutput.count
    }
    
    public func showHelp() -> Int {
        let helpOutput: [Output] = [
            Output(input: "Calculate", output: " is a math expression calculator with persistent memory for variables and functions. Nearly any JavaScript expression can be evaluated.", type: .help, newSection: false),
            Output(input: "Samples", output: "", type: .help, newSection: false),
            Output(input: "2+2", output: "4", type: .helpExample, newSection: false),
            Output(input: "2^8", output: "256", type: .helpExample, newSection: false),
            Output(input: "(1+sqrt(5))/2", output: "1.618033988749895", type: .helpExample, newSection: false),
            Output(input: "r=1/2", output: "0.5", type: .helpExample, newSection: false),
            Output(input: "2*pi*r", output: "3.141592653589793", type: .helpExample, newSection: false),
            Output(input: "cos(ans)", output: "-1", type: .helpExample, newSection: false),
            Output(input: "sqr = function(x) { return x*x }", output: "Function defined", type: .helpExample, newSection: false),
            Output(input: "sqr(3)", output: "9", type: .helpExample, newSection: false),
            Output(input: "Previous answer", output: "\nans", type: .help, newSection: false),
            Output(input: "Constants", output: "\npi, e", type: .help, newSection: false),
            Output(input: "Basic functions", output: "\nsqrt pow abs round floor ceil min max random", type: .help, newSection: false),
            Output(input: "Log functions", output: "\nexp ln log2 log10", type: .help, newSection: false),
            Output(input: "Trig functions", output: "\nsin cos tan csc sec cot\nasin acos atan atan2 acsc asec acot", type: .help, newSection: false),
            Output(input: "Hyperbolic functions", output: "\nsinh cosh tanh csch sech coth\nasinh acosh atanh acsch asech acoth", type: .help, newSection: false),
            Output(input: "More info", output:
                "\n \u{2022}\tTyping an operator (+, -, *, /) on an empty line automatically inserts \"ans\" before it. So typing \"+1\" expands to \"ans+1\"." +
                "\n \u{2022}\tPress the Up and Down arrow keys to browse input history." +
                "\n \u{2022}\tUse the Tab key to automplete. Type the first few letters of a variable name or function name then press Tab." +
                "\n \u{2022}\tTo delete a variable or function by name, enter \"delete name\".",
                   type: .help, newSection: false),
        ]
        
        appendOutputHistoryList(helpOutput)
        return helpOutput.count
    }
    
    public func save() {
        if memoryNeedsSaving {
            memoryNeedsSaving = false
            saveMemory()
            saveOutputHistory()
        }
        if inputHistoryNeedsSaving {
            inputHistoryNeedsSaving = false
            saveInputHistory();
        }
    }
    
    // MARK: - Private
    
    private let context = JSContext()!

    // Do not change angleModeKey or memoryKey - the same keys are used for both this app and the legacy widget
    private let angleModeKey = "anglemode"
    private let memoryKey = "memory"
    private let outputHistoryKey = "output"
    private let inputHistoryKey = "input"
    private let widgetPreferencesMigratedKey = "widgetMigrated"
    
    private let maxOutputHistory = 1000
    private let maxInputHistory = 1000
    private var inputHistory: [String] = []
    private var inputHistoryIndex = 0
    
    private var inputHistoryNeedsSaving = false
    private var memoryNeedsSaving = false
    
    private init() {
        migrateWidgetPreferences()
        
        loadInputHistory()
        loadOutputHistory()
        
        evalulateScript("antlr3-all")
        evalulateScript("ECMAScript3ExtLexer")
        evalulateScript("ECMAScript3ExtParser")
        evalulateScript("ECMAScript3ExtEmitter")
        evalulateScript("Util")
        evalulateScript("Calculate")
                
        setLogFunction()

        angleMode = AngleMode(rawValue: UserDefaults.standard.integer(forKey: angleModeKey)) ?? .radians
        updateAngleMode(updateDefaults: false)
        loadMemory()
    }
    
    private func evalulateScript(_ name: String) {
        guard let url = Bundle.main.url(forResource: name, withExtension: "js") else {
            appendOutputHistory(Output(input: "\(name).js", output: "Couldn't find script", type: .error, newSection: false))
            return
        }
        
        guard let source = try? String(contentsOf: url) else {
            appendOutputHistory(Output(input: "\(name).js", output: "Couldn't load script",  type: .error, newSection: false))
            return
        }

        let originalExceptionHandler = context.exceptionHandler
        context.exceptionHandler = { context, exception in
            self.appendOutputHistory(Output(input: "\(name).js", output: exception?.toString() ?? "Couldn't load script",  type: .error, newSection: false))
        }
        context.evaluateScript(source, withSourceURL: url)
        context.exceptionHandler = originalExceptionHandler
    }
    
    private func loadOutputHistory() {
        if let savedHistory = UserDefaults.standard.array(forKey: outputHistoryKey) as? [[Any]] {
            for historyItem in savedHistory {
                if historyItem.count >= 3,
                    let input = historyItem[0] as? String,
                    let output = historyItem[1] as? String,
                    let rawType = historyItem[2] as? Int,
                    let type = OutputType(rawValue: rawType),
                    let newSection = historyItem.count > 3 ?  historyItem[3] as? Bool : false {
                    appendOutputHistory(Output(input: input, output: output, type: type, newSection: newSection))
                }
            }
            memoryNeedsSaving = false
        }
    }
    
    private func saveOutputHistory() {
        let simpleOutputHistory: [[Any]] = outputHistory.map {
            if $0.newSection {
                return [ $0.input, $0.output, $0.type.rawValue, true ]
            } else {
                return [ $0.input, $0.output, $0.type.rawValue ]
            }
        }
        UserDefaults.standard.set(simpleOutputHistory, forKey: outputHistoryKey)
    }
    
    private func loadInputHistory() {
        inputHistory = UserDefaults.standard.array(forKey: inputHistoryKey) as? [String] ?? []
        inputHistoryIndex = inputHistory.count
    }
    
    private func saveInputHistory() {
        UserDefaults.standard.set(inputHistory, forKey: inputHistoryKey)
    }
    
    private func loadMemory() {
        if let memory = UserDefaults.standard.array(forKey: memoryKey) as? [[String]] {
            for tuple in memory {
                if tuple.count == 2 {
                    let name = tuple[0]
                    let value = tuple[1]
                    let originalExceptionHandler = context.exceptionHandler
                    context.exceptionHandler = { context, exception in
                        self.appendOutputHistory(Output(input: name, output: exception?.toString() ?? "Couldn't load variable", type: .error, newSection: false))
                    }
                    context.objectForKeyedSubscript("Calculate")?
                        .objectForKeyedSubscript("applyMemoryVar")?
                        .call(withArguments: [name, value])
                    context.exceptionHandler = originalExceptionHandler
                }
            }
        }
    }
    
    private func saveMemory() {
        if let memory = context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("getMemoryVars")?
            .call(withArguments: [])?.toArray() as? [[String]] {
            UserDefaults.standard.set(memory, forKey: memoryKey)
        }
    }
    
    private func appendOutputHistoryList(_ list: [Output]) {
        guard !list.isEmpty else {
            return
        }
        memoryNeedsSaving = true
        if list.count >= maxOutputHistory {
            // Don't trim so user can see everything new
            outputHistory = list
        } else {
            outputHistory.append(contentsOf: list)
            if outputHistory.count > maxOutputHistory {
                outputHistory.removeFirst(outputHistory.count - maxOutputHistory)
            }
        }
    }
    
    private func appendOutputHistory(_ output: Output) {
        memoryNeedsSaving = true
        outputHistory.append(output)
        if outputHistory.count > maxOutputHistory {
            outputHistory.removeFirst(outputHistory.count - maxOutputHistory)
        }
    }
    
    private func setLogFunction() {
        let logFunction: @convention(block) (String) -> Void = { message in
            print(message)
        }
        context.objectForKeyedSubscript("Calculate")?.setObject(logFunction, forKeyedSubscript: ("log" as NSString))
    }
    
    private func updateAngleMode(updateDefaults: Bool = true) {
        if updateDefaults {
            UserDefaults.standard.set(angleMode.rawValue, forKey: angleModeKey)
        }
        
        context.objectForKeyedSubscript("Calculate")?
            .objectForKeyedSubscript("setAngleMode")?
            .call(withArguments: [angleMode.rawValue])
    }
    
    private func migrateWidgetPreferences() {
        let migrated = UserDefaults.standard.bool(forKey: widgetPreferencesMigratedKey)
        guard !migrated else {
            return
        }
        
        UserDefaults.standard.set(true, forKey: widgetPreferencesMigratedKey)
        
        /*
         The widget preferences file "~/Library/Preferences/widget-com.brackeen.widget.calc.plist"
         was migrated to the app's sandbox on first launch. (See container-migration.plist).
         If the file exists, copy the preferences to UserDefaults and delete the file.
         
         To test this:
         1. Make sure widget plist exists at "~/Library/Preferences/widget-com.brackeen.widget.calc.plist"
         2. Delete the app's container at "~/Library/Containers/com.brackeen.Calculate/"
         3. Launch the app
         4. Check "~/Library/Containers/com.brackeen.Calculate/Data/Library/Preferences/com.brackeen.Calculate.plist"
         */
        guard let widgetPreferencesPath = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask).first?.appendingPathComponent("Preferences").appendingPathComponent("widget-com.brackeen.widget.calc.plist").path,
            FileManager.default.fileExists(atPath: widgetPreferencesPath) else {
            return
        }
        
        let widgetPreferences = NSDictionary(contentsOfFile: widgetPreferencesPath) as? Dictionary<String, AnyObject> ?? [:]
        if let angleModeString = widgetPreferences[angleModeKey] as? String,
            let angleModeInt = Int(angleModeString),
            let angleMode = AngleMode(rawValue: angleModeInt) {
            UserDefaults.standard.set(angleMode.rawValue, forKey: angleModeKey)
        }
        if let memory = widgetPreferences[memoryKey] as? String {
            UserDefaults.standard.set(memory, forKey: memoryKey)
        }
        
        try? FileManager.default.removeItem(atPath: widgetPreferencesPath)
    }
}
