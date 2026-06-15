/*
【答案】用 async/await 串接多個非同步步驟

重點：兩個 await 是「依序」執行（第二個依賴第一個的結果，合理）。
但若兩件事「互不相依」，依序 await 會浪費時間 → 看 Q03。
*/

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, 100);
  });
}

function getOrders(userId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 'A1', userId }, { id: 'A2', userId }]), 80)
  );
}

async function getUserWithOrders(id) {
  const user = await getUser(id); // 等使用者
  const orders = await getOrders(user.id); // 再等訂單
  return { ...user, orders };
}

module.exports = { getUser, getOrders, getUserWithOrders };

// ---- 示範 + 測試 ----
if (require.main === module) {
  const assert = require('node:assert');

  getUserWithOrders(1).then((r) => console.log(r));
  // { id: 1, name: 'User1', orders: [ {id:'A1'...}, {id:'A2'...} ] }

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
