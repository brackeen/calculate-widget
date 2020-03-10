//
//  Calculate.swift
//  Calculate
//
//  Created by David Brackeen on 3/10/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import Foundation
import JavaScriptCore

class Calculate {
    
    static let shared = Calculate()
    
    private let context = JSContext()!
    
    private init() {
        evalulateScript("antlr3-all")
        evalulateScript("antlr3-cli")
        evalulateScript("ECMAScript3ExtLexer")
        evalulateScript("ECMAScript3ExtParser")
        evalulateScript("ECMAScript3ExtEmitter")
        evalulateScript("FPError")
        evalulateScript("Util")
        evalulateScript("Calc")
    }
    
    private func evalulateScript(_ name: String) {
        guard let url = Bundle.main.url(forResource: name, withExtension: "js") else {
            fatalError("Couldn't find \(name).js")
        }
        
        guard let source = try? String(contentsOf: url) else {
            fatalError("Couldn't load \(name).js")
        }

        context.exceptionHandler = { context, exception in
            let exceptionString = exception?.toString() ?? ""
            print("Error loading \(name).js: \(exceptionString)")
        }
        context.evaluateScript(source, withSourceURL: url)
        
    }
    
    func calc(_ expression: String, addToHistory: Bool = true) -> String? {
        let result = context.objectForKeyedSubscript("CalcWidget")?
            .objectForKeyedSubscript("Calc")?
            .objectForKeyedSubscript("calc")?
            .call(withArguments: [expression, addToHistory])
        return result?.toString()
    }
    
    func getUserVariables() -> [String] {
        return context.objectForKeyedSubscript("CalcWidget")?
            .objectForKeyedSubscript("Calc")?
            .objectForKeyedSubscript("getUserVars")?
            .call(withArguments: [])?.toArray() as? [String] ?? []
    }
}
