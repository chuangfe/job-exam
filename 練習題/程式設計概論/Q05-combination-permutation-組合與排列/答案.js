/*
【題目】組合 C(n, r) 與 排列 P(n, r)
(a) 計算組合數 C(n,r)、排列數 P(n,r)。
(b) 列出陣列所有排列、所有組合。
提供 combinationCount、permutationCount、permutations、combinations 四函式。
範例：combinationCount(5,2)===10、permutationCount(5,2)===20、
      permutations([1,2,3]) 有 6 種、combinations([1,2,3,4],2) 有 6 種
*/

// 組合數：巴斯卡定理 C(n,r)=C(n-1,r-1)+C(n-1,r)，
// 邊界 r===0 或 r===n 時為 1。
function combinationCount(n, r) {
  if (r === 0 || r === n) return 1;
  return combinationCount(n - 1, r - 1) + combinationCount(n - 1, r);
}

// 排列數：P(n,r) = n * (n-1) * ... * (n-r+1)，共 r 個連乘。
function permutationCount(n, r) {
  let result = 1;
  for (let i = n; i > n - r; i--) result *= i;
  return result;
}

// 列舉所有排列：回溯法，每次從剩餘元素挑一個放入 current，
// 遞迴處理剩下的元素，回來後 pop 撤銷選擇。
function permutations(arr) {
  const result = [];
  function backtrack(current, remaining) {
    if (remaining.length === 0) { result.push([...current]); return; } // 收集一組完整排列
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);                                       // 選擇
      const rest = remaining.slice(0, i).concat(remaining.slice(i + 1)); // 去掉已選元素
      backtrack(current, rest);                                         // 遞迴
      current.pop();                                                    // 撤銷選擇
    }
  }
  backtrack([], arr);
  return result;
}

// 列舉所有組合：回溯法，用 start 確保只往後挑（不重複、不回頭），
// 湊滿 r 個即收集。
function combinations(arr, r) {
  const result = [];
  function backtrack(start, current) {
    if (current.length === r) { result.push([...current]); return; } // 湊滿 r 個
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);        // 選擇
      backtrack(i + 1, current);   // 從下一個位置繼續，避免重複
      current.pop();               // 撤銷選擇
    }
  }
  backtrack(0, []);
  return result;
}

/*
複雜度說明：
  combinationCount 純遞迴（巴斯卡定理）：時間 O(2^n) 級（重複子問題，可用 DP/記憶化優化）。
  permutationCount：時間 O(r)。
  permutations：排列共 n! 個，列舉本身為階乘級 O(n * n!)。
  combinations：組合共 C(n,r) 個，列舉為指數級。
  回溯法核心三步：選擇 → 遞迴 → 撤銷選擇 (pop)。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(combinationCount(5, 2), 10);
assert.strictEqual(permutationCount(5, 2), 20);

assert.strictEqual(permutations([1, 2, 3]).length, 6);
assert.deepStrictEqual(permutations([1, 2, 3]), [
  [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1],
]);

assert.strictEqual(combinations([1, 2, 3, 4], 2).length, 6);
assert.deepStrictEqual(combinations([1, 2, 3], 2), [[1, 2], [1, 3], [2, 3]]);

console.log('✅ 通過');
