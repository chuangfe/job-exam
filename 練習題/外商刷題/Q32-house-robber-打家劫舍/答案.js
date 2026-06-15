/*
【題目】
LeetCode 198. House Robber (打家劫舍)

沿街房屋金額陣列 nums，相鄰房屋不可同時搶（會觸發警報），求可搶到的最大金額。

範例:
  輸入: nums = [1,2,3,1]    輸出: 4  (搶 1 號與 3 號: 1+3)
  輸入: nums = [2,7,9,3,1]  輸出: 12 (搶 2 號、9 號、1 號: 2+9+1)
*/

function rob(nums) {
  // 動態規劃：對每間房屋，選擇「不搶（保留 prev）」或「搶（prev2 + 當前金額）」取最大
  // prev 代表前一間的最佳金額，prev2 代表前兩間的最佳金額
  let prev = 0, prev2 = 0;
  for (const num of nums) {
    const current = Math.max(prev, prev2 + num); // 不搶 vs 搶
    prev2 = prev;                                // 滾動更新
    prev = current;
  }
  return prev;
}
// 時間複雜度 O(n)、空間複雜度 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(rob([1, 2, 3, 1]), 4);
assert.strictEqual(rob([2, 7, 9, 3, 1]), 12);
assert.strictEqual(rob([]), 0);
assert.strictEqual(rob([5]), 5);
assert.strictEqual(rob([2, 1, 1, 2]), 4);

console.log('✅ 通過');
