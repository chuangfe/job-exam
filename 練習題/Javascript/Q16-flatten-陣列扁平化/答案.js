/*
【答案】陣列扁平化 flatten

重點：
- 遞迴版用 reduce + concat，依 depth 控制攤平層數；depth < 1 時回傳淺拷貝。
- 原生 arr.flat(depth) 即可，但面試常要求手寫並能講出遞迴/迭代差異與深度控制。
- 附迭代版（堆疊），可避免深層遞迴爆棧。
*/

// flatten：遞迴版（可指定深度）
function flatten(arr, depth = Infinity) {
  return depth < 1
    ? arr.slice()
    : arr.reduce(
        (acc, cur) =>
          acc.concat(Array.isArray(cur) ? flatten(cur, depth - 1) : cur),
        []
      );
}

// flattenIterative：迭代版（用堆疊，避免深層遞迴爆棧；全攤平）
function flattenIterative(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) stack.push(...next);
    else res.unshift(next);
  }
  return res;
}

// ===== 測試 =====
const assert = require('node:assert');

// 1) 預設全攤平
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]);

// 2) 指定深度 1
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]);

// 3) 指定深度 2
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]);

// 4) depth 0 等於淺拷貝
assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);

// 5) 已扁平陣列不變
assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);

// 6) 迭代版全攤平結果一致
assert.deepStrictEqual(flattenIterative([1, [2, [3, [4]]]]), [1, 2, 3, 4]);

console.log('✅ 通過');
