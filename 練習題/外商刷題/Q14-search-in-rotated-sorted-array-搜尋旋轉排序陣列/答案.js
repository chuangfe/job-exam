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
  // 左右兩個指標，分別指向搜尋範圍的頭與尾
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    // 取中間索引
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid; // 命中
    if (nums[left] <= nums[mid]) {
      // 左半邊 [left, mid] 是有序的
      if (nums[left] <= target && target < nums[mid]) right = mid - 1; // target 落在左半，往左找
      else left = mid + 1;                                             // 否則往右找
    } else {
      // 右半邊 [mid, right] 是有序的
      if (nums[mid] < target && target <= nums[right]) left = mid + 1; // target 落在右半，往右找
      else right = mid - 1;                                            // 否則往左找
    }
  }
  return -1; // 找不到
}

// 複雜度：時間 O(log n)、空間 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 0), 4);
assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 3), -1);
assert.strictEqual(searchRotated([1], 0), -1);
assert.strictEqual(searchRotated([4, 5, 6, 7, 0, 1, 2], 4), 0);
assert.strictEqual(searchRotated([5, 1, 3], 5), 0);

console.log('✅ 通過');
