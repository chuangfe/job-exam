/*
【題目】 LeetCode 11. Container With Most Water（盛最多水的容器）

給定一個非負整數陣列 height，其中 height[i] 代表第 i 條垂直線的高度。
找出能與 x 軸一起盛裝最多水的兩條線，回傳可盛裝的最大面積（不可傾斜容器）。

範例：
  輸入: [1, 8, 6, 2, 5, 4, 8, 3, 7]
  輸出: 49
  說明: 選擇高度為 8 與 7 的兩條線，寬度為 7，面積為 min(8,7) * 7 = 49。

  輸入: [1, 1]
  輸出: 1
  說明: 兩條高度皆為 1，寬度為 1，面積為 1。
*/

function maxArea(height) {
  // TODO: 實作盛最多水的容器邏輯
  return 0; // 預設回傳 0，使測試失敗
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
assert.strictEqual(maxArea([1, 1]), 1);
assert.strictEqual(maxArea([4, 3, 2, 1, 4]), 16);
assert.strictEqual(maxArea([1, 2, 1]), 2);
