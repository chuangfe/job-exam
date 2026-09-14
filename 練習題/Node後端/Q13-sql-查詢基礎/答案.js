/*
【答案】SQL 查詢基礎

先記一件事：SQL 的執行順序不是書寫順序。

  書寫：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
  執行：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

  這解釋了兩個常考點：
   1. WHERE 不能用聚合函數（SUM/COUNT）—— WHERE 在 GROUP BY 之前執行，
      那時還沒有「群組」這個概念。要對聚合結果篩選就得用 HAVING。
   2. ORDER BY 可以用 SELECT 裡的別名 —— 因為 SELECT 先執行完了。
      但 WHERE 不行。
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

const Q = {
  // 1. 最基本：篩選 + 排序
  q1: `SELECT name FROM users WHERE city = 'Taipei' ORDER BY name ASC`,

  // 2. LIMIT 取前 N —— 一定要搭 ORDER BY，否則「前 3 筆」沒有意義
  q2: `SELECT id, amount FROM orders ORDER BY amount DESC LIMIT 3`,

  // 3. 聚合函數：沒有 GROUP BY 時，整張表視為一個群組 → 回一列
  q3: `SELECT COUNT(*) AS cnt, SUM(amount) AS total, AVG(amount) AS avg
       FROM orders
       WHERE status = 'paid'`,

  // 4. GROUP BY：先用 WHERE 篩掉不要的列，再分組聚合
  q4: `SELECT user_id, SUM(amount) AS total
       FROM orders
       WHERE status = 'paid'
       GROUP BY user_id
       ORDER BY user_id ASC`,

  // 5. HAVING：對「分組後的結果」篩選
  //    這裡 WHERE 篩的是列（status），HAVING 篩的是群組（SUM）
  //    ⚠️ 寫成 WHERE SUM(amount) >= 300 會直接語法錯
  q5: `SELECT user_id, SUM(amount) AS total
       FROM orders
       WHERE status = 'paid'
       GROUP BY user_id
       HAVING SUM(amount) >= 300
       ORDER BY user_id ASC`,

  // 6. INNER JOIN：只保留兩邊都有對應的列
  q6: `SELECT u.name, o.amount
       FROM orders o
       JOIN users u ON u.id = o.user_id
       WHERE o.status = 'paid'
       ORDER BY o.amount DESC`,

  // 7. LEFT JOIN + IS NULL：找出「左表有、右表沒有」的列
  //    LEFT JOIN 保留左表所有列，右表沒對應時補 NULL
  //    → o.id IS NULL 就是「這個使用者沒有訂單」
  q7: `SELECT u.name
       FROM users u
       LEFT JOIN orders o ON o.user_id = u.id
       WHERE o.id IS NULL
       ORDER BY u.name ASC`,

  // 8. JOIN + GROUP BY：先接起來，再分組
  //    用 JOIN（INNER）所以 Taichung 不會出現 —— Dave 沒訂單，接不上
  //    若要讓它出現並顯示 0，要改 LEFT JOIN 並用 COALESCE(SUM(...), 0)
  q8: `SELECT u.city, SUM(o.amount) AS total
       FROM orders o
       JOIN users u ON u.id = o.user_id
       WHERE o.status = 'paid'
       GROUP BY u.city
       ORDER BY u.city ASC`,

  // 9. 子查詢：括號內先算出單一值，再拿來比較
  //    全部訂單平均 = 850 / 6 ≈ 141.67 → 只有 200 與 300 高於它
  q9: `SELECT id
       FROM orders
       WHERE amount > (SELECT AVG(amount) FROM orders)
       ORDER BY id ASC`,

  // 10. DISTINCT：去除重複列（Alice 與 Bob 都在 Taipei，只留一筆）
  q10: `SELECT DISTINCT u.city
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY u.city ASC`,
};

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');
// node:sqlite 回傳 null-prototype 物件，展開成一般物件才好比對
const run = (sql) => db.prepare(sql).all().map((row) => ({ ...row }));

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

/*
【筆試必考的四組對照】

  WHERE vs HAVING
    WHERE  在分組「前」篩列，不能用聚合函數
    HAVING 在分組「後」篩群組，可以用聚合函數
    → 「找出訂單總額超過 1000 的客戶」必須用 HAVING

  INNER JOIN vs LEFT JOIN
    INNER：兩邊都有才留 → 會「弄丟」沒有關聯資料的那一方
    LEFT ：左表全留，右表沒對應補 NULL
    → 「找出沒下單的客戶」只能用 LEFT JOIN + IS NULL
    → 統計報表若用 INNER JOIN，數量為 0 的分類會整列消失（常見 bug）

  COUNT(*) vs COUNT(欄位)
    COUNT(*)     算列數
    COUNT(col)   算該欄「非 NULL」的筆數
    → 這兩個在有 NULL 時結果不同，是經典考點

  DISTINCT vs GROUP BY
    兩者都能去重；GROUP BY 還能同時聚合。
    只是要去重 → DISTINCT 更直觀。

【NULL 的三個陷阱】

  1. NULL = NULL 的結果是 NULL（不是 true）→ 判斷要用 IS NULL / IS NOT NULL
  2. SUM / AVG 會忽略 NULL；COUNT(*) 不會忽略列
  3. NOT IN (子查詢) 若子查詢含 NULL，整個條件會變成不成立
     → 這就是 q7 提示「不要用 NOT IN」的原因，改用 LEFT JOIN + IS NULL 才安全

【口試可能怎麼問】

  Q：你們的資料庫用什麼？
  A：實務上是 NoSQL（Firestore、MongoDB），關聯式資料庫我目前是自學補強中 ——
     SQL 語法、正規化、索引與交易的概念我讀過並動手練過，但沒有生產環境經驗。
     （照實說。有練過跟完全沒碰過，在對話裡聽得出來。）
*/
