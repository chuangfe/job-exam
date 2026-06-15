/*
【題目】河內塔 (Tower of Hanoi)
將 n 個由小到大堆疊的圓盤，從 A 柱移到 C 柱，借助 B 柱。
規則：
  1. 一次只能移動一個圓盤。
  2. 大盤不可疊在小盤之上。
請印出每一步移動，並回傳總步數。

範例：
  hanoi(3, "A", "C", "B") 回傳 7
*/

// TODO: 實作河內塔，印出每步並回傳總步數
function hanoi(n, from, to, aux) {
  // TODO
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(hanoi(1, 'A', 'C', 'B'), 1);
assert.strictEqual(hanoi(2, 'A', 'C', 'B'), 3);
assert.strictEqual(hanoi(3, 'A', 'C', 'B'), 7);
assert.strictEqual(hanoi(4, 'A', 'C', 'B'), 15);

console.log('✅ 通過');
