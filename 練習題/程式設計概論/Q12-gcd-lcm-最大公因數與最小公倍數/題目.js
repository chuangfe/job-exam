/*
【題目】GCD 與 LCM

求最大公因數（GCD）與最小公倍數（LCM）。

思路：
- GCD 用輾轉相除法（Euclidean algorithm）。
- LCM = a × b / GCD(a, b)。
- LCM 寫成 a / gcd * b 可降低溢位風險。

範例：
  gcd(12, 18) === 6
  lcm(4, 6)   === 12
  gcd(17, 5)  === 1
  lcm(3, 5)   === 15
*/

function gcd(a, b) {
  // TODO: 用輾轉相除法求最大公因數
  return undefined;
}

function lcm(a, b) {
  // TODO: 求最小公倍數
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(gcd(12, 18), 6);
assert.strictEqual(lcm(4, 6), 12);
assert.strictEqual(gcd(17, 5), 1);
assert.strictEqual(lcm(3, 5), 15);
assert.strictEqual(lcm(12, 18), 36);

console.log('✅ 通過');
