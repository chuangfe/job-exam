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
  // TODO: 實作最長嚴格遞增子序列長度計算
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), 4);
assert.strictEqual(lengthOfLIS([0, 1, 0, 3, 2, 3]), 4);
assert.strictEqual(lengthOfLIS([7, 7, 7, 7]), 1);
assert.strictEqual(lengthOfLIS([]), 0);
assert.strictEqual(lengthOfLIS([1]), 1);
