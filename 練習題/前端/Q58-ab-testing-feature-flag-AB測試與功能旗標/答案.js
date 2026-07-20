/*
 * 【答案】手寫 A/B 測試分流 + Feature Flag（實驗框架核心）
 *
 * ── 重點觀念 ─────────────────────────────
 *
 * ▮ 為何用 hash 而非亂數（Math.random）分流？
 *   亂數每次呼叫都不同，會造成：
 *     (1) 使用者體驗閃爍：這次分到 A、重整後分到 B。
 *     (2) 數據污染：同一人被算進兩組，無法正確歸因。
 *   確定性 hash：hash(userId + ':' + experimentKey) 對同輸入永遠同輸出，
 *   所以「同人同實驗」永遠同組，且無需在後端儲存分組結果（stateless、可水平擴展）。
 *   把 experimentKey 混進 hash 也讓「不同實驗互相獨立」，避免同一批人總被分到同一側。
 *
 * ▮ SRM（Sample Ratio Mismatch，樣本比例失衡）
 *   若設計 50/50，實際觀察到 A/B 樣本數明顯偏離（如 52/48 在大樣本下），
 *   代表分流管線有 bug（重導向掉人、bot 過濾不均、hash 偏斜、埋點漏送）。
 *   SRM 是實驗「可信度」的守門員——一旦失衡，結論一律作廢，先修管線。
 *   常用卡方檢定（chi-square）檢查觀察比例 vs 期望比例。
 *
 * ▮ 統計顯著性 / 最小樣本數
 *   不能看到「A 轉換率比 B 高」就下結論——差異可能只是抽樣雜訊。
 *   要看 p-value（是否顯著，常用 α=0.05）與信賴區間，並事先用 power analysis
 *   估「最小樣本數」：偵測越小的效果（MDE, 最小可偵測效果）、要求越高的檢定力，
 *   需要的樣本越多。太早看結果、看到贏就停（peeking）會大幅膨脹偽陽性。
 *
 * ▮ Feature Flag 生命週期與技術債
 *   flag 分幾類：release（漸進發布）、experiment（A/B）、ops（緊急開關 kill-switch）、
 *   permission（權限/付費牆）。release/experiment 是「短命」的——實驗結束、
 *   功能全量後要「清 flag」，否則程式碼裡到處是 if(flag) 分支，累積成技術債，
 *   且死掉的 flag 可能被誤觸發。成熟團隊會替 flag 設到期日與清理流程。
 *
 * ▮ 對照業界工具
 *   - LaunchDarkly：企業級 feature management，強在權限、審計、即時開關、SDK 生態。
 *   - GrowthBook：開源，內建實驗分析與 SQL 資料源，適合自架。
 *   - Optimizely：老牌 A/B 測試 / 實驗平台，偏行銷與網站實驗。
 *   它們核心的分流邏輯，本質上就是本題這種「確定性 hash 分桶」。
 *
 * ▮ 與伺服器端渲染（SSR）分流、避免閃爍（flicker / FOOC）
 *   純前端分流的經典問題：頁面先渲染預設版，JS 載入後才換成實驗版，
 *   使用者會看到「閃一下」（Flash of Original Content）。
 *   解法：把分流「往上游移」——在 SSR / edge（如 CDN worker）就用 userId（或
 *   從 cookie 讀到的穩定 id）算好變體，直接吐正確版本的 HTML，避免客戶端閃爍。
 *   因為分流是確定性的，前後端用同一套 hash 演算法就能得到一致結果。
 */

'use strict';

// FNV-1a 32-bit：簡單、快速、分佈良好的確定性字串 hash。
// Math.imul 做 32-bit 整數乘法（避免 JS number 超過 2^53 後失真）；>>> 0 轉無號。
function fnv1a(str) {
  let h = 0x811c9dc5; // offset basis (2166136261)
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime (16777619)
  }
  return h >>> 0;
}

// 把任意字串 hash 成 [0, 100) 的分數（確定性）。
function scoreOf(key) {
  return (fnv1a(key) / 4294967296) * 100; // 4294967296 = 2^32
}

// 把 buckets 正規化成 [{ name, weight }]（純陣列 → 等權重）。
function normalizeBuckets(buckets) {
  if (!Array.isArray(buckets) || buckets.length === 0) {
    throw new Error('buckets 必須是非空陣列');
  }
  return buckets.map((b) =>
    typeof b === 'string' ? { name: b, weight: 1 } : { name: b.name, weight: b.weight }
  );
}

function bucketUser(userId, experimentKey, buckets) {
  const list = normalizeBuckets(buckets);
  const total = list.reduce((s, b) => s + b.weight, 0);
  if (total <= 0) throw new Error('權重總和必須大於 0');

  // 分數落在 [0, total) 區間，依累積權重找落點。
  const point = (scoreOf(userId + ':' + experimentKey) / 100) * total;
  let acc = 0;
  for (const b of list) {
    acc += b.weight;
    if (point < acc) return b.name;
  }
  return list[list.length - 1].name; // 浮點邊界防護
}

function isEnabled(userId, flag) {
  const { key, rollout, allowlist } = flag;
  if (allowlist && allowlist.includes(userId)) return true; // 指定名單直接開
  if (rollout <= 0) return false; // 全關
  if (rollout >= 100) return true; // 全開
  // 把 flag.key 混進 hash，讓不同 flag 的分界線彼此獨立。
  return scoreOf(userId + ':' + key) < rollout;
}

function createExperiment(config) {
  const { key, buckets } = config;
  return {
    key,
    buckets,
    getVariant(userId) {
      return bucketUser(userId, key, buckets);
    },
  };
}

// ───────────────────────── 測試（node:assert，確定性）─────────────────────────
const assert = require('node:assert');

function makeUsers(n) {
  const users = [];
  for (let i = 0; i < n; i++) users.push('user-' + i);
  return users;
}

// 1) 一致性：同 userId + 同 experiment 多次呼叫結果一致
(function testConsistency() {
  const first = bucketUser('u123', 'exp_checkout', ['A', 'B']);
  for (let i = 0; i < 50; i++) {
    assert.strictEqual(
      bucketUser('u123', 'exp_checkout', ['A', 'B']),
      first,
      '同一使用者對同一實驗應永遠分到同一組'
    );
  }
})();

// 2) 分佈大致均勻（1000 使用者，50/50，容許誤差 ±6%）
(function testDistribution5050() {
  const users = makeUsers(1000);
  let a = 0, b = 0;
  for (const u of users) {
    const v = bucketUser(u, 'exp_dist', ['A', 'B']);
    if (v === 'A') a++; else if (v === 'B') b++; else assert.fail('未預期的變體：' + v);
  }
  assert.ok(Math.abs(a / users.length - 0.5) < 0.06, `A 比例應接近 50%，實際 ${(a / 10).toFixed(1)}%`);
  assert.ok(Math.abs(b / users.length - 0.5) < 0.06, `B 比例應接近 50%，實際 ${(b / 10).toFixed(1)}%`);
})();

// 3) 帶權重分流（70/30，容許誤差 ±6%）
(function testWeighted() {
  const users = makeUsers(1000);
  const buckets = [{ name: 'A', weight: 70 }, { name: 'B', weight: 30 }];
  let a = 0;
  for (const u of users) if (bucketUser(u, 'exp_weight', buckets) === 'A') a++;
  assert.ok(Math.abs(a / users.length - 0.7) < 0.06, `A 比例應接近 70%，實際 ${(a / 10).toFixed(1)}%`);
})();

// 4) rollout 0% 全 false、100% 全 true、50% 大約一半
(function testRollout() {
  const users = makeUsers(1000);
  for (const u of users) {
    assert.strictEqual(isEnabled(u, { key: 'f_off', rollout: 0 }), false, 'rollout 0 應全關');
    assert.strictEqual(isEnabled(u, { key: 'f_on', rollout: 100 }), true, 'rollout 100 應全開');
  }
  let on = 0;
  for (const u of users) if (isEnabled(u, { key: 'f_half', rollout: 50 })) on++;
  assert.ok(Math.abs(on / users.length - 0.5) < 0.06, `rollout 50 應約一半，實際 ${(on / 10).toFixed(1)}%`);
})();

// 5) allowlist 使用者無論比例都啟用
(function testAllowlist() {
  const flag = { key: 'f_allow', rollout: 0, allowlist: ['vip-1', 'vip-2'] };
  assert.strictEqual(isEnabled('vip-1', flag), true, 'allowlist 使用者應啟用（即使 rollout 0）');
  assert.strictEqual(isEnabled('vip-2', flag), true, 'allowlist 使用者應啟用');
  assert.strictEqual(isEnabled('nobody', flag), false, '非 allowlist 且 rollout 0 應關閉');
})();

// 6) createExperiment 封裝與 bucketUser 一致
(function testCreateExperiment() {
  const exp = createExperiment({ key: 'exp_wrap', buckets: ['A', 'B'] });
  assert.strictEqual(exp.getVariant('u999'), bucketUser('u999', 'exp_wrap', ['A', 'B']));
})();

// 7) fnv1a 為確定性且落在無號 32-bit 範圍
(function testHash() {
  assert.strictEqual(fnv1a('hello'), fnv1a('hello'), 'hash 應確定性');
  assert.notStrictEqual(fnv1a('hello'), fnv1a('world'), '不同輸入通常不同 hash');
  const h = fnv1a('anything');
  assert.ok(h >= 0 && h <= 0xffffffff && Number.isInteger(h), 'hash 應為無號 32-bit 整數');
})();

console.log('✅ 通過');

module.exports = { fnv1a, bucketUser, isEnabled, createExperiment };
