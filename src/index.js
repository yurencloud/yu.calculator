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
 * @param {Number} number 0个数
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
function dealExponent(number) {
    var data = String(number).split(/[eE]/)
    if (data.length === 1) {
        return data[0]
    }

    var zero = ''
    var sign = number < 0 ? '-' : ''
    var num = data[0].replace('.', '')
    var mag = Number(data[1]) + 1;

    if (mag < 0) {
        zero = sign + '0.'
        while (mag++) zero += '0'
        return zero + num.replace(/^\-/, '')
    }
    mag -= num.length
    while (mag--) zero += '0'
    return num + zero
}

function split(number) {
    var num
    if (number < 1e-6) {
        num = dealExponent(number)
    } else {
        num = number + ''
    }
    var index = num.lastIndexOf('.')
    if (index < 0) {
        return [num, 0]
    } else {
        return [num.replace('.', ''), num.length - index - 1]
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
        case '+':
            return (l + r) / f
        case '-':
            return (l - r) / f
        case '*':
            return (l * r) / (f * f)
        case '/':
            return (l / r)
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
    var arrL = split(l)
    var arrR = split(r)
    var fLen = Math.max(arrL[1], arrR[1])

    if (fLen === 0) {
        return operate(Number(l), Number(r), sign, 1)
    }
    var f = Math.pow(10, fLen)
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
* 科学计数法转字符串数字（支持科学计数法，如1e12、1E12）
* @param {Number, String} number - 数字
* @return {String} number - 字符串数字，科技计数法会转成普通计数
* */
calculator.string = function (number) {
    return dealExponent(number)
}

/*
* 按精度截取数字（支持科学计数法，如1e12、1E12）
* @param {Number, String} value - 数字
* @param {Number} num - 保留精度位数（直接舍弃精度后的小数）
* @return {String} formatNumber - 截取精度后的字符串数字
* */
calculator.format = function (value, num) {
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num === 0) {
        if (b !== -1) {
            a = a.substring(0, b);
        }
    } else {//如果没有小数点
        if (b === -1) {
            a = a + '.';
            for (i = 1; i <= num; i++) {
                a = a + '0';
            }
        } else {//有小数点，超出位数自动截取，否则补0
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + '0';
            }
        }
    }
    return a;
}

/*
* 加法
* @param {Number, String} num1 加数
* @param {Number, String} num2 加数
* @return {Number} sum  和
* */
calculator.add = function (num1, num2) {
    return fixedFloat(num1, num2, '+')
}

/*
* 减法
* @param {Number, String} num1 被减数
* @param {Number, String}  num2 减数
* @return {Number} difference  差
* */
calculator.sub = function (num1, num2) {
    return fixedFloat(num1, num2, '-')
}

/*
* 乘法
* @param {Number, String} num1 乘数
* @param {Number, String} num2 乘数
* @return {Number} product 积
* */
calculator.mul = function (num1, num2) {
    return fixedFloat(num1, num2, '*')
}

/*
* 除法
* @param  {Number, String} num1 - 被除数
* @param  {Number, String} num2 - 除数
* @return  {Number} division 商
* */
calculator.div = function (num1, num2) {
    return fixedFloat(num1, num2, '/')
}


module.exports = calculator
