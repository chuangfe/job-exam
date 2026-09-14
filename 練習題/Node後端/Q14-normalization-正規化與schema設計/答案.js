/*
【答案】正規化 1NF → 2NF → 3NF

三個正規化階段各解決一種「異常」，這是筆試問「為什麼要正規化」的標準答案：

  1NF  欄位必須是單一值（不可再分、不可多值）
       解決：無法查詢／無法索引。'滑鼠:2:300,鍵盤:1:800' 這種欄位
             只能字串比對，沒辦法問「滑鼠賣幾個」。

  2NF  在 1NF 基礎上，非鍵欄位必須「完全依賴」主鍵
       解決「更新異常」：客戶資料依賴客戶而非訂單，混在訂單表裡的話，
             Alice 改 email 要更新她所有訂單那幾列，漏一列就資料不一致。

  3NF  在 2NF 基礎上，非鍵欄位不可依賴其他非鍵欄位（消除遞移依賴）
       解決「單一真相」：total 可由明細算出，存起來就多了一份可能對不上的
             副本。要嘛不存（每次算），要嘛存了就得有機制保證同步。

  ⚠️ 反正規化（denormalization）是另一回事：為了讀取效能刻意存冗餘，
     但那是「知道規則之後的取捨」，不是「不知道規則」。口試若被問
     「你會不會為了效能違反正規化」→ 答「會，但要說得出代價與同步策略」。
*/

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');

db.exec(`
  CREATE TABLE orders_bad (
    id         INTEGER PRIMARY KEY,
    cust_name  TEXT, cust_email TEXT, cust_city TEXT,
    items      TEXT, total INTEGER
  );
  INSERT INTO orders_bad VALUES
    (1,'Alice','a@x.com','Taipei','滑鼠:2:300,鍵盤:1:800',1400),
    (2,'Alice','a@x.com','Taipei','螢幕:1:5000',5000),
    (3,'Bob','b@x.com','Kaohsiung','滑鼠:1:300',300);
`);

// ═══════ Step 1：正規化後的四張表 ═══════
const SCHEMA = `
  -- 客戶：一個客戶一列（解決 2NF 的更新異常）
  CREATE TABLE customers (
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,   -- 業務上的自然鍵，加唯一約束防重複
    city  TEXT NOT NULL
  );

  -- 商品：單價的單一真相（解決 3NF 的遞移依賴）
  CREATE TABLE products (
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL
  );

  -- 訂單：只留「訂單自己的事」，客戶資訊用外鍵指過去
  CREATE TABLE orders (
    id          INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id)
  );

  -- 訂單明細：把多值欄位攤平成多列（解決 1NF）
  -- 複合主鍵 (order_id, product_id)：同一訂單的同一商品只能一列
  CREATE TABLE order_items (
    order_id   INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    qty        INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
  );
`;

// ═══════ Step 2：遷移資料 ═══════
const MIGRATION = `
  INSERT INTO customers (id, name, email, city) VALUES
    (1,'Alice','a@x.com','Taipei'),
    (2,'Bob','b@x.com','Kaohsiung');

  INSERT INTO products (id, name, price) VALUES
    (1,'滑鼠',300), (2,'鍵盤',800), (3,'螢幕',5000);

  INSERT INTO orders (id, customer_id) VALUES
    (1,1), (2,1), (3,2);

  INSERT INTO order_items (order_id, product_id, qty) VALUES
    (1,1,2),   -- 訂單1：滑鼠 x2
    (1,2,1),   -- 訂單1：鍵盤 x1
    (2,3,1),   -- 訂單2：螢幕 x1
    (3,1,1);   -- 訂單3：滑鼠 x1
`;

// ═══════ Step 3：total 改為「算出來」 ═══════
// SUM(qty * price)：明細的數量 × 商品的單價
const RECALC = `
  SELECT oi.order_id, SUM(oi.qty * p.price) AS total
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY oi.order_id
  ORDER BY oi.order_id ASC
`;

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

db.exec(SCHEMA);
db.exec(MIGRATION);

const run = (sql) => db.prepare(sql).all().map((row) => ({ ...row }));

assert.deepStrictEqual(
  run(`SELECT id, name, email, city FROM customers ORDER BY id`),
  [
    { id: 1, name: 'Alice', email: 'a@x.com', city: 'Taipei' },
    { id: 2, name: 'Bob', email: 'b@x.com', city: 'Kaohsiung' },
  ]
);

assert.deepStrictEqual(
  run(`SELECT id, name, price FROM products ORDER BY id`),
  [
    { id: 1, name: '滑鼠', price: 300 },
    { id: 2, name: '鍵盤', price: 800 },
    { id: 3, name: '螢幕', price: 5000 },
  ]
);

assert.deepStrictEqual(
  run(`SELECT id, customer_id FROM orders ORDER BY id`),
  [{ id: 1, customer_id: 1 }, { id: 2, customer_id: 1 }, { id: 3, customer_id: 2 }]
);

assert.deepStrictEqual(
  run(`SELECT order_id, product_id, qty FROM order_items ORDER BY order_id, product_id`),
  [
    { order_id: 1, product_id: 1, qty: 2 },
    { order_id: 1, product_id: 2, qty: 1 },
    { order_id: 2, product_id: 3, qty: 1 },
    { order_id: 3, product_id: 1, qty: 1 },
  ]
);

assert.deepStrictEqual(run(RECALC), [
  { order_id: 1, total: 1400 },
  { order_id: 2, total: 5000 },
  { order_id: 3, total: 300 },
]);

assert.throws(
  () => db.exec(`INSERT INTO order_items(order_id, product_id, qty) VALUES (1,1,99)`),
  /UNIQUE|PRIMARY/i
);

assert.throws(
  () => db.exec(`INSERT INTO customers(id,name,email,city) VALUES (9,'X','a@x.com','Taipei')`),
  /UNIQUE/i
);

assert.deepStrictEqual(
  run(`SELECT SUM(qty) AS qty FROM order_items WHERE product_id = 1`),
  [{ qty: 3 }]
);

console.log('✅ 通過');

/*
【正規化前後對照：問題變得可回答】

  問題                          爛表           正規化後
  ─────────────────────────────────────────────────────────────
  滑鼠總共賣幾個？              ❌ 字串比對     SUM(qty) WHERE product_id=1
  Alice 改 email                ❌ 要改多列     UPDATE customers 一列
  滑鼠漲價                      ❌ 改不動歷史   UPDATE products 一列
  哪個城市營收最高？            ❌ 做不到       JOIN + GROUP BY city
  訂單金額對不對？              ❌ 無從驗證     用明細重算比對

【筆試標準答法】

  Q：什麼是第三正規化？
  A：在 2NF 的基礎上，消除「非鍵欄位依賴其他非鍵欄位」的遞移依賴。
     例如訂單表存了 total，而 total 可由明細的數量乘單價算出 ——
     它依賴的是明細不是訂單主鍵，應該移除或改為計算取得。

  Q：不做正規化會有什麼問題？
  A：三種異常 ——
     插入異常：沒有訂單就無法登錄一個新客戶（客戶資料只存在訂單表裡）
     更新異常：改一個客戶的 email 要更新多列，漏改就不一致
     刪除異常：刪掉最後一張訂單，該客戶的資料也一併消失

  Q：正規化到第幾階最好？
  A：實務上 3NF 是常見平衡點。再往上（BCNF、4NF）多為理論需求；
     反過來也常為了讀取效能刻意反正規化，但必須明確知道代價
     （資料同步責任落到應用層）。
*/
