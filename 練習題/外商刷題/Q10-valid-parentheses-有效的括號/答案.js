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
  // 對應表：右括號 -> 對應的左括號
  const pairs = { ')': '(', ']': '[', '}': '{' };
  // 用堆疊存放尚未配對的左括號
  const stack = [];
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      // 遇到左括號就推入堆疊
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      // 遇到右括號時，彈出堆疊頂端必須是對應的左括號，否則無效
      return false;
    }
  }
  // 全部配對完畢，堆疊必須為空才有效
  return stack.length === 0;
}

// 複雜度分析：
// 時間複雜度 O(n) — 每個字元只走訪一次。
// 空間複雜度 O(n) — 最差情況下所有字元皆為左括號，全部推入堆疊。

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isValid('()'), true);
assert.strictEqual(isValid('()[]{}'), true);
assert.strictEqual(isValid('(]'), false);
assert.strictEqual(isValid('([)]'), false);
assert.strictEqual(isValid('{[]}'), true);

console.log('✅ 通過');
