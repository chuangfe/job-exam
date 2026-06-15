/*
【題目】氣泡排序 (Bubble Sort)
將一個數字陣列由小到大排序。

思路：
- 相鄰兩兩比較，較大的往後「冒泡」。
- 每一輪結束會確定一個最大值歸位到尾端。
- 加上 swapped 旗標：若某一輪都沒有交換，代表已排序完成，可提早結束。

範例：
  bubbleSort([5, 2, 8, 1, 9, 3])  =>  [1, 2, 3, 5, 8, 9]
  bubbleSort([])                  =>  []
  bubbleSort([1])                 =>  [1]
  bubbleSort([1, 2, 3])           =>  [1, 2, 3]   // 已排序
  bubbleSort([3, 1, 3])           =>  [1, 3, 3]   // 含重複
*/

function bubbleSort(arr) {
  // TODO: 實作氣泡排序，將 arr 由小到大排序並回傳
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(bubbleSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(bubbleSort([]), []);                // 空陣列
assert.deepStrictEqual(bubbleSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(bubbleSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(bubbleSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
