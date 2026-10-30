/*
【答案】簡化版 Promise（A+ 核心）

重點：
- 三狀態 pending/fulfilled/rejected，settle 後狀態不可逆。
- pending 期間把 handle 收進 callbacks，settle 時用 queueMicrotask 觸發。
- then 回傳新 MyPromise 才能鏈式；then 回呼必須非同步（queueMicrotask）。
- 完整 A+ 需處理 then 回傳值也是 thenable 時 resolve 遞迴展開，此處為精簡版。
*/

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];
    const resolve = (v) => this.settle('fulfilled', v);
    const reject = (e) => this.settle('rejected', e);
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  settle(state, value) {
    if (this.state !== 'pending') return; // 狀態不可逆
    this.state = state;
    this.value = value;
    this.callbacks.forEach((cb) => queueMicrotask(cb));
    this.callbacks = [];
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === 'fulfilled') {
            resolve(onFulfilled ? onFulfilled(this.value) : this.value);
          } else {
            if (onRejected) resolve(onRejected(this.value));
            else reject(this.value);
          }
        } catch (e) {
          reject(e);
        }
      };
      if (this.state === 'pending') this.callbacks.push(handle);
      else queueMicrotask(handle);
    });
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
