/*
【答案】用 Express 寫伺服器 —— 狀態碼語意、原始 body、冪等

四個設計決策，每個都對應一個考點：

  1. /webhook 掛在 express.json() 之前，並用 express.raw 取得 Buffer
     middleware 是有順序的。若 express.json() 先跑，body 就變成物件，
     原始位元組永遠拿不回來 —— 驗簽因此必然失敗。

  2. 400 與 422 分兩層檢查
     第一層「有沒有 title 這個欄位」→ 沒有就是我讀不懂你的請求 → 400
     第二層「title 的值合不合語意」→ 讀懂了但內容不對 → 422

  3. PUT 用「整體覆蓋」而不是「局部調整」
     這是冪等在程式上的樣子。store.set(id, 完整物件) 打幾次結果都一樣；
     若寫成 task.done = !task.done 或 count += 1，就不冪等了。

  4. DELETE 不檢查存在性
     一律 delete 後回 204。客戶端網路超時重送時才能安全重試。

  5. 405 用 app.all 掛在具體路由之後
     Express 預設不會給你 405 —— 路徑有、method 沒有時它會一路掉到 404。
     要區分兩者必須自己宣告「這個路徑允許哪些 method」。
*/

const express = require('express');
const crypto = require('node:crypto');

const WEBHOOK_SECRET = 'practice-secret';

function createStore() {
  return new Map([[1, { id: 1, title: '既有任務', done: false }]]);
}

function createApp() {
  const app = express();
  const store = createStore();
  let nextId = 2;

  // ── 1. webhook：必須在 express.json() 之前，且拿原始 Buffer ──
  app.post('/webhook', express.raw({ type: '*/*' }), (req, res) => {
    const expected =
      'sha256=' + crypto.createHmac('sha256', WEBHOOK_SECRET).update(req.body).digest('hex');
    const got = String(req.headers['x-signature'] || '');

    // 等長才能比；timingSafeEqual 避免用字串比對洩漏「前幾個字元對了」的時間差
    const ok =
      got.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));

    if (!ok) return res.status(401).json({ error: 'BAD_SIGNATURE' });
    res.status(200).json({ ok: true });
  });

  // ── 2. 其餘路由才解析 JSON ──
  app.use(express.json());

  app.get('/echo', (req, res) => {
    const { msg } = req.query;
    if (msg === undefined) return res.status(400).json({ error: 'MISSING_MSG' });
    res.json({ msg });
  });

  app.get('/tasks/:id', (req, res) => {
    const task = store.get(Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(task);
  });

  // 兩層驗證：先「讀不讀得懂」(400)，再「內容對不對」(422)
  function validateTitle(body) {
    if (!body || !('title' in body)) return { status: 400, error: 'BAD_REQUEST' };
    if (typeof body.title !== 'string' || body.title.trim() === '') {
      return { status: 422, error: 'INVALID_TITLE' };
    }
    return null;
  }

  app.post('/tasks', (req, res) => {
    const bad = validateTitle(req.body);
    if (bad) return res.status(bad.status).json({ error: bad.error });

    // 非冪等：每次都配一個新 id
    const task = { id: nextId++, title: req.body.title, done: false };
    store.set(task.id, task);
    res.status(201).json(task);
  });

  app.put('/tasks/:id', (req, res) => {
    const bad = validateTitle(req.body);
    if (bad) return res.status(bad.status).json({ error: bad.error });

    // 冪等：整體覆蓋。打 N 次的結果和打 1 次相同
    const task = { id: Number(req.params.id), title: req.body.title, done: Boolean(req.body.done) };
    store.set(task.id, task);
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    // 冪等：不管在不在，刪完就是「不在」，一律 204
    store.delete(Number(req.params.id));
    res.status(204).end();
  });

  // ── 3. 405：路徑存在但 method 不支援（要放在具體路由之後）──
  const methodNotAllowed = (allow) => (req, res) =>
    res.set('Allow', allow).status(405).json({ error: 'METHOD_NOT_ALLOWED' });

  app.all('/echo', methodNotAllowed('GET'));
  app.all('/tasks', methodNotAllowed('POST'));
  app.all('/tasks/:id', methodNotAllowed('GET, PUT, DELETE'));
  app.all('/webhook', methodNotAllowed('POST'));

  // ── 4. 404 fallback：以上都沒中，就是路徑不存在 ──
  app.use((req, res) => res.status(404).json({ error: 'NOT_FOUND' }));

  // ── 5. 錯誤處理（4 個參數，放最後）──
  app.use((err, req, res, next) => {
    // express.json() 遇到壞 JSON 會丟這個型別
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'BAD_REQUEST' });
    }
    res.status(err.statusCode || 500).json({ error: err.code || 'INTERNAL_ERROR' });
  });

  return app;
}

module.exports = { createApp, WEBHOOK_SECRET };

// ---- 測試 ----
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
      let r = await fetch(`${base}/echo?msg=hi`);
      assert.strictEqual(r.status, 200);
      assert.deepStrictEqual(await r.json(), { msg: 'hi' });

      r = await fetch(`${base}/echo`);
      assert.strictEqual(r.status, 400);
      assert.deepStrictEqual(await r.json(), { error: 'MISSING_MSG' });

      r = await fetch(`${base}/tasks/999`);
      assert.strictEqual(r.status, 404);

      r = await fetch(`${base}/nope`);
      assert.strictEqual(r.status, 404);

      r = await fetch(`${base}/tasks/1`, { method: 'PATCH' });
      assert.strictEqual(r.status, 405);
      assert.ok(/GET/.test(r.headers.get('allow') || ''));

      r = await fetch(`${base}/tasks`, json('{ 這不是合法 JSON'));
      assert.strictEqual(r.status, 400);

      r = await fetch(`${base}/tasks`, json(JSON.stringify({})));
      assert.strictEqual(r.status, 400);

      r = await fetch(`${base}/tasks`, json(JSON.stringify({ title: '   ' })));
      assert.strictEqual(r.status, 422);
      assert.deepStrictEqual(await r.json(), { error: 'INVALID_TITLE' });

      const a = await (await fetch(`${base}/tasks`, json(JSON.stringify({ title: 'X' })))).json();
      const b = await (await fetch(`${base}/tasks`, json(JSON.stringify({ title: 'X' })))).json();
      assert.notStrictEqual(a.id, b.id);

      const put = () =>
        fetch(`${base}/tasks/1`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '改過', done: true }),
        });
      const p1 = await put();
      const p2 = await put();
      assert.strictEqual(p1.status, 200);
      assert.strictEqual(p2.status, p1.status);
      assert.deepStrictEqual(await p2.json(), await p1.json());

      const d1 = await fetch(`${base}/tasks/1`, { method: 'DELETE' });
      assert.strictEqual(d1.status, 204);
      assert.strictEqual(await d1.text(), '');
      const d2 = await fetch(`${base}/tasks/1`, { method: 'DELETE' });
      assert.strictEqual(d2.status, 204);

      const raw = '{"event":"post.published",   "id":7}';
      r = await fetch(`${base}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Signature': sign(raw) },
        body: raw,
      });
      assert.strictEqual(r.status, 200);
      assert.deepStrictEqual(await r.json(), { ok: true });

      r = await fetch(`${base}/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Signature': 'sha256=deadbeef' },
        body: raw,
      });
      assert.strictEqual(r.status, 401);
    });

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

/*
──────────────────────────────────────────────────────────────
【Express 幫你做了什麼】口試被問「Express 的 next()／json() 在做什麼」的答案

  你若手寫 node:http            Express 的版本
  ─────────────────────────────────────────────────────────
  new URL(req.url, base).pathname      req.path
  url.searchParams.get('msg')          req.query.msg
  for await 累積 chunk + JSON.parse    express.json() 後的 req.body
  res.writeHead(200, {...}) + res.end  res.status(200).json(...)
  一連串 if (pathname === ...)         app.get('/path', handler)

  express.json() 本質上就是「把 request stream 讀完、JSON.parse、掛到 req.body」
  的一個 middleware。知道這件事，就知道為什麼 /webhook 不能用它。

【Express 5 的重要差異】（你的 Mira 系統用的是 Express 5）

  Express 4：async handler 裡 throw 的錯誤不會被接住 → 請求 hang 住，
             所以要用 wrap(fn) 樣板把 promise 的 rejection 轉成 next(err)。
  Express 5：**已內建**，async handler 拋出的錯誤會自動送到錯誤 middleware。

  → 網路上大量「Express 必須用 asyncHandler 包裝」的文章講的是 4。
    口試若被問到，答得出這個版本差異是加分。

【筆試可能怎麼考】

  Q. 下列哪些 HTTP method 是冪等的？
  A. GET、HEAD、PUT、DELETE、OPTIONS、TRACE 冪等；POST、PATCH 不冪等。
     ⚠️「冪等」≠「安全」。GET/HEAD 是 safe（不改變狀態）；
       PUT/DELETE 會改變狀態但冪等（重複執行結果相同）。
     ⚠️ PATCH 通常不冪等，因為它常表達「相對變更」（例如 count += 1）。

  Q. 400 與 422 的差別？
  A. 400 Bad Request：請求本身格式有問題，伺服器無法解析或缺必要欄位。
     422 Unprocessable Content：語法正確、伺服器讀懂了，但內容違反語意規則。

  Q. 404 與 405 的差別？
  A. 404 Not Found：找不到該資源／路徑。
     405 Method Not Allowed：路徑存在，但不接受這個 method；
        規範要求回應**必須**帶 Allow 標頭列出允許的 method。

  Q. 為什麼 webhook 驗簽要用原始 body？
  A. 簽章是對位元組計算的。JSON.parse 再 stringify 會正規化空白與鍵順序，
     產生不同的位元組 → HMAC 不同 → 驗簽失敗。
     （這正是 Meta／LINE／Stripe webhook 都要求 raw body 的原因。）
*/

// **最後更新**：2026-08-31
