/*
【答案】curry（柯里化）

重點：
- 核心是 args.length >= fn.length 判斷是否湊齊形參數量。
- 湊齊則 fn.apply 執行；否則回傳收集剩餘參數的函式，遞迴併入既有參數。
*/

// curry：回傳柯里化後的函式
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried.apply(this, [...args, ...next]);
  };
}

// ===== 測試 =====
const assert = require('node:assert');

const add = (a, b, c) => a + b + c;
const c = curry(add);

// 1) 各種呼叫方式皆得 6
assert.strictEqual(c(1)(2)(3), 6);
assert.strictEqual(c(1, 2)(3), 6);
assert.strictEqual(c(1)(2, 3), 6);
assert.strictEqual(c(1, 2, 3), 6);

// 2) 同一柯里化函式可重複使用
const add1 = c(1);
assert.strictEqual(add1(2)(3), 6);
assert.strictEqual(add1(10)(20), 31);

// 3) 兩個參數的函式
const mul = curry((a, b) => a * b);
assert.strictEqual(mul(3)(4), 12);
assert.strictEqual(mul(3, 4), 12);

console.log('✅ 通過');
