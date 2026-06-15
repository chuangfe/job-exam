/*
【答案】debounce（防抖）

重點：
- 用閉包保存 timer；每次呼叫先清除舊 timer（重置計時器）。
- 用 fn.apply(this, args) 保留呼叫時的 this 與參數。
- immediate 為 true 時，timer 為空才立即執行（首次立即）。
*/

// debounce：回傳防抖後的函式
function debounce(fn, delay = 300, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !timer) fn.apply(this, args); // 首次立即
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
  };
}

// ===== 測試 =====
const assert = require('node:assert');

(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // 1) 連續呼叫只執行一次
  let count = 0;
  const d = debounce(() => count++, 50);
  d();
  d();
  d();
  assert.strictEqual(count, 0); // 尚未到時間
  await sleep(80);
  assert.strictEqual(count, 1); // 只執行一次

  // 2) 保留參數與 this
  let received;
  const ctx = { name: 'ctx' };
  let thisName;
  const d2 = debounce(function (a, b) {
    received = a + b;
    thisName = this.name;
  }, 30);
  d2.call(ctx, 2, 3);
  await sleep(60);
  assert.strictEqual(received, 5);
  assert.strictEqual(thisName, 'ctx');

  // 3) immediate 首次立即執行
  let imCount = 0;
  const d3 = debounce(() => imCount++, 50, true);
  d3();
  assert.strictEqual(imCount, 1); // 立即執行
  d3();
  assert.strictEqual(imCount, 1); // 後續被防抖
  await sleep(80);

  console.log('✅ 通過');
})();
