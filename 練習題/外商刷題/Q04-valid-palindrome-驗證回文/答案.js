/*
【題目】 LeetCode 125. Valid Palindrome（驗證回文）

給定字串 s，只考慮其中的英數字元（字母與數字）並忽略大小寫，
判斷它是否為回文字串（正讀與反讀相同）。

範例：
  輸入: "A man, a plan, a canal: Panama"
  輸出: true
  說明: 去除非英數字元並轉小寫後為 "amanaplanacanalpanama"，為回文。

  輸入: "race a car"
  輸出: false
  說明: 去除非英數字元並轉小寫後為 "raceacar"，不是回文。

  輸入: " "
  輸出: true
  說明: 去除非英數字元後為空字串，空字串視為回文。
*/

function isPalindrome(s) {
  // 判斷字元是否為英數字元（字母或數字）
  const isAlnum = (c) => /[a-z0-9]/i.test(c);
  // 使用雙指標，分別由字串左右兩端往中間靠攏
  let left = 0, right = s.length - 1;
  while (left < right) {
    // 跳過左側非英數字元
    while (left < right && !isAlnum(s[left])) left++;
    // 跳過右側非英數字元
    while (left < right && !isAlnum(s[right])) right--;
    // 忽略大小寫比較，不相等即非回文
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++; right--;
  }
  return true;
}

// 複雜度：時間 O(n)、空間 O(1)

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPalindrome('A man, a plan, a canal: Panama'), true);
assert.strictEqual(isPalindrome('race a car'), false);
assert.strictEqual(isPalindrome(' '), true);
assert.strictEqual(isPalindrome(''), true);
assert.strictEqual(isPalindrome('0P'), false);

console.log('✅ 通過');
