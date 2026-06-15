/*
【題目】
LeetCode 322. Coin Change (零錢兌換)

給定不同面額硬幣 coins 與總金額 amount，求湊出該金額所需最少硬幣數，無法湊出回傳 -1。

範例:
  輸入: coins = [1,2,5], amount = 11  輸出: 3  (5+5+1)
  輸入: coins = [2], amount = 3        輸出: -1 (無法湊出)
*/

function coinChange(coins, amount) {
  // 動態規劃：dp[amt] 代表湊出金額 amt 所需最少硬幣數
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 湊出 0 元需要 0 個硬幣
  for (let amt = 1; amt <= amount; amt++) {
    for (const coin of coins) {
      // 若此硬幣可用，且 amt-coin 可被湊出，則嘗試更新最少數量
      if (coin <= amt && dp[amt - coin] !== Infinity) {
        dp[amt] = Math.min(dp[amt], dp[amt - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// 時間複雜度 O(amount × 硬幣種類)、空間複雜度 O(amount)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(coinChange([1, 2, 5], 11), 3);
assert.strictEqual(coinChange([2], 3), -1);
assert.strictEqual(coinChange([1], 0), 0);
assert.strictEqual(coinChange([1, 2, 5], 100), 20);
assert.strictEqual(coinChange([2, 5, 10, 1], 27), 4);

console.log('✅ 通過');
