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
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {       // 共需 n-1 輪
    let swapped = false;                  // 記錄本輪是否有交換
    for (let j = 0; j < n - 1 - i; j++) { // -i：尾端 i 個已歸位，不必再比
      if (arr[j] > arr[j + 1]) {          // 前者較大就交換，把大的往後推
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;                  // 本輪無交換代表已排序，提早結束
  }
  return arr;
}

/*
複雜度分析：
- 時間：最佳 O(n)（已排序時，加旗標一輪即結束）、平均/最壞 O(n²)
- 空間：O(1)（原地排序）
- 穩定性：穩定（相等元素不互換，相對順序不變）
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(bubbleSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(bubbleSort([]), []);                // 空陣列
assert.deepStrictEqual(bubbleSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(bubbleSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(bubbleSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
