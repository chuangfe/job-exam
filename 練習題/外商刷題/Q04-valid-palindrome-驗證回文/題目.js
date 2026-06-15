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
  // TODO: 實作驗證回文邏輯
  return false; // 預設回傳錯誤值，使測試失敗
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(isPalindrome('A man, a plan, a canal: Panama'), true);
assert.strictEqual(isPalindrome('race a car'), false);
assert.strictEqual(isPalindrome(' '), true);
assert.strictEqual(isPalindrome(''), true);
assert.strictEqual(isPalindrome('0P'), false);
