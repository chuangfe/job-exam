/*
【題目】
LeetCode 322. Coin Change (零錢兌換)

給定不同面額硬幣 coins 與總金額 amount，求湊出該金額所需最少硬幣數，無法湊出回傳 -1。

範例:
  輸入: coins = [1,2,5], amount = 11  輸出: 3  (5+5+1)
  輸入: coins = [2], amount = 3        輸出: -1 (無法湊出)
*/

function coinChange(coins, amount) {
  // TODO: 實作湊出金額所需最少硬幣數計算
  return -1;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(coinChange([1, 2, 5], 11), 3);
assert.strictEqual(coinChange([2], 3), -1);
assert.strictEqual(coinChange([1], 0), 0);
assert.strictEqual(coinChange([1, 2, 5], 100), 20);
assert.strictEqual(coinChange([2, 5, 10, 1], 27), 4);
