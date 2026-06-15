/*
【題目】選擇排序 (Selection Sort)
將一個數字陣列由小到大排序。

思路：
- 每一輪從「未排序區」找出最小值。
- 把該最小值放到「已排序區」的尾端（與目前位置交換）。
- 重複直到整個陣列排序完成。

範例：
  selectionSort([5, 2, 8, 1, 9, 3])  =>  [1, 2, 3, 5, 8, 9]
  selectionSort([])                  =>  []
  selectionSort([1])                 =>  [1]
  selectionSort([1, 2, 3])           =>  [1, 2, 3]   // 已排序
  selectionSort([3, 1, 3])           =>  [1, 3, 3]   // 含重複
*/

function selectionSort(arr) {
  // TODO: 實作選擇排序，將 arr 由小到大排序並回傳
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(selectionSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(selectionSort([]), []);                // 空陣列
assert.deepStrictEqual(selectionSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(selectionSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(selectionSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
