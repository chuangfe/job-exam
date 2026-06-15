/*
【題目】回文判斷 (Palindrome)
判斷字串是否為回文（正讀反讀相同）。需忽略大小寫與非英數字元。

範例：
  isPalindrome("level")                          =>  true
  isPalindrome("A man, a plan, a canal: Panama") =>  true
  isPalindrome("hello")                          =>  false
*/

function isPalindrome(str) {
  // TODO: 先清洗字串（轉小寫、移除非英數），再用雙指標頭尾比對
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPalindrome("level"), true);
assert.strictEqual(isPalindrome("A man, a plan, a canal: Panama"), true);
assert.strictEqual(isPalindrome("hello"), false);
assert.strictEqual(isPalindrome(""), true);
assert.strictEqual(isPalindrome("RaceCar"), true);

console.log('✅ 通過');
