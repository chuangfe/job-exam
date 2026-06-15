/*
【題目】
LeetCode 33. Search in Rotated Sorted Array

一個升冪排序的陣列在某個未知的樞紐處旋轉後，作為 nums 給定。
請找出 target 的索引，若不存在則回傳 -1。要求時間複雜度為 O(log n)。

範例：
  輸入：nums = [4, 5, 6, 7, 0, 1, 2], target = 0
  輸出：4
  輸入：nums = [4, 5, 6, 7, 0, 1, 2], target = 3
  輸出：-1
*/

function searchRotated(nums, target) {
  // TODO: 使用二分搜尋在旋轉後的陣列中找出 target
  return -1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 0), 4);
assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 3), -1);
assert.strictEqual(searchRotated([1], 0), -1);
assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 4), 0);
assert.strictEqual(searchRotated([5, 1, 3], 5), 0);
