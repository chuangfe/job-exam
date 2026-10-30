/*
 * 【題目】手寫 A/B 測試分流 + Feature Flag（實驗框架核心）
 *
 * 你要實作一個「實驗框架」的核心，重點在「一致性分流」：
 * 同一個使用者、同一個實驗，不管呼叫幾次都要分到「同一組」，
 * 而且大量使用者要能大致均勻（依權重）地分散到各組。
 *
 * 為什麼不用 Math.random()？因為 random 每次結果都不同，
 * 使用者這次看到 A、下次看到 B，體驗會閃爍、數據也會被污染。
 * 正確做法是用「確定性 hash」：hash(userId + ':' + experimentKey)。
 * 同樣的輸入永遠得到同樣的 hash，就能穩定分流。
 *
 * ── 要實作的三個函式 ─────────────────────────────
 *
 * 1) fnv1a(str) -> number
 *    自己實作一個簡單、確定性的字串 hash（FNV-1a 32-bit），
 *    回傳無號 32-bit 整數（0 ~ 4294967295）。不要用外部套件。
 *    提示：
 *      let h = 0x811c9dc5;                       // offset basis
 *      for 每個字元:
 *        h ^= charCodeAt(i);
 *        h = Math.imul(h, 0x01000193);           // FNV prime，Math.imul 保持 32-bit 乘法
 *      return h >>> 0;                            // 轉無號
 *
 * 2) bucketUser(userId, experimentKey, buckets) -> string
 *    依 hash(userId + ':' + experimentKey) 做一致性分流，回傳被分到的變體名稱。
 *    buckets 兩種格式都要支援：
 *      - 純變體陣列：           ['A', 'B']                    （視為等權重）
 *      - 帶權重的物件陣列：     [{name:'A',weight:50}, {name:'B',weight:50}]
 *    作法：把 hash 正規化成 [0, 100) 的分數，依「累積權重」落點決定分到哪一組。
 *    權重總和不必剛好是 100，會依比例換算。
 *
 * 3) isEnabled(userId, flag) -> boolean
 *    依 rollout 百分比（0~100）決定某使用者是否啟用該 feature flag。
 *      flag = { key, rollout, allowlist? }
 *    規則：
 *      - allowlist 內的 userId：直接啟用（true），不看比例。
 *      - rollout <= 0：全關（false）。
 *      - rollout >= 100：全開（true）。
 *      - 其他：依 hash(userId + ':' + flag.key) 正規化到 [0,100)，< rollout 才啟用。
 *    一致性：同一個 user 對同一個 flag 結果要穩定。
 *    （注意 hash 要把 flag.key 混進去，否則不同 flag 會用同一條分界線而彼此相關。）
 *
 * 4)（可選）createExperiment({ key, buckets }) -> { getVariant(userId) }
 *    小封裝：回傳一個物件，其 getVariant(userId) 內部呼叫 bucketUser。
 *
 * ── 範例 ─────────────────────────────
 *   bucketUser('u123', 'exp_checkout', ['A', 'B'])        // 例如 'A'（同輸入永遠同結果）
 *   isEnabled('u123', { key: 'new_ui', rollout: 100 })    // true
 *   isEnabled('u123', { key: 'new_ui', rollout: 0 })      // false
 *   isEnabled('vip', { key: 'new_ui', rollout: 0, allowlist: ['vip'] }) // true
 */

'use strict';

function fnv1a(str) {
  throw new Error('尚未實作');
}

function bucketUser(userId, experimentKey, buckets) {
  throw new Error('尚未實作');
}

function isEnabled(userId, flag) {
  throw new Error('尚未實作');
}

function createExperiment(config) {
  throw new Error('尚未實作');
}

// ───────────────────────── 測試（node:assert，確定性）─────────────────────────
const assert = require('node:assert');

// 產生固定的假 userId 資料集（不使用 Math.random，確保測試穩定）
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

console.log('✅ 通過');

module.exports = { fnv1a, bucketUser, isEnabled, createExperiment };
