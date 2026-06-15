/*
【題目】
LeetCode 121. Best Time to Buy and Sell Stock

給定一個陣列 prices，其中 prices[i] 是某支股票第 i 天的價格。
你只能選擇某一天買入這支股票，並選擇在未來的某一天賣出。
請計算你所能獲得的最大利潤；如果無法獲得任何利潤，回傳 0。

範例:
  輸入: prices = [7,1,5,3,6,4]
  輸出: 5
  說明: 第 2 天 (價格 = 1) 買入，第 5 天 (價格 = 6) 賣出，利潤 = 6 - 1 = 5。

  輸入: prices = [7,6,4,3,1]
  輸出: 0
  說明: 價格持續下跌，無法獲利，回傳 0。
*/

function maxProfit(prices) {
  // minPrice: 目前為止看過的最低買入價格
  // best: 目前為止能取得的最大利潤
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < minPrice) {
      // 找到更低的買入點，更新最低價
      minPrice = price;
    } else {
      // 嘗試在今天賣出，更新最大利潤
      best = Math.max(best, price - minPrice);
    }
  }
  return best;
}

// 複雜度分析:
// 時間複雜度 O(n)：只遍歷 prices 一次。
// 空間複雜度 O(1)：僅使用常數額外變數。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5);
assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
assert.strictEqual(maxProfit([1, 2]), 1);
assert.strictEqual(maxProfit([2, 4, 1]), 2);
assert.strictEqual(maxProfit([]), 0);

console.log('✅ 通過');
