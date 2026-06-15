/*
【題目】最大公因數 (GCD) — 輾轉相除法
求兩正整數的最大公因數，使用歐幾里得演算法：
gcd(a, b) = gcd(b, a mod b)，當 b 為 0 時 a 即答案。
提供 gcd（遞迴）與 gcdIter（迭代）兩種實作。
範例：gcd(48, 18) === 6
*/

// 遞迴版：b 為 0 時，a 就是最大公因數；否則對 (b, a%b) 繼續遞迴。
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b); // 注意是取餘數 a % b，不是除法
}

// 迭代版：用解構賦值不斷把 (a, b) 換成 (b, a%b)，直到 b 為 0。
function gcdIter(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/*
複雜度說明：
  時間 O(log(min(a, b)))，因為每兩步餘數至少減半。
  遞迴版空間 O(log(min(a,b)))（堆疊深度）；迭代版空間 O(1)。
  手寫時務必用餘數運算 a % b（而非除法）。
  延伸：最小公倍數 LCM 可由 a * b / gcd(a, b) 求得。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(gcd(48, 18), 6);
assert.strictEqual(gcd(12, 18), 6);
assert.strictEqual(gcd(17, 5), 1);
assert.strictEqual(gcd(100, 10), 10);

assert.strictEqual(gcdIter(48, 18), 6);

console.log('✅ 通過');
