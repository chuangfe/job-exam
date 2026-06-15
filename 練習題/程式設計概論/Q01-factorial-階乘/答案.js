/*
【題目】階乘 (Factorial)
寫一個函式計算 n!（n 為非負整數）。

範例：factorial(5) === 120、factorial(0) === 1
*/

// 遞迴版
// 思路：n! = n × (n-1)!，終止條件是 0! = 1。
function factorial(n) {
  if (n < 0) throw new Error('n 必須為非負整數'); // 防呆
  if (n === 0 || n === 1) return 1;               // 終止條件 (base case)
  return n * factorial(n - 1);                    // 縮小問題規模
}

// 迭代版（避免大 n 造成 stack overflow）
function factorialIter(n) {
  if (n < 0) throw new Error('n 必須為非負整數');
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

/*
複雜度：
  時間 O(n)。
  遞迴空間 O(n)（呼叫堆疊）、迭代空間 O(1)。
  注意：n 太大會 stack overflow；超過 Number.MAX_SAFE_INTEGER（約 9×10^15）會失準，
        必要時改用 BigInt。
*/

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
