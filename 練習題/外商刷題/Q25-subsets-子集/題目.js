/*
【題目】
LeetCode 78. Subsets（子集）

給定一組互不相同的整數 nums，回傳所有可能的子集（冪集），
結果不可包含重複的子集。

範例：
輸入：nums = [1,2,3]
輸出：[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]（順序不限）
*/

function subsets(nums) {
  // TODO: 實作回溯法產生所有子集
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

// 結果順序不限，定義 normalize 後再比較
const norm = (rr) =>
  rr
    .map((r) => [...r].sort((a, b) => a - b))
    .sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));

assert.strictEqual(subsets([1, 2, 3]).length, 8);
assert.deepStrictEqual(
  norm(subsets([1, 2, 3])),
  norm([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])
);
assert.deepStrictEqual(norm(subsets([0])), norm([[], [0]]));
assert.deepStrictEqual(norm(subsets([])), norm([[]]));
