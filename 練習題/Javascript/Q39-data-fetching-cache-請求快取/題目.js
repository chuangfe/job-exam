/*
【題目】手寫請求快取（React Query / SWR 的核心機制）

說明：
實作 createCache({ now })，其中 now 是可注入的時間函式（預設 Date.now），
方便測試 TTL 而不用真的等待。createCache 回傳一個物件，至少含：

  fetchWithCache(key, fetcher, { ttl, staleWhileRevalidate })
  invalidate(key)

fetchWithCache 需具備以下四個能力：

  1. 快取命中：TTL 內同一 key 直接回傳快取值，不再呼叫 fetcher。
  2. 請求去重（dedupe）：同一 key 的 in-flight 請求並發時只發一次，
     多個呼叫共用同一個 Promise（fetcher 只被呼叫一次）。
  3. 過期重抓：距離上次成功寫入超過 ttl 後，再呼叫會重新 fetch。
  4. stale-while-revalidate（選配旗標）：staleWhileRevalidate 為 true 時，
     過期後先「立即回傳舊值」，同時「背景重抓」更新快取；下次讀取才拿到新值。

invalidate(key) 清掉某個 key 的快取（含 in-flight 記錄），下次呼叫必定重抓。

提示：
- 用一個 Map<key, entry> 存快取，entry 至少含 { value, timestamp }。
- 用另一個 Map<key, Promise> 存 in-flight 的請求，達成 dedupe；
  請求敲定（settle）後記得把它從 in-flight 移除。
- 「是否過期」＝ now() - entry.timestamp > ttl。
- SWR 情境下要小心：背景重抓也要 dedupe，且失敗時別把舊值弄壞。

範例：
  const cache = createCache();
  const data = await cache.fetchWithCache('user:1', fetchUser, { ttl: 5000 });

重點：dedupe 靠「共用同一個 Promise」；TTL 靠「比對 timestamp」；
SWR 靠「先回舊值、背景更新」。這正是 React Query / SWR 的核心。
*/

// createCache：回傳 { fetchWithCache, invalidate }
function createCache({ now = Date.now } = {}) {
  throw new Error('尚未實作 createCache');
}

// ===== 測試 =====
const assert = require('node:assert');

// 建立一個會計數呼叫次數的 mock async fetcher，每次回傳遞增值
function makeCounterFetcher() {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    // 微延遲，模擬非同步 I/O（不依賴真實長時間等待）
    await Promise.resolve();
    return calls; // 回傳遞增值，方便驗證有沒有重抓
  };
  fetcher.getCalls = () => calls;
  return fetcher;
}

(async () => {
  // 用可控制的 clock 注入 now，讓 TTL 測試不用真的等
  let clock = 1000;
  const now = () => clock;
  const cache = createCache({ now });

  // 1) 快取命中：TTL 內第二次呼叫不增加 fetcher 次數
  const f1 = makeCounterFetcher();
  const a1 = await cache.fetchWithCache('k', f1, { ttl: 5000 });
  const a2 = await cache.fetchWithCache('k', f1, { ttl: 5000 });
  assert.strictEqual(a1, 1);
  assert.strictEqual(a2, 1); // 命中快取，仍是舊值
  assert.strictEqual(f1.getCalls(), 1); // fetcher 只被叫一次

  // 2) 請求去重（dedupe）：並發 3 次同 key，fetcher 只被叫一次
  const f2 = makeCounterFetcher();
  const [b1, b2, b3] = await Promise.all([
    cache.fetchWithCache('dedupe', f2, { ttl: 5000 }),
    cache.fetchWithCache('dedupe', f2, { ttl: 5000 }),
    cache.fetchWithCache('dedupe', f2, { ttl: 5000 }),
  ]);
  assert.strictEqual(f2.getCalls(), 1);
  assert.deepStrictEqual([b1, b2, b3], [1, 1, 1]);

  // 3) 過期重抓：把 now 往前推超過 ttl 後會重新 fetch
  clock += 6000; // 超過 ttl 5000
  const a3 = await cache.fetchWithCache('k', f1, { ttl: 5000 });
  assert.strictEqual(f1.getCalls(), 2); // 重抓
  assert.strictEqual(a3, 2); // 拿到新值

  // 4) invalidate 後會重抓
  cache.invalidate('k');
  const a4 = await cache.fetchWithCache('k', f1, { ttl: 5000 });
  assert.strictEqual(f1.getCalls(), 3);
  assert.strictEqual(a4, 3);

  // 5) stale-while-revalidate：過期時先回舊值、背景重抓更新
  const f3 = makeCounterFetcher();
  const s1 = await cache.fetchWithCache('swr', f3, { ttl: 1000 });
  assert.strictEqual(s1, 1);
  clock += 2000; // 讓 swr 過期
  const s2 = await cache.fetchWithCache('swr', f3, {
    ttl: 1000,
    staleWhileRevalidate: true,
  });
  assert.strictEqual(s2, 1); // 先回舊值
  // 等背景重抓完成（清空 microtask/task queue）
  await new Promise((r) => setTimeout(r, 0));
  assert.strictEqual(f3.getCalls(), 2); // 背景已重抓
  const s3 = await cache.fetchWithCache('swr', f3, {
    ttl: 1000,
    staleWhileRevalidate: true,
  });
  assert.strictEqual(s3, 2); // 下次讀取拿到新值

  console.log('✅ 通過');
})();
