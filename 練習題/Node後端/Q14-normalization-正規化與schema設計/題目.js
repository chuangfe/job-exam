/*
【題目】正規化 1NF → 2NF → 3NF —— 考試制最愛考的一題

下面這張表是「一張表塞所有東西」的典型反例（很多人第一次設計資料庫都長這樣）：

  orders_bad
  ┌────┬───────────┬──────────────┬───────────┬──────────────────────┬───────┐
  │ id │ cust_name │ cust_email   │ cust_city │ items（逗號分隔！）   │ total │
  ├────┼───────────┼──────────────┼───────────┼──────────────────────┼───────┤
  │ 1  │ Alice     │ a@x.com      │ Taipei    │ 滑鼠:2:300,鍵盤:1:800 │ 1400  │
  │ 2  │ Alice     │ a@x.com      │ Taipei    │ 螢幕:1:5000           │ 5000  │
  │ 3  │ Bob       │ b@x.com      │ Kaohsiung │ 滑鼠:1:300            │ 300   │
  └────┴───────────┴──────────────┴───────────┴──────────────────────┴───────┘

它違反了三件事：

  違反 1NF（第一正規化）：欄位必須是「單一值」
    → items 一個欄位塞了多筆商品，還用逗號跟冒號自己發明格式
    → 後果：查不出「滑鼠總共賣幾個」，只能字串比對

  違反 2NF（第二正規化）：非鍵欄位必須完全依賴主鍵
    → cust_name / cust_email / cust_city 依賴的是「客戶」，不是「訂單」
    → 後果：Alice 下兩張訂單，資料重複兩次（更新異常：改 email 要改多列）

  違反 3NF（第三正規化）：非鍵欄位不可依賴其他非鍵欄位（遞移依賴）
    → total 可由各項小計加總算出，屬於衍生資料
    → 後果：total 與明細可能不一致（沒有單一真相）

【你的任務】

  Step 1  建立正規化後的四張表（schema 已在下面 TODO 指定欄位）
  Step 2  寫 SQL 把 orders_bad 的資料搬進去（可以用多條 INSERT，不必寫成單一查詢）
  Step 3  寫一段 JOIN 查詢，還原出「每張訂單的總金額」，驗證與原始 total 相同

  正規化後的結構
    customers(id, name, email, city)          一個客戶一列
    products(id, name, price)                 一個商品一列
    orders(id, customer_id)                   一張訂單一列
    order_items(order_id, product_id, qty)    一張訂單的一個品項一列（複合主鍵）

  對應關係
    Alice → customers.id = 1，Bob → customers.id = 2
    滑鼠 300 → products.id = 1
    鍵盤 800 → products.id = 2
    螢幕 5000 → products.id = 3
    訂單 id 沿用原本的 1 / 2 / 3

【提示】
  - 這題不用寫 JS 邏輯去 parse 那個字串，你手動看著資料填 INSERT 就好
    （真實 migration 才需要寫 parser；這題練的是「正規化後長什麼樣」）
  - qty 與 price 分開存：price 放在 products，qty 放在 order_items
    → 這樣「滑鼠賣幾個」和「滑鼠單價多少」是兩個獨立的問題，各有單一真相
*/

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');

// 原始的爛表（不要改它，這是你要遷移的來源）
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

// ═══════ Step 1：建立正規化後的四張表 ═══════
// TODO: 寫 CREATE TABLE。要求：
//   customers   id 主鍵、email 唯一、name/city NOT NULL
//   products    id 主鍵、name 唯一、price NOT NULL
//   orders      id 主鍵、customer_id 外鍵指向 customers(id) 且 NOT NULL
//   order_items order_id + product_id 為「複合主鍵」、qty NOT NULL、兩個外鍵
const SCHEMA = ``;

// ═══════ Step 2：把資料搬進去 ═══════
// TODO: 寫 INSERT（多條用分號隔開即可）
const MIGRATION = ``;

// ═══════ Step 3：還原每張訂單的總金額 ═══════
// TODO: JOIN order_items 與 products，算出每張訂單的總額
//       回傳欄位：order_id、total，依 order_id 升冊
const RECALC = ``;

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

if (!SCHEMA.trim()) throw new Error('Step 1 還沒寫 SCHEMA');
db.exec(SCHEMA);

if (!MIGRATION.trim()) throw new Error('Step 2 還沒寫 MIGRATION');
db.exec(MIGRATION);

const run = (sql) => {
  if (!sql || !sql.trim()) throw new Error('Step 3 還沒寫 RECALC');
  return db.prepare(sql).all().map((row) => ({ ...row }));
};

// 1. 客戶去重：Alice 只能有一列（原本重複兩次）
assert.deepStrictEqual(
  run(`SELECT id, name, email, city FROM customers ORDER BY id`),
  [
    { id: 1, name: 'Alice', email: 'a@x.com', city: 'Taipei' },
    { id: 2, name: 'Bob', email: 'b@x.com', city: 'Kaohsiung' },
  ]
);

// 2. 商品各一列，單價存在 products
assert.deepStrictEqual(
  run(`SELECT id, name, price FROM products ORDER BY id`),
  [
    { id: 1, name: '滑鼠', price: 300 },
    { id: 2, name: '鍵盤', price: 800 },
    { id: 3, name: '螢幕', price: 5000 },
  ]
);

// 3. 訂單只留「訂單自己的事」—— 客戶資訊用外鍵指過去
assert.deepStrictEqual(
  run(`SELECT id, customer_id FROM orders ORDER BY id`),
  [{ id: 1, customer_id: 1 }, { id: 2, customer_id: 1 }, { id: 3, customer_id: 2 }]
);

// 4. 明細攤平成 1NF：原本 4 個品項 → 4 列
assert.deepStrictEqual(
  run(`SELECT order_id, product_id, qty FROM order_items ORDER BY order_id, product_id`),
  [
    { order_id: 1, product_id: 1, qty: 2 },
    { order_id: 1, product_id: 2, qty: 1 },
    { order_id: 2, product_id: 3, qty: 1 },
    { order_id: 3, product_id: 1, qty: 1 },
  ]
);

// 5. total 是算出來的，不是存出來的 —— 且必須等於原始值
assert.deepStrictEqual(run(RECALC), [
  { order_id: 1, total: 1400 },
  { order_id: 2, total: 5000 },
  { order_id: 3, total: 300 },
]);

// 6. 複合主鍵生效：同一訂單的同一商品不能重複兩列
assert.throws(
  () => db.exec(`INSERT INTO order_items(order_id, product_id, qty) VALUES (1,1,99)`),
  /UNIQUE|PRIMARY/i,
  'order_items 應以 (order_id, product_id) 為複合主鍵'
);

// 7. email 唯一約束生效
assert.throws(
  () => db.exec(`INSERT INTO customers(id,name,email,city) VALUES (9,'X','a@x.com','Taipei')`),
  /UNIQUE/i,
  'customers.email 應為 UNIQUE'
);

// 8. 現在可以回答原本答不出來的問題：滑鼠總共賣幾個？
assert.deepStrictEqual(
  run(`SELECT SUM(qty) AS qty FROM order_items WHERE product_id = 1`),
  [{ qty: 3 }]
);

console.log('✅ 通過');
