/*
【題目】快速排序 (Quick Sort)
將一個數字陣列由小到大排序。

思路（分治法）：
- 選一個基準 pivot（此處取最後一個元素）。
- 把比 pivot 小的放左邊、其餘（>=）放右邊。
- 再對左右兩側遞迴，最後組合成 [...左, pivot, ...右]。

範例：
  quickSort([5, 2, 8, 1, 9, 3])  =>  [1, 2, 3, 5, 8, 9]
  quickSort([])                  =>  []
  quickSort([1])                 =>  [1]
  quickSort([1, 2, 3])           =>  [1, 2, 3]   // 已排序
  quickSort([3, 1, 3])           =>  [1, 3, 3]   // 含重複
*/

function quickSort(arr) {
  // TODO: 實作快速排序（分治），回傳排序後的新陣列
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(quickSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(quickSort([]), []);                // 空陣列
assert.deepStrictEqual(quickSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(quickSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(quickSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
