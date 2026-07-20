/*
【答案】手寫請求快取（React Query / SWR 的核心機制）

這題把 React Query / SWR「為什麼那麼好用」的核心拆開來手寫一遍。三個關鍵機制：

1) 請求去重（dedupe / in-flight sharing）
   同一個 key 若已有「還沒回來的請求」（in-flight），後來的呼叫不該再發一次，
   而是共用同一個 Promise。作法：用一個 Map<key, Promise> 記錄進行中的請求，
   請求敲定（settle）後用 .finally 把它移除。
   → 對應 SWR 的 dedupingInterval（預設 2000ms 內同 key 只發一次）、
     React Query 同一 queryKey 的多個 useQuery 會自動共用同一個請求。

2) TTL 過期（新鮮 vs. 陳舊）
   每筆快取記 timestamp，讀取時比對 now() - timestamp 是否超過 ttl。
   把 now 做成可注入，測試就能「快轉時間」而不用真的 sleep。
   → 對應 React Query 的 staleTime：staleTime 內視為新鮮、直接回快取不重抓；
     超過才會標記為 stale。SWR 沒有 staleTime，focus/interval 時就會重驗證。
   注意另有 gcTime（React Query v5，舊名 cacheTime，預設 5 分鐘）：
     那是「沒有元件在用這筆資料後，多久把它從記憶體垃圾回收」，
     跟 staleTime（多久算過期）是兩件事，別混淆。

3) stale-while-revalidate（SWR 名字的由來）
   資料過期時，先「立刻回舊值」讓畫面不閃爍，同時「背景重抓」更新快取，
   下次讀取就是新值。使用者體感是「秒開 + 自動更新」。
   → 這正是 SWR / React Query 的預設體驗：先給 cache、背景 revalidate。

其他對照：
- queryKey / key：快取的唯一鍵。物件參數通常序列化成穩定字串當 key。
- invalidateQueries(key)：讓某些 query 失效並觸發重抓；本題的 invalidate 是簡化版
  （直接刪快取，下次讀取必重抓）。
- revalidateOnFocus / refetchOnWindowFocus：分頁重新聚焦時自動重驗證（本題未實作，
  真實庫是掛 window 的 'focus'/'visibilitychange' 事件）。
- mutation 樂觀更新（optimistic update）：送出變更「前」先手動改快取讓 UI 立即反應，
  失敗再 rollback 回舊值（React Query 的 onMutate/onError/onSettled 三段式）。
  本題只做讀取快取，但 invalidate 就是 mutation 成功後常搭配的收尾。

實作重點：
- cache: Map<key, { value, timestamp }> 存已成功的結果。
- inflight: Map<key, Promise> 達成 dedupe，settle 後務必移除。
- 過期判斷：now() - entry.timestamp > ttl。
- SWR 分支：有舊值且過期 → 先 return 舊值、背景 revalidate（不 await，
  且 .catch 吞掉背景錯誤，避免弄壞現有舊值與冒出 unhandled rejection）。
*/

// createCache：回傳 { fetchWithCache, invalidate }
function createCache({ now = Date.now } = {}) {
  const cache = new Map(); // key -> { value, timestamp }
  const inflight = new Map(); // key -> Promise（進行中的請求，用來 dedupe）

  // revalidate：實際發出請求並寫回快取；同 key 進行中則共用同一 Promise
  function revalidate(key, fetcher) {
    if (inflight.has(key)) return inflight.get(key); // dedupe：共用 in-flight

    // 用 Promise.resolve().then 包住 fetcher，確保同步並發呼叫都能先看到 inflight
    const p = Promise.resolve()
      .then(() => fetcher())
      .then((value) => {
        cache.set(key, { value, timestamp: now() }); // 成功才寫入，記錄時間戳
        return value;
      })
      .finally(() => {
        inflight.delete(key); // settle 後移除，讓下次得以重抓
      });

    inflight.set(key, p);
    return p;
  }

  // fetchWithCache：命中回快取、進行中共用、過期重抓、可選 SWR
  async function fetchWithCache(key, fetcher, options = {}) {
    const { ttl = Infinity, staleWhileRevalidate = false } = options;
    const entry = cache.get(key);
    const isFresh = entry && now() - entry.timestamp <= ttl;

    // 1) 新鮮命中：直接回快取，完全不碰 fetcher
    if (isFresh) return entry.value;

    // 2) 有舊值 + 過期 + 開了 SWR：先回舊值，背景重抓
    if (entry && staleWhileRevalidate) {
      revalidate(key, fetcher).catch(() => {}); // 背景失敗不影響舊值
      return entry.value;
    }

    // 3) 沒快取或過期（非 SWR）：等待重抓（此處也享有 dedupe）
    return revalidate(key, fetcher);
  }

  // invalidate：清掉某 key 的快取與進行中記錄，下次呼叫必重抓
  function invalidate(key) {
    cache.delete(key);
    inflight.delete(key);
  }

  return { fetchWithCache, invalidate };
}

// ===== 測試 =====
const assert = require('node:assert');

// 建立一個會計數呼叫次數的 mock async fetcher，每次回傳遞增值
function makeCounterFetcher() {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    await Promise.resolve(); // 微延遲，模擬非同步 I/O
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
  // 等背景重抓完成
  await new Promise((r) => setTimeout(r, 0));
  assert.strictEqual(f3.getCalls(), 2); // 背景已重抓
  const s3 = await cache.fetchWithCache('swr', f3, {
    ttl: 1000,
    staleWhileRevalidate: true,
  });
  assert.strictEqual(s3, 2); // 下次讀取拿到新值

  console.log('✅ 通過');
})();
