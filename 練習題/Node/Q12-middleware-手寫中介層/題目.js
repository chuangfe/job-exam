/*
【題目】手寫 middleware 鏈 —— Express 的 next() 到底在做什麼

這是 Express 最常被問、也最常被誤解的機制。手寫一次就永遠不會忘。

需求：實作 createApp()，支援

  app.use(fn)          註冊 middleware，回傳 app（可鏈式）
  app.onError(fn)      註冊錯誤處理器（只能一個，後蓋前）
  await app.run(ctx)   依註冊順序執行，回傳最終的 ctx

  middleware 簽章：async (ctx, next) => { ... }
    - 呼叫 await next() → 交棒給下一個
    - 不呼叫 next()     → 鏈中斷，後面的都不執行（短路）
    - next() 之後還能繼續寫 → 那段會在「後面全部跑完」才執行（洋蔥模型）

  錯誤處理：
    - 任一 middleware 拋錯 → 立即跳到 onError(err, ctx)，中斷剩餘 middleware
    - onError 的回傳值忽略；它負責改 ctx
    - 沒註冊 onError 就讓錯誤往外拋（呼叫端自己 try/catch）

  防呆：
    - 同一個 middleware 內重複呼叫 next() → 拋 Error('next() 重複呼叫')

【洋蔥模型是什麼】

  app.use(async (ctx, next) => { ctx.log.push('A 前'); await next(); ctx.log.push('A 後'); })
  app.use(async (ctx, next) => { ctx.log.push('B 前'); await next(); ctx.log.push('B 後'); })
  app.use(async (ctx)       => { ctx.log.push('C');                                        })

  執行順序：A 前 → B 前 → C → B 後 → A 後

  這就是為什麼「計時 middleware」能量到整段請求的耗時 ——
  它在 next() 前記開始時間，在 next() 後算差值。

【為什麼值得手寫】
  口試問「middleware 的執行順序」「next() 不呼叫會怎樣」「錯誤怎麼往上傳」，
  手寫過的人講機制，沒寫過的人只能講「就 app.use 這樣加」。
*/

// TODO: 實作 createApp
function createApp() {
  // 提示：用遞迴（或索引遞增）串起 middleware
  //   const dispatch = async (i) => {
  //     if (i >= list.length) return;
  //     ...呼叫 list[i](ctx, () => dispatch(i + 1))
  //   }
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

(async () => {
  // 1. 依序執行 + 洋蔥模型
  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.log.push('A 前');
        await next();
        ctx.log.push('A 後');
      })
      .use(async (ctx, next) => {
        ctx.log.push('B 前');
        await next();
        ctx.log.push('B 後');
      })
      .use(async (ctx) => {
        ctx.log.push('C');
      });

    const ctx = await app.run({ log: [] });
    assert.deepStrictEqual(ctx.log, ['A 前', 'B 前', 'C', 'B 後', 'A 後']);
  }

  // 2. 不呼叫 next() → 短路，後面不執行
  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.log.push('第一個');
        await next();
      })
      .use(async (ctx) => {
        ctx.log.push('第二個（不呼叫 next）');
        // 刻意不呼叫 next
      })
      .use(async (ctx) => {
        ctx.log.push('第三個（不該出現）');
      });

    const ctx = await app.run({ log: [] });
    assert.deepStrictEqual(ctx.log, ['第一個', '第二個（不呼叫 next）']);
  }

  // 3. 錯誤 → 跳到 onError，剩餘 middleware 不執行
  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.log.push('進入');
        await next();
        ctx.log.push('這行不該執行'); // 因為 next() 內部拋錯
      })
      .use(async () => {
        throw new Error('壞掉了');
      })
      .use(async (ctx) => {
        ctx.log.push('不該出現');
      })
      .onError((err, ctx) => {
        ctx.log.push('已處理:' + err.message);
      });

    const ctx = await app.run({ log: [] });
    assert.deepStrictEqual(ctx.log, ['進入', '已處理:壞掉了']);
  }

  // 4. 沒有 onError → 錯誤往外拋
  {
    const app = createApp().use(async () => {
      throw new Error('沒人處理');
    });
    await assert.rejects(() => app.run({ log: [] }), /沒人處理/);
  }

  // 5. 重複呼叫 next() → 拋錯
  {
    const app = createApp()
      .use(async (ctx, next) => {
        await next();
        await next(); // 第二次
      })
      .use(async (ctx) => {
        ctx.log.push('X');
      });
    await assert.rejects(() => app.run({ log: [] }), /next\(\) 重複呼叫/);
  }

  // 6. 實際用途：計時 middleware（洋蔥模型的價值）
  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.started = true;
        await next();
        ctx.finished = true; // next() 之後 → 整段跑完才設定
      })
      .use(async (ctx) => {
        assert.strictEqual(ctx.started, true, '外層應已先執行');
        assert.strictEqual(ctx.finished, undefined, '外層的收尾還不該執行');
        ctx.log.push('內層');
      });

    const ctx = await app.run({ log: [] });
    assert.strictEqual(ctx.finished, true);
    assert.deepStrictEqual(ctx.log, ['內層']);
  }

  // 7. onError 後蓋前（只保留最後註冊的）
  {
    const app = createApp()
      .use(async () => {
        throw new Error('boom');
      })
      .onError((err, ctx) => ctx.log.push('舊的'))
      .onError((err, ctx) => ctx.log.push('新的'));

    const ctx = await app.run({ log: [] });
    assert.deepStrictEqual(ctx.log, ['新的']);
  }

  // 8. 空鏈也要能跑
  {
    const ctx = await createApp().run({ log: [] });
    assert.deepStrictEqual(ctx.log, []);
  }

  console.log('✅ 通過');
})();
