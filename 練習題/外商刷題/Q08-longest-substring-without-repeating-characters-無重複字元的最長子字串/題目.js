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
  // TODO: 實作無重複字元的最長子字串
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
assert.strictEqual(lengthOfLongestSubstring(''), 0);
assert.strictEqual(lengthOfLongestSubstring('au'), 2);
