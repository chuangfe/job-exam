/*
【題目】佇列 (Queue) — 先進先出 FIFO (First In First Out)

請實作一個佇列，支援以下操作：
  - enqueue(value)：從尾端入列
  - dequeue()：從頭端出列並回傳；空佇列回傳 undefined
  - front()：回傳頭端元素但不移除
  - isEmpty()：是否為空
  - size()：元素數量

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
    this.items = []; // 陣列尾端入列、頭端出列
  }

  enqueue(value) {
    this.items.push(value); // 從尾端入列
  }

  dequeue() {
    if (this.isEmpty()) return undefined; // 空佇列回傳 undefined
    return this.items.shift();            // 從頭端出列
  }

  front() {
    return this.items[0]; // 回傳頭端但不移除
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
  enqueue 為 O(1)。
  dequeue 使用 shift() 為 O(n)，因為陣列頭端移除後其餘元素需整體前移。
  若改用雙指標（記錄 head 索引）或環狀佇列 (circular queue)，可將 dequeue 優化為 O(1)。
  空間：O(n)。

應用：廣度優先搜尋 (BFS)、工作排程、緩衝區 (buffer)。
*/

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
