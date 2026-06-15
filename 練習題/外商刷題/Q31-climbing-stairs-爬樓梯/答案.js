/*
【題目】
LeetCode 70. Climbing Stairs (爬樓梯)

爬 n 階樓梯，每次可爬 1 或 2 階，問有幾種不同方法爬到頂。

範例:
  輸入: n = 2  輸出: 2  (1+1 或 2)
  輸入: n = 3  輸出: 3  (1+1+1 或 1+2 或 2+1)
*/

function climbStairs(n) {
  // 動態規劃：到第 i 階的方法數 = 到第 i-1 階 + 到第 i-2 階
  // oneStepBack 代表前一階的方法數，twoStepsBack 代表前兩階的方法數
  let oneStepBack = 1, twoStepsBack = 1;
  for (let i = 2; i <= n; i++) {
    const current = oneStepBack + twoStepsBack; // 當前階方法數
    twoStepsBack = oneStepBack;                  // 滾動更新
    oneStepBack = current;
  }
  return oneStepBack;
}
// 時間複雜度 O(n)、空間複雜度 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(climbStairs(2), 2);
assert.strictEqual(climbStairs(3), 3);
assert.strictEqual(climbStairs(1), 1);
assert.strictEqual(climbStairs(5), 8);
assert.strictEqual(climbStairs(10), 89);

console.log('✅ 通過');
