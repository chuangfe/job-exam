/*
【題目】GCD 與 LCM

求最大公因數（GCD）與最小公倍數（LCM）。

範例：
  gcd(12, 18) === 6
  lcm(4, 6)   === 12
  gcd(17, 5)  === 1
  lcm(3, 5)   === 15
*/

function gcd(a, b) {
  // 輾轉相除法：不斷以餘數取代，直到餘數為 0
  while (b !== 0) [a, b] = [b, a % b];
  return a; // 此時 a 即為最大公因數
}

function lcm(a, b) {
  // 先除以 gcd 再乘，可降低溢位風險
  return (a / gcd(a, b)) * b;
}

/*
複雜度說明：
- gcd：O(log(min(a, b)))，輾轉相除每次餘數至少減半。
- lcm：呼叫一次 gcd，故同為 O(log(min(a, b)))。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(gcd(12, 18), 6);
assert.strictEqual(lcm(4, 6), 12);
assert.strictEqual(gcd(17, 5), 1);
assert.strictEqual(lcm(3, 5), 15);
assert.strictEqual(lcm(12, 18), 36);

console.log('✅ 通過');
