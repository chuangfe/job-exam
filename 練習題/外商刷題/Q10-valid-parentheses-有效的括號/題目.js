/*
【題目】
LeetCode 20. Valid Parentheses（有效的括號）

給定一個只包含 '('、')'、'{'、'}'、'['、']' 字元的字串 s，
判斷字串中的括號是否有效配對。

有效的條件：
1. 左括號必須以相同型別的右括號閉合。
2. 左括號必須以正確的順序閉合。

範例：
  輸入: "()"        輸出: true
  輸入: "()[]{}"    輸出: true
  輸入: "(]"        輸出: false
*/

function isValid(s) {
  // TODO: 實作括號配對判斷
  return false;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isValid('()'), true);
assert.strictEqual(isValid('()[]{}'), true);
assert.strictEqual(isValid('(]'), false);
assert.strictEqual(isValid('([)]'), false);
assert.strictEqual(isValid('{[]}'), true);
