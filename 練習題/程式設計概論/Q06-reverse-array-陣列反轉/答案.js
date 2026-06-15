/*
【題目】陣列反轉
將陣列原地反轉（不另開新陣列）。

範例：
  reverseArray([1, 2, 3, 4, 5])  =>  [5, 4, 3, 2, 1]
  reverseArray([1])              =>  [1]
  reverseArray([])               =>  []
*/

function reverseArray(arr) {
  // 雙指標：left 從頭、right 從尾
  let left = 0, right = arr.length - 1;
  while (left < right) {
    // 解構賦值交換頭尾兩個元素（原地，不另開新陣列）
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;   // 頭指標往中間靠攏
    right--;  // 尾指標往中間靠攏
  }
  return arr;
}

/*
複雜度：時間 O(n)、空間 O(1)（原地反轉，未額外配置陣列）。
雙指標是高頻技巧。內建對照：[1, 2, 3].reverse()。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(reverseArray([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(reverseArray([1]), [1]);
assert.deepStrictEqual(reverseArray([]), []);
assert.deepStrictEqual(reverseArray([1, 2]), [2, 1]);

console.log('✅ 通過');
