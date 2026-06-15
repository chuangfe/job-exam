/*
【題目】組合 C(n, r) 與 排列 P(n, r)
(a) 計算組合數 C(n, r) 與排列數 P(n, r)。
(b) 列出一個陣列的所有排列、所有組合。

請提供四個函式：
  combinationCount(n, r)  組合數 C(n, r)
  permutationCount(n, r)  排列數 P(n, r)
  permutations(arr)       列出 arr 的所有排列
  combinations(arr, r)    列出 arr 中取 r 個的所有組合

範例：
  combinationCount(5, 2) === 10
  permutationCount(5, 2) === 20
  permutations([1,2,3])     有 6 種
  combinations([1,2,3,4], 2) 有 6 種
*/

// TODO: 用巴斯卡定理 C(n,r)=C(n-1,r-1)+C(n-1,r)
function combinationCount(n, r) {
  // TODO
  return undefined;
}

// TODO: P(n,r) = n * (n-1) * ... * (n-r+1)
function permutationCount(n, r) {
  // TODO
  return undefined;
}

// TODO: 回溯法列出所有排列
function permutations(arr) {
  // TODO
  return undefined;
}

// TODO: 回溯法列出所有組合
function combinations(arr, r) {
  // TODO
  return undefined;
}

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
