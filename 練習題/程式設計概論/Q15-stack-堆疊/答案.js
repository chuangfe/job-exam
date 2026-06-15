/*
【題目】堆疊 (Stack) — 後進先出 LIFO (Last In First Out)

請實作一個堆疊，支援以下操作：
  - push(value)：將元素推入堆疊頂
  - pop()：移除並回傳堆疊頂元素；空堆疊回傳 undefined
  - peek()：回傳堆疊頂元素但不移除
  - isEmpty()：是否為空
  - size()：元素數量

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
    this.items = []; // 用陣列模擬，尾端即堆疊頂
  }

  push(value) {
    this.items.push(value); // 推入尾端（堆疊頂）
  }

  pop() {
    if (this.isEmpty()) return undefined; // 空堆疊回傳 undefined
    return this.items.pop();              // 移除並回傳尾端
  }

  peek() {
    return this.items[this.items.length - 1]; // 回傳尾端但不移除
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

/*
複雜度說明：
  push / pop / peek / isEmpty / size 皆為 O(1)。
  空間：O(n)。

應用：函式呼叫堆疊 (call stack)、括號配對、運算式求值、深度優先搜尋 (DFS)。
*/

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
