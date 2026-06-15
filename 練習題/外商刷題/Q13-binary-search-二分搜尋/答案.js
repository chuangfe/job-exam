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
  // 左右兩個指標，分別指向搜尋範圍的頭與尾
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    // 取中間索引，先減後加可避免大數相加溢位
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;        // 命中，直接回傳索引
    else if (nums[mid] < target) left = mid + 1; // 中間值太小，往右半邊找
    else right = mid - 1;                         // 中間值太大，往左半邊找
  }
  return -1; // 找不到
}

// 複雜度：時間 O(log n)、空間 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 9), 4);
assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 2), -1);
assert.strictEqual(search([5], 5), 0);
assert.strictEqual(search([5], -5), -1);
assert.strictEqual(search([1, 2, 3, 4], 1), 0);

console.log('✅ 通過');
