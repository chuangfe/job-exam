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
  // 結果陣列預設全部填 0（代表之後沒有更暖的一天）
  const res = new Array(temperatures.length).fill(0);
  // 單調遞減堆疊，存放尚未找到「更暖一天」的索引
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    // 當前溫度比堆疊頂端的那天更暖時，就為那天結算等待天數
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }
    stack.push(i);
  }
  return res;
}

// 複雜度分析：
// 時間複雜度 O(n) — 每個索引最多被推入與彈出堆疊各一次。
// 空間複雜度 O(n) — 最差情況（溫度遞減）下所有索引都留在堆疊中。

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
  [1, 1, 4, 2, 1, 1, 0, 0]
);
assert.deepStrictEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
assert.deepStrictEqual(dailyTemperatures([30, 60, 90]), [1, 1, 0]);
assert.deepStrictEqual(dailyTemperatures([50, 50, 50]), [0, 0, 0]);

console.log('✅ 通過');
