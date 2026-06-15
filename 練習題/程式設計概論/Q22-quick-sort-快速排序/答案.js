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
  if (arr.length <= 1) return arr;          // 終止條件：0 或 1 個元素已有序
  const pivot = arr[arr.length - 1];        // 選最後一個元素作為基準
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {// 走訪除了 pivot 以外的元素
    if (arr[i] < pivot) left.push(arr[i]);  // 比 pivot 小 -> 左
    else right.push(arr[i]);                // 其餘（含相等）-> 右
  }
  // 遞迴排序左右，再以 pivot 串接：左 < pivot <= 右
  return [...quickSort(left), pivot, ...quickSort(right)];
}

/*
複雜度分析：
- 時間：最佳/平均 O(n log n)、最壞 O(n²)（如已排序資料 + 不佳的 pivot 選擇）
- 空間：O(log n)（遞迴堆疊；此實作另用了額外陣列，非嚴格原地）
- 穩定性：不穩定
- 特點：平均情況下常數因子小，實務上通常最快
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(quickSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(quickSort([]), []);                // 空陣列
assert.deepStrictEqual(quickSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(quickSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(quickSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
