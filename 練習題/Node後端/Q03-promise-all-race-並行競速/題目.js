/*
【題目】Promise.all 並行 vs Promise.race 競速

1. getMany：同時發出多個互不相依的請求（並行加速）。
2. withTimeout：讓多個來源「誰先回誰算」，做出 timeout 樣板。

提示：
- Promise.all([p1, p2])：全部成功才成功，任一失敗就整體失敗。
- Promise.allSettled：等全部結束，無論成功失敗都回報。
- Promise.race：第一個 settle（成功或失敗）的結果就是結果（常用於 timeout）。
*/

// 查使用者（可指定延遲時間，方便測 race）— 不要改它
function getUser(id, delay = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, delay);
  });
}

// TODO: 並行同時抓 id 1、2、3 三個使用者，回傳陣列
async function getMany() {
  // TODO: 用 Promise.all
}

// TODO: 競速：promise 與一個 ms 毫秒後 reject('逾時') 的 timer 比快
function withTimeout(promise, ms) {
  // TODO: 用 Promise.race
}

module.exports = { getUser, getMany, withTimeout };

// ---- 測試（執行驗證）----
if (require.main === module) {
  const assert = require('node:assert');

  (async () => {
    // 並行
    const many = await getMany();
    assert.deepStrictEqual(many, [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User3' },
    ]);

    // timeout 成功路徑：50ms 完成 < 200ms 上限
    const fast = await withTimeout(getUser(1, 50), 200);
    assert.deepStrictEqual(fast, { id: 1, name: 'User1' });

    // timeout 逾時路徑：300ms 完成 > 100ms 上限 → 應 reject 逾時
    await assert.rejects(() => withTimeout(getUser(1, 300), 100), /逾時/);

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
