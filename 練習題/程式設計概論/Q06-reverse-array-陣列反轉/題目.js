/*
【題目】陣列反轉
將陣列原地反轉（不另開新陣列）。

範例：
  reverseArray([1, 2, 3, 4, 5])  =>  [5, 4, 3, 2, 1]
  reverseArray([1])              =>  [1]
  reverseArray([])               =>  []
*/

function reverseArray(arr) {
  // TODO: 用雙指標，頭尾交換往中間靠攏
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(reverseArray([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(reverseArray([1]), [1]);
assert.deepStrictEqual(reverseArray([]), []);
assert.deepStrictEqual(reverseArray([1, 2]), [2, 1]);

console.log('✅ 通過');
