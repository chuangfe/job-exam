/*
【題目】進位轉換

(a) 十進位轉任意進位（2~16）。
(b) 任意進位轉十進位。
不使用 toString(2) / parseInt 等捷徑。

思路：
- 十進位 → 其他進位：反覆除以基底取餘數，餘數反向排列。
- 其他進位 → 十進位：result = result × base + digit（Horner 法）。

範例：
  decToBase(13, 2)   === "1101"
  decToBase(255, 16) === "FF"
  baseToDec("1101", 2)  === 13
  baseToDec("FF", 16)   === 255
*/

function decToBase(num, base) {
  // TODO: 將十進位 num 轉為 base 進位的字串
  return undefined;
}

function baseToDec(str, base) {
  // TODO: 將 base 進位的字串 str 轉為十進位數字
  return undefined;
}

// ===== 測試 =====
const assert = require('node:assert');

assert.strictEqual(decToBase(13, 2), '1101');
assert.strictEqual(decToBase(255, 16), 'FF');
assert.strictEqual(decToBase(0, 2), '0');
assert.strictEqual(baseToDec('1101', 2), 13);
assert.strictEqual(baseToDec('FF', 16), 255);
assert.strictEqual(baseToDec('ff', 16), 255);

console.log('✅ 通過');
