/*
【答案】deepClone（處理循環引用）

重點：
- WeakMap key 為原物件、value 為新物件；遇到已拷貝過的物件直接回傳，避免無限遞迴。
- Date / RegExp 需個別重建。
- Map / Set 需先 seen.set 再遞迴內容（同樣為了循環引用）。
- Reflect.ownKeys 連 Symbol 鍵也複製。
*/

// deepClone：回傳深拷貝後的值
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (seen.has(value)) return seen.get(value); // 循環引用

  if (value instanceof Map) {
    const result = new Map();
    seen.set(value, result);
    value.forEach((v, k) => result.set(deepClone(k, seen), deepClone(v, seen)));
    return result;
  }
  if (value instanceof Set) {
    const result = new Set();
    seen.set(value, result);
    value.forEach((v) => result.add(deepClone(v, seen)));
    return result;
  }

  const result = Array.isArray(value) ? [] : {};
  seen.set(value, result);
  Reflect.ownKeys(value).forEach((key) => {
    result[key] = deepClone(value[key], seen);
  });
  return result;
}

// ===== 測試 =====
const assert = require('node:assert');

// 1) 巢狀物件互不影響
const obj = { a: 1, b: { c: 2 }, arr: [1, [2, 3]] };
const copy = deepClone(obj);
copy.b.c = 99;
copy.arr[1][0] = 99;
assert.strictEqual(obj.b.c, 2);
assert.strictEqual(obj.arr[1][0], 2);
assert.deepStrictEqual(copy.b, { c: 99 });

// 2) 循環引用
const cyc = { name: 'a' };
cyc.self = cyc;
const cycCopy = deepClone(cyc);
assert.strictEqual(cycCopy.self, cycCopy); // 指向自己的副本
assert.notStrictEqual(cycCopy, cyc);

// 3) Date / RegExp
const d = deepClone(new Date('2020-01-01'));
assert.ok(d instanceof Date);
assert.strictEqual(d.getTime(), new Date('2020-01-01').getTime());
const r = deepClone(/abc/gi);
assert.ok(r instanceof RegExp);
assert.strictEqual(r.source, 'abc');
assert.strictEqual(r.flags, 'gi');

// 4) Map / Set
const m = deepClone(new Map([['k', { v: 1 }]]));
assert.ok(m instanceof Map);
assert.deepStrictEqual(m.get('k'), { v: 1 });
const s = deepClone(new Set([1, 2, 3]));
assert.ok(s instanceof Set);
assert.deepStrictEqual([...s], [1, 2, 3]);

console.log('✅ 通過');
