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
  // 使用滑動視窗：視窗內統計各字元出現次數
  const count = new Map(); // 字元 -> 視窗內出現次數
  let left = 0; // 視窗左邊界
  let maxFreq = 0; // 視窗內出現最多的字元次數
  let best = 0; // 目前最長合法視窗長度
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    count.set(ch, (count.get(ch) ?? 0) + 1);
    maxFreq = Math.max(maxFreq, count.get(ch));
    // 若視窗內「需要替換的字元數」(視窗長度 - 最多字元次數) 超過 k，則縮小左邊界
    while (right - left + 1 - maxFreq > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }
    best = Math.max(best, right - left + 1); // 更新最長視窗長度
  }
  return best;
}

// 複雜度分析:
// 時間複雜度 O(n)：左右指標各最多移動 n 次。
// 空間複雜度 O(k)：此處 k 指字元集大小，count 最多存放不同字元數。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(characterReplacement('ABAB', 2), 4);
assert.strictEqual(characterReplacement('AABABBA', 1), 4);
assert.strictEqual(characterReplacement('', 2), 0);
assert.strictEqual(characterReplacement('AAAA', 0), 4);
assert.strictEqual(characterReplacement('ABCDE', 1), 2);

console.log('✅ 通過');
