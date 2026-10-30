/*
【題目】EventEmitter（發布訂閱）

說明：
實作 EventEmitter，支援 on / once / emit / off。

提示：
- 用 Map<string, Handler[]> 儲存事件與處理器。
- once 用 wrapper 包裝，呼叫後自我移除。
- emit 時對處理器陣列 slice() 拷貝，避免回呼中 off 改動陣列導致漏觸發。

範例：
  const ee = new EventEmitter();
  ee.on('x', fn);
  ee.emit('x', 1, 2); // fn(1, 2)
  ee.off('x', fn);
*/

class EventEmitter {
  constructor() {
    // TODO: 初始化事件儲存
  }

  on(event, handler) {
    // TODO
    return this;
  }

  once(event, handler) {
    // TODO: 包裝後在觸發時自我移除
    return this;
  }

  emit(event, ...args) {
    // TODO: 拷貝後依序呼叫
    return this;
  }

  off(event, handler) {
    // TODO
    return this;
  }
}

// ===== 測試 =====
const assert = require('node:assert');

// 1) on / emit 帶參數
const ee = new EventEmitter();
let sum = 0;
const add = (a, b) => {
  sum += a + b;
};
ee.on('add', add);
ee.emit('add', 1, 2);
ee.emit('add', 3, 4);
assert.strictEqual(sum, 10);

// 2) off 後不再觸發
ee.off('add', add);
ee.emit('add', 5, 5);
assert.strictEqual(sum, 10);

// 3) once 只觸發一次
let onceCount = 0;
ee.once('boot', () => onceCount++);
ee.emit('boot');
ee.emit('boot');
assert.strictEqual(onceCount, 1);

// 4) 多個 handler 皆被呼叫
let a = 0;
let b = 0;
ee.on('multi', () => a++);
ee.on('multi', () => b++);
ee.emit('multi');
assert.strictEqual(a, 1);
assert.strictEqual(b, 1);

// 5) 回呼中 off 不影響本輪其他 handler
const ee2 = new EventEmitter();
const calls = [];
const h1 = () => {
  calls.push('h1');
  ee2.off('e', h1);
};
const h2 = () => calls.push('h2');
ee2.on('e', h1);
ee2.on('e', h2);
ee2.emit('e');
assert.deepStrictEqual(calls, ['h1', 'h2']);

console.log('✅ 通過');
