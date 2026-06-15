/*
【答案】Shape / Circle / Rectangle —— 封裝、繼承、多型

重點說明：
  封裝（Encapsulation）：
    使用 # 私有欄位（#name、#radius、#width、#height）隱藏內部狀態，
    外部無法直接存取，只能透過 getName()、area() 等方法操作，達成資料隱藏。
  繼承（Inheritance）：
    Circle 與 Rectangle 用 extends 重用 Shape 的程式碼（getName、describe），
    並在建構子中用 super('圓形') / super('矩形') 呼叫父類別建構子初始化 #name。
  多型（Polymorphism）：
    對不同物件呼叫同名的 area()，會自動執行各自類別的版本；
    describe() 內部呼叫 this.area() 也會依實際物件型別分派到正確實作（介面統一、行為各異）。

  三大特性一句話：
    封裝＝資料隱藏、繼承＝程式碼重用、多型＝介面統一行為各異。
*/

class Shape {
  #name;                                    // 私有屬性，外部無法直接存取（封裝）
  constructor(name) { this.#name = name; }
  getName() { return this.#name; }          // 只開放方法讀取
  area() { throw new Error('子類別必須實作 area()'); }  // 抽象方法，強制子類別覆寫
  describe() { return `${this.#name} 的面積是 ${this.area().toFixed(2)}`; } // 多型分派
}

class Circle extends Shape {                 // 繼承 Shape
  #radius;
  constructor(radius) { super('圓形'); this.#radius = radius; }  // super 呼叫父建構子
  area() { return Math.PI * this.#radius ** 2; }                 // 覆寫 area（多型）
}

class Rectangle extends Shape {              // 繼承 Shape
  #width; #height;
  constructor(width, height) { super('矩形'); this.#width = width; this.#height = height; }
  area() { return this.#width * this.#height; }                  // 覆寫 area（多型）
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
