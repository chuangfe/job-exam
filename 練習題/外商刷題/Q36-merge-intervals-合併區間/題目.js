/*
【題目】
LeetCode 56. Merge Intervals (合併區間)

給定區間陣列 intervals，其中 intervals[i] = [start, end]，
合併所有重疊的區間，並回傳不重疊的區間陣列。

範例:
輸入: [[1,3],[2,6],[8,10],[15,18]]
輸出: [[1,6],[8,10],[15,18]]
說明: [1,3] 與 [2,6] 重疊，合併為 [1,6]。

輸入: [[1,4],[4,5]]
輸出: [[1,5]]
說明: [1,4] 與 [4,5] 視為重疊，合併為 [1,5]。
*/

function mergeIntervals(intervals) {
  // TODO: 實作合併重疊區間
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(
  mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]),
  [[1, 6], [8, 10], [15, 18]]
);
assert.deepStrictEqual(mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]);
assert.deepStrictEqual(mergeIntervals([[1, 4], [2, 3]]), [[1, 4]]);
assert.deepStrictEqual(mergeIntervals([[1, 4]]), [[1, 4]]);
