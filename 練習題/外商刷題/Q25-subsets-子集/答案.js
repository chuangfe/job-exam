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
  const res = []; // 存放所有子集
  const path = []; // 當前正在建構的子集

  // 回溯：start 控制從哪個索引開始選，避免重複組合
  const backtrack = (start) => {
    // 每進入一個節點，當前 path 就是一個合法子集
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // 選擇 nums[i]
      backtrack(i + 1); // 往後選，不回頭
      path.pop(); // 撤銷選擇
    }
  };

  backtrack(0);
  return res;
}

// 時間複雜度：O(n · 2ⁿ) —— 共有 2ⁿ 個子集，每個複製需 O(n)
// 空間複雜度：O(n) —— 遞迴深度與 path 長度最多為 n（不計輸出）

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

console.log('✅ 通過');
