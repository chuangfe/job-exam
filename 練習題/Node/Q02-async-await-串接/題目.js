/*
【題目】用 async/await 串接多個非同步步驟

依序查使用者 → 再查他的訂單，用 async/await 寫出可讀的流程。

提示：await 只能用在 async 函式內；它會「暫停」直到 Promise 完成，
      再把結果回傳。
*/

// 查使用者（沿用 Q01）— 不要改它
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, 100);
  });
}

// 查訂單 — 不要改它
function getOrders(userId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 'A1', userId }, { id: 'A2', userId }]), 80)
  );
}

// TODO: 用 async/await 先查 user，再用 user.id 查 orders，
//       回傳 { ...user, orders }
async function getUserWithOrders(id) {
  // TODO
}

module.exports = { getUser, getOrders, getUserWithOrders };

// ---- 測試（執行驗證）----
if (require.main === module) {
  const assert = require('node:assert');

  (async () => {
    const result = await getUserWithOrders(1);
    assert.deepStrictEqual(result, {
      id: 1,
      name: 'User1',
      orders: [{ id: 'A1', userId: 1 }, { id: 'A2', userId: 1 }],
    });

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
