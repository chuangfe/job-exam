/*
【題目】字元計數
統計字串中每個字元出現次數，並找出出現最多次的字元。

範例：
  charCount("banana")          =>  { b: 1, a: 3, n: 2 }
  mostFrequentChar("banana")   =>  { char: 'a', times: 3 }
  charCount("")                =>  {}
*/

function charCount(str) {
  const count = {}; // 計數表：key 為字元、value 為次數
  for (const ch of str) {
    // 若沒出現過先當 0，再加 1
    count[ch] = (count[ch] || 0) + 1;
  }
  return count;
}

function mostFrequentChar(str) {
  const count = charCount(str); // 先取得計數表
  let maxChar = null, maxNum = 0;
  for (const ch in count) {
    // 掃過計數表，記錄目前出現最多次的字元
    if (count[ch] > maxNum) {
      maxNum = count[ch];
      maxChar = ch;
    }
  }
  return { char: maxChar, times: maxNum };
}

/*
複雜度：時間 O(n)、空間 O(k)（k = 相異字元數）。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(charCount("banana"), { b: 1, a: 3, n: 2 });
assert.deepStrictEqual(mostFrequentChar("banana"), { char: 'a', times: 3 });
assert.deepStrictEqual(charCount(""), {});

console.log('✅ 通過');
