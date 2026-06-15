/*
【題目】單向鏈結串列 (Singly Linked List)

請實作一個單向鏈結串列，支援以下操作：
  - append(value)：在尾端新增節點
  - remove(value)：刪除第一個值等於 value 的節點，成功回傳 true，找不到回傳 false
  - reverse()：將整串鏈結反轉
  - print()：印出串列（格式如 "1 -> 2 -> 3"）
  - toArray()：回傳值的陣列（方便測試）

節點 Node 含 value 與 next 指標，串列維護 head 與 size。

【範例】
  const list = new LinkedList();
  list.append(1); list.append(2); list.append(3);
  list.toArray();   // [1, 2, 3]
  list.remove(2);   // true
  list.toArray();   // [1, 3]
  list.reverse();
  list.toArray();   // [3, 1]
*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    // TODO: 在尾端新增節點，並更新 size
  }

  remove(value) {
    // TODO: 刪除第一個值等於 value 的節點，成功回傳 true，否則 false
    return false;
  }

  reverse() {
    // TODO: 用三指標逐一翻轉箭頭方向
  }

  toArray() {
    // TODO: 走訪整串，回傳值的陣列
    return undefined;
  }

  print() {
    // TODO: 印出串列，格式如 "1 -> 2 -> 3"
  }
}

// ===== 測試 =====
const assert = require('node:assert');

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
assert.strictEqual(list.size, 3);

assert.strictEqual(list.remove(2), true);
assert.deepStrictEqual(list.toArray(), [1, 3]);
assert.strictEqual(list.size, 2);

list.reverse();
assert.deepStrictEqual(list.toArray(), [3, 1]);

assert.strictEqual(list.remove(99), false);
assert.strictEqual(list.size, 2);

console.log('✅ 通過');
