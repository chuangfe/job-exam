/*
【題目】單向鏈結串列 (Singly Linked List)

請實作一個單向鏈結串列，支援以下操作：
  - append(value)：在尾端新增節點
  - remove(value)：刪除第一個值等於 value 的節點，成功回傳 true，找不到回傳 false
  - reverse()：將整串鏈結反轉
  - print()：印出串列（格式如 "1 -> 2 -> 3"）
  - toArray()：回傳值的陣列（方便測試）

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
    this.next = null; // 指向下一個節點
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 串列頭
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      // 空串列，新節點即為 head
      this.head = node;
    } else {
      // 走到最後一個節點，接上新節點
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.size++;
  }

  remove(value) {
    if (!this.head) return false;
    // 若要刪的是 head，直接把 head 往後移
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    // 找到「下一個節點」值符合的位置，跳過它
    let curr = this.head;
    while (curr.next && curr.next.value !== value) curr = curr.next;
    if (curr.next) {
      curr.next = curr.next.next;
      this.size--;
      return true;
    }
    return false;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next; // 先存下一個節點，避免斷鏈（順序不可顛倒）
      curr.next = prev;       // 翻轉箭頭方向
      prev = curr;            // prev 前進
      curr = next;            // curr 前進
    }
    this.head = prev; // 原本的尾端變成新的 head
  }

  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  print() {
    console.log(this.toArray().join(' -> '));
  }
}

/*
複雜度說明：
  append / remove / reverse 皆為 O(n)（append 需走到尾端；若額外維護 tail 指標可優化為 O(1)）。
  toArray 為 O(n)。
  空間：reverse 為原地反轉 O(1)；toArray 為 O(n)。

注意：reverse「先存 next 再翻箭頭」的順序不可顛倒，
      若先把 curr.next 指向 prev，就會找不到原本的下一個節點而斷鏈，
      這是此題最常見的扣分點。
*/

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
