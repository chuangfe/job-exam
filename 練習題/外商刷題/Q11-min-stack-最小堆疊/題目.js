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
    // TODO: 初始化資料結構
  }

  push(val) {
    // TODO
  }

  pop() {
    // TODO
  }

  top() {
    // TODO
  }

  getMin() {
    // TODO
  }
}

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
