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
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {     // i 是目前要填入正確值的位置
    let minIdx = i;                     // 先假設 i 為最小值索引
    for (let j = i + 1; j < n; j++) {   // 在未排序區尋找真正的最小值
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    // 找到最小值後，與位置 i 交換（不同才交換，省去多餘操作）
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

/*
複雜度分析：
- 時間：最佳/平均/最壞皆 O(n²)（無論是否已排序都要掃描整個未排序區）
- 空間：O(1)（原地排序）
- 穩定性：不穩定（交換可能改變相等元素的相對順序）
- 特點：交換次數少（最多 n-1 次），適合交換成本高的情境
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(selectionSort([5, 2, 8, 1, 9, 3]), [1, 2, 3, 5, 8, 9]);
assert.deepStrictEqual(selectionSort([]), []);                // 空陣列
assert.deepStrictEqual(selectionSort([1]), [1]);              // 單一元素
assert.deepStrictEqual(selectionSort([1, 2, 3]), [1, 2, 3]);  // 已排序
assert.deepStrictEqual(selectionSort([3, 1, 3]), [1, 3, 3]);  // 含重複

console.log('✅ 通過');
