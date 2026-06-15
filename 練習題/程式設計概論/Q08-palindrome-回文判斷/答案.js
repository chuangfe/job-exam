/*
【題目】回文判斷 (Palindrome)
判斷字串是否為回文（正讀反讀相同）。需忽略大小寫與非英數字元。

範例：
  isPalindrome("level")                          =>  true
  isPalindrome("A man, a plan, a canal: Panama") =>  true
  isPalindrome("hello")                          =>  false
*/

function isPalindrome(str) {
  // 清洗：轉小寫，並移除所有非英數字元（只保留 a-z 與 0-9）
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  // 雙指標頭尾比對
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false; // 不相等就不是回文
    left++;
    right--;
  }
  return true;
}

/*
複雜度：時間 O(n)、空間 O(n)（清洗後的字串）。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPalindrome("level"), true);
assert.strictEqual(isPalindrome("A man, a plan, a canal: Panama"), true);
assert.strictEqual(isPalindrome("hello"), false);
assert.strictEqual(isPalindrome(""), true);
assert.strictEqual(isPalindrome("RaceCar"), true);

console.log('✅ 通過');
