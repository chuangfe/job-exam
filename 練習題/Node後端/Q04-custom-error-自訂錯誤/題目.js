/*
【題目】錯誤處理 + 自訂錯誤類別

用 try/catch 捕捉非同步錯誤，並設計可攜帶「狀態碼」的自訂錯誤
（後端關鍵技巧，Express 章節會用到）。

提示：繼承 Error，加上 statusCode 屬性，讓上層能直接決定 HTTP 回應。
*/

// 查使用者（沿用前面）— 不要改它
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id 不合法'));
      resolve({ id, name: `User${id}` });
    }, 100);
  });
}

// TODO: 自訂錯誤 AppError —— 繼承 Error，建構子收 (message, statusCode = 500)，
//       設定 this.name = 'AppError' 與 this.statusCode
class AppError extends Error {
  // TODO
}

// TODO: NotFoundError —— 繼承 AppError，預設 message = '找不到資源'、
//       statusCode = 404、this.name = 'NotFoundError'
class NotFoundError extends AppError {
  // TODO
}

// TODO: findUser —— 查不到使用者時 throw NotFoundError(`使用者 ${id} 不存在`)
async function findUser(id) {
  // TODO
}

module.exports = { AppError, NotFoundError, findUser };

// ---- 測試（執行驗證）----
if (require.main === module) {
  const assert = require('node:assert');

  (async () => {
    // 成功路徑
    const user = await findUser(1);
    assert.deepStrictEqual(user, { id: 1, name: 'User1' });

    // 失敗路徑：應丟出帶 statusCode 404 的 NotFoundError
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
