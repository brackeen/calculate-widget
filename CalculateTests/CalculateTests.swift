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
    
    private func calc(_ expression: String) {
        _ = Calculate.shared.calc(expression, addToHistory: false)
    }
    
    private func testExpression(_ expression: String) -> Bool {
        return Calculate.shared.calc(expression, addToHistory: false) == "true"
    }
    
    func testThis() {
        XCTAssert(testExpression("this == globalThis"))
    }
    
    func testAns() {
        calc("42")
        XCTAssert(testExpression("ans == 42"))
    }
    
    func testConstants() {
        XCTAssert(testExpression("(delete pi) == false"))
        XCTAssert(testExpression("pi = 42; pi == π"))
        XCTAssert(testExpression("testvar = Infinity; Infinity = 42; testvar == Infinity"))
        XCTAssert(testExpression("testvar = undefined; undefined = 42; testvar == undefined"))
        XCTAssert(testExpression("testvar = NaN; NaN = 42; isNaN(testvar)"))
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
        XCTAssert(testExpression("delete testvar"))
        XCTAssert(testExpression("typeof testvar === 'undefined'"))
    }

    func testPrecision() {
         XCTAssert(testExpression("Calculate.fixPrecision(0.1 + 0.2    ) == 0.3"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.25 - 1.245 ) == 0.005"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1      ) == 0.1"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.05   ) == 0.05"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.005  ) == 0.095"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.0005 ) == 0.0995"))
         XCTAssert(testExpression("Calculate.fixPrecision(1 - 3        ) == -2"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.01   ) == 0.09"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.001  ) == 0.099"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.0001 ) == 0.0999"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 - 1.00001) == 0.09999"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.05 * 7     ) == 7.35"))
         XCTAssert(testExpression("Calculate.fixPrecision(1.1 * 7      ) == 7.7"))
         XCTAssert(testExpression("Calculate.fixPrecision(10.35 / 3    ) == 3.45"))
         XCTAssert(testExpression("Calculate.fixPrecision(5010-5000.94 ) == 9.06"))
         XCTAssert(testExpression("Calculate.fixPrecision(100010-100000.94) == 9.06"))
    }
}
