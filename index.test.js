var calculator = require('./src/index')


test('加法', () => {
    console.log(0.1 + 0.2) // 0.30000000000000004
    expect(calculator.add(0.1, 0.2)).toBe(0.3)
    expect(calculator.add(3355455569.6655555, 54235.248237958)).toBe(3355509804.9137936)
    expect(calculator.add(100000000000000000.3, 0.6)).toBe(100000000000000000.9)
    expect(calculator.add(3355455569, 54235)).toBe(3355509804)
    expect(calculator.add(0.0000034034003, 0.0000034034005)).toBe(0.0000068068008)
    expect(calculator.add(44, 33)).toBe(77)
    expect(calculator.add(1, 0.003)).toBe(1.003)
    expect(calculator.add('0.1', '0.2')).toBe(0.3)
})

test('减法', () => {
    console.log(0.51 - 0.3) // 0.21000000000000002
    expect(calculator.sub(0.51, 0.3)).toBe(0.21)
    expect(calculator.sub(3355455569.6655555, 54235.248237958)).toBe(3355401334.4173174)
    expect(calculator.sub(0.0000034034003, 0.0000000034034005)).toBe(0.0000033999968995)
    expect(calculator.sub(100000000000000000000.3, 0.01)).toBe(100000000000000000000.29)
    expect(calculator.sub(100, 32)).toBe(68)
    expect(calculator.sub(1, 0.003)).toBe(0.997)
    expect(calculator.sub('0.51', '0.3')).toBe(0.21)
})

test('乘法', () => {
    console.log(7 * 0.8) // 5.6000000000000005
    expect(calculator.mul(7, 0.8)).toBe(5.6)
    expect(calculator.mul(3355455569.6655555, 54235.248237958)).toBe(181983965772250.176046740)
    expect(calculator.mul(100000000000000000000.3, 0.01)).toBe(1000000000000000000.003)
    expect(calculator.mul(100, 32)).toBe(3200)
    expect(calculator.mul(1, 0.003)).toBe(0.003)
    expect(calculator.mul('7', '0.8')).toBe(5.6)
})

test('除法', () => {
    console.log(0.3 / 0.1) // 2.9999999999999996
    expect(calculator.div(0.3, 0.1)).toBe(3)
    expect(calculator.div(181983965772250.176046740, 3355455569.6655555)).toBe(54235.248237958)
    expect(calculator.div(100000000000000000000.3, 0.01)).toBe(10000000000000000000030)
    expect(calculator.div(9, 30)).toBe(0.3)
    expect(calculator.div('0.3', '0.1')).toBe(3)
})

test('科学计数法转字符串数字', () => {
    expect(calculator.string(1e20)).toBe('100000000000000000000')
    expect(calculator.string(1e-20)).toBe('0.00000000000000000001')
    expect(calculator.string(3355455569e20)).toBe('335545556900000000000000000000')
    expect(calculator.string('1e-20')).toBe('0.00000000000000000001')
})

test('按精度截取数字', () => {
    expect(calculator.format(53489345.4385734823, 4)).toBe('53489345.4385')
    expect(calculator.format(53489345.1111511, 4)).toBe('53489345.1111')
    expect(calculator.format(53489345.1111411, 2)).toBe('53489345.11')
    expect(calculator.format(53489345.1111411, 0)).toBe('53489345')
    expect(calculator.format('53489345.1111411', 0)).toBe('53489345')
})
