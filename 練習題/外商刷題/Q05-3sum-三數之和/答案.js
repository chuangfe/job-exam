/*
【題目】 LeetCode 15. 3Sum（三數之和）

給定一個整數陣列 nums，找出所有不重複的三元組 [a, b, c]，
使得 a + b + c = 0。答案中不可包含重複的三元組。

範例：
  輸入: [-1, 0, 1, 2, -1, -4]
  輸出: [[-1, -1, 2], [-1, 0, 1]]
  說明: 共有兩組不重複且總和為 0 的三元組。

  輸入: [0, 1, 1]
  輸出: []
  說明: 沒有任何三元組總和為 0。

  輸入: [0, 0, 0]
  輸出: [[0, 0, 0]]
  說明: 唯一的三元組總和為 0。
*/

function threeSum(nums) {
  // 先排序，方便使用雙指標並跳過重複元素
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // 排序後若最小值已大於 0，後面不可能湊出總和 0，提前結束
    if (nums[i] > 0) break;
    // 跳過重複的固定值，避免產生重複三元組
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 在 i 右側區間使用雙指標尋找兩數之和為 -nums[i]
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;        // 總和偏小，左指標右移
      else if (sum > 0) right--;  // 總和偏大，右指標左移
      else {
        // 找到一組解
        res.push([nums[i], nums[left], nums[right]]);
        left++; right--;
        // 跳過左右兩側的重複值
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }
  return res;
}

// 複雜度：時間 O(n²)、空間 O(1)（不計輸出與排序）

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
assert.deepStrictEqual(threeSum([0, 1, 1]), []);
assert.deepStrictEqual(threeSum([0, 0, 0]), [[0, 0, 0]]);
assert.deepStrictEqual(threeSum([]), []);

console.log('✅ 通過');
