/*
【題目】
LeetCode 875. Koko Eating Bananas

有 piles 個香蕉堆，警衛將在 h 小時後回來。
Koko 每小時挑選一堆，以速度 k（每小時 k 根）吃；
若該堆少於 k 根，她吃完後該小時也不會再吃其他堆。
求她能在 h 小時內吃完所有香蕉的最小速度 k。

範例：
  輸入：piles = [3, 6, 7, 11], h = 8
  輸出：4
  輸入：piles = [30, 11, 23, 4, 20], h = 5
  輸出：30
*/

function minEatingSpeed(piles, h) {
  // TODO: 對速度 k 做二分搜尋，找出最小可行的吃食速度
  return 1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(minEatingSpeed([3, 6, 7, 11], 8), 4);
assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 5), 30);
assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 6), 23);
assert.strictEqual(minEatingSpeed([312884470], 968709), 323);
