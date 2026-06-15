/*
【題目】
LeetCode 155. Min Stack（最小堆疊）

設計一個堆疊，支援 push、pop、top，以及在常數時間 O(1) 內取得最小值的操作。

實作 MinStack 類別：
  - push(val) 將元素 val 推入堆疊。
  - pop()     移除堆疊頂端的元素。
  - top()     取得堆疊頂端的元素。
  - getMin()  取得堆疊中的最小值。

範例：
  push(-2); push(0); push(-3);
  getMin();  // 回傳 -3
  pop();
  top();     // 回傳 0
  getMin();  // 回傳 -2
*/

class MinStack {
  constructor() {
    // stack 存放實際的元素
    this.stack = [];
    // minStack 與 stack 同步，存放「到目前為止」對應位置的最小值
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    // 將新值與目前最小值比較後存入 minStack，使頂端永遠是當前最小值
    const min = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    // 兩個堆疊同步彈出，保持對應關係
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    // minStack 頂端即為當前堆疊的最小值
    return this.minStack[this.minStack.length - 1];
  }
}

// 複雜度分析：
// push / pop / top / getMin 皆為 O(1) — 只做常數次的陣列尾端操作。
// 空間複雜度 O(n) — 額外使用一個與主堆疊等長的 minStack。

// ===== 測試 =====
const assert = require('node:assert');

const ms = new MinStack();
ms.push(-2);
ms.push(0);
ms.push(-3);
assert.strictEqual(ms.getMin(), -3);
ms.pop();
assert.strictEqual(ms.top(), 0);
assert.strictEqual(ms.getMin(), -2);

console.log('✅ 通過');
