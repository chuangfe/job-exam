/*
【題目】費氏數列 (Fibonacci)
求第 n 項費氏數，定義如下：
  F(0) = 0
  F(1) = 1
  F(n) = F(n-1) + F(n-2)  (n >= 2)

請提供三種實作：
  fibRec(n)  純遞迴版
  fibIter(n) 迭代版
  fibMemo(n) 記憶化 (memoization) 版

範例：
  fibIter(10) === 55
  fibRec(0)   === 0
  fibRec(1)   === 1
*/

// TODO: 實作純遞迴版
function fibRec(n) {
  // TODO
  return undefined;
}

// TODO: 實作迭代版
function fibIter(n) {
  // TODO
  return undefined;
}

// TODO: 實作記憶化版
function fibMemo(n, memo = {}) {
  // TODO
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(fibIter(0), 0);
assert.strictEqual(fibIter(1), 1);
assert.strictEqual(fibIter(10), 55);
assert.strictEqual(fibIter(20), 6765);

assert.strictEqual(fibRec(0), 0);
assert.strictEqual(fibRec(1), 1);
assert.strictEqual(fibRec(10), 55);

assert.strictEqual(fibMemo(0), 0);
assert.strictEqual(fibMemo(1), 1);
assert.strictEqual(fibMemo(10), 55);

console.log('✅ 通過');
