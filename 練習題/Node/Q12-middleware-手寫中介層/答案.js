/*
【答案】手寫 middleware 鏈

核心只有一個遞迴函式，但它解釋了 Express／Koa 的全部行為：

  const dispatch = async (i) => {
    if (i >= list.length) return;
    await list[i](ctx, () => dispatch(i + 1));
  };

  為什麼這樣就會有洋蔥模型？
    因為 next() 就是「dispatch(i+1)」這個 Promise。
    middleware 內 await next() → 等後面全部跑完才繼續往下寫的那幾行。
    所以 next() 之前的程式碼是「進入時」執行，之後的是「離開時」執行。

  為什麼不呼叫 next() 就會短路？
    因為沒有人去呼叫 dispatch(i+1)，後面的 middleware 根本沒被觸發。
    這不是框架幫你判斷，而是「你沒接續，鏈就斷了」。

  錯誤為什麼會往上冒？
    因為每一層都是 await，內層 reject 會讓外層的 await next() 拋錯，
    一路傳到最外面的 try/catch。這也是為什麼「同步 throw 抓得到、
    但沒 await 的非同步錯誤抓不到」—— 少了 await，錯誤就脫離這條鏈了。
*/

function createApp() {
  const list = [];
  let errorHandler = null;

  const app = {
    use(fn) {
      list.push(fn);
      return app;
    },

    onError(fn) {
      errorHandler = fn; // 後蓋前
      return app;
    },

    async run(ctx) {
      const dispatch = async (i) => {
        if (i >= list.length) return;

        let called = false; // 防呆：同一層只能呼叫一次 next()
        const next = () => {
          if (called) throw new Error('next() 重複呼叫');
          called = true;
          return dispatch(i + 1);
        };

        await list[i](ctx, next);
      };

      try {
        await dispatch(0);
      } catch (err) {
        if (!errorHandler) throw err; // 沒人處理就往外拋
        await errorHandler(err, ctx);
      }
      return ctx;
    },
  };

  return app;
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

(async () => {
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

  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.log.push('第一個');
        await next();
      })
      .use(async (ctx) => {
        ctx.log.push('第二個（不呼叫 next）');
      })
      .use(async (ctx) => {
        ctx.log.push('第三個（不該出現）');
      });

    const ctx = await app.run({ log: [] });
    assert.deepStrictEqual(ctx.log, ['第一個', '第二個（不呼叫 next）']);
  }

  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.log.push('進入');
        await next();
        ctx.log.push('這行不該執行');
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

  {
    const app = createApp().use(async () => {
      throw new Error('沒人處理');
    });
    await assert.rejects(() => app.run({ log: [] }), /沒人處理/);
  }

  {
    const app = createApp()
      .use(async (ctx, next) => {
        await next();
        await next();
      })
      .use(async (ctx) => {
        ctx.log.push('X');
      });
    await assert.rejects(() => app.run({ log: [] }), /next\(\) 重複呼叫/);
  }

  {
    const app = createApp()
      .use(async (ctx, next) => {
        ctx.started = true;
        await next();
        ctx.finished = true;
      })
      .use(async (ctx) => {
        assert.strictEqual(ctx.started, true);
        assert.strictEqual(ctx.finished, undefined);
        ctx.log.push('內層');
      });

    const ctx = await app.run({ log: [] });
    assert.strictEqual(ctx.finished, true);
    assert.deepStrictEqual(ctx.log, ['內層']);
  }

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

  {
    const ctx = await createApp().run({ log: [] });
    assert.deepStrictEqual(ctx.log, []);
  }

  console.log('✅ 通過');
})();

/*
【真實 middleware 長什麼樣】

  計時（洋蔥模型的典型用途）
    app.use(async (ctx, next) => {
      const t0 = Date.now();
      await next();
      ctx.durationMs = Date.now() - t0;   // next() 之後 → 量到整段耗時
    });

  驗證（短路的典型用途）
    app.use(async (ctx, next) => {
      if (!ctx.token) { ctx.status = 401; return; }  // 不呼叫 next → 直接結束
      await next();
    });

  這兩個就是「為什麼要有洋蔥模型」與「為什麼短路是功能不是 bug」的答案。

【口試考點】

  Q：Express 的 next() 在做什麼？
  A：它就是「呼叫下一個 middleware」的函式。不呼叫就短路；
     await 它就能在後續全部完成後繼續執行自己剩下的程式碼（洋蔥模型）。

  Q：middleware 裡的非同步錯誤為什麼有時候抓不到？
  A：少了 await。錯誤要沿著 await 鏈才傳得回外層 try/catch；
     忘記 await 的 Promise 會變成 unhandled rejection，跳出這條鏈。
     （Express 4 對 async handler 的錯誤不自動捕捉，就是這個原因。）

  Q：middleware 和 router 差在哪？
  A：middleware 是「每個請求都可能經過的處理鏈」，關心的是橫切關注點
     （驗證、記錄、解析）；router 是「依方法與路徑挑出唯一處理器」，
     關心的是分派。實務上 router 本身也常被實作成一個 middleware。
*/
