/*
【答案】throttle（節流，時間戳 + 尾呼叫）

重點：
- remaining <= 0 時立即執行並更新 last（時間戳法）。
- 間隔內以 timer 安排尾呼叫，確保最後一次觸發也會執行。
- scroll、按鈕連點適用；throttle 保證頻率，debounce 等待靜止，差異要講清楚。
*/

// throttle：回傳節流後的函式
function throttle(fn, interval = 300) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const remaining = interval - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
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
