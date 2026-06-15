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
  let left = 0, right = arr.length - 1;          // 搜尋範圍 [left, right]
  while (left <= right) {                         // 範圍還有效時持續搜尋
    const mid = Math.floor((left + right) / 2);   // 取中間索引
    if (arr[mid] === target) return mid;          // 命中，回傳索引
    if (arr[mid] < target) left = mid + 1;        // 中間值偏小 -> 往右半找
    else right = mid - 1;                         // 中間值偏大 -> 往左半找
  }
  return -1;                                       // 範圍耗盡仍未找到
}

/*
複雜度分析：
- 時間：最佳 O(1)（一開始就命中中間）、平均/最壞 O(log n)
- 空間：O(1)（迭代版本，無額外遞迴堆疊）
- 前提：資料必須已排序，否則結果不正確
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 7), 4);
assert.strictEqual(binarySearch([1, 3, 4, 6, 7, 8, 10, 14], 5), -1);
assert.strictEqual(binarySearch([1, 2, 3], 1), 0);   // 最左
assert.strictEqual(binarySearch([1, 2, 3], 3), 2);   // 最右
assert.strictEqual(binarySearch([], 1), -1);         // 空陣列

console.log('✅ 通過');
