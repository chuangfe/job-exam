/*
【答案】實作 Promise.all

重點：
- 用 Promise.resolve(p) 包裝以支援非 Promise 值。
- 用索引 results[i] 保證順序，不能用 push（順序會錯）。
- 計數器 count 追蹤完成數量，全數完成才 resolve；任一失敗立即 reject。
- 空陣列直接 resolve（否則 count 永遠湊不齊）。
延伸：allSettled 不 reject、race 第一個敲定者勝出。
*/

// myPromiseAll：回傳一個 Promise，全部成功 resolve 結果陣列
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let count = 0;
    if (promises.length === 0) return resolve(results);
    promises.forEach((p, i) => {
      Promise.resolve(p).then((value) => {
        results[i] = value; // 用索引保證順序
        if (++count === promises.length) resolve(results);
      }, reject); // 任一失敗立即 reject
    });
  });
}

// ===== 測試 =====
const assert = require('node:assert');

(async () => {
  // 1) 全部成功，依序回傳
  const r1 = await myPromiseAll([1, Promise.resolve(2), 3]);
  assert.deepStrictEqual(r1, [1, 2, 3]);

  // 2) 順序由輸入決定，與完成快慢無關
  const slow = new Promise((res) => setTimeout(() => res('slow'), 30));
  const fast = Promise.resolve('fast');
  const r2 = await myPromiseAll([slow, fast]);
  assert.deepStrictEqual(r2, ['slow', 'fast']);

  // 3) 空陣列直接 resolve
  const r3 = await myPromiseAll([]);
  assert.deepStrictEqual(r3, []);

  // 4) 任一失敗即 reject
  let err;
  try {
    await myPromiseAll([Promise.resolve(1), Promise.reject('boom')]);
  } catch (e) {
    err = e;
  }
  assert.strictEqual(err, 'boom');

  console.log('✅ 通過');
})();
