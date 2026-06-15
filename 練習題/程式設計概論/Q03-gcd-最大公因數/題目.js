/*
【題目】最大公因數 (GCD) — 輾轉相除法
求兩個正整數的最大公因數。
使用歐幾里得演算法：gcd(a, b) = gcd(b, a mod b)，當 b 為 0 時 a 即為答案。

請提供兩種實作：
  gcd(a, b)     遞迴版
  gcdIter(a, b) 迭代版

範例：
  gcd(48, 18) === 6
*/

// TODO: 實作遞迴版
function gcd(a, b) {
  // TODO
  return undefined;
}

// TODO: 實作迭代版
function gcdIter(a, b) {
  // TODO
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(gcd(48, 18), 6);
assert.strictEqual(gcd(12, 18), 6);
assert.strictEqual(gcd(17, 5), 1);
assert.strictEqual(gcd(100, 10), 10);

assert.strictEqual(gcdIter(48, 18), 6);

console.log('✅ 通過');
