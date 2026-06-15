/*
【題目】進位轉換

(a) 十進位轉任意進位（2~16）。
(b) 任意進位轉十進位。
不使用 toString(2) / parseInt 等捷徑。

範例：
  decToBase(13, 2)   === "1101"
  decToBase(255, 16) === "FF"
  baseToDec("1101", 2)  === 13
  baseToDec("FF", 16)   === 255
*/

function decToBase(num, base) {
  if (num === 0) return '0';            // 特例：0 直接回傳 "0"
  const digits = '0123456789ABCDEF';    // 數值對應的字元表
  let result = '';
  let n = num;
  while (n > 0) {
    result = digits[n % base] + result; // 取餘數對應字元，逆序接到前面
    n = Math.floor(n / base);           // 除以基底繼續處理
  }
  return result;
}

function baseToDec(str, base) {
  const digits = '0123456789ABCDEF';    // 字元對應的數值表
  let result = 0;
  for (const ch of str.toUpperCase()) {  // 統一轉大寫以支援小寫輸入
    const val = digits.indexOf(ch);     // 取得該字元代表的數值
    result = result * base + val;       // Horner 法：逐位累加
  }
  return result;
}

/*
複雜度說明：
- decToBase：時間 O(log_base num)，每次迴圈將 num 除以 base。
- baseToDec：時間 O(len(str))。
- 最常考點：除基取餘、餘數逆序；十六進位 10~15 對應 A~F。
*/

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(decToBase(13, 2), '1101');
assert.strictEqual(decToBase(255, 16), 'FF');
assert.strictEqual(decToBase(0, 2), '0');
assert.strictEqual(baseToDec('1101', 2), 13);
assert.strictEqual(baseToDec('FF', 16), 255);
assert.strictEqual(baseToDec('ff', 16), 255);

console.log('✅ 通過');
