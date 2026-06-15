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
  // 長度不同必定不是字母異位詞
  if (s.length !== t.length) return false;
  // 使用雜湊表統計 s 中每個字元的出現次數
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
  // 走訪 t，逐一抵銷對應字元的次數
  for (const ch of t) {
    // t 出現了 s 沒有的字元，直接失敗
    if (!count.has(ch)) return false;
    const next = count.get(ch) - 1;
    // 次數歸零就移除該鍵，否則更新次數
    if (next === 0) count.delete(ch); else count.set(ch, next);
  }
  // 所有字元都被抵銷完代表完全相符
  return count.size === 0;
}
// 時間複雜度: O(n)、空間複雜度: O(k) (k 為不同字元數)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isAnagram('anagram', 'nagaram'), true);
assert.strictEqual(isAnagram('rat', 'car'), false);
assert.strictEqual(isAnagram('a', 'ab'), false);
assert.strictEqual(isAnagram('', ''), true);
assert.strictEqual(isAnagram('ab', 'ba'), true);

console.log('✅ 通過');
