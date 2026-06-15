/*
【題目】
LeetCode 198. House Robber (打家劫舍)

沿街房屋金額陣列 nums，相鄰房屋不可同時搶（會觸發警報），求可搶到的最大金額。

範例:
  輸入: nums = [1,2,3,1]    輸出: 4  (搶 1 號與 3 號: 1+3)
  輸入: nums = [2,7,9,3,1]  輸出: 12 (搶 2 號、9 號、1 號: 2+9+1)
*/

function rob(nums) {
  // TODO: 實作打家劫舍的最大金額計算
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(rob([1, 2, 3, 1]), 4);
assert.strictEqual(rob([2, 7, 9, 3, 1]), 12);
assert.strictEqual(rob([]), 0);
assert.strictEqual(rob([5]), 5);
assert.strictEqual(rob([2, 1, 1, 2]), 4);
