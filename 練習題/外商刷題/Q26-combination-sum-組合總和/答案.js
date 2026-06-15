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
  const res = []; // 存放所有合法組合
  const path = []; // 當前正在建構的組合

  // 回溯：start 控制起始索引，remain 為剩餘需湊出的數值
  const backtrack = (start, remain) => {
    if (remain === 0) {
      // 剛好湊滿目標，記錄一組答案
      res.push([...path]);
      return;
    }
    if (remain < 0) return; // 超過目標，剪枝
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]); // 選擇 candidates[i]
      // 傳入 i（而非 i+1）允許同一數字重複使用
      backtrack(i, remain - candidates[i]);
      path.pop(); // 撤銷選擇
    }
  };

  backtrack(0, target);
  return res;
}

// 時間複雜度：與數值大小相關，最壞約 O(N^(target/min))，N 為候選數量
// 空間複雜度：O(target / min) —— 遞迴深度受最小候選值限制（不計輸出）

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

console.log('✅ 通過');
