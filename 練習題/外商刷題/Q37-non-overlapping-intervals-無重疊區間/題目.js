/*
【題目】
LeetCode 435. Non-overlapping Intervals (無重疊區間)

給定區間陣列 intervals，其中 intervals[i] = [start, end]，
回傳需要移除的最少區間數量，使得其餘區間互不重疊。

範例:
輸入: [[1,2],[2,3],[3,4],[1,3]]
輸出: 1
說明: 移除 [1,3] 後，其餘區間互不重疊。

輸入: [[1,2],[1,2],[1,2]]
輸出: 2
說明: 需移除兩個 [1,2]。

輸入: [[1,2],[2,3]]
輸出: 0
說明: 區間已互不重疊，無需移除。
*/

function eraseOverlapIntervals(intervals) {
  // TODO: 實作計算需移除的最少區間數
  return -1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]), 1);
assert.strictEqual(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]), 2);
assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3]]), 0);
assert.strictEqual(eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]), 2);
