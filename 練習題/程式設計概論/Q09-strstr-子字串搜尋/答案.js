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
  // 空 pattern 依約定回傳 0
  if (pattern.length === 0) return 0;
  const n = text.length, m = pattern.length;
  // 起點只需嘗試到 n - m，再往後不可能放得下 pattern
  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    // 從起點 i 逐字比對
    while (j < m && text[i + j] === pattern[j]) j++;
    if (j === m) return i; // 全部對上，找到了
  }
  return -1; // 都沒對上
}

/*
複雜度：暴力法時間 O(n×m)、空間 O(1)。
進階有 KMP 可達 O(n+m)。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(strStr("hello world", "world"), 6);
assert.strictEqual(strStr("abcabd", "abd"), 3);
assert.strictEqual(strStr("abc", "xyz"), -1);
assert.strictEqual(strStr("abc", ""), 0);
assert.strictEqual(strStr("aaaa", "aa"), 0);

console.log('✅ 通過');
