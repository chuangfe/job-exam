/*
【題目】
LeetCode 46. Permutations（全排列）

給定一組互不相同的整數 nums，回傳所有可能的全排列，
結果可以以任意順序回傳。

範例：
輸入：nums = [1,2,3]
輸出：共 6 種排列
[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]（順序不限）
*/

function permute(nums) {
  // TODO: 實作回溯法產生所有全排列
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

// 全排列內元素順序有意義，僅對「外層多個排列」排序後比較
const norm = (rr) => rr.map((r) => [...r]).sort((a, b) => a.join(',').localeCompare(b.join(',')));

assert.strictEqual(permute([1, 2, 3]).length, 6);
assert.deepStrictEqual(
  norm(permute([1, 2, 3])),
  norm([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])
);
assert.deepStrictEqual(norm(permute([1])), norm([[1]]));
assert.strictEqual(permute([0, 1]).length, 2);
