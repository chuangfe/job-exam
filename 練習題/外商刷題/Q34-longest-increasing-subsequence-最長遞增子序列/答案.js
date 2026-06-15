/*
【題目】
LeetCode 300. Longest Increasing Subsequence (最長遞增子序列)

給定整數陣列 nums，回傳最長嚴格遞增子序列的長度。

範例:
  輸入: nums = [10,9,2,5,3,7,101,18]  輸出: 4  (如 [2,3,7,101])
  輸入: nums = [0,1,0,3,2,3]          輸出: 4  (如 [0,1,2,3])
  輸入: nums = [7,7,7,7]              輸出: 1  (嚴格遞增故僅 1)
*/

function lengthOfLIS(nums) {
  // 動態規劃：dp[i] 代表以 nums[i] 結尾的最長遞增子序列長度，初始皆為 1
  const dp = new Array(nums.length).fill(1);
  let best = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 若 nums[j] < nums[i]，可將 nums[i] 接在以 nums[j] 結尾的序列後面
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }
  return nums.length ? best : 0; // 空陣列回傳 0
}
// 時間複雜度 O(n²)、空間複雜度 O(n)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), 4);
assert.strictEqual(lengthOfLIS([0, 1, 0, 3, 2, 3]), 4);
assert.strictEqual(lengthOfLIS([7, 7, 7, 7]), 1);
assert.strictEqual(lengthOfLIS([]), 0);
assert.strictEqual(lengthOfLIS([1]), 1);

console.log('✅ 通過');
