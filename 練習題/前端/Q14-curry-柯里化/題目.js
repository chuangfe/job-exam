/*
【題目】curry（柯里化）

說明：
實作 curry(fn)，讓 fn(a, b, c) 可寫成 fn(a)(b)(c)、fn(a, b)(c)、fn(a)(b, c) 等。

提示：用 fn.length（形參數量）判斷參數是否收滿；湊齊則執行，否則回傳
收集剩餘參數的函式。

範例：
  const add = (a, b, c) => a + b + c;
  const c = curry(add);
  c(1)(2)(3);   // 6
  c(1, 2)(3);   // 6
  c(1)(2, 3);   // 6
*/

// curry：回傳柯里化後的函式
function curry(fn) {
  // TODO: 收集參數，args.length >= fn.length 時執行，否則回傳續收參數的函式
  return function () {}; // 預設回傳（未實作）
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
