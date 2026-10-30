/*
【題目】SQL 查詢基礎 —— 你只碰過 NoSQL，這是最大的缺口

用 Node 內建的 node:sqlite（零依賴），資料已幫你建好。
你的工作：把下面 Q 物件裡的每一段 SQL 寫出來，測試會真的執行它並比對結果。

執行：node 題目.js
（會出現 SQLite is an experimental feature 的警告，忽略即可；
  不想看就用 node --no-warnings 題目.js）

┌─ 資料 ────────────────────────────────────────────────────────┐
│ users                                                          │
│  id  name   email      city                                    │
│  1   Alice  a@x.com    Taipei                                   │
│  2   Bob    b@x.com    Taipei                                   │
│  3   Cathy  c@x.com    Kaohsiung                                │
│  4   Dave   d@x.com    Taichung     ← 沒有任何訂單               │
│                                                                │
│ orders                                                         │
│  id  user_id  amount  status                                   │
│  1   1        100     paid                                      │
│  2   1        200     paid                                      │
│  3   1        50      cancelled                                 │
│  4   2        300     paid                                      │
│  5   3        80      pending                                   │
│  6   3        120     paid                                      │
└────────────────────────────────────────────────────────────────┘

⚠️ 欄位別名（AS）必須完全照需求寫，測試是用 deepStrictEqual 比對物件的。
*/

const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE users (
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    city  TEXT NOT NULL
  );
  CREATE TABLE orders (
    id      INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    amount  INTEGER NOT NULL,
    status  TEXT NOT NULL
  );
  INSERT INTO users VALUES
    (1,'Alice','a@x.com','Taipei'),
    (2,'Bob','b@x.com','Taipei'),
    (3,'Cathy','c@x.com','Kaohsiung'),
    (4,'Dave','d@x.com','Taichung');
  INSERT INTO orders VALUES
    (1,1,100,'paid'), (2,1,200,'paid'), (3,1,50,'cancelled'),
    (4,2,300,'paid'), (5,3,80,'pending'), (6,3,120,'paid');
`);

// ═══════════════════ 把 SQL 填進來 ═══════════════════
const Q = {
  // 1. WHERE + ORDER BY
  //    city 為 'Taipei' 的使用者，只取 name 欄，依 name 升冊
  q1: ``,

  // 2. ORDER BY + LIMIT
  //    金額最高的 3 筆訂單，取 id 與 amount，金額由大到小
  q2: ``,

  // 3. 聚合函數（整張表一列）
  //    只計 status='paid' 的訂單：筆數 AS cnt、總額 AS total、平均 AS avg
  q3: ``,

  // 4. GROUP BY
  //    每個 user_id 的 paid 訂單總額 AS total，依 user_id 升冊
  q4: ``,

  // 5. GROUP BY + HAVING  ← 考試最愛考「HAVING 和 WHERE 差在哪」
  //    paid 訂單總額 >= 300 的 user_id 與 total，依 user_id 升冊
  q5: ``,

  // 6. INNER JOIN
  //    所有 paid 訂單，取使用者 name 與訂單 amount，金額由大到小
  q6: ``,

  // 7. LEFT JOIN ← 經典題：找出「沒有」關聯資料的那一方
  //    完全沒有任何訂單的使用者，只取 name
  //    （提示：LEFT JOIN 後用 IS NULL 篩；不要用 NOT IN）
  q7: ``,

  // 8. JOIN + GROUP BY
  //    每個城市的 paid 訂單總額，取 city 與 total，依 city 升冊
  //    （沒有訂單的城市不會出現 —— 想想為什麼）
  q8: ``,

  // 9. 子查詢
  //    金額高於「全部訂單平均金額」的訂單，只取 id，依 id 升冊
  q9: ``,

  // 10. DISTINCT
  //     有下過訂單的城市（不重複），只取 city，依 city 升冊
  q10: ``,
};

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');
// node:sqlite 回傳 null-prototype 物件，展開成一般物件才好比對
const run = (sql) => {
  if (!sql || !sql.trim()) throw new Error('這一題還沒填 SQL');
  return db.prepare(sql).all().map((row) => ({ ...row }));
};

assert.deepStrictEqual(run(Q.q1), [{ name: 'Alice' }, { name: 'Bob' }]);

assert.deepStrictEqual(run(Q.q2), [
  { id: 4, amount: 300 },
  { id: 2, amount: 200 },
  { id: 6, amount: 120 },
]);

assert.deepStrictEqual(run(Q.q3), [{ cnt: 4, total: 720, avg: 180 }]);

assert.deepStrictEqual(run(Q.q4), [
  { user_id: 1, total: 300 },
  { user_id: 2, total: 300 },
  { user_id: 3, total: 120 },
]);

assert.deepStrictEqual(run(Q.q5), [
  { user_id: 1, total: 300 },
  { user_id: 2, total: 300 },
]);

assert.deepStrictEqual(run(Q.q6), [
  { name: 'Bob', amount: 300 },
  { name: 'Alice', amount: 200 },
  { name: 'Cathy', amount: 120 },
  { name: 'Alice', amount: 100 },
]);

assert.deepStrictEqual(run(Q.q7), [{ name: 'Dave' }]);

assert.deepStrictEqual(run(Q.q8), [
  { city: 'Kaohsiung', total: 120 },
  { city: 'Taipei', total: 600 },
]);

assert.deepStrictEqual(run(Q.q9), [{ id: 2 }, { id: 4 }]);

assert.deepStrictEqual(run(Q.q10), [{ city: 'Kaohsiung' }, { city: 'Taipei' }]);

console.log('✅ 通過');
