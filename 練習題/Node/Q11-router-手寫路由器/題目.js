/*
【題目】手寫路由器 —— Express 的 app.get('/tasks/:id') 是怎麼運作的

Q10 用一堆 if (url.pathname === '/x') 比對路徑。那個寫法有兩個問題：
  1. 沒辦法處理 /tasks/123 這種「路徑裡帶參數」的情況
  2. 路由散在程式各處，新增一條就要改主流程

真正的框架做法是：把路由「註冊」起來，再用一個比對函式找出該由誰處理。
這題就是實作那個比對函式。

需求：實作 createRouter()，回傳具備下列方法的物件。

  註冊
    router.get(path, handler)
    router.post(path, handler)
    router.put(path, handler)
    router.delete(path, handler)
    → 皆回傳 router 本身（可鏈式呼叫）

  比對
    router.match(method, pathname) → 三種結果之一：
      { handler, params }                        找到
      { error: 'NOT_FOUND' }                     路徑沒有任何方法註冊
      { error: 'METHOD_NOT_ALLOWED', allow }     路徑有註冊但方法不符
                                                 allow 為該路徑支援的方法陣列（排序後）

  路徑規則
    /tasks           靜態路徑
    /tasks/:id       動態片段 → params = { id: '123' }
    /users/:uid/posts/:pid  多個參數
    片段數量不同就不算符合（/tasks 不等於 /tasks/1）

  兩個容易忽略的細節
    a) 靜態優先：若同時註冊 /tasks/new 與 /tasks/:id，
       比對 /tasks/new 要回靜態那條（先註冊順序無關，靜態永遠優先）
    b) 尾斜線正規化：'/tasks/' 與 '/tasks' 視為同一路徑
       （'/' 本身除外，它就是根路徑）

【為什麼值得手寫】
  口試常問「Express 的路由怎麼比對」「middleware 和 router 差在哪」。
  寫過這題，你答的是機制；沒寫過，只能答「就 app.get 這樣寫」。
*/

// TODO: 實作 createRouter
function createRouter() {
  // 提示：
  //   1. 用一個結構存 { method, segments, paramNames, handler }
  //      segments 由 path 切出來，動態片段記下位置與參數名
  //   2. match 時先切 pathname，再逐條比對片段數與內容
  //   3. 靜態優先 → 比對出多條時，選「動態片段最少」的那條
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

const h = (name) => () => name; // 用回傳值辨認是哪個 handler

// 1. 靜態路徑 + 鏈式註冊
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

// 2. 動態片段 → params 為字串
m = r.match('GET', '/tasks/123');
assert.strictEqual(m.handler(), 'getTask');
assert.deepStrictEqual(m.params, { id: '123' });

m = r.match('DELETE', '/tasks/abc');
assert.strictEqual(m.handler(), 'deleteTask');
assert.deepStrictEqual(m.params, { id: 'abc' });

// 3. 多個參數
m = r.match('GET', '/users/u1/posts/p9');
assert.strictEqual(m.handler(), 'getUserPost');
assert.deepStrictEqual(m.params, { uid: 'u1', pid: 'p9' });

// 4. 靜態優先於動態
m = r.match('GET', '/tasks/new');
assert.strictEqual(m.handler(), 'newTaskForm', '/tasks/new 應命中靜態路由');
assert.deepStrictEqual(m.params, {});

// 5. 根路徑
m = r.match('GET', '/');
assert.strictEqual(m.handler(), 'home');

// 6. 尾斜線正規化
assert.strictEqual(r.match('GET', '/tasks/').handler(), 'listTasks');
assert.strictEqual(r.match('GET', '/tasks/123/').handler(), 'getTask');

// 7. 片段數不同不算符合
assert.deepStrictEqual(r.match('GET', '/tasks/1/2'), { error: 'NOT_FOUND' });

// 8. 完全沒註冊的路徑
assert.deepStrictEqual(r.match('GET', '/nope'), { error: 'NOT_FOUND' });

// 9. 路徑有註冊、方法不符 → 405 並回報允許的方法（排序後）
m = r.match('PATCH', '/tasks');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['GET', 'POST']);

m = r.match('POST', '/tasks/123');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['DELETE', 'GET', 'PUT']);

// 10. 動態路徑的 405 也要正確（/users/:uid/posts/:pid 只有 GET）
m = r.match('DELETE', '/users/u1/posts/p9');
assert.strictEqual(m.error, 'METHOD_NOT_ALLOWED');
assert.deepStrictEqual(m.allow, ['GET']);

console.log('✅ 通過');
