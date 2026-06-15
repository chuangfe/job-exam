/*
【題目】插入排序 (Insertion Sort)
將一個數字陣列由小到大排序。

思路：
- 像整理撲克牌：把每一張牌插入左側「已排序區」的正確位置。
- 從索引 1 開始，取出當前值 key，往左比較。
- 比 key 大的元素逐一往右移，騰出空位後把 key 放進去。

範例：
  insertionSort([5, 2, 8, 1, 9, 3])  =>  [1, 2, 3, 5, 8, 9]
  insertionSort([])                  =>  []
  insertionSort([1])                 =>  [1]
  insertionSort([1, 2, 3])           =>  [1, 2, 3]   // 已排序
  insertionSort([3, 1, 3])           =>  [1, 3, 3]   // 含重複
*/

function insertionSort(arr) {
  // TODO: 實作插入排序，將 arr 由小到大排序並回傳
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(insertionSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(insertionSort([]), []);                // 空陣列
assert.deepStrictEqual(insertionSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(insertionSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(insertionSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
