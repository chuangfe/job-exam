/*
【題目】簡化版 Promise（A+ 核心）

說明：
實作支援 then 鏈式、非同步狀態切換的簡化 Promise（MyPromise）。

提示：
- 三狀態（pending / fulfilled / rejected），狀態不可逆。
- 收集 pending 期間的回呼，settle 後用 queueMicrotask 觸發。
- then 回傳新 MyPromise 才能鏈式。

範例：
  new MyPromise((resolve) => resolve(1))
    .then((v) => v + 1)
    .then((v) => console.log(v)); // 2

重點：then 回呼必須非同步（queueMicrotask）；then 回傳新 Promise 才能鏈式。
*/

class MyPromise {
  constructor(executor) {
    // TODO: 初始化 state/value/callbacks，定義 resolve/reject 並執行 executor
  }

  // then：回傳新的 MyPromise，支援鏈式
  then(onFulfilled, onRejected) {
    // TODO: 依當前狀態同步或在 pending 時排入 callbacks
    throw new Error('MyPromise.then 尚未實作'); // 未實作時直接拋錯，避免測試卡住
  }
}

// ===== 測試 =====
const assert = require('node:assert');

(async () => {
  // 1) 同步 resolve 後 then 取得值
  const v1 = await new Promise((done) => {
    new MyPromise((resolve) => resolve(10)).then((v) => done(v));
  });
  assert.strictEqual(v1, 10);

  // 2) 鏈式轉換
  const v2 = await new Promise((done) => {
    new MyPromise((resolve) => resolve(1))
      .then((v) => v + 1)
      .then((v) => v * 3)
      .then((v) => done(v));
  });
  assert.strictEqual(v2, 6);

  // 3) 非同步 resolve（pending 期間註冊回呼）
  const v3 = await new Promise((done) => {
    new MyPromise((resolve) => setTimeout(() => resolve('later'), 20)).then((v) =>
      done(v)
    );
  });
  assert.strictEqual(v3, 'later');

  // 4) reject 被 onRejected 攔截並可恢復
  const v4 = await new Promise((done) => {
    new MyPromise((_, reject) => reject('err'))
      .then(null, (e) => 'recovered:' + e)
      .then((v) => done(v));
  });
  assert.strictEqual(v4, 'recovered:err');

  // 5) then 回呼為非同步（microtask）
  const order = [];
  await new Promise((done) => {
    new MyPromise((resolve) => resolve()).then(() => {
      order.push('then');
      done();
    });
    order.push('sync');
  });
  assert.deepStrictEqual(order, ['sync', 'then']);

  console.log('✅ 通過');
})();
