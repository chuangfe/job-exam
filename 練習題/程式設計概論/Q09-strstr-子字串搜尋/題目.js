/*
【題目】字串比對（子字串搜尋）
實作 indexOf：在主字串 text 中找出 pattern 第一次出現的索引，
找不到回傳 -1。空 pattern 回傳 0。

範例：
  strStr("hello world", "world")  =>  6
  strStr("abcabd", "abd")         =>  3
  strStr("abc", "xyz")            =>  -1
  strStr("abc", "")               =>  0
*/

function strStr(text, pattern) {
  // TODO: 暴力法，對每個起點嘗試逐字比對
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(strStr("hello world", "world"), 6);
assert.strictEqual(strStr("abcabd", "abd"), 3);
assert.strictEqual(strStr("abc", "xyz"), -1);
assert.strictEqual(strStr("abc", ""), 0);
assert.strictEqual(strStr("aaaa", "aa"), 0);

console.log('✅ 通過');
