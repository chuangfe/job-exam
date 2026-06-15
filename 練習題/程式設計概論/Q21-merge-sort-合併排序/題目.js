/*
【題目】合併排序 (Merge Sort)
將一個數字陣列由小到大排序。

思路（分治法 Divide and Conquer）：
- 把陣列對半切，遞迴切到長度 <= 1（不能再切）。
- 再把兩個「已排序」的子陣列兩兩合併（merge）成一個有序陣列。
注意：mergeSort 不是原地排序，會回傳「新陣列」。

範例：
  mergeSort([5, 2, 8, 1, 9, 3])  =>  [1, 2, 3, 5, 8, 9]
  mergeSort([])                  =>  []
  mergeSort([1])                 =>  [1]
  mergeSort([1, 2, 3])           =>  [1, 2, 3]   // 已排序
  mergeSort([3, 1, 3])           =>  [1, 3, 3]   // 含重複
*/

function mergeSort(arr) {
  // TODO: 實作合併排序（分治），回傳排序後的新陣列
  return undefined;
}

function merge(left, right) {
  // TODO: 合併兩個已排序陣列 left、right，回傳合併後的有序新陣列
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(mergeSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(mergeSort([]), []);                // 空陣列
assert.deepStrictEqual(mergeSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(mergeSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(mergeSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
