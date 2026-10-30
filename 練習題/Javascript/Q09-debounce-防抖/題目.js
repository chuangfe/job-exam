/*
【題目】debounce（防抖）

說明：
實作 debounce(fn, delay, immediate)，事件停止觸發後 delay 毫秒才執行 fn，
並支援 immediate（首次立即執行）。

提示：用閉包保存 timer；每次呼叫先清除舊 timer；保留 this 與參數。

範例：
  const d = debounce(fn, 100);
  d(); d(); d();   // 連續呼叫，只在最後一次後 100ms 執行一次

重點：搜尋框輸入、視窗 resize 收尾。關鍵在「重置計時器」。
*/

// debounce：回傳防抖後的函式
function debounce(fn, delay = 300, immediate = false) {
  // TODO: 用閉包保存 timer，每次呼叫先清除舊 timer，
  //       immediate 為 true 時首次立即執行
  return function () {}; // 預設回傳（未實作）
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
