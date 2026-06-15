/*
【題目】LeetCode 207. Course Schedule（課程表）

共有 numCourses 門課，編號為 0 到 numCourses-1。
prerequisites[i] = [a, b] 表示要修課程 a 之前，必須先修課程 b。
請判斷是否能修完所有課程（也就是判斷依賴關係圖是否「無環」）。

範例：
  numCourses=2, prerequisites=[[1,0]]          -> true
    （先修 0 再修 1，可行）
  numCourses=2, prerequisites=[[1,0],[0,1]]    -> false
    （0 與 1 互為前置，形成環，不可行）
*/

function canFinish(numCourses, prerequisites) {
  // TODO: 實作課程表是否可完成的判斷
  return false;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(canFinish(2, [[1, 0]]), true);
assert.strictEqual(canFinish(2, [[1, 0], [0, 1]]), false);
assert.strictEqual(canFinish(1, []), true);
assert.strictEqual(canFinish(4, [[1, 0], [2, 1], [3, 2]]), true);
assert.strictEqual(canFinish(3, [[0, 1], [1, 2], [2, 0]]), false);
