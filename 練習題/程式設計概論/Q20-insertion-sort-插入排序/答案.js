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
  for (let i = 1; i < arr.length; i++) { // 從第二個元素開始（索引 0 視為已排序）
    const key = arr[i];                  // 當前要插入的值
    let j = i - 1;                       // 從已排序區的最右端往左找位置
    while (j >= 0 && arr[j] > key) {     // 比 key 大的元素
      arr[j + 1] = arr[j];               // 往右移一格，騰出空位
      j--;
    }
    arr[j + 1] = key;                    // 把 key 放進正確位置
  }
  return arr;
}

/*
複雜度分析：
- 時間：最佳 O(n)（近乎排序時，while 幾乎不進入）、平均/最壞 O(n²)
- 空間：O(1)（原地排序）
- 穩定性：穩定（只在嚴格大於時才右移，相等元素不會被越過）
- 特點：對近乎已排序的小資料非常快
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(insertionSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(insertionSort([]), []);                // 空陣列
assert.deepStrictEqual(insertionSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(insertionSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(insertionSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
