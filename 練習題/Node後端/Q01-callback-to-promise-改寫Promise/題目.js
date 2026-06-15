/*
【題目】callback 改寫成 Promise

把一個傳統 callback 風格的函式，包成回傳 Promise 的版本
（這就是 Node 早期 API 升級的方式）。

提示：
- callback 慣例是 (err, data) => {}（error-first）。
- new Promise((resolve, reject) => { ... })：
  成功呼叫 resolve(data)，失敗呼叫 reject(err)。
*/

// 舊式 callback 函式（模擬非同步查使用者）— 不要改它
function getUserCb(id, callback) {
  setTimeout(() => {
    if (id <= 0) return callback(new Error('id 不合法'));
    callback(null, { id, name: `User${id}` });
  }, 100);
}

// TODO: 把 getUserCb 改寫成回傳 Promise 的版本
function getUser(id) {
  // TODO: 用 new Promise 包住 getUserCb，error-first callback 的
  //       err 走 reject、data 走 resolve
}

module.exports = { getUserCb, getUser };

// ---- 測試（執行驗證）----
if (require.main === module) {
  const assert = require('node:assert');

  (async () => {
    // 成功路徑
    const user = await getUser(1);
    assert.deepStrictEqual(user, { id: 1, name: 'User1' });

    // 失敗路徑：id <= 0 應 reject
    await assert.rejects(() => getUser(0), /id 不合法/);

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
