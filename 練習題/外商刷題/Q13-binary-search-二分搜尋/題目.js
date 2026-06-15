/*
【題目】
LeetCode 704. Binary Search

給定一個升冪排序的整數陣列 nums 與一個目標值 target，
若 target 存在於陣列中則回傳其索引，否則回傳 -1。

範例：
  輸入：nums = [-1, 0, 3, 5, 9, 12], target = 9
  輸出：4
  輸入：nums = [-1, 0, 3, 5, 9, 12], target = 2
  輸出：-1
*/

function search(nums, target) {
  // TODO: 使用二分搜尋找出 target 的索引
  return -1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 9), 4);
assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 2), -1);
assert.strictEqual(search([5], 5), 0);
assert.strictEqual(search([5], -5), -1);
assert.strictEqual(search([1, 2, 3, 4], 1), 0);
