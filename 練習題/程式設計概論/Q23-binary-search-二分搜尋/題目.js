/*
【題目】二分搜尋 (Binary Search)
前提：陣列必須「已由小到大排序」。
在陣列中尋找 target，找到回傳其索引；找不到回傳 -1。

思路：
- 維護 left、right 兩個邊界。
- 每次比較中間值 arr[mid]：
    相等 -> 回傳 mid；
    arr[mid] < target -> 答案在右半，left = mid + 1；
    否則 -> 答案在左半，right = mid - 1。
- 每次砍掉一半搜尋範圍。

範例：
  binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 7)  =>  4
  binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 5)  =>  -1
  binarySearch([1, 2, 3], 1)                    =>  0
  binarySearch([1, 2, 3], 3)                    =>  2
  binarySearch([], 1)                           =>  -1
*/

function binarySearch(arr, target) {
  // TODO: 實作二分搜尋，找到回傳索引，找不到回傳 -1
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 7), 4);
assert.strictEqual(binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 5), -1);
assert.strictEqual(binarySearch([1, 2, 3], 1), 0);   // 最左
assert.strictEqual(binarySearch([1, 2, 3], 3), 2);   // 最右
assert.strictEqual(binarySearch([], 1), -1);         // 空陣列

console.log('✅ 通過');
