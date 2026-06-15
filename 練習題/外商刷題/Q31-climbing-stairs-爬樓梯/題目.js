/*
【題目】
LeetCode 70. Climbing Stairs (爬樓梯)

爬 n 階樓梯，每次可爬 1 或 2 階，問有幾種不同方法爬到頂。

範例:
  輸入: n = 2  輸出: 2  (1+1 或 2)
  輸入: n = 3  輸出: 3  (1+1+1 或 1+2 或 2+1)
*/

function climbStairs(n) {
  // TODO: 實作爬樓梯的方法數計算
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(climbStairs(2), 2);
assert.strictEqual(climbStairs(3), 3);
assert.strictEqual(climbStairs(1), 1);
assert.strictEqual(climbStairs(5), 8);
assert.strictEqual(climbStairs(10), 89);
