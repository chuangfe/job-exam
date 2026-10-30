/*
【題目】實作 bind

說明：
在 Function.prototype 上實作 myBind，支援預設參數（柯里化）與 new 呼叫。

提示：
- 合併預設參數與呼叫參數：[...preset, ...args]。
- 用 new 呼叫綁定後的函式時，this 要指向新物件而非綁定的 context，
  用 this instanceof bound 判斷並維護原型鏈。

範例：
  function f(a, b) { return this.x + a + b; }
  const g = f.myBind({ x: 1 }, 2);
  g(3); // 6
*/

// 在 Function.prototype 上實作 myBind
Function.prototype.myBind = function (context, ...preset) {
  // TODO: 回傳 bound 函式，合併參數、處理 new 呼叫與原型鏈
  return function () {}; // 預設回傳（未實作）
};

// ===== 測試 =====
const assert = require('node:assert');

// 1) 基本綁定 this 與預設參數
function f(a, b) {
  return this.x + a + b;
}
const g = f.myBind({ x: 1 }, 2);
assert.strictEqual(g(3), 6);

// 2) 預設參數可分次傳（柯里化）
function sum(a, b, c) {
  return a + b + c;
}
const s = sum.myBind(null, 1, 2);
assert.strictEqual(s(3), 6);

// 3) new 呼叫時 this 指向新實例，忽略綁定的 context
function Person(name) {
  this.name = name;
}
const Bound = Person.myBind({ name: 'ignored' });
const p = new Bound('Alice');
assert.strictEqual(p.name, 'Alice');
assert.ok(p instanceof Person); // 維持原型鏈

// 4) new 呼叫保留 preset 參數
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const BoundPoint = Point.myBind(null, 10);
const pt = new BoundPoint(20);
assert.strictEqual(pt.x, 10);
assert.strictEqual(pt.y, 20);

console.log('✅ 通過');
