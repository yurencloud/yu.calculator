'use strict';
/**
 * calculator
 * @description 浮点数精确计算封装（支持科学计数法）
 * @author mack wang
 * @website yurencloud.com
 */



var calculator = {}

/*
* 数字转字符串（支持科学计数法，如1e12、1E12）
* @param number [Number,String] 数字
* @return number String 字符串数字，科技计数法会转成普通计数
* */
calculator.string = function (number) {
    var data = String(number).split(/[eE]/)
    if (data.length === 1) return data[0]

    var z = ''
    var sign = number < 0 ? '-' : ''
    var str = data[0].replace('.', '')
    var mag = Number(data[1]) + 1;

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

/*
* 减法
* @param num1 [Number,String] 被减数
* @param num2 [Number,String] 减数
* @return difference Number 差
* */
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

/*
* 乘法
* @param num1 [Number,String] 乘数
* @param num2 [Number,String] 乘数
* @return product Number 积
* */
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

/*
* 除法
* @param num1 [Number,String] 被除数
* @param num2 [Number,String] 除数
* @return division Number 商
* */
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
