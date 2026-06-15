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
  // 計算以 speed 的速度吃完所有香蕉堆所需的總小時數
  // 每堆需要 ceil(p / speed) 小時（吃不完整堆也算一小時）
  const hoursNeeded = (speed) => piles.reduce((sum, p) => sum + Math.ceil(p / speed), 0);
  // 速度範圍：最小 1，最大為最大那一堆（再大也無意義）
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // 若 mid 速度可在 h 小時內吃完，嘗試更小的速度（right 收斂）
    if (hoursNeeded(mid) <= h) right = mid;
    else left = mid + 1; // 否則速度太慢，需加快
  }
  return left; // left 即為最小可行速度
}

// 複雜度：時間 O(n·log(max))、空間 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(minEatingSpeed([3, 6, 7, 11], 8), 4);
assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 5), 30);
assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 6), 23);
assert.strictEqual(minEatingSpeed([312884470], 968709), 323);

console.log('✅ 通過');
