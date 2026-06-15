/*
【題目】deepClone（處理循環引用）

說明：
實作深拷貝，需處理巢狀、陣列、循環引用，並保留 Date、RegExp、Map、Set。

提示：用 WeakMap 記錄已拷貝物件以解決循環引用。

範例：
  const obj = { a: 1, b: { c: 2 } };
  const copy = deepClone(obj);
  copy.b.c = 99;          // 不影響原物件
  obj.b.c === 2;          // true

重點：WeakMap key 為原物件、value 為新物件，再遇到同物件直接回傳，
避免無限遞迴；Reflect.ownKeys 連 Symbol 鍵也複製。
*/

// deepClone：回傳深拷貝後的值
function deepClone(value, seen = new WeakMap()) {
  // TODO: 處理基本型別、Date、RegExp、循環引用、Map、Set、陣列與物件
  return value; // 預設回傳（未實作）
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
