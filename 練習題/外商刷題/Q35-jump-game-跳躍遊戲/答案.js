/*
【題目】
LeetCode 55. Jump Game (跳躍遊戲)

給定非負整數陣列 nums，初始位置在索引 0，
nums[i] 代表從該位置最多能往前跳的步數，
判斷是否能夠到達最後一個索引。

範例:
輸入: [2,3,1,1,4]
輸出: true
說明: 從索引 0 跳 1 步到索引 1，再從索引 1 跳 3 步到最後。

輸入: [3,2,1,0,4]
輸出: false
說明: 無論如何都會卡在索引 3 (值為 0)，無法到達最後。
*/

function canJump(nums) {
  // farthest 記錄目前能到達的最遠索引
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    // 若當前索引超過能到達的最遠範圍，代表無法前進
    if (i > farthest) return false;
    // 更新能到達的最遠索引
    farthest = Math.max(farthest, i + nums[i]);
  }
  return true;
}
// 時間複雜度 O(n)：只遍歷陣列一次
// 空間複雜度 O(1)：僅使用常數額外空間

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(canJump([2, 3, 1, 1, 4]), true);
assert.strictEqual(canJump([3, 2, 1, 0, 4]), false);
assert.strictEqual(canJump([0]), true);
assert.strictEqual(canJump([1, 0, 1, 0]), false);
assert.strictEqual(canJump([2, 0, 0]), true);

console.log('✅ 通過');
