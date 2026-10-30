/*
【題目】throttle（節流）

說明：
實作 throttle(fn, interval)，固定時間間隔最多執行一次，並保證尾呼叫
（最後一次觸發在間隔結束後仍會執行）。

提示：時間戳法 + 計時器法結合；想清楚是否要執行「最後一次」尾呼叫。

範例：
  const t = throttle(fn, 100);
  t(); // 立即執行
  t(); t(); // 間隔內被節流，最後一次在間隔後補執行

重點：scroll、按鈕連點。throttle 保證頻率，debounce 等待靜止。
*/

// throttle：回傳節流後的函式
function throttle(fn, interval = 300) {
  // TODO: 用 last 時間戳 + timer，首次立即執行，
  //       間隔內的呼叫安排尾呼叫
  return function () {}; // 預設回傳（未實作）
}

// ===== 測試 =====
const assert = require('node:assert');

(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // 1) 首次立即執行
  let count = 0;
  const t = throttle(() => count++, 100);
  t();
  assert.strictEqual(count, 1); // 立即執行一次

  // 2) 間隔內連續呼叫被節流，但尾呼叫會補執行
  t();
  t();
  assert.strictEqual(count, 1); // 間隔內仍是 1
  await sleep(150);
  assert.strictEqual(count, 2); // 尾呼叫補執行

  // 3) 保留參數
  let received;
  const t2 = throttle((a, b) => {
    received = a + b;
  }, 50);
  t2(4, 5);
  assert.strictEqual(received, 9);

  console.log('✅ 通過');
})();
