/*
【題目】用 Express 寫伺服器 —— 狀態碼語意、原始 body、冪等

這題不考「手寫 HTTP」，考的是三個筆試與口試都會出現的知識點：

  1. 狀態碼語意     400 vs 422、404 vs 405
  2. 原始 body      為什麼有些路由「不能」讓 express.json() 先解析
  3. 冪等（Idempotency）  哪些 method 該冪等，以及「該冪等」在程式上長什麼樣

需要 express：專案根目錄已有 package.json，先在根目錄跑一次 `npm install`。
執行：node 題目.js

──────────────────────────────────────────────────────────────
需求：實作 createApp()，回傳一個 express app（不要自己 listen —— 測試會用
      app.listen(0) 拿隨機 port，這也是讓 app 可被測試的標準做法）

【路由】

  GET /echo?msg=hi
    → 200 { msg: 'hi' }
    → 沒帶 msg → 400 { error: 'MISSING_MSG' }

  GET /tasks/:id
    → 200 { id, title, done }
    → 找不到 → 404 { error: 'NOT_FOUND' }

  POST /tasks   body: { title }
    → 201 { id, title, done: false }
    → body 不是合法 JSON，或**沒有** title 這個欄位 → 400 { error: 'BAD_REQUEST' }
    → 有 title 但去掉空白後是空字串         → 422 { error: 'INVALID_TITLE' }
    ⚠️ 非冪等：連續打兩次要建出兩筆、id 不同

  PUT /tasks/:id   body: { title, done }
    → 200 更新後的完整 task
    ⚠️ 冪等：同一個請求打兩次，狀態碼與回應內容必須完全相同

  DELETE /tasks/:id
    → 204，且**沒有 body**
    ⚠️ 冪等：刪第二次仍然回 204（不是 404）

  POST /webhook   標頭 X-Signature: sha256=<hmac>
    用 WEBHOOK_SECRET 對「**原始 body bytes**」算 HMAC-SHA256（hex），比對標頭
    → 相符 → 200 { ok: true }
    → 不符 → 401 { error: 'BAD_SIGNATURE' }

  未定義的路徑            → 404 { error: 'NOT_FOUND' }
  路徑存在但 method 不支援 → 405 { error: 'METHOD_NOT_ALLOWED' } + Allow 標頭

──────────────────────────────────────────────────────────────
【三個一定會踩的坑】

1. 400 vs 422 的分界
   400 = 我讀不懂你的請求（JSON 壞掉、缺必要欄位）
   422 = 我讀懂了，但內容不合語意（title 是空白字串）
   考卷愛考這個分界。實務上很多人全用 400，但被問到要答得出差別。

2. /webhook 不能吃 express.json() 的結果
   簽章是對「傳過來的那串位元組」算的。若先 JSON.parse 再 JSON.stringify，
   空白與鍵順序可能改變 → 算出來的 HMAC 就不同 → 驗簽永遠失敗。
   測試會刻意送一段「有多餘空白」的 JSON 來抓這個錯誤。
   → 這條路由要拿到 Buffer（提示：express.raw），而且掛載順序很重要。

3. DELETE 第二次該回什麼
   很多人第一直覺是 404（東西不在了）。但 DELETE 定義為冪等 ——
   「呼叫 N 次的結果與呼叫 1 次相同」，所以第二次仍然回 204。
   （HTTP 規範允許 404，但那會讓客戶端無法安全重試；重試安全性才是冪等的重點。）
*/

const express = require('express');
const crypto = require('node:crypto');

const WEBHOOK_SECRET = 'practice-secret';

// 初始資料（不要改）
function createStore() {
  return new Map([[1, { id: 1, title: '既有任務', done: false }]]);
}

// TODO: 實作 createApp()
function createApp() {
  const app = express();
  const store = createStore();
  let nextId = 2;

  // TODO: POST /webhook —— 這條要先掛，而且要拿原始 Buffer

  // TODO: 其餘路由才需要解析 JSON body

  // TODO: GET /echo

  // TODO: GET /tasks/:id

  // TODO: POST /tasks

  // TODO: PUT /tasks/:id

  // TODO: DELETE /tasks/:id

  // TODO: 405（路徑存在、method 不支援）—— 要放在具體路由之後

  // TODO: 404 fallback

  // TODO: 錯誤處理 middleware（4 個參數，放最後）
  //       express.json() 遇到壞 JSON 會丟錯，要把它轉成 400 BAD_REQUEST

  return app;
}

module.exports = { createApp, WEBHOOK_SECRET };

// ---- 測試（執行驗證）----
if (require.main === module) {
  const assert = require('node:assert');

  const sign = (raw) =>
    'sha256=' + crypto.createHmac('sha256', WEBHOOK_SECRET).update(raw).digest('hex');

  async function withServer(fn) {
    const server = createApp().listen(0, '127.0.0.1');
    await new Promise((r) => server.once('listening', r));
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
      await fn(base);
    } finally {
      server.close();
    }
  }

  const json = (body) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  (async () => {
    await withServer(async (base) => {
      // ── query ──
      let r = await fetch(`${base}/echo?msg=hi`);
      assert.strictEqual(r.status, 200);
      assert.deepStrictEqual(await r.json(), { msg: 'hi' });

      r = await fetch(`${base}/echo`);
      assert.strictEqual(r.status, 400, 'GET /echo 缺 msg 應為 400');
      assert.deepStrictEqual(await r.json(), { error: 'MISSING_MSG' });

      // ── 404 vs 405 ──
      r = await fetch(`${base}/tasks/999`);
      assert.strictEqual(r.status, 404, '路徑存在但資源不存在 → 404');

      r = await fetch(`${base}/nope`);
      assert.strictEqual(r.status, 404, '未定義路徑 → 404');

      r = await fetch(`${base}/tasks/1`, { method: 'PATCH' });
      assert.strictEqual(r.status, 405, '路徑存在但 method 不支援 → 405（不是 404）');
      assert.ok(
        /GET/.test(r.headers.get('allow') || ''),
        '405 必須帶 Allow 標頭列出支援的 method'
      );

      // ── 400 vs 422 ──
      r = await fetch(`${base}/tasks`, json('{ 這不是合法 JSON'));
      assert.strictEqual(r.status, 400, '壞掉的 JSON → 400');

      r = await fetch(`${base}/tasks`, json(JSON.stringify({})));
      assert.strictEqual(r.status, 400, '缺 title 欄位 → 400');

      r = await fetch(`${base}/tasks`, json(JSON.stringify({ title: '   ' })));
      assert.strictEqual(r.status, 422, 'title 存在但去空白後為空 → 422（不是 400）');
      assert.deepStrictEqual(await r.json(), { error: 'INVALID_TITLE' });

      // ── POST 非冪等 ──
      const a = await (await fetch(`${base}/tasks`, json(JSON.stringify({ title: 'X' })))).json();
      const b = await (await fetch(`${base}/tasks`, json(JSON.stringify({ title: 'X' })))).json();
      assert.notStrictEqual(a.id, b.id, 'POST 是非冪等：兩次應建出不同 id');

      // ── PUT 冪等 ──
      const put = () =>
        fetch(`${base}/tasks/1`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '改過', done: true }),
        });
      const p1 = await put();
      const p2 = await put();
      assert.strictEqual(p1.status, 200);
      assert.strictEqual(p2.status, p1.status, 'PUT 是冪等：兩次狀態碼要相同');
      assert.deepStrictEqual(await p2.json(), await p1.json(), 'PUT 兩次回應內容要相同');

      // ── DELETE 冪等 ──
      const d1 = await fetch(`${base}/tasks/1`, { method: 'DELETE' });
      assert.strictEqual(d1.status, 204);
      assert.strictEqual(await d1.text(), '', '204 不能有 body');
      const d2 = await fetch(`${base}/tasks/1`, { method: 'DELETE' });
      assert.strictEqual(d2.status, 204, 'DELETE 是冪等：刪第二次仍為 204');

      // ── 原始 body 驗簽（刻意留多餘空白）──
      const raw = '{"event":"post.published",   "id":7}';
      r = await fetch(`${base}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Signature': sign(raw) },
        body: raw,
      });
      assert.strictEqual(
        r.status,
        200,
        '驗簽失敗：簽章要對「原始 bytes」算，不能用 JSON.parse 後再 stringify 的結果'
      );
      assert.deepStrictEqual(await r.json(), { ok: true });

      r = await fetch(`${base}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Signature': 'sha256=deadbeef' },
        body: raw,
      });
      assert.strictEqual(r.status, 401, '簽章不符 → 401');
    });

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-08-31
