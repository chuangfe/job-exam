/*
【答案】實作 bind

兩個考點：
1. 預設參數合併 [...preset, ...args]（支援柯里化）。
2. 用 new 呼叫綁定後的函式時，this 要指向新物件而非綁定的 context，
   故用 this instanceof bound 判斷，並用 bound.prototype = Object.create(fn.prototype)
   維護原型鏈。
*/

// 在 Function.prototype 上實作 myBind
Function.prototype.myBind = function (context, ...preset) {
  const fn = this;
  function bound(...args) {
    // 若以 new 呼叫，this 指向新實例，忽略傳入的 context
    const isNew = this instanceof bound;
    return fn.apply(isNew ? this : context, [...preset, ...args]);
  }
  bound.prototype = Object.create(fn.prototype); // 維持原型鏈
  return bound;
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
