/*
【答案】Event Loop 與 macrotask / microtask（順序預測）

輸出順序：1 5 7 3 6 4 2 解析：
- 同步階段：1、5（async 函式同步執行到第一個 await）、7。
- 第一輪 microtask：3（.then 回呼）先進佇列；6（await null 之後續）後進佇列，
  故 3 早於 6。
- microtask 內又產生的 microtask 4，會在本輪 microtask 持續清空時執行。
- 最後才執行 macrotask 2（setTimeout）。
*/

// predictOrder：實際執行 event loop 範例，回傳印出順序的字串陣列
function predictOrder() {
  const output = [];
  const log = (x) => output.push(x);

  return new Promise((resolve) => {
    log('1');
    setTimeout(() => {
      log('2');
      resolve(output); // 最後一個 macrotask 跑完才 resolve
    }, 0);

    Promise.resolve().then(() => {
      log('3');
      Promise.resolve().then(() => log('4')); // microtask 中再產生 microtask
    });

    (async () => {
      log('5');
      await null; // 之後的部分屬於 microtask
      log('6');
    })();

    log('7');
  });
}

// ===== 測試 =====
const assert = require('node:assert');

(async () => {
  const order = await predictOrder();
  assert.deepStrictEqual(order, ['1', '5', '7', '3', '6', '4', '2']);
  assert.strictEqual(order[0], '1'); // 第一個同步輸出
  assert.strictEqual(order[1], '5'); // async 函式同步執行到第一個 await
  assert.strictEqual(order[2], '7'); // 最後一個同步輸出
  assert.strictEqual(order[order.length - 1], '2'); // macrotask 最後
  console.log('✅ 通過');
})();
