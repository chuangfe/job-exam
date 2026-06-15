/*
【題目】Event Loop 與 macrotask / microtask（順序預測）

說明：
呼叫堆疊（call stack）清空後，會先清空「所有」microtask 佇列，
再執行「一個」macrotask，之後再次清空 microtask，如此循環。

- microtask：Promise.then/catch/finally、queueMicrotask、await 之後的部分。
- macrotask：setTimeout、setInterval、I/O、UI 事件。
- 關鍵：每次 macrotask 之間會把 microtask 全部清乾淨。

請實作 predictOrder()：實際執行下列程式，依「真正印出的順序」
回傳一個字串陣列。預期執行的程式碼如下：

  console.log('1');
  setTimeout(() => log('2'), 0);
  Promise.resolve().then(() => {
    log('3');
    Promise.resolve().then(() => log('4'));
  });
  (async () => {
    log('5');
    await null;
    log('6');
  })();
  console.log('7');

正確順序為：1 5 7 3 6 4 2
*/

// predictOrder：實際跑一次 event loop 範例，回傳印出順序的字串陣列（Promise）
function predictOrder() {
  // TODO: 用一個 output 陣列收集 log，重現上述程式，
  //       並在所有 task 跑完後 resolve(output)
  return Promise.resolve([]); // 預設回傳（未實作）
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
