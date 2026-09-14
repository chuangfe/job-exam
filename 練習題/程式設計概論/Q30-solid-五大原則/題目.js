/*
【題目】重構「多平台發佈」模組，使其符合 SOLID 五大原則。

情境：系統要把一則貼文發佈到多個社群平台。原始寫法如下（違反 SOLID）：

  class Publisher {
    publish(platform, content) {
      if (platform === 'facebook') {
        if (content.length > 500) throw new Error('too long');
        const payload = { message: content };
        console.log('send to fb', payload);
      } else if (platform === 'instagram') {
        if (!content.includes('#')) throw new Error('need hashtag');
        const payload = { caption: content };
        console.log('send to ig', payload);
      }
      // 每新增一個平台，就要回來改這個函式 → 違反 OCP
      // 驗證、格式化、發送、記錄全擠在一起 → 違反 SRP
      // 呼叫端要知道平台字串 → 難以替換、難以測試
    }
  }

需求：請實作 createPublisher() 與 PublishService，滿足下列五原則。

  ── S：單一職責（Single Responsibility）────────────────────
  每個平台發佈器是一個物件，職責分離為三個方法：
    validate(content) → 不合規則就 throw Error
    format(content)   → 回傳該平台要的 payload 物件
    send(payload)     → 回傳 { ok: true, platform, payload }
  PublishService 只負責「調度」，不負責驗證或格式化。

  ── O：開放封閉（Open/Closed）──────────────────────────────
  PublishService 提供 register(publisher) 註冊平台。
  新增平台只需新增一個 publisher 並註冊，**不得修改 PublishService**。

  ── L：里氏替換（Liskov Substitution）──────────────────────
  所有 publisher 都遵守相同約定（name / validate / format / send），
  呼叫端可用同一段程式處理任何 publisher，不需 if 判斷平台。

  ── I：介面隔離（Interface Segregation）────────────────────
  「留言」能力是選配 —— 只有支援的平台才實作 comment(postId, text)。
  對不支援的平台呼叫 service.comment() 必須拋出
  Error(`${platform} 不支援留言`)，而不是讓所有平台都被迫實作空方法。

  ── D：依賴反轉（Dependency Inversion）────────────────────
  PublishService 不自己 console.log，而是接受注入的 logger：
    new PublishService({ logger })
  logger 需具備 info(msg) 方法。發佈成功後呼叫
    logger.info(`published:${platform}`)
  未注入 logger 時，預設使用 { info(){} }（不輸出）。

API 規格：
  createPublisher(spec)
    - spec: { name, validate, format, send, comment? }
    - 回傳 publisher 物件；缺少 name/validate/format/send 任一者要
      throw Error('publisher 規格不完整')

  PublishService
    - constructor({ logger } = {})
    - register(publisher)      → 回傳 this（可鏈式呼叫）
    - publish(name, content)   → 依序 validate → format → send，
                                 成功後呼叫 logger.info，回傳 send() 的結果
                                 平台未註冊 → throw Error(`未註冊平台：${name}`)
    - comment(name, postId, text) → 平台無 comment 能力則
                                 throw Error(`${name} 不支援留言`)
    - platforms()              → 回傳已註冊平台名稱陣列（註冊順序）

請完成下面兩個 TODO。
*/

// TODO: 實作 createPublisher
function createPublisher(spec) {
  // 提示：檢查 name/validate/format/send 是否齊全，再回傳整理好的物件
}

// TODO: 實作 PublishService
class PublishService {
  constructor({ logger } = {}) {
    // 提示：logger 預設為 { info() {} }；用 Map 保存已註冊的 publisher
  }

  register(publisher) {}

  publish(name, content) {}

  comment(name, postId, text) {}

  platforms() {}
}

// ───────────────────────── 測試 ─────────────────────────
const assert = require('node:assert');

// 測試用的三個平台（模擬 FB / IG / Threads）
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
  // 刻意不提供 comment → 測試 ISP
});

// 1. S：職責分離 —— publisher 三個方法各自獨立
assert.strictEqual(typeof fb.validate, 'function');
assert.strictEqual(typeof fb.format, 'function');
assert.strictEqual(typeof fb.send, 'function');
assert.deepStrictEqual(fb.format('hi'), { message: 'hi' });

// 2. 規格不完整要擋下來
assert.throws(() => createPublisher({ name: 'x' }), /publisher 規格不完整/);

// 3. D：注入 logger，PublishService 不自己輸出
const logs = [];
const fakeLogger = { info: (m) => logs.push(m) };
const service = new PublishService({ logger: fakeLogger });

// register 可鏈式呼叫
service.register(fb).register(ig);
assert.deepStrictEqual(service.platforms(), ['facebook', 'instagram']);

// 4. publish 走完 validate → format → send
assert.deepStrictEqual(service.publish('facebook', 'hello'), {
  ok: true,
  platform: 'facebook',
  payload: { message: 'hello' },
});
assert.deepStrictEqual(logs, ['published:facebook']);

// 驗證失敗要拋錯，且不應產生 log
assert.throws(() => service.publish('instagram', '沒有標籤'), /需包含 hashtag/);
assert.deepStrictEqual(logs, ['published:facebook']);

// 未註冊平台
assert.throws(() => service.publish('threads', 'hi'), /未註冊平台：threads/);

// 5. I：介面隔離 —— 只有 fb 支援留言
assert.deepStrictEqual(service.comment('facebook', 'p1', 'nice'), {
  ok: true,
  postId: 'p1',
  text: 'nice',
});
assert.throws(() => service.comment('instagram', 'p1', 'nice'), /instagram 不支援留言/);

// 6. O + L：新增平台不修改 PublishService，且呼叫端不需 if 判斷
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

// 7. 未注入 logger 時不應報錯
const quiet = new PublishService();
quiet.register(threads);
assert.strictEqual(quiet.publish('threads', 'hi').ok, true);

console.log('✅ 通過');
