/*
【答案】Promise.all 並行 vs Promise.race 競速

重點：能並行就別 await 排隊。前端常見錯誤是 for 迴圈裡逐個 await（很慢）
—— 後端同理，把獨立請求丟進 Promise.all。
*/

function getUser(id, delay = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, delay);
  });
}

// 並行：同時抓 3 個使用者，總時間 ≈ 最慢那一個，而非三者相加
async function getMany() {
  const users = await Promise.all([getUser(1), getUser(2), getUser(3)]);
  return users;
}

// timeout 樣板：超過 ms 就算逾時
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('逾時')), ms)
  );
  return Promise.race([promise, timeout]);
}

module.exports = { getUser, getMany, withTimeout };

// ---- 示範 + 測試 ----
if (require.main === module) {
  const assert = require('node:assert');

  (async () => {
    await getMany().then((r) => console.log('並行結果', r));
    await withTimeout(getUser(1, 50), 200)
      .then(console.log)
      .catch((e) => console.error(e.message));

    // 驗證
    const many = await getMany();
    assert.deepStrictEqual(many, [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User3' },
    ]);

    const fast = await withTimeout(getUser(1, 50), 200);
    assert.deepStrictEqual(fast, { id: 1, name: 'User1' });

    await assert.rejects(() => withTimeout(getUser(1, 300), 100), /逾時/);

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
