/*
【題目】質數判斷

判斷一個整數 n 是否為質數；並列出 1~N 的所有質數。

範例：
  isPrime(17) === true
  isPrime(18) === false
  isPrime(1)  === false
  sieve(30)   === [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
*/

function isPrime(n) {
  if (n < 2) return false;           // 0、1 與負數都不是質數
  if (n === 2) return true;          // 2 是唯一的偶數質數
  if (n % 2 === 0) return false;     // 其餘偶數直接排除
  // 只需檢查奇數除數，且到 √n 即可
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;   // 找到因數，非質數
  }
  return true;
}

function sieve(N) {
  // 預設所有數字皆為質數
  const isPrimeArr = new Array(N + 1).fill(true);
  isPrimeArr[0] = isPrimeArr[1] = false; // 0、1 非質數
  for (let i = 2; i * i <= N; i++) {
    if (isPrimeArr[i]) {
      // 從 i*i 開始，將 i 的倍數標記為非質數
      for (let j = i * i; j <= N; j += i) isPrimeArr[j] = false;
    }
  }
  // 將仍為 true 的索引（即質數）收集成陣列
  return isPrimeArr.map((v, i) => (v ? i : null)).filter(v => v !== null);
}

/*
複雜度說明：
- isPrime：單一判斷 O(√n)，因為只需檢查到 √n 的除數。
- sieve：埃拉托斯特尼篩法 O(N log log N)。
- 使用 i*i <= n 比 i <= Math.sqrt(n) 更快，且避免浮點誤差。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPrime(17), true);
assert.strictEqual(isPrime(18), false);
assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(1), false);
assert.strictEqual(isPrime(0), false);
assert.deepStrictEqual(sieve(30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);

console.log('✅ 通過');
