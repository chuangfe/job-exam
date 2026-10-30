/*
【題目】陣列扁平化 flatten

說明：
實作 flatten(arr, depth)，將巢狀陣列攤平到指定深度（預設 Infinity 全攤平）。

提示：遞迴版用 reduce + concat，依 depth 控制；也可用迭代版（堆疊）避免
深層遞迴爆棧。

範例：
  flatten([1, [2, [3, [4]]]]);        // [1, 2, 3, 4]
  flatten([1, [2, [3, [4]]]], 1);     // [1, 2, [3, [4]]]
*/

// flatten：攤平陣列到指定深度
function flatten(arr, depth = Infinity) {
  // TODO: depth < 1 直接回傳淺拷貝；否則 reduce + 遞迴
  return arr.slice(); // 預設回傳（未實作）
}

// ===== 測試 =====
const assert = require('node:assert');

// 1) 預設全攤平
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]);

// 2) 指定深度 1
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]);

// 3) 指定深度 2
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]);

// 4) depth 0 等於淺拷貝
assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);

// 5) 已扁平陣列不變
assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);

console.log('✅ 通過');
