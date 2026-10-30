/*
【題目】手寫瀏覽器儲存工具（localStorage 封裝 + TTL）

說明：
實作 createStorage({ backend, namespace, now })，回傳 { set, get, remove, clear }：

  - backend：實作 getItem/setItem/removeItem/key/length 的物件
    （測試時傳入 in-memory mock 模擬 localStorage；預設可用 globalThis.localStorage）。
  - namespace：key 前綴，避免衝突（實際存進 backend 的 key 為 `namespace:key`）。
  - now：可注入的時間函式（預設 Date.now），方便測 TTL。

需求：
  1. set(key, value, { ttl }) — 值用 JSON 序列化，實際存 { value, expireAt }；
     有 ttl（毫秒）就記過期時間 expireAt = now() + ttl；沒有 ttl 則 expireAt = null。
  2. get(key) — 反序列化取回 value；
     - key 不存在 → 回 null。
     - 已過期（now() >= expireAt）→ 回 null，並順手從 backend 刪除。
     - JSON parse 失敗 → 安全回 null，不要 throw。
  3. remove(key) — 刪除單一 key。
  4. clear() — 只清掉「本 namespace」的 key，不動別的 namespace 或無前綴的 key。

提示：
  - key 一律經過 `${namespace}:${key}` 前綴後再存取 backend。
  - clear 要遍歷 backend（用 length + key(i)）找出前綴符合的 key 再刪；
    刪除會改變 length/索引，建議先收集要刪的 key 再一次刪。

範例：
  const s = createStorage({ backend: mock, namespace: 'app', now: () => 1000 });
  s.set('token', 'abc', { ttl: 5000 });
  s.get('token'); // 'abc'
*/

// createStorage：回傳封裝後的儲存工具
function createStorage({ backend, namespace = "app", now = Date.now } = {}) {
  throw new Error("尚未實作");
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
