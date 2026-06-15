/*
【題目】
LeetCode 49. Group Anagrams (字母異位詞分組)

給定字串陣列 strs，將互為字母異位詞的字串分組。
回傳分組結果 (分組順序與組內順序不限)。

範例:
  輸入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
  輸出: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
*/

function groupAnagrams(strs) {
  // 使用雜湊表，鍵為「排序後的字串」，值為同組字串陣列
  const groups = new Map();
  for (const str of strs) {
    // 字母異位詞排序後會得到相同的鍵
    const key = str.split('').sort().join('');
    // 該鍵首次出現時初始化空陣列
    if (!groups.has(key)) groups.set(key, []);
    // 將原字串放入對應分組
    groups.get(key).push(str);
  }
  // 回傳所有分組
  return [...groups.values()];
}
// 時間複雜度: O(n·k·log k)、空間複雜度: O(n·k) (n 為字串數、k 為字串長度)

// ===== 測試 =====
const assert = require('node:assert');

// 將結果正規化以便比對 (組內排序、組間排序)，因為題目允許任意順序
const norm = (r) =>
  r.map((g) => [...g].sort()).sort((a, b) => a.join('').localeCompare(b.join('')));

assert.deepStrictEqual(
  norm(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])),
  norm([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']])
);
assert.deepStrictEqual(norm(groupAnagrams([])), norm([]));
assert.deepStrictEqual(norm(groupAnagrams([''])), norm([['']]));
assert.deepStrictEqual(norm(groupAnagrams(['a'])), norm([['a']]));

console.log('✅ 通過');
