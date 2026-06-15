/*
【題目】
LeetCode 1. Two Sum (兩數之和)

給定整數陣列 nums 與目標值 target，回傳兩個數字的索引使其和為 target。
每個輸入恰有一組解，同一元素不可使用兩次。

範例:
  輸入: nums = [2, 7, 11, 15], target = 9
  輸出: [0, 1]
  說明: 因為 nums[0] + nums[1] === 9，所以回傳 [0, 1]。
*/

function twoSum(nums, target) {
  // TODO: 實作邏輯
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);
assert.deepStrictEqual(twoSum([-1, -2, -3, -4, -5], -8), [2, 4]);
