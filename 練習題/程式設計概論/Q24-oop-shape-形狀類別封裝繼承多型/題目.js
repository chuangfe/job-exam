/*
【題目】設計 Shape（形狀）基底類別，衍生出 Circle（圓）與 Rectangle（矩形）。
請示範物件導向三大特性：
  封裝（Encapsulation）：使用 # 私有屬性隱藏內部狀態，只開放方法存取。
  繼承（Inheritance）：使用 extends 重用父類別，並以 super() 呼叫父類別建構子。
  多型（Polymorphism）：area() 在不同子類別有不同行為，呼叫端使用統一介面。

需求：
  Shape 基底類別：
    - 私有屬性 #name，建構子接收 name。
    - getName() 回傳 #name。
    - area() 為抽象方法，直接呼叫應拋出 Error('子類別必須實作 area()')。
    - describe() 回傳 `${name} 的面積是 ${area().toFixed(2)}`。
  Circle（extends Shape）：
    - 建構子接收 radius，super('圓形')。
    - area() 回傳 Math.PI * radius ** 2。
  Rectangle（extends Shape）：
    - 建構子接收 width、height，super('矩形')。
    - area() 回傳 width * height。

範例：
  const c = new Circle(5);
  c.area();        // 約 78.5398
  c.getName();     // '圓形'
  c.describe();    // '圓形 的面積是 78.54'
  const r = new Rectangle(4, 6);
  r.area();        // 24
  r.describe();    // '矩形 的面積是 24.00'
*/

class Shape {
  #name;
  constructor(name) { this.#name = name; }
  getName() { return this.#name; }
  area() { throw new Error('子類別必須實作 area()'); }
  describe() { return `${this.#name} 的面積是 ${this.area().toFixed(2)}`; }
}

class Circle extends Shape {
  #radius;
  constructor(radius) { super('圓形'); this.#radius = radius; }
  area() {
    // TODO: 回傳圓面積 Math.PI * radius ** 2
  }
}

class Rectangle extends Shape {
  #width; #height;
  constructor(width, height) { super('矩形'); this.#width = width; this.#height = height; }
  area() {
    // TODO: 回傳矩形面積 width * height
  }
}

// ===== 測試 =====
const assert = require('node:assert');

const c = new Circle(5);
assert.ok(Math.abs(c.area() - 78.5398) < 0.001);
assert.strictEqual(c.getName(), '圓形');

const r = new Rectangle(4, 6);
assert.strictEqual(r.area(), 24);
assert.strictEqual(r.getName(), '矩形');

assert.strictEqual(c.describe(), '圓形 的面積是 78.54');
assert.strictEqual(r.describe(), '矩形 的面積是 24.00');

const s = new Shape('抽象');
assert.throws(() => s.area(), /子類別必須實作/);

console.log('✅ 通過');
