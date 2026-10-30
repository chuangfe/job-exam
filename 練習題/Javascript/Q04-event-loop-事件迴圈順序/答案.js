/*
【答案】Event Loop 順序預測（macrotask / microtask）

正確順序：1 5 7 3 6 4 2

逐步解析：
① 同步階段（由上而下，先全部跑完）
   - log(1)                         → 1
   - setTimeout 的回呼「排進 macrotask」，現在不執行
   - Promise.then 的回呼「排進 microtask」，現在不執行
   - async IIFE：await 之前是同步 → log(5) → 5
     （await null 之後的 log(6) 被切成 microtask，排隊）
   - log(7)                         → 7
   → 同步結束，已印：1 5 7

② 清空 microtask（把佇列清到空，過程中新產生的也要清）
   目前 microtask 佇列順序：先排的 then(3) 在前、await 後的(6) 在後。
   - 跑 then 回呼 → log(3) → 3；它「又排了一個」microtask log(4)
   - 跑 await 後續 → log(6) → 6
   - 佇列還有剛剛新產生的 log(4) → 4
   → microtask 清空，這輪印：3 6 4

③ 執行一個 macrotask
   - setTimeout 回呼 → log(2) → 2

合起來：1 5 7 3 6 4 2

常見誤區：
- 以為 setTimeout(…, 0) 會「馬上」執行 → 不會，macrotask 永遠排在 microtask 之後。
- 以為 3 和 6 誰先誰後看不出來 → then(3) 比 async 的 await(6) 更早進佇列，所以 3 在前。
- 以為 microtask 裡再產生的 4 要等下一輪 → 不用，同一輪會把新冒出來的 microtask 一起清掉。
*/

// 預測的印出順序
const predictedOrder = [1, 5, 7, 3, 6, 4, 2];

// ===== 測試（實際跑一次 event loop，比對預測）=====
const assert = require('node:assert');

function runActual() {
  return new Promise((resolve) => {
    const actual = [];
    const log = (n) => actual.push(n);

    log(1);
    setTimeout(() => {
      log(2);
      resolve(actual);
    }, 0);

    Promise.resolve().then(() => {
      log(3);
      Promise.resolve().then(() => log(4));
    });

    (async () => {
      log(5);
      await null;
      log(6);
    })();

    log(7);
  });
}

(async () => {
  const actual = await runActual();
  assert.deepStrictEqual(predictedOrder, actual);
  console.log('✅ 通過！實際印出順序：' + actual.join(' '));
})();
