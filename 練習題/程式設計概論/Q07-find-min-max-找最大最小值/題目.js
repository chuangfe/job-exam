/*
【題目】找最大／最小值
不用 Math.max 找出陣列最大與最小值。空陣列回傳 null。

範例：
  findMinMax([3, 7, 1, 9, 4])  =>  { min: 1, max: 9 }
  findMinMax([])               =>  null
  findMinMax([5])              =>  { min: 5, max: 5 }
*/

function findMinMax(arr) {
  // TODO: 先假設第一個是最大也是最小，逐一比較更新；記得處理空陣列
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(findMinMax([3, 7, 1, 9, 4]), { min: 1, max: 9 });
assert.strictEqual(findMinMax([]), null);
assert.deepStrictEqual(findMinMax([5]), { min: 5, max: 5 });
assert.deepStrictEqual(findMinMax([-3, -7, -1, -9]), { min: -9, max: -1 });

console.log('✅ 通過');
