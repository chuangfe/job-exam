/*
【題目】實作 Promise.all

說明：
實作 myPromiseAll(promises)，全部成功才 resolve（依輸入順序回傳結果陣列），
任一失敗即 reject。需支援陣列中夾雜非 Promise 值，空陣列直接 resolve。

提示：計數器追蹤完成數量；用索引保留順序；空陣列直接 resolve。

範例：
  myPromiseAll([1, Promise.resolve(2), 3]) // → [1, 2, 3]
  myPromiseAll([Promise.reject('err')])    // → reject('err')

重點：用 Promise.resolve(p) 包裝以支援非 Promise 值；
不能用 results.push（順序會錯）。
*/

// myPromiseAll：回傳一個 Promise，全部成功 resolve 結果陣列
function myPromiseAll(promises) {
  // TODO: 用索引保留順序、計數器判斷是否全部完成、任一失敗即 reject
  return Promise.resolve([]); // 預設回傳（未實作）
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
