/*
【題目】
LeetCode 739. Daily Temperatures（每日溫度）

給定一個整數陣列 temperatures 代表每日溫度，
回傳一個陣列 answer，其中 answer[i] 代表從第 i 天起，
還要等幾天才會出現更暖的一天。若之後沒有更暖的一天，則 answer[i] 為 0。

範例：
  輸入: [73,74,75,71,69,72,76,73]
  輸出: [1,1,4,2,1,1,0,0]
*/

function dailyTemperatures(temperatures) {
  // TODO: 實作每日溫度
  return [];
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
  [1, 1, 4, 2, 1, 1, 0, 0]
);
assert.deepStrictEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
assert.deepStrictEqual(dailyTemperatures([30, 60, 90]), [1, 1, 0]);
assert.deepStrictEqual(dailyTemperatures([50, 50, 50]), [0, 0, 0]);
