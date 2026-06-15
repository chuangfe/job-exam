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
  // TODO: 實作判斷能否到達最後一個索引
  return false;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(canJump([2, 3, 1, 1, 4]), true);
assert.strictEqual(canJump([3, 2, 1, 0, 4]), false);
assert.strictEqual(canJump([0]), true);
assert.strictEqual(canJump([1, 0, 1, 0]), false);
assert.strictEqual(canJump([2, 0, 0]), true);
