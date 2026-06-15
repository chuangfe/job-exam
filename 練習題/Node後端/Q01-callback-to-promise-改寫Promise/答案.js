/*
【答案】callback 改寫成 Promise

重點：error-first callback → err 走 reject、data 走 resolve。
Node 內建的 util.promisify 就是自動幫你做這件事
（前提是函式遵守 error-first 慣例）。
*/

// 舊式 callback 函式（模擬非同步查使用者）
function getUserCb(id, callback) {
  setTimeout(() => {
    if (id <= 0) return callback(new Error('id 不合法'));
    callback(null, { id, name: `User${id}` });
  }, 100);
}

// 改寫成回傳 Promise
function getUser(id) {
  return new Promise((resolve, reject) => {
    getUserCb(id, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = { getUserCb, getUser };

// ---- 使用示範（和你前端用 fetch 一樣）----
if (require.main === module) {
  const assert = require('node:assert');

  // 示範：then / catch 用法
  getUser(1)
    .then((user) => console.log('成功', user))
    .catch((err) => console.error('失敗', err.message));

  // 驗證測試
  (async () => {
    const user = await getUser(1);
    assert.deepStrictEqual(user, { id: 1, name: 'User1' });

    await assert.rejects(() => getUser(0), /id 不合法/);

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
