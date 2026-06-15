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
  if (arr.length <= 1) return arr;            // 終止條件：0 或 1 個元素已是有序
  const mid = Math.floor(arr.length / 2);     // 取中點對半切
  const left = mergeSort(arr.slice(0, mid));  // 遞迴排序左半
  const right = mergeSort(arr.slice(mid));    // 遞迴排序右半
  return merge(left, right);                  // 合併兩個已排序子陣列
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  // 兩邊都還有元素時，比較取較小者放入 result（<= 確保穩定性）
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  // 其中一邊耗盡，把另一邊剩餘的（已排序）接上
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/*
複雜度分析：
- 時間：最佳/平均/最壞皆 O(n log n)（log n 層、每層合併 O(n)）
- 空間：O(n)（合併時需額外陣列；非原地排序）
- 穩定性：穩定（相等時優先取 left，相對順序不變）
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(mergeSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(mergeSort([]), []);                // 空陣列
assert.deepStrictEqual(mergeSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(mergeSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(mergeSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
