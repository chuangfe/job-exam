/*
【題目】
LeetCode 424. Longest Repeating Character Replacement

給定一個字串 s 與一個整數 k。你可以將字串中最多 k 個字元替換成任意其他大寫英文字母。
請回傳在進行上述操作後，能得到的「由同一字元組成的最長子字串」的長度。

範例:
  輸入: s = "ABAB", k = 2
  輸出: 4
  說明: 將兩個 'A' 替換成 'B'，或將兩個 'B' 替換成 'A'，整個字串即為同一字元，長度 4。

  輸入: s = "AABABBA", k = 1
  輸出: 4
  說明: 將中間的 'A' 替換成 'B'，得到 "AABBBBA"，最長的 "BBBB" 長度為 4。
*/

function characterReplacement(s, k) {
  // TODO: 實作最長重複字元替換
  return 0;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(characterReplacement('ABAB', 2), 4);
assert.strictEqual(characterReplacement('AABABBA', 1), 4);
assert.strictEqual(characterReplacement('', 2), 0);
assert.strictEqual(characterReplacement('AAAA', 0), 4);
assert.strictEqual(characterReplacement('ABCDE', 1), 2);
