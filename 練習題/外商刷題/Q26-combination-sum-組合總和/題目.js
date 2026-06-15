/*
【題目】
LeetCode 39. Combination Sum（組合總和）

給定一組無重複的正整數陣列 candidates 與一個目標整數 target，
回傳所有總和為 target 的不同組合，同一個數字可以被重複使用任意次。

範例：
輸入：candidates = [2,3,6,7], target = 7
輸出：[[2,2,3],[7]]（順序不限）
*/

function combinationSum(candidates, target) {
  // TODO: 實作回溯法（允許重複使用同一數字）
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

// 結果順序不限，定義 normalize 後再比較
const norm = (rr) =>
  rr
    .map((r) => [...r].sort((a, b) => a - b))
    .sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));

assert.deepStrictEqual(norm(combinationSum([2, 3, 6, 7], 7)), norm([[2, 2, 3], [7]]));
assert.deepStrictEqual(
  norm(combinationSum([2, 3, 5], 8)),
  norm([[2, 2, 2, 2], [2, 3, 3], [3, 5]])
);
assert.deepStrictEqual(norm(combinationSum([2], 1)), norm([]));
