/*
【題目】字元計數
統計字串中每個字元出現次數，並找出出現最多次的字元。

範例：
  charCount("banana")          =>  { b: 1, a: 3, n: 2 }
  mostFrequentChar("banana")   =>  { char: 'a', times: 3 }
  charCount("")                =>  {}
*/

function charCount(str) {
  // TODO: 用物件當計數表，key 為字元、value 為次數
  return undefined;
}

function mostFrequentChar(str) {
  // TODO: 先計數，再掃過計數表找出最大值
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.deepStrictEqual(charCount("banana"), { b: 1, a: 3, n: 2 });
assert.deepStrictEqual(mostFrequentChar("banana"), { char: 'a', times: 3 });
assert.deepStrictEqual(charCount(""), {});

console.log('✅ 通過');
