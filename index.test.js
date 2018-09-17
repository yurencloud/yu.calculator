var calculator = require('./src/index')

test('加法', () => {
    console.log(0.1 + 0.2) // 0.30000000000000004
    expect(calculator.add(0.1, 0.2)).toBe(0.3)
    expect(calculator.add(3355455569.6655555, 54235.248237958)).toBe(3355509804.9137936)
    expect(calculator.add(100000000000000000.3, 0.6)).toBe(100000000000000000.9)
    expect(calculator.add(3355455569, 54235)).toBe(3355509804)
    expect(calculator.add(0.0000034034003, 0.0000034034005)).toBe(0.0000068068008)
})

test('减法', () => {
    console.log(0.51 - 0.3) // 0.21000000000000002
    expect(calculator.sub(0.51, 0.3)).toBe(0.21)
    expect(calculator.sub(3355455569.6655555, 54235.248237958)).toBe(3355401334.4173174)
    expect(calculator.sub(0.0000034034003, 0.0000000034034005)).toBe(0.0000033999968995)
})

test('乘法', () => {
    console.log(7 * 0.8) // 5.6000000000000005
    expect(calculator.mul(7, 0.8)).toBe(5.6)
})

test('除法', () => {
    console.log(0.3 / 0.1) // 2.9999999999999996
    expect(calculator.div(0.3, 0.1)).toBe(3)
})
