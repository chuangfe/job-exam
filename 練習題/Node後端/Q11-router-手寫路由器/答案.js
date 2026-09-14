/*
【答案】手寫路由器

三個設計決策，每個都對應一個真實框架的行為：

  1. 路徑先切成片段（segments），不要用字串比對
     '/tasks/:id' → ['tasks', ':id']
     比對時先看片段數量，再逐段比 —— 這樣才處理得了動態片段。

  2. 靜態優先於動態
     /tasks/new 同時符合 '/tasks/new' 與 '/tasks/:id'。
     Express 是「先註冊先贏」，但那讓註冊順序變成隱性契約（很容易踩到）。
     這裡採「動態片段少者優先」，行為與註冊順序無關，更好預測。

  3. 404 與 405 要分開判斷
     必須先看「這個路徑有沒有任何方法註冊」：
       完全沒有 → 404 NOT_FOUND
       有但方法不符 → 405 METHOD_NOT_ALLOWED（並回報 Allow）
     很多自製 API 直接回 404，這在 HTTP 語意上是錯的。
*/

function createRouter() {
  const routes = []; // { method, segments, paramNames, dynamicCount, handler }

  // '/tasks/'  → ['tasks']
  // '/'        → []
  const split = (path) => path.split('/').filter((s) => s !== '');

  const add = (method, path, handler) => {
    const parts = split(path);
    const segments = [];
    const paramNames = [];
    for (const part of parts) {
      if (part.startsWith(':')) {
        segments.push(null); // null 代表「這一段是變數」
        paramNames.push(part.slice(1));
      } else {
        segments.push(part);
      }
    }
    routes.push({
      method,
      segments,
      paramNames,
      dynamicCount: paramNames.length,
      handler,
    });
  };

  const router = {
    get(path, handler) {
      add('GET', path, handler);
      return router;
    },
    post(path, handler) {
      add('POST', path, handler);
      return router;
    },
    put(path, handler) {
      add('PUT', path, handler);
      return router;
    },
    delete(path, handler) {
      add('DELETE', path, handler);
      return router;
    },

    match(method, pathname) {
      const parts = split(pathname);

      // 先找出「路徑符合」的所有路由（不論方法）—— 這是分辨 404 / 405 的關鍵
      const pathMatches = [];
      for (const route of routes) {
        if (route.segments.length !== parts.length) continue;
        let ok = true;
        const params = {};
        let paramIdx = 0;
        for (let i = 0; i < route.segments.length; i++) {
          const seg = route.segments[i];
          if (seg === null) {
            params[route.paramNames[paramIdx++]] = parts[i];
          } else if (seg !== parts[i]) {
            ok = false;
            break;
          }
        }
        if (ok) pathMatches.push({ route, params });
      }

      if (pathMatches.length === 0) return { error: 'NOT_FOUND' };

      // 方法符合的候選中，選動態片段最少的（靜態優先）
      const methodMatches = pathMatches
        .filter((m) => m.route.method === method)
        .sort((a, b) => a.route.dynamicCount - b.route.dynamicCount);

      if (methodMatches.length > 0) {
        const best = methodMatches[0];
        return { handler: best.route.handler, params: best.params };
      }

      // 路徑有、方法不符 → 405，並回報這個路徑支援哪些方法
      const allow = [...new Set(pathMatches.map((m) => m.route.method))].sort();
      return { error: 'METHOD_NOT_ALLOWED', allow };
    },
  };

  return router;
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

const h = (name) => () => name;

const r = createRouter()
  .get('/tasks', h('listTasks'))
  .post('/tasks', h('createTask'))
  .get('/tasks/:id', h('getTask'))
  .put('/tasks/:id', h('updateTask'))
  .delete('/tasks/:id', h('deleteTask'))
  .get('/tasks/new', h('newTaskForm'))
  .get('/users/:uid/posts/:pid', h('getUserPost'))
  .get('/', h('home'));

let m = r.match('GET', '/tasks');
assert.strictEqual(m.handler(), 'listTasks');
assert.deepStrictEqual(m.params, {});

m = r.match('POST', '/tasks');
assert.strictEqual(m.handler(), 'createTask');

m = r.match('GET', '/tasks/123');
assert.strictEqual(m.handler(), 'getTask');
assert.deepStrictEqual(m.params, { id: '123' });

m = r.match('DELETE', '/tasks/abc');
assert.strictEqual(m.handler(), 'deleteTask');
assert.deepStrictEqual(m.params, { id: 'abc' });

m = r.match('GET', '/users/u1/posts/p9');
assert.strictEqual(m.handler(), 'getUserPost');
assert.deepStrictEqual(m.params, { uid: 'u1', pid: 'p9' });

m = r.match('GET', '/tasks/new');
assert.strictEqual(m.handler(), 'newTaskForm');
assert.deepStrictEqual(m.params, {});

m = r.match('GET', '/');
assert.strictEqual(m.handler(), 'home');

assert.strictEqual(r.match('GET', '/tasks/').handler(), 'listTasks');
assert.strictEqual(r.match('GET', '/tasks/123/').handler(), 'getTask');

assert.deepStrictEqual(r.match('GET', '/tasks/1/2'), { error: 'NOT_FOUND' });
assert.deepStrictEqual(r.match('GET', '/nope'), { error: 'NOT_FOUND' });

m = r.match('PATCH', '/tasks');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['GET', 'POST']);

m = r.match('POST', '/tasks/123');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['DELETE', 'GET', 'PUT']);

m = r.match('DELETE', '/users/u1/posts/p9');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['GET']);

console.log('✅ 通過');

/*
【接回 Q10】
  Q10 的一堆 if (url.pathname === '/x') 可以換成：

    const m = router.match(req.method, url.pathname);
    if (m.error === 'NOT_FOUND')          return send(404, { error: 'Not Found' });
    if (m.error === 'METHOD_NOT_ALLOWED') {
      res.setHeader('Allow', m.allow.join(', '));   // ← 405 應附 Allow header
      return send(405, { error: 'Method Not Allowed' });
    }
    return m.handler(req, res, m.params);

  這就是 Express 內部在做的事。

【口試考點】

  Q：Express 的路由是怎麼比對的？
  A：把註冊的 path 切成片段，動態片段（:id）記下參數名；請求進來時先比片段數，
     再逐段比對，命中就把動態片段的值收集成 params。

  Q：/tasks/new 和 /tasks/:id 同時存在會怎樣？
  A：Express 是先註冊先贏，所以 /tasks/new 必須註冊在 /tasks/:id 之前，
     否則會被動態路由吃掉。本題改成「動態片段少者優先」，避免這個順序陷阱。

  Q：為什麼要區分 404 和 405？
  A：語意不同 —— 404 是資源不存在，405 是資源存在但不支援該方法。
     回 405 時規範要求附上 Allow header 告知支援哪些方法。
*/
