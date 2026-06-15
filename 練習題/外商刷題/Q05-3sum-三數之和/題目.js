/*
【題目】 LeetCode 15. 3Sum（三數之和）

給定一個整數陣列 nums，找出所有不重複的三元組 [a, b, c]，
使得 a + b + c = 0。答案中不可包含重複的三元組。

範例：
  輸入: [-1, 0, 1, 2, -1, -4]
  輸出: [[-1, -1, 2], [-1, 0, 1]]
  說明: 共有兩組不重複且總和為 0 的三元組。

  輸入: [0, 1, 1]
  輸出: []
  說明: 沒有任何三元組總和為 0。

  輸入: [0, 0, 0]
  輸出: [[0, 0, 0]]
  說明: 唯一的三元組總和為 0。
*/

function threeSum(nums) {
  // TODO: 實作三數之和邏輯
  return []; // 預設回傳空陣列，使測試失敗
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
assert.deepStrictEqual(threeSum([0, 1, 1]), []);
assert.deepStrictEqual(threeSum([0, 0, 0]), [[0, 0, 0]]);
assert.deepStrictEqual(threeSum([]), []);
