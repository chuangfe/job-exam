/*
【答案】手寫瀏覽器儲存工具（localStorage 封裝 + TTL）

────────────────────────────────────────────────────────
一、四種瀏覽器儲存方式對照
────────────────────────────────────────────────────────

                Cookie          localStorage     sessionStorage   IndexedDB
容量           ~4KB/個          ~5MB             ~5MB             大（數十MB~上G）
生命週期       可設 Expires/     永久（需手動      分頁關閉即清       永久（需手動刪）
               Max-Age，或      清除）           （同分頁重整保留）
               隨 session 消失
同步/非同步     —               同步（會阻塞）    同步（會阻塞）     非同步（callback/
                                                                  Promise，不阻塞）
隨 HTTP 送出   會（每次請求自    不會             不會             不會
               動帶上，增流量）
可跨分頁       同源分頁共享      同源分頁共享      不可（每分頁獨立） 同源分頁共享
存的型別       字串             只能字串         只能字串         結構化資料（物件、
                                                                  Blob、File…）
主要用途       身份驗證          偏好設定、快取     單次流程暫存      大量結構化資料、
               （session id）   非敏感資料       （表單草稿）      離線應用

────────────────────────────────────────────────────────
二、安全性重點（Cookie）
────────────────────────────────────────────────────────
  - HttpOnly：JS 讀不到（document.cookie 拿不到），可擋 XSS 竊取 token。
  - Secure：只在 HTTPS 下送出。
  - SameSite：Strict / Lax / None，控制跨站請求是否帶 cookie，可防 CSRF。
    （None 必須搭配 Secure。）
  → 存 session/token 首選 HttpOnly + Secure + SameSite 的 Cookie，
    而不是 localStorage（localStorage 任何 JS 都讀得到，XSS 一中就外洩）。

────────────────────────────────────────────────────────
三、localStorage 常見陷阱
────────────────────────────────────────────────────────
  1. 同步 API：讀寫會阻塞主執行緒，大量或頻繁存取會卡 UI；別在捲動/動畫熱路徑用。
  2. 只能存字串：物件/陣列要自己 JSON.stringify / JSON.parse。
  3. ~5MB 上限：超過會丟 QuotaExceededError，寫入要用 try/catch。
  4. 沒有內建 TTL：需要過期就得自己記 expireAt（本題重點）。
  5. SSR（Next.js 等）下 window/localStorage 不存在：
     直接存取會報 ReferenceError，要 typeof window !== 'undefined' 判斷，
     或只在 useEffect / client 端使用。
  6. 存的都是明文，別放敏感資料。

────────────────────────────────────────────────────────
四、選型速記
────────────────────────────────────────────────────────
  - 身份驗證 token → HttpOnly Cookie。
  - 使用者偏好、非敏感快取（可持久） → localStorage。
  - 單次流程/單分頁暫存（如多步表單） → sessionStorage。
  - 大量結構化資料、離線 App、檔案 → IndexedDB。

────────────────────────────────────────────────────────
五、實作重點
────────────────────────────────────────────────────────
  - 所有 key 統一經 `${namespace}:${key}` 前綴，避免同源多 App 撞 key。
  - 存 { value, expireAt }，get 時比對 now() 判斷過期，過期順手刪除（惰性清除）。
  - JSON.parse 用 try/catch 包起來，壞資料回 null 不 throw。
  - clear 遍歷 backend（length + key(i)）挑出符合前綴的 key，
    先收集再刪（邊刪邊遍歷會因 length 改變而漏刪）。
*/

// createStorage：回傳封裝後的儲存工具
function createStorage({
  backend = globalThis.localStorage,
  namespace = "app",
  now = Date.now,
} = {}) {
  const prefix = `${namespace}:`;
  const buildKey = (key) => prefix + key;

  function set(key, value, { ttl } = {}) {
    const expireAt = typeof ttl === "number" ? now() + ttl : null;
    const payload = JSON.stringify({ value, expireAt });
    backend.setItem(buildKey(key), payload);
  }

  function get(key) {
    const raw = backend.getItem(buildKey(key));
    if (raw == null) return null;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return null; // 壞掉的 JSON，安全回 null
    }

    if (parsed == null || typeof parsed !== "object") return null;

    const { value, expireAt } = parsed;
    if (expireAt != null && now() >= expireAt) {
      backend.removeItem(buildKey(key)); // 惰性清除過期資料
      return null;
    }
    return value;
  }

  function remove(key) {
    backend.removeItem(buildKey(key));
  }

  function clear() {
    // 先收集符合前綴的 key，再一次刪（避免邊刪邊遍歷漏刪）
    const toRemove = [];
    for (let i = 0; i < backend.length; i++) {
      const k = backend.key(i);
      if (k != null && k.startsWith(prefix)) toRemove.push(k);
    }
    toRemove.forEach((k) => backend.removeItem(k));
  }

  return { set, get, remove, clear };
}

// ===== 測試 =====
const assert = require("node:assert");

// in-memory mock，模擬 localStorage 介面
function createMockBackend() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    key: (i) => Array.from(map.keys())[i] ?? null,
    get length() {
      return map.size;
    },
    _dump: () => map, // 測試輔助
  };
}

(function () {
  // 1) set / get 拿得回原值（物件、陣列、數字）
  const b1 = createMockBackend();
  const s1 = createStorage({ backend: b1, namespace: "app" });
  s1.set("num", 42);
  s1.set("obj", { a: 1, b: [2, 3] });
  s1.set("arr", [1, 2, 3]);
  assert.strictEqual(s1.get("num"), 42);
  assert.deepStrictEqual(s1.get("obj"), { a: 1, b: [2, 3] });
  assert.deepStrictEqual(s1.get("arr"), [1, 2, 3]);

  // 2) TTL：注入 now 控制時間
  let t = 1000;
  const b2 = createMockBackend();
  const s2 = createStorage({ backend: b2, namespace: "app", now: () => t });
  s2.set("token", "abc", { ttl: 5000 }); // expireAt = 6000
  t = 5999;
  assert.strictEqual(s2.get("token"), "abc"); // 未過期
  t = 6000;
  assert.strictEqual(s2.get("token"), null); // 過期回 null
  assert.strictEqual(b2.getItem("app:token"), null); // 且已刪除

  // 3) 不存在的 key → null
  const b3 = createMockBackend();
  const s3 = createStorage({ backend: b3, namespace: "app" });
  assert.strictEqual(s3.get("nope"), null);

  // 4) 壞掉的 JSON → null 且不 throw
  const b4 = createMockBackend();
  b4.setItem("app:broken", "{ not valid json");
  const s4 = createStorage({ backend: b4, namespace: "app" });
  assert.strictEqual(s4.get("broken"), null);

  // 5) remove
  const b5 = createMockBackend();
  const s5 = createStorage({ backend: b5, namespace: "app" });
  s5.set("k", "v");
  s5.remove("k");
  assert.strictEqual(s5.get("k"), null);

  // 6) clear 只清本 namespace
  const shared = createMockBackend();
  const sA = createStorage({ backend: shared, namespace: "app" });
  const sB = createStorage({ backend: shared, namespace: "other" });
  sA.set("x", 1);
  sA.set("y", 2);
  sB.set("x", 99);
  shared.setItem("raw", "keepme"); // 無前綴，不該被動
  sA.clear();
  assert.strictEqual(sA.get("x"), null);
  assert.strictEqual(sA.get("y"), null);
  assert.strictEqual(sB.get("x"), 99); // other namespace 不受影響
  assert.strictEqual(shared.getItem("raw"), "keepme"); // 無前綴不受影響

  console.log("✅ 通過");
})();
