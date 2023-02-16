//
//  CalculateTests.swift
//  CalculateTests
//
//  Created by David Brackeen on 3/12/20.
//  Copyright © 2020 David Brackeen. All rights reserved.
//

import XCTest
import Calculate

class CalculateTests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }
    
    @discardableResult
    private func calc(_ expression: String) -> String? {
        return Calculate.shared.calc(expression, addToHistory: false)
    }
    
    private func testExpression(_ expression: String) -> Bool {
        return Calculate.shared.calc(expression, addToHistory: false) == "true"
    }
    
    func testThis() {
        // globalThis is the sandbox
        XCTAssert(testExpression("this === globalThis"))
        calc("globalThis.x=256")
        calc("42")
        XCTAssert(testExpression("this.ans == 42"))
        XCTAssert(testExpression("x == 256"))
        XCTAssert(testExpression("this.x == 256"))
    }
    
    func testAns() {
        calc("42")
        XCTAssert(testExpression("ans == 42"))
    }
    
    func testConstants() {
        XCTAssert(testExpression("(delete pi) == false"))
        XCTAssert(testExpression("try { pi = 42; } catch (err) { }; pi == π"))
        XCTAssert(testExpression("testvar = Infinity; try { Infinity = 42; } catch (err) { }; testvar == Infinity"))
        XCTAssert(testExpression("testvar = undefined; try { undefined = 42; } catch (err) { }; testvar == undefined"))
        XCTAssert(testExpression("testvar = NaN; try { NaN = 42; } catch (err) { }; isNaN(testvar)"))
        XCTAssert(testExpression("delete testvar"))
    }
    
    func testExtensions() {
        XCTAssert(testExpression("2^8 == 256"))
        XCTAssert(testExpression("2**8 == 256"))
        XCTAssert(testExpression("5! == 120"))
        XCTAssert(testExpression("cos(pi) == -1"))
        XCTAssert(testExpression("(0b00110011 >< 0b01010101) == 0b01100110"))
    }
    
    func testVariables() {
        XCTAssert(testExpression("testvar=2;testvar^=8;testvar == 256"))
        XCTAssert(testExpression("testvar=2;testvar**=8;testvar == 256"))
        XCTAssert(testExpression("testvar={x: 1, y: 2};testvar.y == 2"))
        XCTAssert(testExpression("typeof testvar.y === 'number'"))
        XCTAssert(testExpression("delete testvar"))
        XCTAssert(testExpression("typeof testvar === 'undefined'"))
        XCTAssertEqual(calc("var testvar = 42"), "42");
        XCTAssert(testExpression("delete testvar"))
    }
    
    func testComments() {
        XCTAssertEqual(calc("/* comment */ 2"), "2")
        XCTAssertEqual(calc("( function (x) { return /* comment */ x * 2; })(2)"), "4")
    }
    
    func testFunctions() {
        calc("avg = function () { var sum = 0; for (var i = 0; i < avg.arguments.length; i++) { sum += arguments[i]; } return sum / arguments.length; }")
        calc("median = function () { var list = Array.prototype.slice.call(arguments); list.sort(function(a, b) { return a - b; } ); var i = Math.floor(list.length / 2); if (list.length % 2) { return list[i]; } else { return (list[i] + list[i - 1]) / 2; } }")
        XCTAssert(testExpression("avg(1, 2, 3, 4, 6, 7, 8, 9) == 5"))
        XCTAssert(testExpression("median(7, 1, 9, 3, 4, 8, 2, 6) == 5"))
    }
    
    func testBadBehaviour() {
        XCTAssert(testExpression("Math = 0; Math.PI == pi"))
        XCTAssert(testExpression("globalThis.org = 0; 1 + 1 == 2"))
        XCTAssert(testExpression("this.org = 0; 1 + 1 == 2"))
        XCTAssert(testExpression("delete Math; Math.PI == pi"))
        XCTAssert(testExpression("(delete globalThis) == false"))
        XCTAssert(testExpression("Calculate = 2; 1 + 1 == Calculate"))
        XCTAssert(testExpression("org = { antlr: 2 }; 1 + 1 == org.antlr"))
        XCTAssert(testExpression("delete Calculate; delete org; 1 + 1 == 2"))
        XCTAssert(testExpression("typeof Calculate === 'undefined'"))
        XCTAssert(testExpression("typeof console === 'undefined'"))
        XCTAssert(testExpression("try { cos = 0 } catch (err) { }; Math.cos(pi) == -1"))
    }

    func testInfiniteLoop() {
        XCTAssertEqual(calc("x=0; while (true) { x++ }"), "JavaScript execution terminated.")
        calc("delete x");
    }
    
    func testEval() {
        calc("eval(\"evalVarTest=42\")")
        XCTAssert(testExpression("typeof evalVarTest === 'undefined'"))
        
        // eval2 should not be created
        calc("eval2 = eval")
        XCTAssert(testExpression("typeof eval2 === 'undefined'"))
        calc("obj = { inner: { } }; obj.inner.eval2 = eval")
        XCTAssert(testExpression("typeof obj.inner.eval2 === 'undefined'"))
        XCTAssert(testExpression("delete obj"))
        
        // eval as inner object
        calc("obj = { eval2: eval }")
        XCTAssert(testExpression("typeof obj === 'undefined'"))
    }
    
    func testObjectEquality() {
        calc("obj1 = { id: 1 }; obj2 = { id: 2 }")
        XCTAssert(testExpression("obj1 != obj2"))
        XCTAssert(testExpression("obj3 = obj1; obj1 == obj3"))
        calc("obj1.inner = obj2;")
        XCTAssert(testExpression("obj1.inner == obj2"))
        
        calc("delete obj1; delete obj2; delete obj3")
    }
    
    func testTypedArrays() {
        calc("typedArray = Uint8Array.from([1, 2, 3, 4])");
        XCTAssert(testExpression("typedArray.length == 4"))
        XCTAssert(testExpression("typedArray[0] = 42;typedArray[0] == 42"))
        calc("delete typedArray");
    }
    
    func testDate() {
        XCTAssert(calc("date = new Date(2021,0);date")?.hasPrefix("\"Fri Jan 01 2021 00:00:00") ?? false)
        calc("delete date");
    }
    
    func testSelfReferences() {
        XCTAssert(!(calc("arr = [1, 2, 3]; arr.push(arr); arr") ?? "Error").contains("Error"))
        XCTAssert(!(calc("obj = { depth1: { } }; obj.depth1.depth2 = obj; obj") ?? "Error").contains("Error"))
        calc("delete arr; delete obj")
    }
    
    func testFunctionNames() {
        XCTAssertEqual(calc("cool = function () { return 42; }"), "Function defined");
        XCTAssertEqual(calc("function cool2(a) { return a * 2; }"), "Function defined");
        XCTAssertEqual(calc("cool"), "function ()");
        XCTAssertEqual(calc("cool2"), "function (a)");
        XCTAssertEqual(calc("log"), "function (x)");
        XCTAssertEqual(calc("atan2"), "function (y,x)");
    }
    
    func testAliases() {
        XCTAssert(testExpression("cos2 = cos;cos2(pi) == -1"))
        calc("delete cos2")
    }

    func testPrecision() {
         XCTAssertEqual(calc("0.1 + 0.2    "), "0.3")
         XCTAssertEqual(calc("1.25 - 1.245 "), "0.005")
         XCTAssertEqual(calc("1.1 - 1      "), "0.1")
         XCTAssertEqual(calc("1.1 - 1.05   "), "0.05")
         XCTAssertEqual(calc("1.1 - 1.005  "), "0.095")
         XCTAssertEqual(calc("1.1 - 1.0005 "), "0.0995")
         XCTAssertEqual(calc("1 - 3        "), "-2")
         XCTAssertEqual(calc("1.1 - 1.01   "), "0.09")
         XCTAssertEqual(calc("1.1 - 1.001  "), "0.099")
         XCTAssertEqual(calc("1.1 - 1.0001 "), "0.0999")
         XCTAssertEqual(calc("1.1 - 1.00001"), "0.09999")
         XCTAssertEqual(calc("1.05 * 7     "), "7.35")
         XCTAssertEqual(calc("1.1 * 7      "), "7.7")
         XCTAssertEqual(calc("10.35 / 3    "), "3.45")
         XCTAssertEqual(calc("5010-5000.94 "), "9.06")
         XCTAssertEqual(calc("100010-100000.94"), "9.06")
    }
    
    func testStringBreak() {
        XCTAssertEqual("1 + 2".breakOnSymbols(), "1 + 2")
        XCTAssertEqual("a=0".breakOnSymbols(), "a=\u{200B}0")
        XCTAssertEqual("a++".breakOnSymbols(), "a++")
        XCTAssertEqual("a+=1.0".breakOnSymbols(), "a+=\u{200B}1.0")
        XCTAssertEqual("a==2.0".breakOnSymbols(), "a==\u{200B}2.0")
        XCTAssertEqual("a++;b++".breakOnSymbols(), "a++;\u{200B}b++")
        XCTAssertEqual("1.0+2.0+3.0".breakOnSymbols(), "1.0+\u{200B}2.0+\u{200B}3.0")
        XCTAssertEqual("array.length".breakOnSymbols(), "array\u{200B}.length")
        XCTAssertEqual("1+\u{200B}2+\u{200B}3".removedInvisibleBreaks(), "1+2+3")
    }
}
