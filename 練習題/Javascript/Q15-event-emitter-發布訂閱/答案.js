/*
【答案】EventEmitter（發布訂閱）

重點：
- emit 時對處理器陣列做 slice() 拷貝，避免回呼中 off 改動陣列導致漏觸發。
- once 用 wrapper 包裝以便後續移除（呼叫後自我 off）。
- 各方法回傳 this 以支援鏈式。
*/

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(handler);
    return this;
  }

  once(event, handler) {
    const wrapper = (...args) => {
      handler(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    (this.events.get(event) ?? []).slice().forEach((h) => h(...args));
    return this;
  }

  off(event, handler) {
    const list = this.events.get(event);
    if (list) this.events.set(event, list.filter((h) => h !== handler));
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
