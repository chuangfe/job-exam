/*
【題目】
LeetCode 3. Longest Substring Without Repeating Characters

給定一個字串 s，請找出其中不含重複字元的最長子字串 (substring) 的長度。

範例:
  輸入: s = "abcabcbb"
  輸出: 3
  說明: 最長不重複子字串為 "abc"，長度為 3。

  輸入: s = "bbbbb"
  輸出: 1
  說明: 最長不重複子字串為 "b"，長度為 1。

  輸入: s = "pwwkew"
  輸出: 3
  說明: 最長不重複子字串為 "wke"，長度為 3。
*/

function lengthOfLongestSubstring(s) {
  // 使用滑動視窗 (sliding window) 搭配雜湊表記錄每個字元最後出現的位置
  const lastIndex = new Map(); // 字元 -> 最後出現的索引
  let left = 0; // 視窗左邊界
  let best = 0; // 目前最長長度
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    // 若此字元曾出現過且在目前視窗範圍內，將左邊界移到重複字元的下一格
    if (lastIndex.has(ch) && lastIndex.get(ch) >= left) {
      left = lastIndex.get(ch) + 1;
    }
    lastIndex.set(ch, right); // 更新字元最後出現位置
    best = Math.max(best, right - left + 1); // 更新最長視窗長度
  }
  return best;
}

// 複雜度分析:
// 時間複雜度 O(n)：每個字元最多被左右指標各處理一次。
// 空間複雜度 O(k)：k 為字元集大小，雜湊表最多存放 k 個不同字元。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
assert.strictEqual(lengthOfLongestSubstring(''), 0);
assert.strictEqual(lengthOfLongestSubstring('au'), 2);

console.log('✅ 通過');
