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
  // 採用 Kahn's 演算法（BFS 拓樸排序）：能完成拓樸排序代表無環
  const indegree = new Array(numCourses).fill(0);              // 每門課的入度
  const adj = Array.from({ length: numCourses }, () => []);    // 鄰接表

  // 建圖：pre -> course，並累計 course 的入度
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    indegree[course]++;
  }

  // 所有入度為 0（無前置）的課程先放入佇列
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let finished = 0; // 已可修完的課程數
  while (queue.length) {
    const course = queue.shift();
    finished++;
    // 修完此課後，依賴它的課程入度減 1，歸零者代表前置已清完
    for (const next of adj[course]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  // 若能修完的數量等於總課程數，代表無環
  return finished === numCourses;
}

// 複雜度：時間 O(V+E)，每門課與每條依賴各處理一次；空間 O(V+E)，鄰接表與入度陣列。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(canFinish(2, [[1, 0]]), true);
assert.strictEqual(canFinish(2, [[1, 0], [0, 1]]), false);
assert.strictEqual(canFinish(1, []), true);
assert.strictEqual(canFinish(4, [[1, 0], [2, 1], [3, 2]]), true);
assert.strictEqual(canFinish(3, [[0, 1], [1, 2], [2, 0]]), false);

console.log('✅ 通過');
