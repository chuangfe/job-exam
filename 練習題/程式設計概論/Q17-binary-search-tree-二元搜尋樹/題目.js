/*
【題目】二元搜尋樹 (Binary Search Tree, BST)

請實作一棵二元搜尋樹，支援以下操作：
  - insert(value)：插入節點
  - search(value)：搜尋值是否存在，回傳 true / false
  - preOrder()：前序走訪（根 → 左 → 右），回傳值的陣列
  - inOrder()：中序走訪（左 → 根 → 右），回傳值的陣列
  - postOrder()：後序走訪（左 → 右 → 根），回傳值的陣列

思路：BST 性質——左子樹皆小於節點、右子樹皆大於節點。
      插入與搜尋靠比大小決定往左或往右。
      中序走訪 (in-order) 會得到遞增排序結果（重要考點）。

【範例】
  const bst = new BST();
  [8, 3, 10, 1, 6, 14, 4, 7].forEach(v => bst.insert(v));
  bst.search(6);      // true
  bst.search(99);     // false
  bst.inOrder();      // [1, 3, 4, 6, 7, 8, 10, 14]  （遞增排序）
*/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    // TODO: 依 BST 性質往左或往右找空位插入
  }

  search(value) {
    // TODO: 依大小往左或往右尋找，回傳 true / false
    return false;
  }

  preOrder(node = this.root, result = []) {
    // TODO: 前序走訪（根 → 左 → 右）
    return result;
  }

  inOrder(node = this.root, result = []) {
    // TODO: 中序走訪（左 → 根 → 右）
    return result;
  }

  postOrder(node = this.root, result = []) {
    // TODO: 後序走訪（左 → 右 → 根）
    return result;
  }
}

// ===== 測試 =====
const assert = require('node:assert');

const bst = new BST();
[8, 3, 10, 1, 6, 14, 4, 7].forEach((v) => bst.insert(v));

assert.strictEqual(bst.search(6), true);
assert.strictEqual(bst.search(99), false);

assert.deepStrictEqual(bst.preOrder(), [8, 3, 1, 6, 4, 7, 10, 14]);
assert.deepStrictEqual(bst.inOrder(), [1, 3, 4, 6, 7, 8, 10, 14]);
assert.deepStrictEqual(bst.postOrder(), [1, 4, 7, 6, 3, 14, 10, 8]);

console.log('✅ 通過');
