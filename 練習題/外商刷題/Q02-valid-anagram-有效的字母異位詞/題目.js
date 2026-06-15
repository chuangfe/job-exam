/*
【題目】
LeetCode 242. Valid Anagram (有效的字母異位詞)

給定兩字串 s 和 t，判斷 t 是否為 s 的字母異位詞 (anagram)。
字母異位詞指由相同字母、相同數量、但順序不同所組成的字串。

範例:
  輸入: s = "anagram", t = "nagaram"
  輸出: true

  輸入: s = "rat", t = "car"
  輸出: false
*/

function isAnagram(s, t) {
  // TODO: 實作邏輯
  return false;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isAnagram('anagram', 'nagaram'), true);
assert.strictEqual(isAnagram('rat', 'car'), false);
assert.strictEqual(isAnagram('a', 'ab'), false);
assert.strictEqual(isAnagram('', ''), true);
assert.strictEqual(isAnagram('ab', 'ba'), true);
