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
  const res = []; // 存放所有排列
  const path = []; // 當前正在建構的排列
  const used = new Array(nums.length).fill(false); // 標記元素是否已被使用

  const backtrack = () => {
    if (path.length === nums.length) {
      // 長度湊滿，記錄一組排列
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 已用過則跳過
      used[i] = true; // 標記使用
      path.push(nums[i]); // 選擇 nums[i]
      backtrack();
      path.pop(); // 撤銷選擇
      used[i] = false; // 還原標記
    }
  };

  backtrack();
  return res;
}

// 時間複雜度：O(n · n!) —— 共 n! 種排列，每種複製需 O(n)
// 空間複雜度：O(n) —— 遞迴深度、path 與 used 皆為 n（不計輸出）

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

console.log('✅ 通過');
