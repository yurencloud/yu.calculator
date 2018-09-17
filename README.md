
## 安装
~~~
npm install --save yu.calculator
~~~
## 使用方法
~~~
var calculator = require('yu.calculator');

// 加
var r1 = calculator.add(0.1, 0.2) // 0.3

// 减
var r2 = calculator.sub(0.51, 0.3) // 0.21

// 乘
var r3 = calculator.mul(7, 0.8) // 5.6

// 除
var r4 = calculator.div(0.3, 0.1) // 3

// 科学计数转字符串数字
var r5 = calculator.string(1e20) // '100000000000000000000'

// 按精度截取小数，舍弃小数部分
var r6 = calculator.format(32.2349341, 3) // '32.234'
~~~


> 具体使用方法见index.test.js，
