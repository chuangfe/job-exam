/*
【題目】河內塔 (Tower of Hanoi)
將 n 個圓盤從 A 柱移到 C 柱，借助 B 柱；一次移一個、大盤不可疊小盤上。
印出每步並回傳總步數。
範例：hanoi(3, "A", "C", "B") 回傳 7
*/

// 遞迴拆解：移 n 個 = 先把上面 n-1 個搬到輔助柱，
// 再把第 n 個（最大）搬到目標柱，最後把 n-1 個從輔助柱搬到目標柱。
function hanoi(n, from, to, aux) {
  if (n === 1) {
    console.log(`移動盤 1：${from} → ${to}`); // 基底：直接搬最上面那個
    return 1;
  }
  let steps = 0;
  steps += hanoi(n - 1, from, aux, to);    // (1) n-1 個 from -> aux（to 當輔助）
  console.log(`移動盤 ${n}：${from} → ${to}`); // (2) 第 n 個 from -> to
  steps += 1;
  steps += hanoi(n - 1, aux, to, from);    // (3) n-1 個 aux -> to（from 當輔助）
  return steps;
}

/*
複雜度說明：
  時間 O(2^n)，總步數為 2^n - 1（經典考點）。
  空間 O(n)（遞迴堆疊深度）。
  最容易寫錯之處是三個遞迴參數 (from / to / aux) 的交換順序，
  務必確認每一層搬移時的來源、目標、輔助柱對應正確。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(hanoi(1, 'A', 'C', 'B'), 1);
assert.strictEqual(hanoi(2, 'A', 'C', 'B'), 3);
assert.strictEqual(hanoi(3, 'A', 'C', 'B'), 7);
assert.strictEqual(hanoi(4, 'A', 'C', 'B'), 15);

console.log('✅ 通過');
