'use strict';
/**
 * calculator
 * @description 浮点数精确计算封装（支持科学计数法）
 * @author mack wang
 * @website yurencloud.com
 */



var calculator = {}

/**
 * 补0
 * @param {*} number 0个数
 */
function paddingZero(number) {
    var zero = ''
    while (number--) zero += '0'
    return zero
}

/**
 * 将科学记数法转为普通字符串
 * @param {Number} number
 */
function noExponent(number) {
    const data = String(number).split(/[eE]/)
    if (data.length == 1) return data[0]

    let z = ''
    const sign = number < 0 ? '-' : ''
    const str = data[0].replace('.', '')
    let mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.'
        while (mag++) z += '0'
        return z + str.replace(/^\-/, '')
    }
    mag -= str.length
    while (mag--) z += '0'
    return str + z
}

function split(number) {
    let str
    if (number < 1e-6) {
        str = noExponent(number)
    } else {
        str = number + ''
    }
    const index = str.lastIndexOf('.')
    if (index < 0) {
        return [str, 0]
    } else {
        return [str.replace('.', ''), str.length - index - 1]
    }
}

/**
 * 计算
 * @param {*} l 操作数1
 * @param {*} r 操作数2
 * @param {*} sign 操作符
 * @param {*} f 精度
 */
function operate(l, r, sign, f) {
    switch (sign) {
        case '+': return (l + r) / f
        case '-': return (l - r) / f
        case '*': return (l * r) / (f * f)
        case '/': return (l / r)
    }
}

/**
 * 解决小数精度问题
 * @param {*} l 操作数1
 * @param {*} r 操作数2
 * @param {*} sign 操作符
 * fixedFloat(0.3, 0.2, '-')
 */
function fixedFloat(l, r, sign) {
    const arrL = split(l)
    const arrR = split(r)
    let fLen = Math.max(arrL[1], arrR[1])

    if (fLen === 0) {
        return operate(Number(l), Number(r), sign, 1)
    }
    const f = Math.pow(10, fLen)
    if (arrL[1] !== arrR[1]) {
        if (arrL[1] > arrR[1]) {
            arrR[0] += paddingZero(arrL[1] - arrR[1])
        } else {
            arrL[0] += paddingZero(arrR[1] - arrL[1])
        }
    }
    return operate(Number(arrL[0]), Number(arrR[0]), sign, f)
}

/*
* 数字转字符串（支持科学计数法，如1e12、1E12）
* @param number [Number,String] 数字
* @return number String 字符串数字，科技计数法会转成普通计数
* */
calculator.string = function (number) {
    return noExponent(number)
}

/*
* 数字转字符串（支持科学计数法，如1e12、1E12）
* @param value [Number,String] 数字
* @param num Number 保留精度位数（直接舍弃精度后的小数）
* @return formatNumber String 截取精度后的字符串数字
* */
calculator.format = function (value, num) {
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf(".");
    c = a.length;
    if (num === 0) {
        if (b !== -1) {
            a = a.substring(0, b);
        }
    } else {//如果没有小数点
        if (b === -1) {
            a = a + ".";
            for (i = 1; i <= num; i++) {
                a = a + "0";
            }
        } else {//有小数点，超出位数自动截取，否则补0
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + "0";
            }
        }
    }
    return a;
}

/*
* 加法
* @param num1 [Number,String] 加数
* @param num2 [Number,String] 加数
* @return sum Number 和
* */
calculator.add = function (num1, num2) {
    return fixedFloat(num1, num2, '+')
}

/*
* 减法
* @param num1 [Number,String] 被减数
* @param num2 [Number,String] 减数
* @return difference Number 差
* */
calculator.sub = function (num1, num2) {
    return fixedFloat(num1, num2, '-')
}

/*
* 乘法
* @param num1 [Number,String] 乘数
* @param num2 [Number,String] 乘数
* @return product Number 积
* */
calculator.mul = function (num1, num2) {
    return fixedFloat(num1, num2, '*')
}

/*
* 除法
* @param num1 [Number,String] 被除数
* @param num2 [Number,String] 除数
* @return division Number 商
* */
calculator.div = function (num1, num2) {
    return fixedFloat(num1, num2, '/')
}


module.exports = calculator
