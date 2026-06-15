/*
【題目】質數判斷

判斷一個整數 n 是否為質數；並列出 1~N 的所有質數。

思路：
- 質數只能被 1 和自己整除。
- 檢查除數只需到 √n。
- 列舉大量質數可用埃拉托斯特尼篩法（Sieve of Eratosthenes）。

範例：
  isPrime(17) === true
  isPrime(18) === false
  isPrime(1)  === false
  sieve(30)   === [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
*/

function isPrime(n) {
  // TODO: 判斷 n 是否為質數
  return undefined;
}

function sieve(N) {
  // TODO: 回傳 1~N 之間所有質數的陣列
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPrime(17), true);
assert.strictEqual(isPrime(18), false);
assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(1), false);
assert.strictEqual(isPrime(0), false);
assert.deepStrictEqual(sieve(30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);

console.log('✅ 通過');
