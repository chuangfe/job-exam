/*
【答案】重構「多平台發佈」模組，符合 SOLID 五大原則。

五個原則在本解答的落點：

  S 單一職責：validate / format / send 各自一個方法；
             PublishService 只做調度，不含任何平台邏輯。
  O 開放封閉：新增平台 = 新增一個 publisher + register()，
             PublishService 的程式碼一行都不用改。
  L 里氏替換：所有 publisher 遵守相同約定，呼叫端可用
             platforms().map() 統一處理，無需 if (platform === ...)。
  I 介面隔離：comment 是選配能力。不支援的平台不必實作空方法，
             由 service 在呼叫時明確拒絕。
  D 依賴反轉：PublishService 依賴「有 info() 的 logger」這個抽象，
             而非寫死 console.log；測試時可注入假物件。
*/

function createPublisher(spec) {
  const { name, validate, format, send, comment } = spec ?? {};

  // 守衛：缺少任一必要能力就不讓它進入系統（fail fast）
  if (
    typeof name !== 'string' ||
    typeof validate !== 'function' ||
    typeof format !== 'function' ||
    typeof send !== 'function'
  ) {
    throw new Error('publisher 規格不完整');
  }

  const publisher = { name, validate, format, send };
  // I：只有真的支援留言才掛上 comment，不製造空實作
  if (typeof comment === 'function') publisher.comment = comment;
  return publisher;
}

class PublishService {
  // D：logger 由外部注入；預設是不輸出的 no-op，避免呼叫端被迫傳參數
  constructor({ logger } = {}) {
    this.logger = logger ?? { info() {} };
    this.registry = new Map(); // Map 保留插入順序 → platforms() 順序穩定
  }

  // O：擴充點。新增平台走這裡，不需修改本類別
  register(publisher) {
    this.registry.set(publisher.name, publisher);
    return this; // 支援鏈式呼叫
  }

  #get(name) {
    const publisher = this.registry.get(name);
    if (!publisher) throw new Error(`未註冊平台：${name}`);
    return publisher;
  }

  // S：本方法只負責「依序調度」，驗證與格式化都委派給 publisher
  publish(name, content) {
    const publisher = this.#get(name);
    publisher.validate(content); // 失敗會 throw，後續不執行 → 不會誤記 log
    const payload = publisher.format(content);
    const result = publisher.send(payload);
    this.logger.info(`published:${name}`);
    return result;
  }

  // I：能力檢查放在調度層，讓不支援的平台保持乾淨
  comment(name, postId, text) {
    const publisher = this.#get(name);
    if (typeof publisher.comment !== 'function') {
      throw new Error(`${name} 不支援留言`);
    }
    return publisher.comment(postId, text);
  }

  platforms() {
    return [...this.registry.keys()];
  }
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

const fb = createPublisher({
  name: 'facebook',
  validate: (c) => {
    if (c.length > 500) throw new Error('facebook：內容過長');
  },
  format: (c) => ({ message: c }),
  send: (p) => ({ ok: true, platform: 'facebook', payload: p }),
  comment: (postId, text) => ({ ok: true, postId, text }),
});

const ig = createPublisher({
  name: 'instagram',
  validate: (c) => {
    if (!c.includes('#')) throw new Error('instagram：需包含 hashtag');
  },
  format: (c) => ({ caption: c }),
  send: (p) => ({ ok: true, platform: 'instagram', payload: p }),
});

// 1. S：職責分離
assert.strictEqual(typeof fb.validate, 'function');
assert.strictEqual(typeof fb.format, 'function');
assert.strictEqual(typeof fb.send, 'function');
assert.deepStrictEqual(fb.format('hi'), { message: 'hi' });

// 2. 規格不完整要擋下來
assert.throws(() => createPublisher({ name: 'x' }), /publisher 規格不完整/);

// 3. D：注入 logger
const logs = [];
const fakeLogger = { info: (m) => logs.push(m) };
const service = new PublishService({ logger: fakeLogger });

service.register(fb).register(ig);
assert.deepStrictEqual(service.platforms(), ['facebook', 'instagram']);

// 4. publish 走完 validate → format → send
assert.deepStrictEqual(service.publish('facebook', 'hello'), {
  ok: true,
  platform: 'facebook',
  payload: { message: 'hello' },
});
assert.deepStrictEqual(logs, ['published:facebook']);

assert.throws(() => service.publish('instagram', '沒有標籤'), /需包含 hashtag/);
assert.deepStrictEqual(logs, ['published:facebook']);

assert.throws(() => service.publish('threads', 'hi'), /未註冊平台：threads/);

// 5. I：介面隔離
assert.deepStrictEqual(service.comment('facebook', 'p1', 'nice'), {
  ok: true,
  postId: 'p1',
  text: 'nice',
});
assert.throws(() => service.comment('instagram', 'p1', 'nice'), /instagram 不支援留言/);

// 6. O + L：新增平台不修改 PublishService
const threads = createPublisher({
  name: 'threads',
  validate: () => {},
  format: (c) => ({ text: c }),
  send: (p) => ({ ok: true, platform: 'threads', payload: p }),
});
service.register(threads);

const results = service.platforms().map((name) => {
  try {
    return service.publish(name, '大家好 #hello');
  } catch (e) {
    return { ok: false, platform: name };
  }
});
assert.strictEqual(results.length, 3);
assert.deepStrictEqual(
  results.map((r) => r.platform),
  ['facebook', 'instagram', 'threads']
);
assert.ok(results.every((r) => r.ok === true));

// 7. 未注入 logger 不應報錯
const quiet = new PublishService();
quiet.register(threads);
assert.strictEqual(quiet.publish('threads', 'hi').ok, true);

console.log('✅ 通過');

/*
【延伸：口試怎麼講】

被問「你的程式怎麼設計」時，用你真實做過的事對應原則，不要背定義：

  S 單一職責 → 展昭平面圖：以「功能」而非畫面結構切模組，
                新增攤位、選取、拖移各自獨立。
  O 開放封閉 → 展昭：靠載入不同模組決定系統能力（含唯讀模式），
                不修改既有模組；本題的 register() 是同一個概念。
  L 里氏替換 → 四個社群平台走同一套發佈流程，呼叫端不需判斷平台型別。
  I 介面隔離 → 留言是選配能力，只有支援的平台實作，
                不讓所有平台被迫留一個空方法。
  D 依賴反轉 → Mira 的 Repository pattern 封裝 Firestore；
                Nearyou 的 View → ViewModel → Service → API 分層。

【常見追問】

Q：SOLID 一定要全部遵守嗎？
A：不是。它是取捨的參考而非教條 —— 過度拆分會讓小專案變複雜。
   判準是「這個變更點未來會不會反覆發生」：會，就值得抽象。

Q：JS 沒有 interface，怎麼做 ISP／DIP？
A：靠「約定 + 能力檢查」（本題的 typeof publisher.comment === 'function'），
   或改用 TypeScript 的 interface 在編譯期驗證。
*/
