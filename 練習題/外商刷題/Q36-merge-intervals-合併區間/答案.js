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
  // 先依照區間起點由小到大排序
  intervals.sort((a, b) => a[0] - b[0]);
  // res 存放合併後的結果，先放入第一個區間
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    // last 為結果中最後一個區間
    const last = res[res.length - 1];
    const [start, end] = intervals[i];
    // 若當前區間起點 <= last 的終點，代表重疊，更新終點
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      // 不重疊則直接加入結果
      res.push([start, end]);
    }
  }
  return res;
}
// 時間複雜度 O(n log n)：主要花費在排序
// 空間複雜度 O(n)：結果陣列最多存放 n 個區間

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(
  mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]),
  [[1, 6], [8, 10], [15, 18]]
);
assert.deepStrictEqual(mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]);
assert.deepStrictEqual(mergeIntervals([[1, 4], [2, 3]]), [[1, 4]]);
assert.deepStrictEqual(mergeIntervals([[1, 4]]), [[1, 4]]);

console.log('✅ 通過');
