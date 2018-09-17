'use strict';
/**
 * calculator
 * @description 浮点数计算封装
 * @author mack wang
 * @website yurencloud.com
 */



var calculator = {}

calculator.string = function(number) {
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

/*
* 日期转字符串
* @param dateObject Date 日期对象
* @param pattern String 转化格式 yyyy-MM-dd hh:mm:ss.SSS
* @return dateFormatString String
* */
calculator.add = function (num1, num2) {
    var r1 = 0, r2 = 0, m
    try {
        r1 = calculator.string(num1).split(".")[1].length
    } catch (e) {
    }

    try {
        r2 = calculator.string(num2).split(".")[1].length
    } catch (e) {
    }

    m = Math.pow(10, Math.max(r1, r2))
    return (num1 * m + num2 * m) / m
}

calculator.sub = function (num1, num2) {
    var r1 = 0, r2 = 0, m
    try {
        r1 = calculator.string(num1).split(".")[1].length
    } catch (e) {
    }
    try {
        r2 = calculator.string(num2).split(".")[1].length
    } catch (e) {
    }

    m = Math.pow(10, Math.max(r1, r2))
    return (num1 * m - num2 * m) / m
}

calculator.div = function (num1, num2) {
    var r1 = 0, r2 = 0, m
    try {
        r1 = calculator.string(num1).split(".")[1].length
    } catch (e) {
    }
    try {
        r2 = calculator.string(num2).split(".")[1].length
    } catch (e) {
    }

    m = Math.pow(10, Math.max(r1, r2))
    return (num1 * m) / (num2 * m)
}

calculator.mul = function (num1, num2) {
    var m = 0,
        s1 = calculator.string(num1),
        s2 = calculator.string(num2);
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


module.exports = calculator
