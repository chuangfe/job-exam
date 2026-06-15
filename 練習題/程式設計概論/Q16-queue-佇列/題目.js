/*
【題目】佇列 (Queue) — 先進先出 FIFO (First In First Out)

請實作一個佇列，支援以下操作：
  - enqueue(value)：從尾端入列
  - dequeue()：從頭端出列並回傳；空佇列回傳 undefined
  - front()：回傳頭端元素但不移除
  - isEmpty()：是否為空
  - size()：元素數量

思路：陣列尾端入列、頭端出列。
      注意 shift() 為 O(n)，可提改用雙指標或環狀佇列優化為 O(1)。

【範例】
  const q = new Queue();
  q.enqueue("a"); q.enqueue("b"); q.enqueue("c");
  q.front();      // "a"
  q.dequeue();    // "a"
  q.size();       // 2
  q.isEmpty();    // false
*/

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    // TODO: 從尾端入列
  }

  dequeue() {
    // TODO: 從頭端出列並回傳；空佇列回傳 undefined
    return undefined;
  }

  front() {
    // TODO: 回傳頭端元素但不移除
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

const q = new Queue();
assert.strictEqual(q.isEmpty(), true);

q.enqueue('a');
q.enqueue('b');
q.enqueue('c');
assert.strictEqual(q.front(), 'a');
assert.strictEqual(q.dequeue(), 'a');
assert.strictEqual(q.dequeue(), 'b');
assert.strictEqual(q.size(), 1);
assert.strictEqual(q.isEmpty(), false);

const empty = new Queue();
assert.strictEqual(empty.dequeue(), undefined);

console.log('✅ 通過');
