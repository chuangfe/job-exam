/*
【答案】錯誤處理 + 自訂錯誤類別

重點：
- async 函式裡 throw 出來的錯誤，外層要用 try/catch 或 .catch() 接，
  否則變成 unhandled rejection。
- 自訂錯誤帶 statusCode 是後端把「業務錯誤」對應到「HTTP 語意」的乾淨做法，
  貫穿整份文件。
*/

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, 100);
  });
}

// 自訂錯誤：帶 HTTP 狀態碼
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = '找不到資源') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

async function findUser(id) {
  const user = await getUser(id).catch(() => null);
  if (!user) throw new NotFoundError(`使用者 ${id} 不存在`);
  return user;
}

module.exports = { AppError, NotFoundError, findUser };

// ---- 示範 + 測試 ----
if (require.main === module) {
  const assert = require('node:assert');

  async function demo() {
    try {
      await findUser(-1);
    } catch (err) {
      // 後端會用 err.statusCode 決定回 404 還是 500
      console.error(`[${err.statusCode}] ${err.name}: ${err.message}`);
      // [404] NotFoundError: 使用者 -1 不存在
    }
  }

  (async () => {
    await demo();

    const user = await findUser(1);
    assert.deepStrictEqual(user, { id: 1, name: 'User1' });

    try {
      await findUser(-1);
      throw new Error('預期應丟出錯誤但沒有');
    } catch (err) {
      assert.strictEqual(err.name, 'NotFoundError');
      assert.strictEqual(err.statusCode, 404);
      assert.ok(err instanceof AppError);
    }

    console.log('✅ 通過');
  })().catch((err) => {
    console.error('❌ 測試未通過：', err.message);
    process.exit(1);
  });
}

// **最後更新**：2026-06-15
