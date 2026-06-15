/*
【題目】費氏數列 (Fibonacci)
求第 n 項費氏數：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)。
提供 fibRec（純遞迴）、fibIter（迭代）、fibMemo（記憶化）三種實作。
範例：fibIter(10) === 55、fibRec(0) === 0、fibRec(1) === 1
*/

// 純遞迴：直接照定義展開，n < 2 時 F(n) = n。
// 缺點：相同子問題會被重複計算，呼叫樹呈指數成長。
function fibRec(n) {
  if (n < 2) return n;
  return fibRec(n - 1) + fibRec(n - 2);
}

// 迭代：只保留最近兩項 prev、curr，由下往上累加。
// 用解構賦值同時更新，避免暫存變數。
function fibIter(n) {
  if (n < 2) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr]; // prev<-curr, curr<-prev+curr
  }
  return curr;
}

// 記憶化：用 memo 物件快取已算過的項，避免重複計算。
function fibMemo(n, memo = {}) {
  if (n < 2) return n;
  if (memo[n] !== undefined) return memo[n]; // 命中快取直接回傳
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

/*
複雜度說明：
  fibRec  純遞迴：時間 O(2^n)（指數爆炸，常見扣分陷阱），空間 O(n)（遞迴堆疊）。
          慢的原因：重複子問題，例如 fib(5) 會反覆計算 fib(3)、fib(2)，
          呼叫樹的節點數隨 n 呈指數成長。
  fibIter 迭代：時間 O(n)、空間 O(1)。最推薦的寫法。
  fibMemo 記憶化：時間 O(n)、空間 O(n)（memo 快取 + 遞迴堆疊）。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(fibIter(0), 0);
assert.strictEqual(fibIter(1), 1);
assert.strictEqual(fibIter(10), 55);
assert.strictEqual(fibIter(20), 6765);

assert.strictEqual(fibRec(0), 0);
assert.strictEqual(fibRec(1), 1);
assert.strictEqual(fibRec(10), 55);

assert.strictEqual(fibMemo(0), 0);
assert.strictEqual(fibMemo(1), 1);
assert.strictEqual(fibMemo(10), 55);

console.log('✅ 通過');
