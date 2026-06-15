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
  // 貪心策略：依照區間終點由小到大排序，優先保留結束較早的區間
  intervals.sort((a, b) => a[1] - b[1]);
  // prevEnd 記錄上一個保留區間的終點
  let prevEnd = -Infinity;
  let removed = 0;
  for (const [start, end] of intervals) {
    // 不重疊則保留，更新 prevEnd
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      // 重疊則移除當前區間 (計數加一)
      removed++;
    }
  }
  return removed;
}
// 時間複雜度 O(n log n)：主要花費在排序
// 空間複雜度 O(1)：僅使用常數額外空間

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]), 1);
assert.strictEqual(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]), 2);
assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3]]), 0);
assert.strictEqual(eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]), 2);

console.log('✅ 通過');
