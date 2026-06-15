/*
【題目】階乘 (Factorial)
寫一個函式計算 n!（n 為非負整數）。

說明：
  n! = n × (n-1) × ... × 2 × 1，且 0! = 1。
  n 為負整數時應拋出錯誤。

範例：
  factorial(5) === 120
  factorial(0) === 1
  factorial(1) === 1
*/

// 遞迴版：請實作
function factorial(n) {
  // TODO: 實作階乘
  return undefined;
}

// 迭代版：請實作（避免大 n 造成 stack overflow）
function factorialIter(n) {
  // TODO: 實作迭代版階乘
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(factorial(5), 120);
assert.strictEqual(factorial(0), 1);
assert.strictEqual(factorial(1), 1);
assert.strictEqual(factorial(6), 720);
assert.throws(() => factorial(-1), /非負整數/);

assert.strictEqual(factorialIter(5), 120);
assert.strictEqual(factorialIter(0), 1);
assert.strictEqual(factorialIter(10), 3628800);

console.log('✅ 通過');
