/*
【題目】找最大／最小值
不用 Math.max 找出陣列最大與最小值。空陣列回傳 null。

範例：
  findMinMax([3, 7, 1, 9, 4])  =>  { min: 1, max: 9 }
  findMinMax([])               =>  null
  findMinMax([5])              =>  { min: 5, max: 5 }
*/

function findMinMax(arr) {
  // 邊界：空陣列沒有任何元素可比較，回傳 null
  if (arr.length === 0) return null;
  // 先假設第一個元素同時是最大值與最小值
  let min = arr[0], max = arr[0];
  // 從第二個開始逐一比較並更新
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]; // 比目前最大值大就更新
    if (arr[i] < min) min = arr[i]; // 比目前最小值小就更新
  }
  return { min, max };
}

/*
複雜度：時間 O(n)、空間 O(1)。記得處理空陣列邊界。
內建對照：Math.max(...arr)。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(findMinMax([3, 7, 1, 9, 4]), { min: 1, max: 9 });
assert.strictEqual(findMinMax([]), null);
assert.deepStrictEqual(findMinMax([5]), { min: 5, max: 5 });
assert.deepStrictEqual(findMinMax([-3, -7, -1, -9]), { min: -9, max: -1 });

console.log('✅ 通過');
