/*
【題目】堆疊 (Stack) — 後進先出 LIFO (Last In First Out)

請實作一個堆疊，支援以下操作：
  - push(value)：將元素推入堆疊頂
  - pop()：移除並回傳堆疊頂元素；空堆疊回傳 undefined
  - peek()：回傳堆疊頂元素但不移除
  - isEmpty()：是否為空
  - size()：元素數量

思路：用陣列模擬，尾端為堆疊頂。

【範例】
  const s = new Stack();
  s.push(1); s.push(2); s.push(3);
  s.peek();      // 3
  s.pop();       // 3
  s.size();      // 2
  s.isEmpty();   // false
*/

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    // TODO: 推入堆疊頂
  }

  pop() {
    // TODO: 移除並回傳堆疊頂；空堆疊回傳 undefined
    return undefined;
  }

  peek() {
    // TODO: 回傳堆疊頂但不移除
    return undefined;
  }

  isEmpty() {
    // TODO: 是否為空
    return undefined;
  }

  size() {
    // TODO: 元素數量
    return undefined;
  }
}

// ===== 測試 =====
const assert = require('node:assert');

const s = new Stack();
assert.strictEqual(s.isEmpty(), true);

s.push(1);
s.push(2);
s.push(3);
assert.strictEqual(s.peek(), 3);
assert.strictEqual(s.pop(), 3);
assert.strictEqual(s.pop(), 2);
assert.strictEqual(s.isEmpty(), false);
assert.strictEqual(s.size(), 1);

const empty = new Stack();
assert.strictEqual(empty.pop(), undefined);

console.log('✅ 通過');
