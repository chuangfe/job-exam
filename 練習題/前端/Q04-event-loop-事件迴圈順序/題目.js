/*
【題目】Event Loop 順序預測（macrotask / microtask）

背景：
呼叫堆疊（call stack）清空後，事件迴圈會——
  1. 先執行所有「同步」程式碼；
  2. 清空「所有」microtask 佇列（清的過程中新產生的 microtask 也要清掉）；
  3. 才執行「一個」macrotask，然後回到步驟 2，如此循環。

- microtask：Promise.then/catch/finally、queueMicrotask、await 之後的接續。
- macrotask：setTimeout、setInterval、I/O、UI 事件。
- 關鍵口訣：同步全跑完 → 清光 microtask → 才跑一個 macrotask。

題目：
下面這段程式會依序印出 1~7 這幾個數字。請「先不要執行」，
自己用上面的規則推理出「實際印出的順序」，把答案填進 predictedOrder 陣列。

  console.log(1);
  setTimeout(() => console.log(2), 0);
  Promise.resolve().then(() => {
    console.log(3);
    Promise.resolve().then(() => console.log(4)); // microtask 裡再產生 microtask
  });
  (async () => {
    console.log(5);
    await null;                                    // await 之後屬於 microtask
    console.log(6);
  })();
  console.log(7);

填完後執行 `node 題目.js`，它會實際跑一次並比對你的預測。
猜錯不會告訴你正解，只會提示你再想；猜對才會通過。
*/

// 👉 把你預測的印出順序填進這個陣列（數字，例如 1, 5, ...）
const predictedOrder = [];

// ===== 測試（實際跑一次 event loop，比對你的預測）=====
const assert = require('node:assert');

function runActual() {
  return new Promise((resolve) => {
    const actual = [];
    const log = (n) => actual.push(n);

    log(1);
    setTimeout(() => {
      log(2);
      resolve(actual); // 最後一個 macrotask 跑完才結束
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
  let correct = true;
  try {
    assert.deepStrictEqual(predictedOrder, actual);
  } catch {
    correct = false;
  }

  if (!correct) {
    console.error('❌ 還沒對。你的預測：[' + predictedOrder.join(', ') + ']');
    console.error('   提示：同步全部先跑完 → 清光所有 microtask → 才跑一個 macrotask(setTimeout)。');
    console.error('   再想想 async 裡 await 之前是同步、await 之後是 microtask。');
    process.exit(1);
  }

  console.log('✅ 通過！實際印出順序：' + actual.join(' '));
})();
